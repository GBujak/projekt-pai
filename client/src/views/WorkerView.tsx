import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChipEditor } from '../components/ChipEditor';
import { CurrentServices, ServiceInterface } from '../components/CurrentServices';

interface Props {

};

interface MechanicDashboard {
    unassigned: Array<ServiceInterface>,
    assigned: Array<ServiceInterface>,
    specializations: Array<string>,
}

export const WorkerView: React.FC<Props> = (props) => {

    const [dashboard, setDashboard] = useState<MechanicDashboard | null>(null);

    const loadDashboard = () => {
        axios.post("/api/mechanic/dashboard", {}).then(res => {
            setDashboard(res.data.data);
        });
    };

    const onChangeSpecializations = (newSpecializations: Array<string>) => {
        axios.post("/api/mechanic/change-specializations", {
            newSpecializations
        }).then(() => loadDashboard());
    };

    useEffect(() => loadDashboard(), []);

    if (dashboard === null) return <h2>Ładowanie...</h2>;

    console.log(dashboard);
    return <Container>
        <h2>Specjalizacje</h2>
        <ChipEditor title="Specjalizacje" chips={dashboard.specializations}
            editable onChange={newChips => onChangeSpecializations(newChips)} />
        <h2>Nieprzypisane usługi</h2>
        <CurrentServices currentServices={dashboard!.unassigned} />
        <h2>Usługi przypisane do Ciebie</h2>
        <CurrentServices currentServices={dashboard!.assigned} />
    </Container>;
};
