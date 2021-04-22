import { Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { HistoryElement } from '../views/ServiceHistoryView';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    element: HistoryElement,
}

export const ServiceHistoryElement: React.FC<Props> = ({ element }) => {

    return <FoldingPaper title={element.title} subtitle={element.postDate.toLocaleDateString()} startOpen={true}>
        <Typography variant="body2">Autor: {element.author}</Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Typography variant="body1">{element.content}</Typography>

        {element.workDescriptions.length !== 0 && <div>
            <div style={{ height: "2rem" }} />
            <Typography variant="overline">Opis pracy</Typography>
            <Divider />
            <Table size="small">
                <TableHead><TableRow>
                    <TableCell>Nazwa pracy</TableCell>
                    <TableCell>Godziny pracy</TableCell>
                    <TableCell>Zużyte części</TableCell>
                </TableRow></TableHead>
                <TableBody>
                    {element.workDescriptions.map((description, index) => (
                        <TableRow key={index}>
                            <TableCell>{description.name}</TableCell>
                            <TableCell>{description.workHours}</TableCell>
                            <TableCell>
                                {description.parts.length === 0 ? "nie dotyczy" : <Table size="small">
                                    <TableBody>
                                        {description.parts.map((part, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{part.name}</TableCell>
                                                <TableCell>{part.count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>}

    </FoldingPaper>;
};