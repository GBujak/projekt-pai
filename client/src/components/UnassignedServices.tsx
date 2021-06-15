import { Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { ServiceInterface } from './CurrentServices';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    unassignedServices: Array<ServiceInterface>,
    availableMechanics: Array<{
        name: string,
        id: number,
        specializes: Array<string>,
    }>,
    onAssignedService: () => void,
}

export const UnassignedServices: React.FC<Props> = ({ unassignedServices, availableMechanics, onAssignedService }) => {
    const [assigning, setAssigning] = useState(-1);

    const onAssignMechanic = (mechanicId: number) => {
        if (assigning === -1) return;

        let service = unassignedServices[assigning];

        axios.post("/api/manager/assign-worker", {
            serviceRequestId: service.id,
            workerId: mechanicId,
        }).then(() => {
            setAssigning(-1);
            onAssignedService();
        });
    };

    return <FoldingPaper startOpen={true} title="Nieprzypisane usługi">
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Marka samochodu</TableCell>
                    <TableCell>Model samochodu</TableCell>
                    <TableCell>Data zgłoszenia</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {unassignedServices.map((service, index) => (
                    <TableRow key={index} style={{ background: assigning === index ? "#EFEFEF" : "" }}>
                        <TableCell>{service.carMake}</TableCell>
                        <TableCell>{service.carModel}</TableCell>
                        <TableCell>{new Date(service.date).toLocaleDateString()}</TableCell>
                        <TableCell style={{ width: "6rem" }}>
                            <Button onClick={() => (assigning === index) ? setAssigning(-1) : setAssigning(index)}>
                                {(assigning === index) ? "anuluj" : "przypisuj"}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {/* Przypisywanie mechanika */}

        {assigning !== -1 && <>
            <Typography variant="h6" style={{ marginTop: "1rem" }}>Przypisywanie mechanika</Typography>
            <p>Wymagania wybranej usługi: {unassignedServices[assigning].tags.join(", ")}</p>
            <Table size="small">
                <TableHead><TableRow>
                    <TableCell>Mechanik</TableCell>
                    <TableCell>Specjalizacje</TableCell>
                    <TableCell></TableCell>
                </TableRow></TableHead>
                <TableBody>
                    {availableMechanics.filter(m => {
                        for (let s of m.specializes) {
                            if (unassignedServices[assigning].tags.indexOf(s) !== -1)
                                return true;
                        }
                        return false;
                    }).map((m, index) => (
                        <TableRow key={index}>
                            <TableCell>{m.name}</TableCell>
                            <TableCell style={{ width: "70%" }}>{m.specializes.map((s, i) => (
                                <Chip key={i} label={s} style={{
                                    marginRight: ".5rem", marginBottom: ".2rem",
                                    background: (unassignedServices[assigning].tags.indexOf(s) !== -1)
                                        ? "#EEEEFF" : ""
                                }} />
                            ))}</TableCell>
                            <TableCell style={{ width: "5rem" }}>
                                <Button onClick={() => onAssignMechanic(m.id)}>
                                    przypisz
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>}
    </FoldingPaper>;
};