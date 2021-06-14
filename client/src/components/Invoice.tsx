import { Button, Container, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { moneyFormat } from '../util/moneyFormat';
import { FoldingPaper } from './FoldingPaper';

export interface InvoiceItem {
    name: string,
    unit: string,
    ammount: number,
    cost: number,
    taxPercent: number,
}

export interface InvoiceParty {
    name: string,
    address: { address: string, postalCity: string, },
}

interface TaxTotal {
    nettoPrice: number,
    vatPrice: number,
    bruttoPrice: number,
}

interface Props {
    nr: string,
    date: Date,
    buyer: InvoiceParty,
    seller: InvoiceParty,
    sellerBankAccount: string,
    items: InvoiceItem[],
}

export const Invoice: React.FC<Props> = (props) => {
    const taxTotals: { [taxAmmount: string]: TaxTotal, } = {};
    const totalTax: TaxTotal = { nettoPrice: 0, vatPrice: 0, bruttoPrice: 0 };

    for (let item of props.items) {
        let tax = item.taxPercent;
        let nettoPrice = item.cost * item.ammount;
        let vatPrice = nettoPrice * item.taxPercent * 0.01;
        let bruttoPrice = nettoPrice + vatPrice;

        if (taxTotals[tax] === undefined) {
            taxTotals[tax] = { nettoPrice, vatPrice, bruttoPrice };
        } else {
            taxTotals[tax].nettoPrice += nettoPrice;
            taxTotals[tax].vatPrice += vatPrice;
            taxTotals[tax].bruttoPrice += bruttoPrice;
        }

        totalTax.nettoPrice += nettoPrice;
        totalTax.vatPrice += vatPrice;
        totalTax.bruttoPrice += bruttoPrice;
    }

    return <FoldingPaper startOpen title={`Faktura nr ${props.nr}`} subtitle={`Data wystawienia: ${props.date.toLocaleDateString()}`}>
        <Grid container spacing={3} style={{ margin: "1rem 0" }}>
            <Grid item xs={6}>
                <Typography variant="h6">Sprzedający</Typography>
                <p>{props.seller.name}</p>
                <p>{props.seller.address.address}</p>
                <p>{props.seller.address.postalCity}</p>
                <p>{`Konto bankowe sprzedającego: ${props.sellerBankAccount}`}</p>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6">Kupujący</Typography>
                <p>{props.buyer.name}</p>
                <p>{props.buyer.address.address}</p>
                <p>{props.buyer.address.postalCity}</p>
            </Grid>
            <Divider />

            <Grid item xs={12}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Lp</TableCell>
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Jednostka</TableCell>
                            <TableCell>Ilość</TableCell>
                            <TableCell>Cena netto</TableCell>
                            <TableCell>Podatek</TableCell>
                            <TableCell>Wartość netto</TableCell>
                            <TableCell>Wartość brutto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>{item.ammount}</TableCell>
                                <TableCell>{moneyFormat(item.cost)}</TableCell>
                                <TableCell>{`${item.taxPercent}%`}</TableCell>
                                <TableCell>{moneyFormat(item.cost * item.ammount)}</TableCell>
                                <TableCell>{moneyFormat(item.cost * item.ammount * (1.0 + item.taxPercent * 0.01))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>

            <Grid item xs={8}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Stawka VAT</TableCell>
                            <TableCell>Wartość netto</TableCell>
                            <TableCell>Kwota Vat</TableCell>
                            <TableCell>Wartość brutto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(taxTotals).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{`${key}%`}</TableCell>
                                <TableCell>{moneyFormat(value.nettoPrice)}</TableCell>
                                <TableCell>{moneyFormat(value.vatPrice)}</TableCell>
                                <TableCell>{moneyFormat(value.bruttoPrice)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>Razem</TableCell>
                            <TableCell>{moneyFormat(totalTax.nettoPrice)}</TableCell>
                            <TableCell>{moneyFormat(totalTax.vatPrice)}</TableCell>
                            <TableCell>{moneyFormat(totalTax.bruttoPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={4}>
                <p>Do zapłaty: {moneyFormat(totalTax.bruttoPrice)}</p>
                <p>Zapłacono: 0 zł</p>
            </Grid>
        </Grid>
        <Button variant="outlined">Opłać fakturę</Button>
    </FoldingPaper>;
};
