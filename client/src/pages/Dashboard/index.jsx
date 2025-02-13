import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BodyAnalyst from './analystPage';
import Pagination from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { forEach } from 'lodash';
import Num2VND from "../../components/Num2VND";

function Dashboard() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);
    const [profit, setProfit] = useState(null);
    const fetchAllOrders = async () => {
        setLoading(true);
        setError(null);
        axios.get('/api/orders-analyst/allOrders', {
            headers: {
                
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setOrders(res.data.orders);
                    setTotalPrice(res.data.totalPrice);
                    setTotalProducts(res.data.totalProducts);
                    setProfit(res.data.totalProfit);
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
        fetchAllOrders();
    },[]);
    return ( 
        <div className="card rounded">
            <div className="card-header bg-main text-main text-center">
                <h3>ANALYSIS TOOL</h3>
            </div>
            <div className="card-body">
                <BodyAnalyst  orders={orders} totalPrice={totalPrice} totalProducts={totalProducts} profit={profit} fetch={fetchAllOrders}/>
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

export default Dashboard;