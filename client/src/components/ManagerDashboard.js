import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {formatDate} from '../utilities/formatDate'
import AssignForm from './AssignForm';
import Nav from './Nav';
import './dashboard.css'
import axios from 'axios';


const ManagerDashboard = () => {
    //placeholder to test w/
    //user is stored in auth, can import with useAuth() hook for ease of use
    // the? after auth and user are conditional chaining. they basically check for,
    //1st val before they try to render, stops api from crashing app
    const {auth} = useAuth()

    const navigate = useNavigate()

    const [allTask, setAllTask] = useState([])


    const newTask = () => {
        navigate('/newTask')
    }


    useEffect(() => {
        axios.get(`http://localhost:8000/api/allTask`)
            .then((allTask) => {
                setAllTask(allTask.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, [])


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
                            <th>Date Due</th>
                            <th>Assign Task</th>
                        </tr>
                    </thead>
                    {
                        allTask?.map((task) => (
                            <tbody key={task._id}>
                                <tr>
                                    <td>{task.task}</td>
                                    <td>{formatDate(task.date)}</td>
                                    <td><AssignForm/></td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
            <div>
                <button onClick={newTask}>New Task</button>
            </div>
        </div>
    );
}

export default ManagerDashboard;
