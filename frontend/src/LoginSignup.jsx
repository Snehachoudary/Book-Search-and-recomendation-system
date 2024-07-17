import React, { useState } from 'react';
import './login.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('');
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', { username, password })
            .then(res => {
                console.log("Logged in successfully");
                navigate('/main'); // Navigate to Main page
            })
            .catch(err => {
                console.error("Error during login", err);
                setLoginError("Invalid username or password");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log("Registered successfully");
                navigate('/main'); // Navigate to Main page
            })
            .catch(err => {
                console.error("Error during registration", err);
                setRegisterError("Error during registration. Please try again.");
            });
    };

    return (
        <div className="login-wrapper-container">
            <div className={`login-wrapper ${action}`}>
                {/* Login Form */}
                <div className='form-box login'>
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' required onChange={e => setUsername(e.target.value)} />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' required onChange={e => setPassword(e.target.value)} />
                            <FaLock className='icon' />
                        </div>
                        <div className='remember-forget'>
                            <label><input type='checkbox' />Remember me</label>
                            <a href='#'>Forget password?</a>
                        </div>
                        {loginError && <p className='error'>{loginError}</p>}
                        <button type='submit'>Login</button>
                        <div className='register-link'>
                            <p>Don't have an account? <a href='#' onClick={() => setAction('active')}>Register</a></p>
                        </div>
                    </form>
                </div>

                {/* Registration Form */}
                <div className='form-box register'>
                    <form onSubmit={handleSubmit}>
                        <h1>Registration</h1>
                        <div className='input-box'>
                            <input type="text" placeholder='Username' name='name' required onChange={handleChange} />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="email" placeholder='Email' name='email' required onChange={handleChange} />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" placeholder='Password' name='password' required onChange={handleChange} />
                            <FaLock className='icon' />
                        </div>
                        <div className='remember-forget'>
                            <label><input type='checkbox' />I agree to the terms & conditions</label>
                        </div>
                        {registerError && <p className='error'>{registerError}</p>}
                        <button type='submit'>Register</button>
                        <div className='register-link'>
                            <p>Already have an account? <a href='#' onClick={() => setAction('')}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
