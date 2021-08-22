import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error} from 'react-admin';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import PropTypes from 'prop-types';

function getTimestampFirstDayOfKey(datetype) {
    var date = new Date();
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    
    if (datetype === "month") {
        return Math.round(Number(date.valueOf() / 1000));
    } else {
        date.setMonth(0);
        return Math.round(Number(date.valueOf() / 1000));
    }
}

const getDateTime = (value, datetype) => {
    if (value === undefined) {
        return "";
    } else {
        const timestamp = new Date(value === undefined ? new Date() : value * 1000);
        var year = timestamp.getFullYear();
        var month = (1 + timestamp.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        
        // return timestamp.toLocaleString();
        if (datetype === "month")
            return timestamp.toLocaleDateString();
        else 
            return month + "/" + year;
    }
};

const DashChart = ({ datetype, selected, totalNumber }) => {

    const dataProvider = useDataProvider();
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        dataProvider('GET_LIST', 'notifications', {
            sort: { field: 'report_timestamp', order: 'ASC' },
            pagination: { page: 1, perPage: 10000000 },
        })
            .then(({ data, total }) => {
                totalNumber = total
                setTotal(total)
                setData(data);              
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    var chartData = [];
    if (loading) return <Loading />;
    if (error) return <Error />;

    var preDate = ""
    data.map(async answer => {
        if (!data || data.length === 0) {
            return;
        }

        if (answer.report_timestamp < getTimestampFirstDayOfKey(datetype)) {
            return;
        }

        const selDate = getDateTime(answer.report_timestamp, datetype);

        if (preDate === selDate) {
            chartData[chartData.length - 1].Notifications += 1;
        } else {
            chartData[chartData.length] = {
                name: selDate,
                Notifications  : 1
            };
            preDate = selDate;
        }
    });

    return (
        <ResponsiveContainer height={300} width='99%'>
            <AreaChart 
            // width={500} height={400} 
            data={chartData} margin={{ top: 10, right: 30, left: 30, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Notifications" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>  
        
    );
}

DashChart.propTypes = {
    datetype: PropTypes.string.isRequired,
    selectedValue: PropTypes.string,
};

export default DashChart;