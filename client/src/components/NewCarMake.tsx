import { Input } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';

interface Props {
    onChange: () => void,
}

export const NewCarMake: React.FC<Props> = ({ onChange }) => {
    const [makeName, setMakeName] = useState("");

    const onSubmit = () => {
        axios.post("/api/car/new-make", { makeName })
            .then(() => onChange());
    };

    return <>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <Input type="text" value={makeName} onChange={(e) => setMakeName(e.target.value)} />
            <Input type="submit" value="zatwierdź" />
        </form>
    </>;
};