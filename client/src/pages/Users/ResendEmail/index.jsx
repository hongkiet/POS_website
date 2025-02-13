import { useState, Fragment } from "react";
import axios from "axios";
import Toast from "../../../components/Layout/components/Toast/";
import LoadingImg from "../../../components/Layout/components/LoadingImg";
function ResendEmail() {
    const [email, setEmail] = useState(null);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(false);
    const handleResendEmail = (e) =>{
        e.preventDefault();
        const user ={email}
        postToSend(user);
    }

    const postToSend = (user) =>{
        setAlert(null);
        setError(null);
        setStatus(true);

        axios.post('/api/users/resend',user, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(respone => {
                const res = respone.data;
                if(res.code === 0){
                    setAlert(res.message);
                }else{
                    setError(res.message);

                }
                setStatus(false);
            })
            .catch(err => {
                setError(error);
            });
    }
    return ( 
        <Fragment >
            <div className="card">
            <div className="card-header bg-main text-main text-center">
                <h3>RESEND EMAIL</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12 px-5">
                        <div className="alert alert-success">
                                <strong>Notification!</strong> 
                                <br />
                                The url will be sent to the email of saler and will be expired after 1 miniute.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        {/* Form for resend email */}
                        <form>
                            <div className="form-group">
                                <label>Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                required/>
                            </div>
                            <div className="text-center">
                                <button 
                                    onClick={(e) => handleResendEmail(e)}
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={status}
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>

            </div>
            {status && <div className="card-footer text-center">
                <LoadingImg />
            </div>}

        </div>
        {(alert || error) && <Toast type={error ? "error" : "success"} message={error || alert} />}
        </Fragment>
    );
}

export default ResendEmail;