import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { FoldingPaper } from './FoldingPaper';
import "./styles/tableStyles.css";

interface Props {
    currentServices: Array<{
        carMake: string,
        carModel: string,
        assignedMechanic: string,
        dateStarted: Date,
    }>,
}

export const CurrentServices: React.FC<Props> = ({ currentServices }) => {
    const history = useHistory();

    return <FoldingPaper startOpen={true} title="Aktywne usługi">
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
                    <TableRow key={index} className="clickable-table-row" onClick={() => { history.push("/historia"); }}>
                        <TableCell>{service.carMake}</TableCell>
                        <TableCell>{service.carModel}</TableCell>
                        <TableCell>{service.assignedMechanic}</TableCell>
                        <TableCell>{service.dateStarted.toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </FoldingPaper>;
};