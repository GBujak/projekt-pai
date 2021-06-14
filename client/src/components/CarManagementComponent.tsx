import { Button, Input, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Car } from '../views/CustomerView';
import { CarInfo } from './CarModelManagement';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    cars: Array<Car>,
    carInfo: CarInfo,
    onChange: () => void,
}

export const CarManagementComponent: React.FC<Props> = ({ cars, onChange, carInfo }) => {

    const [productionYear, setProductionYear] = useState("2000");
    const [mileage, setMileage] = useState("10000");
    const [makeId, setMakeId] = useState("");
    const [modelId, setModelId] = useState("");

    const [message, setMessage] = useState("");

    const onSubmit = () => {

        if (makeId === "") {
            setMessage("Wybierz markę samochodu");
            return;
        }

        if (modelId === "") {
            setMessage("Wybierz model samochodu");
            return;
        }

        setMessage("");

        axios.post("/api/customer/add-car", {
            productionYear: +productionYear,
            mileage: +mileage,
            modelId: +modelId,
            makeId: +makeId,
        }).then(() => onChange());
    };

    return <FoldingPaper title="Zarządzanie samochodami">

        {cars.length !== 0 &&
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Samochód</TableCell>
                        <TableCell>Przebieg</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map(car => {
                        return <TableRow key={car.id}>
                            <TableCell>{car.name}</TableCell>
                            <TableCell>{car.mileage}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>
        }

        <h3 style={{ marginTop: "2rem" }}>Dodaj nowy samochód:</h3>
        <form>

            <p>Rok produkcji</p>
            <Input type="number" value={productionYear} onChange={e => setProductionYear(e.target.value)} />
            <br />

            <p>Przebieg</p>
            <Input type="number" value={mileage} onChange={e => setMileage(e.target.value)} />
            <br />

            <p>Marka samochodu</p>
            <Select native label="Marka" value={makeId} onChange={e => {
                console.log(e);
                setMakeId(e.target.value as string);
            }}>
                <option aria-label="None" value="" />
                {carInfo!.carInfo.map(it => (
                    <option key={it.id} value={it.id.toString()}>{it.name}</option>
                ))}
            </Select>
            <br />

            {makeId !== "" &&
                <>
                    <p>Model samochodu</p>
                    <Select native label="Marka" value={modelId} onChange={e => setModelId(e.target.value as string)}>
                        <option aria-label="None" value="" />
                        {carInfo!.carInfo.filter(it => it.id === +makeId)[0].carModels.map(it => (
                            <option key={it.id} value={it.id.toString()}>{it.name} {it.variant}</option>
                        ))}
                    </Select>
                    <br />
                </>
            }

            {message !== "" && <h4 style={{ color: "red" }}>Błąd: {message}</h4>}

            <Button
                onClick={e => { e.preventDefault(); onSubmit(); }}
                variant="outlined" style={{ display: "inline-block", marginTop: "1rem" }} >
                Dodaj samochód
            </Button>
        </form>
    </FoldingPaper>;
};