import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';
import { AuthenticationContext } from '../auth/AuthenticationContext';

interface Props {

}

export const Navigation: React.FC<Props> = (_) => {
    const history = useHistory();
    const { auth } = useContext(AuthenticationContext);

    return <>
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" >
                    <MenuIcon />
                </IconButton>
                <div style={{ flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        style={{
                            display: "inline-block",
                            marginLeft: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => history.push("/")}
                    >
                        Serwis samochodowy {auth !== null && `(zalogowano jako ${auth.username})`}
                    </Typography>
                </div>
                <Button color="inherit" onClick={(_) => history.push("/login")}>{auth !== null ? "Wyloguj się" : "Zaloguj się"}</Button>
            </Toolbar>
        </AppBar>
    </>;
};