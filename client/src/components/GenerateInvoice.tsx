import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    hasInvoice: boolean,
    serviceId: number,
}

export const GenerateInvoice: React.FC<Props> = ({ hasInvoice, serviceId }) => {
    const history = useHistory();

    const [buyer, setBuyer] = useState("");
    const [street, setStreet] = useState("");
    const [postalCity, setPostalCity] = useState("");

    const onGenerateInvoice = () => {
        axios.post("/api/invoice/generate", {
            serviceId,
            buyer,
            street,
            postalCity,
        }).then(res => {
            if (res.data.msg === "Ok") {
                history.push(`/faktura/dla-uslugi/${serviceId}`);
            } else {
                alert(res.data.msg);
            }
        });
    };

    if (hasInvoice) {
        return <Button variant="outlined" onClick={() => {
            history.push(`/faktura/dla-uslugi/${serviceId}`);
        }}>
            Otwórz fakturę
        </Button>;
    }

    return <FoldingPaper title="Generowanie faktury" startOpen>
        <br />
        <TextField variant="outlined" fullWidth style={{ display: "block", marginBottom: "1rem" }}
            label="Kupujący" value={buyer} onChange={e => setBuyer(e.target.value)}
        />
        <TextField variant="outlined" fullWidth style={{ display: "block", marginBottom: "1rem" }}
            label="Ulica i nr. domu" value={street} onChange={e => setStreet(e.target.value)}
        />
        <TextField variant="outlined" fullWidth style={{ display: "block", marginBottom: "1rem" }}
            label="Kod pocztowy i miasto" value={postalCity} onChange={e => setPostalCity(e.target.value)}
        />
        <Button variant="outlined" onClick={onGenerateInvoice}>
            Wygeneruj fakturę
        </Button>
    </FoldingPaper>;
};