import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import './dashboard.css'


const ManagerDashboard = () => {
    //placeholder to test w/
    //user is stored in auth, can import with useAuth() hook for ease of use
    // the? after auth and user are conditional chaining. they basically check for,
    //1st val before they try to render, stops api from crashing app
    const {auth} = useAuth()

    const navigate = useNavigate()

    const newTask = () => {
        navigate('/newTask')
    }

    return (
        <div>
            <header>
                <Nav />
            </header>
            <div className='content-container'>
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Assign Task</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div>
                <button onClick={newTask}>New Task</button>
            </div>
        </div>
    );
}

export default ManagerDashboard;
