import { Button, Checkbox, TextField } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';

interface Props {

}

export const RegisterComponent: React.FC<Props> = ({ }) => {
    const [tokenValue, setTokenValue] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");

    const [tokenRegister, setTokenRegister] = useState(false);

    const [message, setMessage] = useState("");

    const onRegister = () => {
        let promise: Promise<AxiosResponse<any>>;

        if (tokenRegister) {
            promise = axios.post("/api/token-register/register", {
                tokenValue,
                username,
                password,
                name,
                phoneNumber,
                address: {
                    city, street, houseNumber: +houseNumber
                }
            });
        } else {
            promise = axios.post("/api/auth/register", {
                username,
                password,
                name,
                phoneNumber,
                address: {
                    city, street, houseNumber: +houseNumber
                }
            });
        };

        promise.then(res => {
            if (res.data.msg !== "Ok") setMessage(res.data.msg);
            else setMessage("Stworzono konto, zaloguj się");
        });
    };

    return <div>
        <h2>Rejestracja</h2>

        {message !== "" && <h3>{message}</h3>}

        <Checkbox checked={tokenRegister} onChange={e => setTokenRegister(e.target.checked)} />
        <p style={{ display: "inline" }}>Rejestracja pracownika</p>

        <br /> <br />
        <TextField variant="outlined" label="login" value={username} onChange={e => setUsername(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="hasło" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="imię" value={name} onChange={e => setName(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="nr telefonu" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="miasto" value={city} onChange={e => setCity(e.target.value)} />
        <br /> <br />
        <TextField variant="outlined" label="ulica" value={street} onChange={e => setStreet(e.target.value)} />
        <br /> <br />
        <TextField type="number" variant="outlined" label="nr domu" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} />

        {tokenRegister && <>
            <br /> <br />
            <TextField variant="outlined" label="token" value={tokenValue} onChange={e => setTokenValue(e.target.value)} />
        </>}

        <br /> <br />
        <Button variant="outlined" onClick={() => onRegister()}>
            Stwórz konto
        </Button>
    </div>;
};