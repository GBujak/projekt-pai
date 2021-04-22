import { Container } from '@material-ui/core';
import React from 'react';
import { CurrentServices } from '../components/CurrentServices';

interface Props {

};

export const ManagerView: React.FC<Props> = (props) => {

    return <Container>
        <p>Widok kierownika</p>
        <CurrentServices currentServices={[
            { carMake: "Volkswagen", carModel: "Golf", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12") },
            { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Nowak", dateStarted: new Date("2020-04-12") },
            { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12") },
        ]} />
    </Container>;
};
