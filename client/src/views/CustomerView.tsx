import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { ReviewService } from '../components/ReviewService';

interface Props {

};

export const CustomerView: React.FC<Props> = (props) => {

    return <Container style={{ paddingTop: "1rem" }}>
        <Typography variant="h5">Witaj kliencie.</Typography>
        <ReviewService />
    </Container>;
};
