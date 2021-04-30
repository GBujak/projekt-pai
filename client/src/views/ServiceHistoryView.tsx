import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ServiceHistoryElement } from '../components/ServiceHistoryElement';

interface Props {

};

export interface WorkDescription {
    name: string,
    workHours: number,
    parts: Array<{ name: string, count: number, }>,
}

export interface HistoryElement {
    postDate: Date,
    author: string,
    title: string,
    content: string,
    workDescriptions: Array<WorkDescription>,
};

export const ServiceHistoryView: React.FC<Props> = ({ }) => {
    const history: Array<HistoryElement> = [
        {
            postDate: new Date("2021-05-23"),
            author: "Jan Kowalski",
            title: "Zmieniłem olej",
            content: "Zmieniłem olej w samochodzie, wypolerowałem zadrapanie",
            workDescriptions: [{
                name: "zmiana oleju",
                workHours: 2.5,
                parts: [{ name: "olej Castrol 1 litr", count: 2, }, { name: "Zakrętka", count: 1 }]
            }, {
                name: "wypolerowanie zadrapania",
                workHours: 1,
                parts: []
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