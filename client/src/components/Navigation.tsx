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
                        Serwis samochodowy
                    </Typography>
                </div>
                <Button color="inherit" onClick={(_) => history.push("/login")}>Login</Button>
            </Toolbar>
        </AppBar>
    </>;
};