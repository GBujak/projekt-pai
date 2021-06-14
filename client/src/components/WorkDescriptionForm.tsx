import { Button, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { idText } from 'typescript';
import { moneyFormat } from '../util/moneyFormat';
import { NewUsedPart, NewWorkDescription } from './NewComment';

export interface PartForModel {
    id: number,
    name: string,
    price: number,
    ammountInStock: number,
}

interface Props {
    onCreate: (desc: NewWorkDescription) => void,
    partsForModel: Array<PartForModel>,
};

export const WorkDescriptionForm: React.FC<Props> = ({ onCreate, partsForModel }) => {
    const [name, setName] = useState("");
    const [hours, setHours] = useState("");

    const [usedParts, setUsedParts] = useState<Array<NewUsedPart>>([]);

    const [carPartId, setCarPartId] = useState("");
    const [ammount, setAmmount] = useState("");

    const onAddPart = () => {
        if (carPartId === "") return;
        if (+ammount === 0) return;

        let part = partsForModel.filter(it => it.id === +carPartId)[0];
        let newPart: NewUsedPart = {
            id: part.id,
            name: part.name,
            price: part.price,
            ammount: +ammount,
        };

        setUsedParts([...usedParts, newPart]);
    };

    const onAddWorkDescription = () => {
        if (name === "") return;
        if (hours === "" || isNaN(+hours)) return;

        const desc: NewWorkDescription = {
            name: name,
            hours: +hours,
            usedParts,
        };

        onCreate(desc);
    };

    return <div>
        {usedParts.length !== 0 && <>
            <h3>Użyte części</h3>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nazwa części</TableCell>
                        <TableCell>Cena części</TableCell>
                        <TableCell>Usuń część z opisu pracy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usedParts.map((part, index) => (
                        <TableRow key={index}>
                            <TableCell>{part.name}</TableCell>
                            <TableCell>{part.ammount}x{moneyFormat(part.price)}</TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" style={{ color: "red" }}
                                    onClick={() => {
                                        setUsedParts([
                                            ...usedParts.slice(0, index),
                                            ...usedParts.slice(index + 1, usedParts.length)
                                        ]);
                                    }}
                                >
                                    Usuń
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>}

        <form>
            <br />
            <TextField variant="outlined" label="Nazwa pracy"
                value={name} onChange={e => setName(e.target.value)} />
            <br /> <br />
            <TextField variant="outlined" type="number" label="Godziny pracy"
                value={+hours} onChange={e => setHours(e.target.value)} />
            <br /> <br />


            <h3>Dodawanie części do opisu pracy</h3>

            <Select native label="Marka" value={carPartId} style={{ height: "3rem", marginRight: "1rem" }}
                onChange={e => {
                    console.log(e);
                    setCarPartId(e.target.value as string);
                }}>
                <option aria-label="None" value="" />
                {partsForModel.map(it => (
                    <option key={it.id} value={it.id.toString()}>{it.name}</option>
                ))}
            </Select>

            <TextField type="number" label="ilość" style={{ height: "3rem" }}
                value={ammount} onChange={e => setAmmount(e.target.value)}
            />

            <br /> <br />

            <Button variant="outlined" size="small"
                onClick={() => onAddPart()}>
                Dodaj część
            </Button>
            <Button variant="outlined" size="small"
                onClick={() => onAddWorkDescription()}>
                Dodaj opis pracy
            </Button>
        </form>
    </div>;
};