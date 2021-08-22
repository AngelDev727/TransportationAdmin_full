import * as React from "react";
// import { Button } from "react-admin";
import { DashChart} from '../components'
import { 
    Card, CardContent, CardHeader,
    Button,
    MenuItem, Menu
} from '@material-ui/core';

// function getDateByKey(value) {
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = (1 + date.getMonth()).toString();
//     month = month.length > 1 ? month : '0' + month;

//     if (value === "monthly")
//         return month + "/" + year;
//     else 
//         return year;
// }

function getOptions(value) {
    
    var result = [];
    var date = new Date();
    var year = date.getFullYear();

    if (value  === "monthly") {
        for (let index = date.getMonth(); index >= 0; index--) {
            var month = index + 1;
            month = month > 9 ? month : '0' + month;
            result[result.length] = month + "/" + year;
        }
    } else {
        for (let index = year; index >= year - 3; index--) {
            result[result.length] = index;
        }
    }
    
    return result;
}

const optionsMonth = getOptions("monthly");
const optionsYear = getOptions("yearly");

export default function Dashboard() {
    const [selectedMonth, setSelectedMonth] = React.useState(0);
    const [selectedYear, setSelectedYear] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElYear, setAnchorElYear] = React.useState(null);

    const handleMenuItemClick = (event, index) => {
        setSelectedMonth(index);
        setAnchorEl(null);
    };

    const handleYearMenuItemClick = (event, index) => {
        setSelectedYear(index);
        setAnchorElYear(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleYearClick = (event) => {
        setAnchorElYear(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElYear(null);
    };

    return (
        <Card title="asdf">
            <CardHeader title="Welcome to the Admin panel" />
            <CardContent>Notifications per day this month:
                {/* <Button label={getDateByKey("monthly")} style={{ fontSize: 18 }}/> */}
                <Button aria-controls="simple-menu"  color="primary" aria-haspopup="true" style={{ fontSize: 16 }}  onClick={handleClick}>
                    {optionsMonth[selectedMonth]} 
                </Button>

                <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {optionsMonth.map((option, index) => (
                    <MenuItem key={option} /*disabled={index === 0}*/ selected={index === selectedMonth} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
            </CardContent>
    
            <DashChart datetype="month" selectedValue={optionsMonth[selectedMonth]} />
            
            <br />
            <CardContent>Notifications per day this year:
                {/* <Button label={getDateByKey("yearly")} style={{ fontSize: 18 }} /> */}
                <Button aria-controls="simple-menu"  color="primary" aria-haspopup="true" style={{ fontSize: 16 }}  onClick={handleYearClick}>
                    {optionsYear[selectedYear]} 
                </Button>

                <Menu id="lock-menu" anchorEl={anchorElYear} keepMounted open={Boolean(anchorElYear)} onClose={handleClose}>
                    {optionsYear.map((option, index) => (
                        <MenuItem key={option} /*disabled={index === 0}*/ selected={index === selectedYear} onClick={(event) => handleYearMenuItemClick(event, index)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            
            </CardContent>
            <DashChart datetype="year" selectedValue={optionsYear[selectedYear]}/>

        </Card>
    );
}

