import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { formatDate } from '../utilities/formatDate';
import useAuth from '../hooks/useAuth';

const UserDashboard = () => {
    //placeholder to test w/
    //user is stored in auth, can import with useAuth() hook for ease of use
    // the? after auth and user are conditional chaining. they basically check for,
    //1st val before they try to render, stops api from crashing app
    const { auth } = useAuth()
    const [allTasks, setAllTasks] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const [userTasks, setUserTasks] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/allTask`)
            .then((res) => {
                setAllTasks(res.data)
                setUserTasks(res.data.filter(task => task.user_id === auth.user._id))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allUsers')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const findName = (user_id) => {
        let user = users?.find(u => u._id === user_id)
        return user?.firstName
    }

    return (
            <div>
                <header>
                    <Nav/>
                </header>
                <div className='content-container'>
                    <div className='container'>
                        <div className='container-title'>
                        <h2>All Tasks</h2>
                        </div>

                        <div className='container-table'>
                            <table className='content-table'>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Date Due</th>
                                        <th>Assigned To</th>
                                    </tr>
                                </thead>
                                {

                                    allTasks?.map((task) => (
                                        <tbody key={task._id}>
                                            <tr>
                                                <td>{task.task}</td>
                                                <td>{formatDate(task.date)}</td>
                                                {
                                                    task?.user_id
                                                        ? <td>{findName(task.user_id)}</td>
                                                        : <td>Not Assigned</td>
                                                }
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='container-title'>
                        <h2>My Tasks</h2>
                        </div>

                        <div className='container-table'>
                            <table className='content-table'>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Date Due</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                {

                                    userTasks?.map((task) => (
                                        <tbody key={task._id}>
                                            <tr>
                                                <td>{task.task}</td>
                                                <td>{formatDate(task.date)}</td>
                                                <td><Link to={`/task/details/${task._id}`}>Details</Link></td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default UserDashboard;
