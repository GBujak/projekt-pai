import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { FoldingPaper } from '../components/FoldingPaper';

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

        <Typography variant="h3">Serwis samochodowy</Typography>
        <img src="mechanik.jpg" style={{ width: "100%", height: "30vh", objectFit: 'cover', margin: '1rem 0' }}></img>
        <Typography variant="h3">Dlaczego my?</Typography>
        <ul>
            <li>Dobre ceny</li>
            <li>Staranny serwis</li>
            <li>Sprawdzanie stanu serwisu w aplikacji internetowej</li>
        </ul>
        <Typography variant="h3">Kontakt</Typography>

        <Typography variant='body1'>
            <span style={{ fontWeight: "bold" }}>Adres: </span>
            ul. Przykładowa 12/34 Warszawa
        </Typography>
        <Typography variant='body1'>
            <span style={{ fontWeight: "bold" }}>Nr. telefonu: </span>
            123 456 789
        </Typography>
        <Typography variant='body1'>
            <span style={{ fontWeight: "bold" }}>Adres email: </span>
            <a href="mailto: warsztat@example.com">warsztat@example.com</a>
        </Typography>

        <FoldingPaper title="Warsztat na mapie" style={{ margin: "2rem 0" }}>
            <img style={{ display: "block", width: "80%", margin: "2rem auto" }} src="mapa.png"></img>
        </FoldingPaper>

    </Container>;
};