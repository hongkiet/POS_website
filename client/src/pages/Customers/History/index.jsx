import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from '../../../components/OrderList';
import LoadingImg from "../../../components/Layout/components/LoadingImg";
import Pagination from "../../../components/Pagination";
function History() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');


    const {id} = useParams();
    const [transactions, setTransactions] = useState(null);
    const [divider, setDivider] = useState(1);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleFetchTransactions = async () => {
        setLoading(true);
        setError(null);
        axios.get('/api/customers/' + id + '/transactions?page='+page, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setTransactions(res.data.transactions);
                    setCustomer(res.data.customer);
                    setDivider(res.data.divider);
                }else{
                    setError(res.message);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        handleFetchTransactions();
    }, [page]);
    return ( 
        <div class="card">
            <div className="card-header bg-main text-light">
                <h3 className="text-uppercase">History transtions of {customer && customer.name}</h3>
            </div>
            <div class="card-body">
                <OrderList orders={transactions}  fetch={handleFetchTransactions}/>
                <div className="row">
                    <Pagination root={'customers/history/'+id} divider={divider} />
                </div>
            </div>
                {loading && (
                    <div className="card-footer">
                        <div className="text-center">
                            <LoadingImg />
                        </div>
                    </div>
                )}
                {!loading && (
                    <div className="card-footer">
                        #{customer && customer._id}
                    </div>
                )}
                {error && (
                    <div className="card-footer">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default History;