import { Container } from '@material-ui/core';
import React from 'react';
import { Invoice } from '../components/Invoice';

interface Props {

}

export const InvoiceView: React.FC<Props> = (props) => {

    return <Container>
        <Invoice
            nr="FV 1/2021"
            date={new Date()}
            buyer={{ name: "Janex sp. z o.o.", nip: 124124125, address: { address: 'Sienkiewicza 34', postalCode: '31-125', city: 'Kielce' } }}
            seller={{ name: "Serwis samochodowy", nip: 2194094, address: { address: 'Sienkiewicza 4', postalCode: '12-351', city: 'Kielce' } }}
            sellerBankAccount="1294 0124 912 49012"
            items={[
                { name: 'polerowanie zadrapania', unit: 'godzina', ammount: 1, nettoPriceItem: 50, taxPercent: 5 },
                { name: 'olej Castrol 1 litr', unit: 'szt.', ammount: 1, nettoPriceItem: 80, taxPercent: 23 },
                { name: 'zakrętka', unit: 'szt.', ammount: 5, nettoPriceItem: 5, taxPercent: 23 },
            ]}
        />
    </Container>;
};