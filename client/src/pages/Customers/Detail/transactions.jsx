import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import OrderList from '../../../components/OrderList';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
function Transactions({customer_id}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    const [transactions, setTransactions] = useState(null);
    const [divider, setDivider] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    
    const handleFetchTransactions = async () => {
        axios.get('/api/customers/' + customer_id + '/transactions?page='+page, {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    const trans = res.data.transactions;
                    setTransactions(trans);
                    setDivider(res.data.divider);
                }else{
                    setError(res.message);
                }
            })
            .catch(error => {
                setError(error.message);
            });
    }

    useEffect(() => {
        handleFetchTransactions();
    }, [page]);



    return ( 
        <Fragment>
            <OrderList orders={transactions} fetch={handleFetchTransactions}/>
            <div className="row">
                <Pagination root={'customers/'+customer_id} divider={divider}/>
            </div>
        </Fragment>
    );
}

export default Transactions;