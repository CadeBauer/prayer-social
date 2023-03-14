import React from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/authContext'

export default function Register() {

    axios.defaults.withCredentials = true;

    const {login} = useContext(AuthContext);
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
      firstName:"",
      lastName:"",
      username:"",
      email:"",
      password:""
    });

    const [loginInputs, setLoginInputs] = useState({
        email:"",
        password:""
    })
  
    const [err, setErr] = useState(null);
  
    const handleChange = async e =>{
      setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
      setLoginInputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }
  
    const registerAttempt = async e =>{
      e.preventDefault()
  
      try{
        await axios.post("http://localhost:3003/api/auth/register", inputs)
        await login(loginInputs)
        await login(loginInputs)
        navigate("/")
  
      }catch(err){
        setErr(err.response.data)
      }
    }

    const emailValidate1 = useRef();
    const passwordValidate1 = useRef();
    const passwordAgain = useRef();

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Prayer Social</h3>
                <span className="loginDesc">Connect with people around you to engage in the power of prayer on Prayer Social.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={registerAttempt}>
                    <input onChange={handleChange} name="firstName" placeholder='First Name' type="Name" required className="loginInput" />
                    <input onChange={handleChange} name="lastName" placeholder='Last Name' type="Name" required className="loginInput" />
                    <input onChange={handleChange} name="username" placeholder='Username' type="Name" required className="loginInput" />
                    <input onChange={handleChange} name="email" placeholder='Email' type="Email" required className="loginInput" ref={emailValidate1}/>
                    <input onChange={handleChange} name="password" placeholder='Password' type="Password" required minLength="6" className="loginInput" ref={passwordValidate1}/>
                    <input placeholder='Confirm Password' type="Password" required className="loginInput" ref={passwordAgain} />  
                    <button type='submit' className='loginButton'>Sign Up</button>    
                    <Link to='/login' className='backLink'>
                        <span>Go Back</span>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}