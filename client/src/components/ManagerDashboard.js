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
    const [users, setUsers] = useState([])
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

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allUsers')
            .then(res=>{
                setUsers(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    const findName = (user_id)=>{
        let user = users?.find(u=>u._id===user_id)
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
                                    <th>Currently Assigned?</th>
                                    <th>Assign Task</th>
                                </tr>
                            </thead>
                            {
                                allTask?.map((task) => (
                                    <tbody key={task._id}>
                                        <tr>
                                            <td>{task.task}</td>
                                            <td>{formatDate(task.date)}</td>
                                            {
                                                task?.user_id
                                                    ?<td>{findName(task.user_id)}</td> 
                                                    :<td>Not Assigned</td>
                                            }
                                            <td><AssignForm users={users} allTask={allTask} setAllTask={setAllTask} id={task._id}/></td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </table>
                    </div>
                    <button onClick={newTask} class="button-5"role="button">New Task</button> 
                </div>
            </div>
        </div>
    );
}

export default ManagerDashboard;