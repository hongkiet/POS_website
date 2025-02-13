import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import InvalidToken from '../../../components/InvalidToken';

function DirectLogin() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [error, setError] = useState(false);
    const [alert, setAlert] = useState(null);
    const [data, setData] = useState(null);

    useEffect(()=>{
        handleVerifyToken(token);
    }, [error]);

    const handleVerifyToken = async (token) =>{

        
        axios.post('/api/account/direct', {token})
        .then(response => {
            setError(false);
            const res = response.data;
            if(res.code === 12){
                localStorage.setItem('token', res.data.token);
                window.location.href = '/renew-password';
            }else if(res.code === 0){
                localStorage.setItem('token', res.data.token);
                window.location.href = '/';
            }else{
                setError(true);
                setData(res.message);
                setAlert(res.data);
            }
        })
        .catch(error => {
            setError(true);
            setData(error.message);
            setAlert("JWT Error");
        });
    

    }
    return ( 
        <div>
            {error && <InvalidToken alert={alert} data={data}/>}
        </div>
    );
}

export default DirectLogin;