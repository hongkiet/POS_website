import React, { useState } from "react";
import axios from 'axios';

function RegisterHidden() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');

    const handleRegister = () => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        axios.post('/api/account/register_admin', data).then((response) => {
            console.log(response);
        })
    }
    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="">username</label>
                <input type="text" onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">email</label>
                <input type="text" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="" onChange={(e)=> setPassword(e.target.value)}>password</label>
                <input type="password" />
            </div>
            <div className="">
                <div className="btn btn-success" onClick={handleRegister}>Submit</div>
            </div>
        </div>
    )
}

export default RegisterHidden;
