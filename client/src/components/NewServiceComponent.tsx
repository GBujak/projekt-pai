import { FormControlLabel, Input, Radio, RadioGroup, TextareaAutosize, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Car } from '../views/CustomerView';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    cars: Array<Car>,
    onChange: () => void,
};

export const NewServiceComponent: React.FC<Props> = ({ cars, onChange }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [carId, setCarId] = useState("");
    const [msg, setMsg] = useState("");

    const onSubmit = () => {
        console.log({ title, description, carId });

        if (title === "") { setMsg("Podaj tytuł"); return; }
        if (description === "") { setMsg("Podaj opis"); return; }
        if (carId === "") { setMsg("Wybierz samochód"); return; }
        setMsg("");

        axios.post("/api/service-story/create", { title, description, carId })
            .then(() => onChange());
    };

    return <FoldingPaper title="Nowa usługa">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <TextField label="Tytuł" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField
                style={{ display: "block", margin: "1rem 0" }}
                fullWidth
                multiline label="Opis" value={description} onChange={e => setDescription(e.target.value)}
            />
            <h4>Dotyczy samochodu:</h4>
            <RadioGroup value={carId} onChange={e => setCarId(e.target.value)}>
                {cars.map(car => {
                    return <FormControlLabel
                        value={car.id.toString()}
                        control={<Radio />}
                        label={car.name}
                    />;
                })}
            </RadioGroup>
            <Input type="submit" value="Rozpocznij usługę" />
            {msg !== "" && <h3 style={{ color: 'red' }}>{msg}</h3>}
        </form>
    </FoldingPaper>;
};