import { useParams } from 'react-router-dom';
import axios from 'axios';
import Num2VND from '../../../components/Num2VND';
import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

function OrderDetail() {

    const {order_number} = useParams();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleFetchOrderDetails(order_number);
    }, []);

    const handleFetchOrderDetails = async (order_number) => {
        axios.get(`/api/orders/${order_number}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setOrder(res.data);
                }else{
                    setError(res.message);
                }
                console.log('Order detail', res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }
    const downloadPDF = ()=>{
        const capture = document.querySelector('.capture-invoice');
        html2canvas(capture)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p','px','a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save(`invoice-${order.order.order_number}.pdf`);
            })
    }

    const mapPayMethod = (value) =>{
        const methods = {
            '0': 'Cash Only',
            '1': 'Visa/ Credit Card',
            '2': 'Momo',
            '3': 'VNPay'
        }
        return methods[value];
    }
    return ( 
        <div class="card">
            <div class="card-header text-main bg-main">
                <h3>CODE ORDER #{order_number}</h3>
            </div>
            <div class="card-body capture-invoice">
                <div className="row">
                    <div className="col">
                        <h4 className='text-uppercase'><strong>Invoice</strong></h4>
                        <div className="my-3">
                            <img width={100} src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/919825.png?alt=media&token=29bd9385-a5f1-4e95-ab7b-86747f4d62f9" alt="" />
                        </div>
                        <div className="form-group">
                            <label><strong>Company</strong></label>
                            <p>NODEJS POS INC.</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Address</strong></label>
                            <p>19 Nguyen Huu Tho</p>
                        </div> 
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label><strong>Invoice number</strong></label>
                            <p>#{order&&order.order.order_number}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Date</strong></label>
                            <p>{order&& new Date(order.order.created_date).toDateString()}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Payment method</strong></label>
                            <p>{order&&mapPayMethod(order.order.paymentMethod)}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <hr className='border w-100'/>
                </div>
                <div className="row">
                    <div className="col">
                        <h4 className='text-uppercase'><strong>Customer</strong></h4>
                        <div className="form-group">
                            <label><strong>Name</strong></label>
                            <p>{order&&order.customer.name}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Phone</strong></label>
                            <p>{order&&order.customer.phone}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Address</strong></label>
                            <p>{order&&order.customer.address}</p>
                        </div>
                    </div>
                    <div className="col">
                        <h4 className='text-uppercase'><strong>Staff</strong></h4>
                        <div className="form-group">
                            <label><strong>Name</strong></label>
                            <p>{order&&order.staff.name}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Email</strong></label>
                            <p>{order&&order.staff.email}</p>
                        </div>
                        <div className="form-group">
                            <label><strong>Role</strong></label>
                            <p>{order&&order.staff.role}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <hr className='border w-100'/>
                </div>
                <div className="row">
                    <div className="col-12 text-center text-uppercase">
                        <h4>Order Information</h4>
                    </div>
                    <div className="col-12">
                        <table className="table table-hover table-bordered border-rounded text-center">
                            <thead className='bg-main text-light border-rounded'>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order&&order.orderDetail.products.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.amount}</td>
                                                <td>{Num2VND(item.retail_price)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <table className="table table-sm table-bordered w-25 ml-auto m-3">
                            <tbody>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>{order&&Num2VND(order.order.sub_total)}</td>
                                </tr>
                                <tr>
                                    <th>Tax rate</th>
                                    <td>{order&&order.order.taxrate} %</td>
                                </tr>
                                <tr>
                                    <th>Tax fee</th>
                                    <td>{order&&Num2VND(order.order.taxfee)}</td>
                                </tr>
                                <tr>
                                    <th>Cash</th>
                                    <td>{order&&Num2VND(order.order.cash)}</td>
                                </tr>
                                <tr>
                                    <th>Change</th>
                                    <td>{order&&Num2VND(order.order.change)}</td>
                                </tr>
                                <tr>
                                    <th>Total of quantity</th>
                                    <td>{order&&order.order.quantity}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>{order&&Num2VND(order.order.total)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div className="text-right">
                    <button className='btn btn-primary' onClick={downloadPDF}>Download as PDF</button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;