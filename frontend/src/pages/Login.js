import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Perform login logic here (e.g., API call to authenticate the user)
        // For now, we'll mock the login process

        if (email === 'student@example.com' && password === 'password' && userType === 'student') {
            navigate('/student/dashboard');
        } else if (email === 'professor@example.com' && password === 'password' && userType === 'professor') {
            navigate('/professor/dashboard');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome to EduConnect</h1>
                    <p>Sign in to access your dashboard</p>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="input-field"
                        >
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-container">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
