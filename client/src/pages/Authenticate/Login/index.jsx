import React, { useState } from "react";
import './LoginRegister.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LoadingImg from "../../../components/Layout/components/LoadingImg";

export const Login = (props) => {
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    function handleLogin(event) {
        setLogin(true);
        setError(null);

        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const data = {
            username: username,
            password: password,
        };
          
        axios.post('/api/account/login', data, {
            headers: {
              'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                    window.location.href = '/';
                } else {
                    setError(res.message);
                }
                setLogin(false);
        })
          .catch(error => {
            setError(error);
            setLogin(false);
        });
    }
    return (
        <div className="wrapper fadeInDown d-flex align-items-center">
            <div id="formContent">
                {/* Tabs Titles */}
                <h2 className="active login_title">Sign In</h2>
                {/* Icon */}
                <div className="fadeIn first">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/919825.png?alt=media&token=29bd9385-a5f1-4e95-ab7b-86747f4d62f9"
                    id="icon"
                    alt="User Icon"
                    className="my-3"
                    />
                </div>

                {/* Login Form */}
                <form>
                    <div className="input-container">
                    <input type="text" id="username" className="fadeIn second" name="username" placeholder="username" />
                    </div>
                    <div className="input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="fadeIn third"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="fadeIn fourth form-input my-3" onClick={togglePasswordVisibility}>
                        <input checked={showPassword? true : false} type="checkbox" id="showPassword" className="form-check-input" />
                        <label className="form-check-label">Show Password</label>
                    </div>

                    
                    <input type="submit" id="login-btn" onClick={handleLogin} className="fadeIn fourth" value="Log In" disabled={login}/>
                    {error && <div className="alert alert-success">
                        <strong>Error!</strong> {error}
                    </div>}
                </form>
                {login && <LoadingImg />}                

                {/* Remind Password */}
                <div id="formFooter" className="mt-4">
                    <Link className="underlineHover">Developed by MinhKy & HongKiet</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
