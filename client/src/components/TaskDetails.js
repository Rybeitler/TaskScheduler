import React, {useEffect, useState}from 'react';
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import { formatDate } from '../utilities/formatDate';
import useAuth from '../hooks/useAuth';
import Nav from './Nav';

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
        <div>
            <Nav/>
            <div>
                {loaded &&
                <div>
                                <h2>Details for Task: {task?.task}</h2>
                                <h3>Assigned to {auth?.user?.firstName}</h3>
                                <h3>Due on: {formatDate(task?.date)}</h3>
                                <h3>Instructions: {task.instructions}</h3>
                                {
                                    task?.notes?.map((note, idx)=>(
                                        <p key={idx}>{note}</p>
                                    ))
                                }
                </div>
                }
                <div>
                <form onSubmit={addNote}>
                    <label>Add A New Note</label>
                    <textarea name="newNote" cols="30" rows="10" onChange={changeHandler} value={note}></textarea>
                    <button>Add Note</button>
                </form>
                <button onClick={removeTask}>Task Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
