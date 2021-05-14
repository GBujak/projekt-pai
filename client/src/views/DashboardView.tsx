import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthenticationContext } from '../auth/AuthenticationContext';
import { AdminView } from './AdminView';
import { CustomerView } from './CustomerView';
import { ManagerView } from './ManagerView';
import { WorkerView } from './WorkerView';

interface Props {

};

export const DashboardView: React.FC<Props> = ({ }) => {
    const { auth } = useContext(AuthenticationContext);
    const history = useHistory();

    useEffect(() => {
        if (auth === null) history.push("/login");
    }, []);

    let result = <></>;
    if (auth === null) return result;

    switch (auth!.accountType) {
        case "customer":
            result = <CustomerView />;
            break;
        case "mechanic":
            result = <WorkerView />;
            break;
        case "manager":
            result = <ManagerView />;
            break;
        case "admin":
            result = <AdminView />;
            break;
    }

    return result;
};