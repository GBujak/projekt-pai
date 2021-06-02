import { FormControlLabel, Input, Radio, RadioGroup, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { CarMake } from './CarModelManagement';

interface Props {
    carMakes: Array<CarMake>,
    onChange: () => void,
}

export const NewCarModel: React.FC<Props> = ({ carMakes, onChange }) => {
    const [makeId, setMakeId] = useState("");
    const [modelName, setModelName] = useState("");
    const [modelVariant, setModelVariant] = useState("");

    const onSubmit = () => {
        axios.post("/api/car/new-model", {
            makeId: +makeId, modelName, modelVariant
        }).then(() => onChange());
    };

    return <>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <h5>Marka modelu</h5>
            <RadioGroup onChange={(e) => setMakeId(e.target.value)}>
                {carMakes.map(it => (
                    <FormControlLabel
                        value={it.id.toString()}
                        label={it.name}
                        control={<Radio />}
                    />
                ))}
            </RadioGroup>
            <TextField label="Nazwa modelu" value={modelName} onChange={(e) => setModelName(e.target.value)} />
            <TextField label="Wariant modelu" value={modelVariant} onChange={(e) => setModelVariant(e.target.value)} />
            <Input type="submit" value="zatwierdź" />
        </form>
    </>;
};