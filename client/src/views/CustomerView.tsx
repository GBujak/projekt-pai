import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CarManagementComponent } from '../components/CarManagementComponent';
import { CurrentServices, ServiceInterface } from '../components/CurrentServices';
import { FinishedServices } from '../components/FinishedServices';
import { NewServiceComponent } from '../components/NewServiceComponent';

interface Props {

};

export interface Car {
    id: number,
    name: string,
    mileage: number,
}

interface CustomerDashboard {
    services: Array<ServiceInterface>,
    cars: Array<Car>,
}

export const CustomerView: React.FC<Props> = ({ }) => {
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState<CustomerDashboard | null>(null);

    const loadDashboard = () => {
        axios("/api/customer/dashboard").then(response => {
            console.log(response.data);
            setDashboard(response.data.data);
            if (loading === true)
                setLoading(false);
        });
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading === true) return <h2>Ładowanie...</h2>;

    return <Container style={{ paddingTop: "1rem" }}>
        <Typography variant="h5">Witaj kliencie.</Typography>
        <CarManagementComponent cars={dashboard!.cars} onChange={loadDashboard} />
        <NewServiceComponent cars={dashboard!.cars} onChange={loadDashboard} />
        <FinishedServices />
        <CurrentServices currentServices={dashboard!.services} />
    </Container>;
};
