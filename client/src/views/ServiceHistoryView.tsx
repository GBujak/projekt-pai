import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticationContext } from '../auth/AuthenticationContext';
import { ChipEditor } from '../components/ChipEditor';
import { GenerateInvoice } from '../components/GenerateInvoice';
import { NewComment } from '../components/NewComment';
import { ServiceHistoryComment } from '../components/ServiceHistoryElement';

interface Props {

};

export interface ServiceStory {
    id: number,
    hasInvoice: boolean,
    title: string,
    carModelId: number,
    finished: boolean,
    description: string,
    tags: Array<string>,
    date: string,
    submitter: string,
    comments: Array<ServiceComment>,
}

export interface ServiceComment {
    title: string,
    content: string,
    submitter: string,
    accountType: 'customer' | 'mechanic' | 'manager' | 'administrator',
    submittedOn: string,
    workDescriptions: Array<WorkDescription>,
}

export interface WorkDescription {
    name: string,
    hours: number,
    usedParts: Array<UsedPart>,
}

export interface UsedPart {
    name: string,
    price: number,
    ammount: number,
}

export const ServiceHistoryView: React.FC<Props> = ({ }) => {
    const [serviceStory, setServiceStory] = useState<ServiceStory | null>(null);
    const [error, setError] = useState("");

    const auth = useContext(AuthenticationContext);

    let route_params = useParams<{ id: string; }>();
    let id = +route_params.id;

    const loadStory = () => {
        axios.get(`/api/service-story/all/${id}`).then((res) => {
            console.log("service-all", res.data.data);
            let data = res.data;
            if (data.msg === "Ok") setServiceStory({ ...data.data });
            else setError(data.msg);
        });
    };

    const onChangeTags = (newTags: Array<string>) => {
        axios.post("/api/service-story/change-tags", {
            serviceId: serviceStory!!.id,
            newTags
        }).then(() => {
            loadStory();
        });
    };

    useEffect(() => loadStory(), []);

    if (error !== "") return <h1 style={{ color: "red" }}>{error}</h1>;
    if (serviceStory === null) return <h2>Ładowanie...</h2>;

    return <Container style={{ marginTop: "2rem" }}>
        <Typography variant="h5" style={{ margin: "2rem 0" }}>Historia usługi {serviceStory.id} {serviceStory.finished &&
            <>(<span style={{ color: "green" }}>zakończona</span>)</>}</Typography>

        <h2>{serviceStory.title}</h2>
        <h4>Rozpoczęta {new Date(serviceStory.date).toLocaleDateString()} przez {serviceStory.submitter}</h4>
        <br />
        <pre>
            <Typography>{serviceStory.description}</Typography>
        </pre>
        <br />

        <ChipEditor title="Rodzaj usługi"
            editable={auth.auth?.accountType !== "customer"}
            chips={serviceStory.tags}
            onChange={onChangeTags}
        />

        {serviceStory.comments.map((e, index) => (
            <ServiceHistoryComment key={index} comment={e} />
        ))}

        <NewComment modelId={serviceStory.carModelId} serviceId={serviceStory.id}
            onShouldReload={loadStory} />

        {serviceStory.finished && <GenerateInvoice
            hasInvoice={serviceStory.hasInvoice}
            serviceId={serviceStory.id} />}

        <div style={{ height: "150px" }} />
    </Container>;
};