import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios'
import React, {useState} from 'react';
import loginreg from './loginreg.module.css'
import useAuth from '../hooks/useAuth';

const Login = (props) => {
    const {setAuth} = useAuth();
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
                //console.log("RES DATA", res);
                const accessToken = res?.data?.accessToken;
                setAuth({user:res.data.user, accessToken});
                navigate(`/dashboard/${res?.data?.user?.role}`)
            })
            .catch((err) => {
                //console.log(err);
                setErrors(err.response.data)
            })
    }

    return (
        <div className={loginreg.body}>

            <p className={loginreg.welcome}>Welcome to TaskScheduler</p>
            <p className={loginreg.pageTitle}></p>

            <div className={loginreg.container}>
                <div className={loginreg.forms}>
                    <div className={loginreg.loginForm}>
                        <form onSubmit={submitHandler}>
                        <span class={loginreg.title}>Login</span>
                            <div class={loginreg.inputField}>
                                <input type="text" placeholder="Enter your email" name="email" onChange={onChangeHandler} value={userLogin.email} class={loginreg.input}/>
                            </div>
                            <div class={loginreg.inputField}>
                                <input type="password" placeholder="Enter your password" name="password" onChange={onChangeHandler} value={userLogin.password} class={loginreg.input}/>
                            </div>
                            {
                                errors.message?
                                <p className={loginreg.error}>{errors.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="submit" className={loginreg.button} value="Login Now"/>
                            </div>
                        </form>

                        <div className={loginreg.loginSignup}>
                            <span className="text">Need to register? </span>
                            <a href='/' to={'/'}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}

export default Login;