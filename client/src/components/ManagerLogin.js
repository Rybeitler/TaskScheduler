import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios'
import React, {useState, useContext} from 'react';
import { userContext } from '../context/UserContext';
import loginreg from './loginreg.module.css'

const ManagerLogin = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(userContext)
    const path = useLocation().pathname;
    const [errors, setErrors] = useState({})
    const location = path.split('/')[1]
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:'' 
    })

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log("RES DATA", res);
                setLoggedInUser(res.data.user)
                console.log("LOGGED IN USER:", loggedInUser)
                window.localStorage.setItem('uuid', res.data.user._id)
                navigate('/dashboard/management')
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data)
            })
    }

    return (
        <body class={loginreg.body}>

            <p class={loginreg.welcome}>Welcome to </p>
            <p class={loginreg.pageTitle}>Management Login</p>

            <div class={loginreg.container}>
                <div class={loginreg.forms}>
                    <div class={loginreg.loginForm}>
                        <form onSubmit={submitHandler}>
                        <span class={loginreg.title}>Login</span>
                            <div class={loginreg.inputField}>
                                <input type="text" placeholder="Enter your email" name="email" onChange={onChangeHandler} value={userLogin.email}/>
                            </div>
                            <div class={loginreg.inputField}>
                                <input type="password" placeholder="Enter your password" name="password" onChange={onChangeHandler} value={userLogin.password}/>
                            </div>
                            {
                                errors.message?
                                <p class={loginreg.error}>{errors.message}</p>:null
                            }
                            <div class={loginreg.inputField}>
                                <input type="submit" class={loginreg.button} value="Login Now"/>
                            </div>
                        </form>

                        <div class={loginreg.loginSignup}>
                            <span class="text">Need to register? </span>
                            <a href='/' to={'/'}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
)}

export default ManagerLogin;