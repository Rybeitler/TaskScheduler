import React from 'react';
import useAuth from '../hooks/useAuth';

const UserDashboard = () => {
    //placeholder to test w/
    //user is stored in auth, can import with useAuth() hook for ease of use
    // the? after auth and user are conditional chaining. they basically check for,
    //1st val before they try to render, stops api from crashing app
    const {auth} = useAuth()
    return (
        <div>
            <h1>Hi {auth?.user?.role}, {auth?.user?.firstName}</h1>
        </div>
    );
}

export default UserDashboard;
