import { Button, InputLabel, NativeSelect, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FoldingPaper } from './FoldingPaper';
import { accountTypeDescription } from './ServiceHistoryElement';

interface NewToken {
    email: string,
    expires: Date,
    accountType: 'mechanic' | 'manager',
}

interface TokenRest {
    tokenValue: string,
    expiresOn: number,
    email: string,
    grantedAuthority: string,
}

export const CreateAccoutTokens: React.FC = (_props) => {
    const [tokens, setTokens] = useState<NewToken[]>([]);

    const [activeTokens, setActiveTokens] = useState<TokenRest[]>([]);

    const [email, setEmail] = useState("");
    const [accountType, setAccountType] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [error, setError] = useState("");

    const handleAdd: React.MouseEventHandler = (_ev) => {
        let expires = new Date(expirationDate);
        if (expires.getTime() !== expires.getTime()) {
            setError("Niepoprawna data!");
            return;
        } else {
            setError("");
        }
        if (accountType === "") {
            setError("Wybierz rodzaj konta!");
            return;
        } else {
            setError("");
        }
        let acType: 'mechanic' | 'manager' = 'mechanic';
        if (accountType === "manager") acType = 'manager';
        setTokens([...tokens, { email, accountType: acType, expires: new Date(expirationDate) }]);
    };

    const loadActiveTokens = () => {
        axios.post("/api/token-register/get-tokens").then(res => {
            setActiveTokens(res.data.data);
        });
    };

    useEffect(() => loadActiveTokens(), []);

    const onSend = () => {
        axios.post("/api/token-register/create-tokens", {
            newTokens: tokens.map(it => {
                return {
                    email: it.email,
                    grantedAuthority: it.accountType,
                    expiresOn: it.expires.getTime(),
                };
            })
        }).then(() => {
            loadActiveTokens();
        });
    };

    return <FoldingPaper title="Tworzenie kont pracowników" startOpen>

        <h3>Aktywne tokeny</h3>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Kod tokena</TableCell>
                    <TableCell>Wygasa</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Tworzy konto</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {activeTokens.map(it => (
                    <TableRow key={it.tokenValue}>
                        <TableCell>{it.tokenValue}</TableCell>
                        <TableCell>{new Date(it.expiresOn).toLocaleDateString()}</TableCell>
                        <TableCell>{it.email}</TableCell>
                        <TableCell>{(accountTypeDescription as any)[it.grantedAuthority]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <br /> <br />

        {tokens.length !== 0 && <Table size="small">
            <TableHead>
                <TableCell>Email</TableCell>
                <TableCell>Data wygaśnięcia</TableCell>
                <TableCell>Rodzaj konta</TableCell>
                <TableCell>Usuń</TableCell>
            </TableHead>
            <TableBody>
                {tokens.map((token, index) => (
                    <TableRow key={index}>
                        <TableCell>{token.email}</TableCell>
                        <TableCell>{token.expires.toLocaleDateString()}</TableCell>
                        <TableCell>{token.accountType === 'mechanic' ? 'Mechanik' : 'Kierownik'}</TableCell>
                        <TableCell><Button onClick={() => {
                            setTokens([...tokens.slice(0, index), ...tokens.slice(index + 1, tokens.length)]);
                        }}>Usuń</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>}
        <div style={{ margin: "1rem 0" }}>
            <TextField
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                label="Email"
            />
            <div style={{ display: 'inline-block', marginLeft: "2rem" }}>
                <InputLabel htmlFor="account-type">Rodzaj konta</InputLabel>
                <NativeSelect
                    id="account-type"
                    style={{ minWidth: "10rem" }}
                    onChange={(ev) => setAccountType(ev.target.value as string)}
                >
                    <option value="">-- wybierz --</option>
                    <option value="mechanic">Mechanik</option>
                    <option value="manager">Kierownik</option>
                </NativeSelect>
            </div>
            <TextField
                style={{ marginLeft: "2rem" }}
                value={expirationDate}
                onChange={(ev) => setExpirationDate(ev.target.value)}
                label="Data wygaśnięcia"
            />
            <Button
                style={{ marginLeft: '2rem' }}
                onClick={handleAdd}
            >
                Dodaj
            </Button>
        </div>
        {error !== "" && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="outlined" onClick={() => onSend()}>
            wyślij tokeny
        </Button>
    </FoldingPaper>;
};