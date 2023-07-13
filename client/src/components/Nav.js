import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from './nav.module.css'

const Nav = (props) => {

    const {auth, setAuth} = useAuth()


    const navigate = useNavigate()

    const handleHome = (e) => {
        navigate(`/dashboard/${auth.user.role}`)
    }

    const handleLogout = (e) => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
        .then((res) => {
            console.log(res);
            setAuth({})
            navigate('/login')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <body>
            <nav>
                <label class={Navbar.logo}>TaskScheduler</label>
                <div>Welcome, {auth?.user?.firstName}</div>
                <div class={Navbar.links}>
                    {/* Left side links */}
                    <ul class={Navbar.ul}>
                        <li class={Navbar.li}><button class={Navbar.button} onClick={handleHome}>Home</button></li>
                    </ul>
                    {/* Right side links */}
                    <ul class={Navbar.ul}> 
                        <li class={Navbar.li}><button class={Navbar.button} onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </nav>
        </body>
    )
}

export default Nav;