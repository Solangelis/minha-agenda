import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
    return (
        <AppBar position="static" style={{ backgroundColor: '#C1392B' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My Application
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/agenda">
                    Agenda
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;