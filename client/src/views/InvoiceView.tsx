import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Invoice } from '../components/Invoice';

interface Props {

}

export interface InvoiceRest {
    nr: string,
    date: string,
    buyer: string,
    street: string,
    postalCity: string,
    items: Array<InvoiceItemRest>,
}

export interface InvoiceItemRest {
    name: string,
    cost: number,
    ammount: number,
    unit: string,
    taxPercent: number,
    type: string,
}

export const InvoiceView: React.FC<Props> = (props) => {
    const route_params = useParams<{ id: string; }>();
    const serviceId = +route_params.id;

    const [loading, setLoading] = useState(true);
    const [invoiceData, setInvoiceData] = useState<InvoiceRest | null>(null);

    const loadInvoiceData = () => {
        axios.post("/api/invoice/get", { serviceId }).then(res => {
            if (res.data.msg !== "Ok") {
                alert(res.data.msg);
                return;
            }
            setInvoiceData(res.data.data);
            setLoading(false);
        });
    };

    useEffect(() => loadInvoiceData(), []);

    if (loading) return <h2>Ładowanie...</h2>;

    const inv = invoiceData!;
    return <Container>
        <Invoice
            nr={inv.nr}
            date={new Date(inv.date)}
            buyer={{ name: inv.buyer, address: { address: inv.street, postalCity: inv.postalCity } }}
            seller={{ name: "Serwis samochodowy", address: { address: 'Sienkiewicza 4', postalCity: '12-351 Kielce' } }}
            sellerBankAccount="1294 0124 912 49012"
            items={inv.items}
        />
    </Container>;
};