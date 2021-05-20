import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CreateAccoutTokens, } from '../components/CreateAccountTokens';
import { CurrentServices, ServiceInterface } from '../components/CurrentServices';
import { UnassignedServices } from '../components/UnassignedServices';

interface Props {

};

interface ManagerDashboard {
    activeServiceRequests: Array<ServiceInterface>,
    unassignedServiceRequests: Array<ServiceInterface>,
    mechanics: Array<{ name: string, specializes: Array<string>; }>,
}

export const ManagerView: React.FC<Props> = (props) => {
    const [updating, setUpdating] = useState(true);
    const [dashboard, setDashboard] = useState<ManagerDashboard | null>(null);

    // TODO: useEffect wykonuje się 2 razy
    useEffect(() => {
        if (updating === false) return;
        axios("/api/manager/dashboard").then(response => {
            console.log(response.data);
            setDashboard(response.data.data);
            setUpdating(false);
        });
    }, [updating]);

    if (updating === true) return <h2>Ładowanie...</h2>;

    return <Container>
        <CurrentServices currentServices={dashboard!.activeServiceRequests} />
        <UnassignedServices
            availableMechanics={dashboard!.mechanics}
            unassignedServices={dashboard!.unassignedServiceRequests}
        />
        <CreateAccoutTokens />
    </Container>;
};
