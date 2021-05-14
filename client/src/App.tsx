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
    const [auth, setAuth] = useState<Authentication | null>(JSON.parse(localStorage.getItem("auth") || ""));

    // useEffect(() => {
    //     let auth: Authentication | null = JSON.parse(localStorage.getItem("auth") || "");
    //     setAuth(auth);
    // }, []);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthenticationContext.Provider value={{ auth, setAuth }}>
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
                        <Route path="/faktura/:id">
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
