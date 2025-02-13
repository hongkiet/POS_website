import { useState, Fragment } from "react";
import axios from "axios";
import LoadingImg from "../../../components/Layout/components/LoadingImg";

function RenewPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [repassword, setRepassword] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (password !== repassword) {
            setError("Password and Re-Password not match");
            return;
        }
        if(!password || !repassword) {
            setError("Password and Re-Password can not be empty");
            return;
        }
        handleChangePassword();
    }

    const handleChangePassword = () =>{
        setLoading(true);
        const token = localStorage.getItem('token');
        const data = {
            password: password,
        };
        axios.put('/api/account/renew-password', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else {
                    setError(res.message);
                }
                setLoading(false);
        })
          .catch(error => {
            setError(error);
            setLoading(false);
        });
    }
    return ( 
        <Fragment>
            <div className="row p-0 m-0 d-flex align-items-center" style={{height: '100vh'}}>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header text-center text-white bg-secondary p-3">
                            <h3>CHANGE YOUR PASSWORD</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        id="password_txt" 
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    required/>
                                </div>
                                <div className="form-group">
                                    <label>Password Confirm</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confirm_password" 
                                        placeholder="Re-Password"
                                        onChange={(e) => setRepassword(e.target.value)}
                                    required/>
                                </div>
                            </form>
                            <div className="text-center">
                                <a href="/logout" className="btn btn-warning m-1">Logout</a>
                                <button disabled={loading} type="submit" className="btn btn-primary m-1" onClick={(e) => handleSubmit(e)}>Submit</button>
                            </div>
                        </div>
                        <div className="card-footer">
                            {loading && <div className="text-center">
                                <LoadingImg />
                            </div>} 
                            {error && <div className="alert alert-danger">
                                <strong>Error!</strong> { error}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div></div>
        </Fragment>
    );
}

export default RenewPassword;