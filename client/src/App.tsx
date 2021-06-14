import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Authentication, AuthenticationContext, AuthInterface } from './auth/AuthenticationContext';
import { Navigation } from './components/Navigation';
import { AdminView } from './views/AdminView';
import { CustomerView } from './views/CustomerView';
import { DashboardView } from './views/DashboardView';
import { IndexView } from './views/IndexView';
import { InvoiceView } from './views/InvoiceView';
import { LoginView } from './views/LoginView';
import { ManagerView } from './views/ManagerView';
import { RegisterView } from './views/RegisterView';
import { ServiceHistoryView } from './views/ServiceHistoryView';
import { WorkerView } from './views/WorkerView';

function App() {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState<Authentication | null>(null);

    const onSetAuth = (auth: Authentication | null) => {
        if (auth !== null) {
            axios.defaults.headers['Authorization'] = "Bearer " + auth.token;
        } else {
            axios.defaults.headers['Authorization'] = "";
        }
        setAuth(auth);
    };

    useEffect(() => {
        let auth: Authentication | null = JSON.parse(localStorage.getItem("auth") || "null");
        onSetAuth(auth);
        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    if (loading === true) return <></>;

    return (
        <AuthenticationContext.Provider value={{ auth, setAuth: onSetAuth }}>
            <div className="App">
                {/* Czcionki Roboto potrzebne do Material-ui */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

                <Router>
                    <Navigation />
                    <Switch>
                        <Route path="/dashboard">
                            <DashboardView />
                        </Route>
                        <Route path="/login">
                            <LoginView />
                        </Route>
                        <Route path="/rejestracja">
                            <RegisterView />
                        </Route>
                        <Route path="/historia/:id">
                            <ServiceHistoryView />
                        </Route>
                        <Route path="/faktura/dla-uslugi/:id">
                            <InvoiceView />
                        </Route>
                        <Route path="/">
                            <IndexView />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </AuthenticationContext.Provider>
    );
}

export default App;
