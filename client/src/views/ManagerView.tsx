import { Container } from '@material-ui/core';
import React from 'react';
import { CurrentServices } from '../components/CurrentServices';
import { UnassignedServices } from '../components/UnassignedServices';

interface Props {

};

export const ManagerView: React.FC<Props> = (props) => {
    const currentServices = [
        { carMake: "Volkswagen", carModel: "Golf", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12") },
        { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Nowak", dateStarted: new Date("2020-04-12") },
        { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12") },
    ];

    const unassignedServices = [
        { carMake: "Deawoo", carModel: "Lanos", dateStarted: new Date("2021-01-02"), typeOfService: ['olej', 'opony'] },
    ];

    const availableMechanics = [
        { name: "Jan Kowalski", specializes: ['opony', 'silnik'] },
        { name: "Jan Nowak", specializes: ['olej'] }
    ];

    return <Container>
        <p>Widok kierownika</p>
        <CurrentServices currentServices={currentServices} />
        <UnassignedServices
            availableMechanics={availableMechanics}
            unassignedServices={unassignedServices}
        />
    </Container>;
};
