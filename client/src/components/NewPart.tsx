import { Button, FormControlLabel, Input, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CarInfo, CarMake, CarModel } from './CarModelManagement';
import { FoldingPaper } from './FoldingPaper';


interface Props {
    onChange: () => void,
}

export const NewPart: React.FC<Props> = ({ onChange }) => {
    const [loading, setLoading] = useState(true);
    const [carInfo, setCarInfo] = useState<CarInfo | null>(null);

    const loadCarInfo = () => {
        axios.get("/api/car/info").then((data) => {
            setCarInfo(data.data.data);
            if (loading) setLoading(false);
        });
    };

    useEffect(() => loadCarInfo(), []);

    const [makeId, setMakeId] = useState("");
    const [modelId, setModelId] = useState("");
    const [partName, setPartName] = useState("");
    const [price, setPrice] = useState(0);
    const [ammount, setAmmount] = useState(0);
    const [selectedModels, setSelectedModels] = useState<CarModel[]>([]);

    const onRemoveModel = (index: number) => {
        setSelectedModels([
            ...selectedModels.slice(0, index),
            ...selectedModels.slice(index + 1, selectedModels.length)
        ]);
    };

    const onAddModel = () => {
        let model = carInfo!.carInfo
            .filter(it => it.id === +makeId)[0].carModels
            .filter(it => it.id === +modelId)[0];

        for (let m of selectedModels) {
            if (m === model) return;
        }

        setSelectedModels(
            [...selectedModels, model]
        );
    };

    const onSubmit = () => {
        axios.post("/api/car-part/create", {
            name: partName,
            price: Math.floor(price * 100),
            ammountInStock: Math.floor(ammount),
            carModels: selectedModels.map(it => it.id),
        });
    };

    if (loading) return <h3>Ładowanie...</h3>;

    return <FoldingPaper title="Zarządzanie częściami">
        <Table>
            <TableHead><TableRow>
                <TableCell>Część pasuje do modelu</TableCell>
                <TableCell>Usuń</TableCell>
            </TableRow></TableHead>
            <TableBody>
                {selectedModels.map((it, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {it.name} {it.variant}
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" style={{ color: "red" }}
                                onClick={() => onRemoveModel(index)}>Usuń</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <Select native label="Marka" value={makeId} onChange={e => {
                console.log(e);
                setMakeId(e.target.value as string);
            }}>
                <option aria-label="None" value="" />
                {carInfo!.carInfo.map(it => (
                    <option key={it.id} value={it.id.toString()}>{it.name}</option>
                ))}
            </Select>

            {makeId !== "" &&
                <Select native label="Marka" value={modelId} onChange={e => setModelId(e.target.value as string)}>
                    <option aria-label="None" value="" />
                    {carInfo!.carInfo.filter(it => it.id === +makeId)[0].carModels.map(it => (
                        <option key={it.id} value={it.id.toString()}>{it.name} {it.variant}</option>
                    ))}
                </Select>
            }

            <Button size="small" variant="outlined" onClick={() => onAddModel()}>
                Dodaj model
            </Button>

            <br />

            <TextField label="Nazwa części" type="text" value={partName} onChange={e => setPartName(e.target.value)} />
            <br />
            <TextField label="Cena części" type="number" value={price} onChange={e => setPrice(+(e.target.value))} />
            <br />
            <TextField label="Ilość na magazynie" type="number" value={ammount} onChange={e => setAmmount(+(e.target.value))} />
            <br />

            <Input type="submit" value="zatwierdź" />
        </form>
    </FoldingPaper>;
};