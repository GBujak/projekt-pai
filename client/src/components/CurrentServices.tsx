import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { FoldingPaper } from './FoldingPaper';
import "./styles/tableStyles.css";
import StateIcon from '@material-ui/icons/FiberManualRecord';

export interface ServiceInterface {
    id: number,
    carMake: string,
    carModel: string,
    assignedMechanic: string,
    date: string,
    tags: Array<string>,
    state: 'not started' | 'started' | 'finished',
    finished: boolean,
}

interface Props {
    currentServices: Array<ServiceInterface>,
}

function stateDesc(service: ServiceInterface) {
    if (service.finished === false && service.assignedMechanic === "")
        return <div><StateIcon style={{ color: 'red', height: '.8rem' }} />Nie rozpoczęta</div>;
    if (service.finished === false)
        return <div><StateIcon style={{ color: '#DD0', height: '.8rem' }} />Rozpoczęta</div>;
    return <div><StateIcon style={{ color: 'green', height: '.8rem' }} />Zakończona</div>;
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
                    <TableCell>Stan usługi</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {currentServices.map((service, index) => (
                    <TableRow key={index} className="clickable-table-row" onClick={() => { history.push(`/historia/${service.id}`); }}>
                        <TableCell>{service.carMake}</TableCell>
                        <TableCell>{service.carModel}</TableCell>
                        <TableCell>{(service.assignedMechanic !== "") ? service.assignedMechanic : "nie przypisano"}</TableCell>
                        <TableCell>{new Date(service.date).toLocaleDateString()}</TableCell>
                        <TableCell>{stateDesc(service)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </FoldingPaper>;
};