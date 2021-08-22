import * as React from "react";
import {DashChart} from '../components'

import { Card, CardContent, CardHeader, Button, MenuItem, Menu} from '@material-ui/core';



const options = [
    'Profile',
    'My account',
    'Logout',
    'Hide content',
];

export default function SimpleMenu() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card>

            <CardHeader title="Testing panel" />
            <CardContent>Notifications per day this month:
            <Button /*aria-controls="simple-menu"*/  aria-haspopup="true" style={{ fontSize: 16 }}  onClick={handleClick}>
                {options[selectedIndex]} 
            </Button>

            <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {options.map((option, index) => (
                <MenuItem key={option} /*disabled={index === 0}*/ selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
            
            </CardContent>
            <DashChart datetype="month" />


            <CardContent>Notifications per day this year:<Button label="123" style={{ fontSize: 18 }} /></CardContent>
            <DashChart datetype="year"/>

        </Card>
    );
}