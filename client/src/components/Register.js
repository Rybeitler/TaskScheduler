import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import React, {useState} from 'react';
import loginreg from './loginreg.module.css'
import useAuth from '../hooks/useAuth';

const Register = (props) => {
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [userReg, setUserReg] = useState({
        username:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onChangeHandler = (e) => {
        setUserReg({...userReg, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', userReg, {withCredentials:true})
            .then((res) => {
                console.log(res);
                const accessToken = res?.data?.accessToken;
                setAuth({user:res.data.user, accessToken});
                navigate(`/dashboard/${res?.data?.user?.role}`)
            })
            .catch((err) => {
                console.log('here'+err);
                if(!err.response.data.verified){
                    console.log("REGISTER ERROR", err.response.data.message)
                    setErrors({email:{message:err.response.data.message}})
                }
            })
    }

    return (
        <body class={loginreg.body}>
            <div class={loginreg.top}>
                <div class={loginreg.header}>
                    <p class={loginreg.welcome}>Welcome to </p>
                    <p class={loginreg.pageTitle}>Work Register</p>
                </div>
            </div>
            <div class={loginreg.bottom}>
                <div class={loginreg.container}>
                    <div class={loginreg.forms}>
                        <div class={loginreg.registerForm}>
                            <form onSubmit={submitHandler}>
                            <span class={loginreg.title}>Register</span>
                                <div class={loginreg.inputField}>
                                    <input type="text" name="firstName" placeholder="Enter your first name" onChange={onChangeHandler} value={userReg.firstName} class={loginreg.input}/>
                                </div>
                                {
                                    errors.firstName?
                                    <p class={loginreg.error}>{errors.firstName.message}</p>:null
                                }
                                <div class={loginreg.inputField}>
                                    <input type="text" name="lastName" placeholder="Enter your last name" onChange={onChangeHandler} value={userReg.lastName} class={loginreg.input}/>
                                </div>
                                {
                                    errors.lastName?
                                    <p class={loginreg.error}>{errors.lastName.message}</p>:null
                                }
                                <div class={loginreg.inputField}>
                                    <input type="text" name="email" placeholder="Enter your email" onChange={onChangeHandler} value={userReg.email} class={loginreg.input}/>
                                </div>
                                {
                                    errors.email?
                                    <p class={loginreg.error}>{errors.email.message}</p>:null
                                }
                                <div class={loginreg.inputField}>
                                    <input type="password" name="password" placeholder="Enter your password" onChange={onChangeHandler} value={userReg.password} class={loginreg.input}/>
                                </div>
                                {
                                    errors.password?
                                    <p class={loginreg.error}>{errors.password.message}</p>:null
                                }
                                <div class={loginreg.inputField}>
                                    <input type="password" name="confirmPassword" placeholder="Enter your password" onChange={onChangeHandler} value={userReg.confirmPassword} class={loginreg.input}/>
                                </div>
                                {
                                    errors.confirmPassword?
                                    <p class={loginreg.error}>{errors.confirmPassword.message}</p>:null
                                }
                                <div class={loginreg.inputField}>
                                    <input type="submit" class={loginreg.button} value="Sign up"/>
                                </div>
                        
                            </form>

                            <div class={loginreg.loginSignup}>
                                <span class="text">Already a user? </span>
                                <a class={loginreg.hyperlink} href='/login' to={'/login'}>Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
)}

export default Register;