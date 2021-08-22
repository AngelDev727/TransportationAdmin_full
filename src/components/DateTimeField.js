import React from 'react';
import PropTypes from 'prop-types';

const getDateTime = value => {
    if (value === undefined) {
        return "";
    } else {
        const timestamp = new Date(value === undefined ? new Date() : value * 1000);
        return timestamp.toLocaleString();
    }
    
};
const DateTimeField = ({ source, record = {} }) => <span>{getDateTime(record[source])}</span>;

DateTimeField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default DateTimeField;