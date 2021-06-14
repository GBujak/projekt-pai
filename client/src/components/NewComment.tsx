import { Button, Checkbox, Paper, TextField } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../auth/AuthenticationContext';
import { PartForModel, WorkDescriptionForm } from './WorkDescriptionForm';
import { WorkDescriptionsTable } from './WorkDescriptionsTable';

export interface NewWorkDescription {
    name: string,
    hours: number,
    usedParts: Array<NewUsedPart>,
}

export interface NewUsedPart {
    id: number,
    name: string,
    price: number,
    ammount: number,
}

interface Props {
    modelId: number,
    serviceId: number,
    onShouldReload: () => void,
};

export const NewComment: React.FC<Props> = ({ modelId, serviceId, onShouldReload }) => {
    const auth = useContext(AuthenticationContext);
    const accountType = auth.auth!.accountType;
    const [partsForModel, setPartsforModel] = useState<Array<PartForModel>>([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [finishesService, setFinishesService] = useState(false);

    const [workDescriptions, setWorkDescriptions] = useState<Array<NewWorkDescription>>([]);

    const onAddWorkDescription = (desc: NewWorkDescription) => {
        console.log(desc);
        setWorkDescriptions([...workDescriptions, desc]);
    };

    const onSubmit = () => {
        let newComment = {
            serviceId,
            title,
            content,
            finishesService,
            workDescriptions: workDescriptions.map(it => {
                return {
                    name: it.name,
                    hours: it.hours,
                    usedParts: it.usedParts.map(it => {
                        return {
                            id: it.id,
                            ammount: it.ammount,
                        };
                    })
                };
            })
        };

        axios.post("/api/service-story/create-comment", newComment).then(res => {
            onShouldReload();
        });
    };

    const loadPartsForModel = () => {
        axios.post("/api/car-part/for-model", { modelId }).then(res => {
            setPartsforModel(res.data.data);
            if (loading) setLoading(false);
        });
    };

    useEffect(() => loadPartsForModel(), []);

    if (loading) return <p>Ładowanie...</p>;

    return <Paper variant="outlined" style={{ padding: '1rem' }}>
        <h2>Dodaj komentarz</h2>

        <TextField variant="outlined" label="Tytuł komentarza" fullWidth
            value={title} onChange={e => setTitle(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="Treść komentarza" fullWidth multiline
            value={content} onChange={e => setContent(e.target.value)} />

        {accountType !== "customer" && <>
            <h3>Dodawanie opisu pracy</h3>
            {workDescriptions.length !== 0 &&
                <Paper variant="outlined" style={{ padding: '1rem', marginBottom: "1rem" }}>
                    <WorkDescriptionsTable workDescriptions={workDescriptions}
                        onDelete={index => {
                            setWorkDescriptions([
                                ...workDescriptions.slice(0, index),
                                ...workDescriptions.slice(index + 1, workDescriptions.length),
                            ]);
                        }} />
                </Paper>}
            <WorkDescriptionForm
                onCreate={onAddWorkDescription}
                partsForModel={partsForModel} />
        </>}
        <br />

        <Checkbox checked={finishesService} onChange={e => setFinishesService(e.target.checked)} />
        <p style={{ display: "inline" }}>Komentarz kończy usługę</p>

        <br /> <br />
        <Button
            style={{ color: (finishesService) ? "red" : "black" }}
            variant="outlined" onClick={() => onSubmit()}>
            Stwórz komentarz {finishesService && "i zakończ usługę"}
        </Button>
    </Paper>;
};