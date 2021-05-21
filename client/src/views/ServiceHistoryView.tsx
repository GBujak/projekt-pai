import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ServiceHistoryElement } from '../components/ServiceHistoryElement';

interface Props {

};

export interface ServiceStory {
    title: string,
    description: string,
    date: string,
    submitter: string,
    comments: Array<ServiceStoryComment>,
}

export interface ServiceStoryComment {
    title: string,
    content: string,
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

export interface HistoryElement {
    postDate: Date,
    author: string,
    title: string,
    content: string,
    workDescriptions: Array<WorkDescription>,
};

export const ServiceHistoryView: React.FC<Props> = (props) => {
    const history: Array<HistoryElement> = [
        {
            postDate: new Date("2021-05-23"),
            author: "Jan Kowalski",
            title: "Zmieniłem olej",
            content: "Zmieniłem olej w samochodzie, wypolerowałem zadrapanie",
            workDescriptions: [{
                name: "zmiana oleju",
                hours: 2.5,
                usedParts: [{ name: "olej Castrol 1 litr", ammount: 2, price: 10_00 }, { name: "Zakrętka", ammount: 1, price: 5_20 }]
            }, {
                name: "wypolerowanie zadrapania",
                hours: 1,
                usedParts: []
            }],
        }, {
            postDate: new Date("2021-05-30"),
            author: "Jan Kowalski",
            title: "samochód do odebrania",
            content: "",
            workDescriptions: [],
        }
    ];

    let route_params = useParams<{ id: string; }>();
    let id = +route_params.id;

    return <Container style={{ marginTop: "2rem" }}>
        <Typography variant="h5" style={{ margin: "2rem 0" }}>Historia usługi {id}</Typography>

        {history.map((e, index) => (
            <ServiceHistoryElement key={index} element={e} />
        ))}
    </Container>;
};