import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import './taskForm.css'

const TaskForm = (props) => {

    const navigate = useNavigate()

    const [task, setTask] = useState({
        task:'',
        date:'',
        instructions:'',
    })

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/newTask', task)
            .then((res) => {
                console.log(res)
                navigate('/dashboard/manager')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors);
            })
    }

    return(
        <div className='taskForm-bg'>
            <header>
                <Nav />
            </header>
            <div className='task-flex'>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1>Add a New Task</h1>
                    <label>Task</label>
                    <input type='text' onChange={handleInputChange} value={task.task} name='task'/>
                    {
                        errors.task?
                        <p className='errors'>{errors.task.task}</p>:
                        null
                    }

                    <label>Date</label>
                    <input type='date' onChange={handleInputChange} value={task.date} name='date'/>
                    {
                        errors.date?
                        <p className='errors'>{errors.task.date}</p>:
                        null
                    }

                    <label>Instructions</label>
                    <textarea onChange={handleInputChange} value={task.instructions} name='instructions' rows={5} cols={30}/>
                    {
                        errors.instructions?
                        <p className='errors'>{errors.task.instructions}</p>:
                        null
                    }
                    <button class="button-4"role="button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TaskForm;