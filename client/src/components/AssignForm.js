import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignForm = (props) => {

    const navigate = useNavigate()

    const [allUsers, setAllUsers] = useState([])


    const [assignTask, setAssignTask] = useState({
        user_id:''
    })

    useEffect(() => {
        axios.get('http://localhost:8000/api/allUsers')
        .then((allUsers) => {
            console.log(allUsers)
            setAllUsers(allUsers.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleInputChange = (e) => {
        setAssignTask({...assignTask, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/newTask', assignTask)
            .then((res) => {
                console.log(res)
                navigate('/dashboard/manager')
            })
            .catch((err) => {
                console.log(err)
            })
    }


    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                {
                    allUsers.map((user) => (
                        <select name="user_id" key={user._id} onChange={handleInputChange} value={assignTask.user_id}>
                            <option>{user.firstName}</option>
                        </select>
                    ))
                }
                <input type='submit' value='Add New Task'/>
            </form>
        </div>
    )
}

export default AssignForm;