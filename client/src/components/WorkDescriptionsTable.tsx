import React from 'react';

import { Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@material-ui/core";
import { NewWorkDescription } from './NewComment';
import { moneyFormat } from '../util/moneyFormat';

interface Props {
    workDescriptions: Array<NewWorkDescription>,
    onDelete: (index: number) => void,
}

export const WorkDescriptionsTable: React.FC<Props> = ({ workDescriptions, onDelete }) => {

    return <>
        <Typography variant="overline">Opis pracy</Typography>
        <Divider />
        <Table size="small">
            <TableHead><TableRow>
                <TableCell>Nazwa pracy</TableCell>
                <TableCell>Usuń pracę</TableCell>
                <TableCell>Godziny pracy</TableCell>
                <TableCell>Zużyte części</TableCell>
            </TableRow></TableHead>
            <TableBody>
                {workDescriptions.map((description, index) => (
                    <TableRow key={index}>
                        <TableCell style={{ width: "10rem" }}>{description.name}</TableCell>
                        <TableCell style={{ width: "5rem" }}>
                            <Button size="small" variant="outlined" style={{ color: "red" }}
                                onClick={() => onDelete(index)}>
                                Usuń
                            </Button>
                        </TableCell>
                        <TableCell style={{ width: "8rem" }}>{description.hours}</TableCell>
                        <TableCell>
                            {description.usedParts.length === 0 ? "nie dotyczy" : <Table size="small">
                                <TableBody>
                                    {description.usedParts.map((part, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{part.name}</TableCell>
                                            <TableCell>{part.ammount} x {moneyFormat(part.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>;
};