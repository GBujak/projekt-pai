import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';

interface Props {

}


export const Navigation: React.FC<Props> = (_) => {
    const history = useHistory();

    return <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    style={{
                        flexGrow: 1,
                        marginLeft: "1rem",
                        cursor: "pointer",
                    }}
                    onClick={() => history.push("/")}
                >
                    Warsztat
                </Typography>
                <Button color="inherit" onClick={(_) => history.push("/login")}>Login</Button>
            </Toolbar>
        </AppBar>
    </>;
};