import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from '../../components/OrderList';
import Pagination from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
function Orders() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');


    const [orders, setOrders] = useState(null);
    const [divider, setDivider] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        axios.get('/api/orders?page='+page, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setOrders(res.data.orders);
                    setDivider(res.data.divider);
                }else{
                    setError(res.message);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchOrders();
    },[page]);
    return ( 
        <div className="card rounded">
            <div className="card-header bg-main text-main text-center">
                <h3>Manage ordered list</h3>
            </div>
            <div className="card-body">
                <OrderList orders={orders} fetch={fetchOrders}/>
                <div className="row">
                    <Pagination root='orders' divider={divider}/>
                </div>
            </div>
            {error && (
                <div className="card-footer">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            )}
            {loading && (
                <div className="card-footer">
                    <div className="text-center">
                        <LoadingImg />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;