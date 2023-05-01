import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

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
        <div>
            <header>
                <Nav/>
            </header>
            <div className='content-container'>
                <div className='container'>
                    <div className="container-title">
                        <h1>New Task</h1>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit} className='form-container'>
                            <div className="form-group">
                                <div className="form-control">
                                    <label className="input-label">Task:</label>
                                </div>
                                <input type='text' className="input" onChange={handleInputChange} value={task.task} name='task'/>
                            </div>
                            {
                                errors.task?
                                <p className='errors'>{errors.task.task}</p>:
                                null
                            }

                            <div className="form-group">
                                <div className="form-control">
                                    <label className="input-label">Date:</label>
                                </div>
                                <input type='date' className="input" onChange={handleInputChange} value={task.date} name='date'/>
                            </div>
                            {
                                errors.date?
                                <p className='errors'>{errors.task.date}</p>:
                                null
                            }

                            <div className="form-group">
                                <div className="form-control">
                                    <label className="input-label">Instructions</label>
                                </div>
                                <textarea onChange={handleInputChange} className="input" value={task.instructions} name='instructions' rows={5} cols={30}/>
                            </div>
                            {
                                errors.instructions?
                                <p className='errors'>{errors.task.instructions}</p>:
                                null
                            }
                            <button class="button-4"role="button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;