import { Button, Container, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthenticationContext } from '../auth/AuthenticationContext';

interface Props {

};

export const LoginView: React.FC<Props> = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { auth, setAuth } = useContext(AuthenticationContext);
    const history = useHistory();

    useEffect(() => { if (auth !== null) setAuth(null); }, []);

    const onLogin = () => {
        const user = axios.post("/api/auth/login", { username, password })
            .then((response) => {
                setAuth(response.data);
                history.push("/dashboard");
            });
    };

    return <Container>
        <h2>Logowanie</h2>
        <TextField label="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
        <br />
        <br />
        <TextField type="password" label="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
        <br />
        <br />
        <Button variant="outlined" onClick={onLogin}>Zaloguj się</Button>
    </Container>;
};
