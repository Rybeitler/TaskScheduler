import React from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    //placeholder to test w/
    //user is stored in auth, can import with useAuth() hook for ease of use
    // the? after auth and user are conditional chaining. they basically check for,
    //1st val before they try to render, stops api from crashing app

    const navigate = useNavigate();

    return (
        <div>
            <header>
                <Nav />
            </header>
        </div>
    );
}

export default UserDashboard;
