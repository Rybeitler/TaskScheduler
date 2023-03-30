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
                console.log(err)
                if(err.response.data.message){
                    console.log("REGISTER ERROR", err.response.data.message)
                    setErrors({email:{message:err.response.data.message}})
                }else{
                    setErrors(err.response.data.error.errors)
                }
            })
    }

    return (
        <div className={loginreg.body}>

            <p className={loginreg.welcome}>Welcome to TaskScheduler</p>
            <p className={loginreg.pageTitle}></p>

            <div className={loginreg.container}>
                <div className={loginreg.forms}>
                    <div className={loginreg.registerForm}>
                        <form onSubmit={submitHandler}>
                        <span className={loginreg.title}>Register</span>
                            <div className={loginreg.inputField}>
                                <input type="text" name="firstName" placeholder="Enter your first name" onChange={onChangeHandler} value={userReg.firstName}/>
                            </div>
                            {
                                errors.firstName?
                                <p className={loginreg.error}>{errors.firstName.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="text" name="lastName" placeholder="Enter your last name" onChange={onChangeHandler} value={userReg.lastName}/>
                            </div>
                            {
                                errors.lastName?
                                <p className={loginreg.error}>{errors.lastName.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="text" name="email" placeholder="Enter your email" onChange={onChangeHandler} value={userReg.email}/>
                            </div>
                            {
                                errors.email?
                                <p className={loginreg.error}>{errors.email.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="password" name="password" placeholder="Enter your password" onChange={onChangeHandler} value={userReg.password}/>
                            </div>
                            {
                                errors.password?
                                <p className={loginreg.error}>{errors.password.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="password" name="confirmPassword" placeholder="Enter your password" onChange={onChangeHandler} value={userReg.confirmPassword}/>
                            </div>
                            {
                                errors.confirmPassword?
                                <p className={loginreg.error}>{errors.confirmPassword.message}</p>:null
                            }
                            <div className={loginreg.inputField}>
                                <input type="submit" className={loginreg.button} value="Sign up"/>
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