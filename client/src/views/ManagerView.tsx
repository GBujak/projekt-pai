import { Button, Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CarModelManagement } from '../components/CarModelManagement';
import { CreateAccoutTokens, } from '../components/CreateAccountTokens';
import { CurrentServices, ServiceInterface } from '../components/CurrentServices';
import { NewPart } from '../components/NewPart';
import { UnassignedServices } from '../components/UnassignedServices';

interface Props {

};

interface ManagerDashboard {
    activeServiceRequests: Array<ServiceInterface>,
    unassignedServiceRequests: Array<ServiceInterface>,
    mechanics: Array<{ id: number, name: string, specializes: Array<string>; }>,
}

export const ManagerView: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState<ManagerDashboard | null>(null);

    const loadDashboard = () => {
        axios("/api/manager/dashboard").then(response => {
            console.log(response.data);
            setDashboard(response.data.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading === true) return <h2>Ładowanie...</h2>;

    return <Container>
        <CurrentServices currentServices={dashboard!.activeServiceRequests} />
        <CarModelManagement />
        <NewPart onChange={loadDashboard} />
        <UnassignedServices
            availableMechanics={dashboard!.mechanics}
            unassignedServices={dashboard!.unassignedServiceRequests}
            onAssignedService={() => loadDashboard()}
        />
        <CreateAccoutTokens />

        <Button variant="outlined" onClick={() => loadDashboard()}>Odśwież</Button>
    </Container>;
};
