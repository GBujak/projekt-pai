import { Button, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import "./styles/paperComponents.css";

export const FoldingPaper: React.FC<{ startOpen?: boolean; title: string; }> = ({ children, startOpen, title }) => {
    let [visible, setVisible] = useState(startOpen);

    return <Paper style={{ maxWidth: "900px", padding: "1rem" }}>
        <div className="paper-header-with-button">
            <Typography variant="h5">{title}</Typography>
            <Button onClick={() => setVisible(!visible)}>
                {visible ? "zwiń" : "rozwiń"}
            </Button>
        </div>
        {visible && children}
    </Paper>;
};