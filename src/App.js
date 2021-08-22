import * as React from "react";
import { Admin, Resource} from 'react-admin';

import {AuthProvider, RestProvider} from './lib';
import {MyLogoutButton} from './components'
import {
    Dashboard,
    NotificationList, NotificationShow,
    UserList, UserEdit, UserCreate,
    SimpleMenu
} from './models'

import AnnouncementIcon from '@material-ui/icons/Announcement';
import UserIcon from '@material-ui/icons/Group';
import PostIcon from '@material-ui/icons/Book';

// import {AnnouncementIcon,PostIcon, UserIcon} from '@material-ui/icons/Announcement';
// import UserIcon from '@material-ui/icons/Group';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7g7YOyd8nA3vbt96Xajnv_9BPzbxSqXk",
    authDomain: "transportationbermuda.firebaseapp.com",
    databaseURL: "https://transportationbermuda.firebaseio.com",
    projectId: "transportationbermuda",
    storageBucket: "transportationbermuda.appspot.com",
    messagingSenderId: "119896054784",
    appId: "1:119896054784:web:5591ed16d38fd7fd2bcce5",
    measurementId: "G-82141WYBBL"
};

const trackedResources = [
    { name: 'notifications', path: 'reports_test' },
    { name: 'app_users', path: 'tokens' },
    { name: 'owner_users', path: 'users' }
];

const authConfig = {
    userProfilePath: '/admin/',
    userAdminProp: 'is_admin'
};

const dataProvider = RestProvider(firebaseConfig, { trackedResources });

const App = () => (
    <Admin title="TB Admin" dashboard={Dashboard} authProvider={AuthProvider(authConfig)} dataProvider={dataProvider}  logoutButton={MyLogoutButton}>
        <Resource name="notifications" options={{ label: 'Notifications' }} list={NotificationList} show={NotificationShow} icon={AnnouncementIcon}/>
        {/* <Resource name="app_users" list={PostList} edit={PostEdit} create={PostCreate}  icon={PostIcon}/> */}
        <Resource name="owner_users" list={UserList} edit={UserEdit} icon={UserIcon}/>
         {/*  create={UserCreate}  */}
        <Resource name="test" list={SimpleMenu} icon={PostIcon} />
    </Admin>
);

export default App;
