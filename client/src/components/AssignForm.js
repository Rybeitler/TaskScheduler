import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignForm = (props) => {
    const navigate = useNavigate()

    const {users, allTask, setAllTask, id} = props 

    const allUsers = users.filter(user=>user.role!=="manager")

    const [assignTask, setAssignTask] = useState({
        user_id:''
    })

    const handleInputChange = (e) => {
        setAssignTask(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/assignUser/${id}`, {assignTask})
            .then((res) => {

                setAllTask(allTask.map(task=>{
                    return task._id == res.data._id
                        ?res.data
                        :task
                }))

                navigate('/dashboard/manager')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div className="assignForm-container">
            <form onSubmit={handleSubmit}>
            <select name="user"  onChange={handleInputChange} value={assignTask.user_id} >
                <option value="none" hidden>select a user</option>
                {
                    allUsers.map((user) => (
                            <option key={user._id} value={user._id}>{user.firstName}</option>
                    ))
                }
                </select>
                <input className='input-2' type='submit' value='✓'/>
            </form>
        </div>
    )
}

export default AssignForm;