import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./profile";
import Transactions from "./transactions";
function CustomerDetail() {
    const {id} = useParams();

    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);


    const handleFetchCustomer = async (req, res) => {
        axios.get('/api/customers/' + id, {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(function (response) {
            const res = response.data;
            if(res.code === 0){
                setCustomer(res.data);
            }else{
                setError(response.message);
            }
        })
        .catch(function (error) {
            setError(error);
        });
    }

    useEffect(() => {
        handleFetchCustomer();
    }, []);
    return ( 
        <div class="card">
            <div class="card-body py-5">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-3">
                        <ul class="nav nav-tabs list-group">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#profile">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#transaction">Transaction history</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-9">
                    <div class="tab-content">
                        <div id="profile" class="container tab-pane active">
                            <Profile customer={customer} />
                        </div>
                        <div id="transaction" class="container tab-pane">
                            {customer&&<Transactions customer_id={customer._id} />}
                        </div>
                    </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default CustomerDetail;