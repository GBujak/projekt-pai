import { Button, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    unassignedServices: Array<{
        carMake: string,
        carModel: string,
        dateStarted: Date,
        typeOfService: Array<string>,
    }>,
    availableMechanics: Array<{
        name: string,
        specializes: Array<string>,
    }>,
}

export const UnassignedServices: React.FC<Props> = ({ unassignedServices, availableMechanics }) => {
    const [assigning, setAssigning] = useState(-1);

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
                        <TableCell>{service.dateStarted.toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button onClick={() => setAssigning(index)}>
                                przypisuj
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        {assigning !== -1 && <>
            <Typography variant="h6" style={{ marginTop: "1rem" }}>Przypisywanie mechanika</Typography>
            <p>Wymagania wybranej usługi: {unassignedServices[assigning].typeOfService.join(", ")}</p>
            <Table size="small">
                <TableHead><TableRow>
                    <TableCell>Mechanik</TableCell>
                    <TableCell>Specjalizacje</TableCell>
                    <TableCell></TableCell>
                </TableRow></TableHead>
                <TableBody>
                    {availableMechanics.filter(m => {
                        for (let s of m.specializes) {
                            if (unassignedServices[assigning].typeOfService.indexOf(s) !== -1)
                                return true;
                        }
                        return false;
                    }).map((m, index) => (
                        <TableRow key={index}>
                            <TableCell>{m.name}</TableCell>
                            <TableCell>{m.specializes.map((s, i) => (
                                <Chip key={i} label={s} style={{
                                    marginRight: ".5rem",
                                    background: (unassignedServices[assigning].typeOfService.indexOf(s) !== -1)
                                        ? "#EEEEFF" : ""
                                }} />
                            ))}</TableCell>
                            <TableCell style={{ width: "5rem" }}>
                                <Button>przypisz</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>}
    </FoldingPaper>;
};