import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './login.css'
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
/*import {loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'
import { useContext } from 'react';
import { CircularProgress } from '@mui/material';*/

export default function Login() {

const {login} = useContext(AuthContext);

axios.defaults.withCredentials = true;

const [inputs, setInputs] = useState({
    email:"",
    password:""
});

const [err, setErr] = useState(null);

const navigate = useNavigate()

const handleChange = async e =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
}


const loginAttempt = async (e) => {
    e.preventDefault();

    try{
      await login(inputs);
      await login(inputs);
      navigate("/")
    }catch(err){
      setErr(err.response.data)
    }
  }

  const emailValidate = useRef();
  const passwordValidate = useRef();

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Prayer Social</h3>
                <span className="loginDesc">Connect with people around you to engage in the power of prayer on Prayer Social.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox1" onSubmit={loginAttempt}>
                    <input placeholder='Email' onChange={handleChange} name="email" type="email" required className="loginInput" ref={emailValidate}/>
                    <input placeholder='Password' onChange={handleChange}  name="password" type="Password" required minLength="6" className="loginInput" ref={passwordValidate}/>
                    <span className='errorMsg'>{err && err}</span>
                    <button type='submit' className='loginButton' >Log in</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to='/register' style={{textDeoration:"none"}}>
                        <button className='loginRegisterButton1' >Create Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}