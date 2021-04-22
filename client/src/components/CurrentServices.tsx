import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
    currentServices: Array<{
        carMake: string,
        carModel: string,
        assignedMechanic: string,
        dateStarted: Date,
    }>,
}

export const CurrentServices: React.FC<Props> = ({ currentServices }) => {

    return <Paper style={{ maxWidth: "900px", padding: "1rem" }}>
        <Typography variant="h5">Aktywne usługi</Typography>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Marka samochodu</TableCell>
                    <TableCell>Model samochodu</TableCell>
                    <TableCell>Przypisany mechanik</TableCell>
                    <TableCell>Data rozpoczęcia usługi</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {currentServices.map((service, index) => (
                    <TableRow key={index}>
                        <TableCell>{service.carMake}</TableCell>
                        <TableCell>{service.carModel}</TableCell>
                        <TableCell>{service.assignedMechanic}</TableCell>
                        <TableCell>{service.dateStarted.toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>;
};