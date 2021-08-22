import React from 'react';
import {
  List, Datagrid, TextField,
  Show, SimpleShowLayout, SimpleList,
  DeleteButton, TopToolbar
} from 'react-admin';
import { useMediaQuery} from '@material-ui/core';
import {DateTimeField} from '../components'


export const NotificationList = (props) => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} sort={{ field: 'report_timestamp', order: 'DESC' }}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.report_title}
                    secondaryText={record => `${record.report_content} views`}
                    tertiaryText={record => new Date(record.report_timestamp * 1000).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField label="Title" source="report_title" />
                    <TextField label="Content" source="report_content" />
                    <DateTimeField label='Date' source='report_timestamp' />
                    <TextField label='Sender Name' source='sender_name'/>
                    <DeleteButton label='Delete'/>
                </Datagrid>
            )}
        </List>
    )
};


const CustomShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        {/* <EditButton basePath={basePath} record={data} /> */}
        <DeleteButton undoable={false} basePath={basePath} record={data} resource={resource}/>
    </TopToolbar>
);

export const NotificationShow = props => (
  <Show actions={<CustomShowActions />} {...props}>
    <SimpleShowLayout>
        <TextField label="Title" source="report_title" />
        <TextField label="Content" source="report_content" />
        <DateTimeField label="Date" source="report_timestamp" />
        {/* <DeleteButton basePath={props.basePath} record={props.record} resource={props.resource}/> */}
    </SimpleShowLayout>
  </Show>
);

