import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AdminView } from './views/AdminView';
import { CustomerView } from './views/CustomerView';
import { IndexView } from './views/IndexView';
import { LoginView } from './views/LoginView';
import { ManagerView } from './views/ManagerView';
import { RegisterView } from './views/RegisterView';
import { ServiceHistoryView } from './views/ServiceHistoryView';
import { WorkerView } from './views/WorkerView';

function App() {
    return (
        <div className="App">
            {/* Czcionki Roboto potrzebne do Material-ui */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

            <Router>
                <Navigation />

                <Switch>
                    <Route path="/klient">
                        <CustomerView />
                    </Route>
                    <Route path="/pracownik">
                        <WorkerView />
                    </Route>
                    <Route path="/kierownik">
                        <ManagerView />
                    </Route>
                    <Route path="/admin">
                        <AdminView />
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
                    <Route path="/">
                        <IndexView />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
