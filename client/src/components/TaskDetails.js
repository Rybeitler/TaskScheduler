import React, {useEffect, useState}from 'react';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import { formatDate } from '../utilities/formatDate';
import useAuth from '../hooks/useAuth';
import Nav from './Nav';
import './dashboard.css'
import './taskDetails.css'

const TaskDetails = () => {
    const {auth} = useAuth()
    const {id} = useParams()
    const [task, setTask] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [note, setNote] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/oneTask/${id}`)
            .then(res=>{
                setTask(res.data)
                setLoaded(true)
            })
            .catch(err=>console.log(err))
    },[id])

    const changeHandler = (e) =>{
        setNote(e.target.value)
    }

    const removeTask = ()=>{
        axios.delete(`http://localhost:8000/api/deleteTask/${id}`)
            .then(res=>
                    navigate('/dashboard/user')
                )
            .catch(err=>console.log(err))
    }

    const addNote = (e) =>{
        e.preventDefault()
        setLoaded(false)
        axios.put(`http://localhost:8000/api/addNote/${id}`, {note})
            .then(res=>{
                setTask(res.data)
                setLoaded(true)
                setNote('')
            })
            .catch(err=>console.log(err))
    }
    return (
        <div className='bg-color'>
            <Nav/>
            <div>
                {loaded &&
                    <div className='task-container'>
                        <div className='task-content'>
                            <h2>Details for Task: {task?.task}</h2>
                            <p><span style={{fontWeight:"bold"}}>Assigned to:</span> {auth?.user?.firstName}</p>
                            <p><span style={{fontWeight:"bold"}}>Due on:</span> {formatDate(task?.date)}</p>
                            <p><span style={{fontWeight:"bold"}}>Instructions:</span> {task.instructions}</p>
                        </div>
                    </div>
                }
                <div className='note-form'>
                    <div className='notes'>
                        <h2>User Notes:</h2>
                        {
                            task?.notes?.map((note, idx)=>(
                                <p key={idx} >{note}</p>
                            ))
                        }
                    </div>
                    <form onSubmit={addNote}>
                        <h4>Add A New Note:</h4>
                        <textarea name="newNote" cols="30" rows="10" onChange={changeHandler} value={note}></textarea>
                        <div>
                            <button class="button-4"role="button">Add Note</button>
                        </div>
                    </form>
                    <div className='remove-task'>
                        <button onClick={removeTask}  class="button-24"role="button">Task Completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
