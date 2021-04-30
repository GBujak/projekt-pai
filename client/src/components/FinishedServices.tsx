import { Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { FoldingPaper } from './FoldingPaper';
import { ReviewService } from './ReviewService';

interface Props {

}

interface FinishedService {
    finishedOn: Date,
    carMake: string,
}

export const FinishedServices: React.FC<Props> = (props) => {
    const finishedServices: FinishedService[] = [
        { finishedOn: new Date(), carMake: 'daewoo' },
        { finishedOn: new Date('2020-05-10'), carMake: 'volkswagen' },
    ];

    return <FoldingPaper title="Ukończone usługi" startOpen>
        <List>
            {finishedServices.map((service, index) => (<>
                <ListItem>
                    <ListItemText
                        primary={`Serwis samochodu ${service.carMake}`}
                        secondary={<div style={{ display: 'flex', justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <p style={{ flexGrow: 1 }}>{`Ukończono ${service.finishedOn.toLocaleDateString()}`}</p>
                            <Button variant="outlined" style={{ marginRight: '1rem' }}>Faktura</Button>
                            <ReviewService />
                        </div>}
                    />
                </ListItem>
                <Divider />
            </>))}
        </List>
    </FoldingPaper >;
};