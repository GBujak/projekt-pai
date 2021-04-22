import { Button, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import "./styles/paperComponents.css";

export const FoldingPaper: React.FC<{ startOpen?: boolean, subtitle?: string, title: string, }> = ({ children, startOpen, title, subtitle }) => {
    let [visible, setVisible] = useState(startOpen);

    return <Paper style={{ maxWidth: "900px", padding: "1rem", marginBottom: "1rem" }}>
        <div className="paper-header-with-button">
            <div className="display-inline-block-div">
                <Typography variant="h5">{title}</Typography>
                {subtitle !== null && <Typography variant="body1">{subtitle}</Typography>}
            </div>
            <Button onClick={() => setVisible(!visible)}>
                {visible ? "zwiń" : "rozwiń"}
            </Button>
        </div>
        {visible && children}
    </Paper>;
};