import { Container } from '@material-ui/core';
import React from 'react';
import { CurrentServices, ServiceInterface } from '../components/CurrentServices';
import { UnassignedServices } from '../components/UnassignedServices';

interface Props {

};

export const ManagerView: React.FC<Props> = (props) => {
    const currentServices: ServiceInterface[] = [
        { carMake: "Volkswagen", carModel: "Golf", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12"), state: 'not started' },
        { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Nowak", dateStarted: new Date("2020-04-12"), state: 'started' },
        { carMake: "Volkswagen", carModel: "Passat", assignedMechanic: "Jan Kowalski", dateStarted: new Date("2020-04-12"), state: 'finished' },
    ];

    const unassignedServices = [
        { carMake: "Deawoo", carModel: "Lanos", dateStarted: new Date("2021-01-02"), typeOfService: ['olej', 'opony'] },
        { carMake: "Daewoo", carModel: "Matiz", dateStarted: new Date("2021-01-01"), typeOfService: ['silnik', 'detale'] },
    ];

    const availableMechanics = [
        { name: "Jan Kowalski", specializes: ['opony', 'silnik'] },
        { name: "Jan Nowak", specializes: ['olej'] },
        { name: "Marian Kowalski", specializes: ['detale', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9'] },
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
