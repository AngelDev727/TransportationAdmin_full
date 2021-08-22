import * as React from "react";
import { 
    List, Datagrid, SimpleList, TextField, EmailField,
    SimpleForm, Create, TextInput, Edit,
    EditButton
} from 'react-admin';
import { useMediaQuery} from '@material-ui/core';
import {DateTimeField} from '../components'

export const UserList = (props) => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.user_name}
                    secondaryText={record => `${record.user_email} views`}
                    tertiaryText={record => new Date(record.created_timestamp * 1000).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="user_name" />
                    <EmailField source="user_email" />
                    <DateTimeField label='Created Date' source="created_timestamp" />
                    {/* <EditButton label="Edit"/> */}
                </Datagrid>
            )}
        </List>
    )
};


const EditTitle = ({ record }) => {
    return <span>Edit {record ? `"${record.user_name}"` : ''}</span>;
};

export const UserEdit = props => (
    <Edit title={<EditTitle />} {...props}>
        <SimpleForm>
            <TextInput source="user_name" />
            <TextInput source="user_email" />
            <TextInput disabled hidden={true} label="Created" source="created_timestamp" defaultValue={new Date()}/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="user_name" />
            <TextInput source="user_email" />
            <TextInput source="user_password" />
        </SimpleForm>
    </Create>
);