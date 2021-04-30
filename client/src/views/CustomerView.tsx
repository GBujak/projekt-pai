import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { CurrentServices } from '../components/CurrentServices';
import { FinishedServices } from '../components/FinishedServices';
import { ReviewService } from '../components/ReviewService';

interface Props {

};

export const CustomerView: React.FC<Props> = (props) => {

    return <Container style={{ paddingTop: "1rem" }}>
        <Typography variant="h5">Witaj kliencie.</Typography>
        <FinishedServices />
        <CurrentServices currentServices={[
            { assignedMechanic: 'Jan Nowak', carMake: 'Volkswagen', carModel: 'Golf', dateStarted: new Date(), state: 'started' },
            { assignedMechanic: 'Jan Nowak', carMake: 'Daewoo', carModel: 'Matiz', dateStarted: new Date('2020-05-14'), state: 'finished' }
        ]} />
    </Container>;
};
