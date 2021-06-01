import { Input, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Car } from '../views/CustomerView';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    cars: Array<Car>,
    onChange: () => void,
}

export const CarManagementComponent: React.FC<Props> = ({ cars, onChange }) => {
    const onSubmit = (data: any) => {
        axios.post("/api/customer/add-car", data).then(() => onChange());
    };

    const { register, handleSubmit } = useForm();

    const fields = [
        { name: "makeName", label: "Marka samochodu" },
        { name: "modelName", label: "Model samochodu" },
        { name: "productionYear", label: "Rok produkcji", type: "number" },
        { name: "mileage", label: "Przebieg", type: "number" },
        { name: "modelVariant", label: "Wariant modelu" },
    ];

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
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((val, index) => {
                const { ref, ...rest } = register(val.name);
                return <TextField
                    key={index}
                    {...val}
                    inputRef={ref} {...rest}
                    style={{ display: "inline-block", margin: ".2rem" }}
                />;
            })}
            <br></br>
            <Input type="submit" value="Dodaj samochód" style={{ display: "inline-block", marginTop: "1rem" }} />
        </form>
    </FoldingPaper>;
};