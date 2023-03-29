import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './nav.css'

const Nav = (props) => {

    const {auth} = useAuth()


    const navigate = useNavigate()

    const handleHome = (e) => {
        navigate('/dashboard/manager')
    }

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/logout', {})
        .then((res) => {
            console.log(res);
            navigate('/login')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className='nav-container'>
            <h1>Hi {auth?.user?.role}, {auth?.user?.firstName}!</h1>
            <button onClick={handleHome}>Home</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Nav;