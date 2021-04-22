import { Container } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const IndexView: React.FC = () => {
    return <Container>
        <h2>Linki do interfejsów:</h2>
        <ul>
            <li><Link to="/klient">klient</Link></li>
            <li><Link to="/pracownik">pracownik</Link></li>
            <li><Link to="/kierownik">kierownik</Link></li>
            <li><Link to="/admin">admin</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/rejestracja">rejestracja</Link></li>
            <li><Link to="/historia/1">historia serwisu</Link></li>
        </ul>
    </Container>;
};