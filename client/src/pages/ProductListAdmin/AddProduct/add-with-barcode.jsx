import { useState, useEffect } from "react";
import axios from "axios";
import LoadingImg from "../../../components/Layout/components/LoadingImg";
import Num2Vnd from '../../../components/Num2VND';
function AddwBarcode() {
    const [barcode, setBarcode] = useState(null);
    const [product, setProduct] = useState(null);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchProduct = async (barcode) => {
        setLoading(true);
        setProduct(null);
        setError(null);
        axios.get('/api/products/' + barcode, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then((response) =>{
                const res = response.data;
                console.log(res);
                if (res.code === 0) {
                    setProduct(res.data);
                    setLoading(false);
                } else {
                    setError(res.message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const handleSetAmount = (amount) => {
        setError(null);
        if(amount <= 0) {
            setError("Amount must be greater than 0");
        }else{
            setAmount(amount);
            setError(null);
        }
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setError(null);   
        axios.patch('/api/products/' + barcode, { amount }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    setProduct(res.data);
                    window.alert('Product has been updated!');
                } else {
                    setError(res.message);
                }
            })
            .catch((e) => {
                setError(e.message);
            });
        
        
    }
    useEffect(() => {}, [product]);
    return ( 
        <div className="card">
            <div className="card-header text-center text-uppercase">
                <h3>Add With Barcode</h3>
            </div>
            <div className="card-body">
            <form>
                <div className="form-group form-row">
                    <div className="col-sm-12 col-md-10 my-1">
                        <label>Barcode:</label>
                        <input onChange={(e) => setBarcode(e.target.value)} type="text" className="form-control" placeholder="Enter barcode" id="barcode" />
                    </div>
                    <div className="col-sm-12 col-md-2 my-1">
                        <label>Click for searching</label>
                        <button type="button" className="btn btn-primary" onClick={()=>handleFetchProduct(barcode)}>Click here</button>
                    </div>
                    {/* Product after fetching */}
                    {product && (
                        <div className="col-12 my-2">
                            <span className="btn btn-sm btn-outline-info" data-toggle="collapse" data-target="#product">Show more information <i className="fa-solid fa-caret-down"></i></span>
                            <div id="product" class="collapse mt-2">
                                <div className="row my-1">
                                    <div className="col"><strong>ID:</strong> {product&&product._id}</div>
                                    <div className="col"><strong>Barcode:</strong> {product&&product.barcode}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col"><strong>Name:</strong> {product&&product.name}</div>
                                    <div className="col"><strong>Current Quantity:</strong> {product&&product.quantity}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col"><strong>Category:</strong> {product&&product.category}</div>
                                    <div className="col"><strong>Creation Date:</strong> {product&&new Date(product.creation_date).toDateString()}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col"><strong>Import price:</strong> {product&&Num2Vnd(product.import_price)}</div>
                                    <div className="col"><strong>Retail price:</strong> {Num2Vnd(product&&product.retail_price)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter a number of the product" 
                        id="quantity"
                        disabled={product ? false : true}
                        onChange={(e) => handleSetAmount(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button onClick={(e)=> handleUpdateProduct(e)} type="submit" className="btn btn-success" disabled={product ? false : true}>Submit <i className="fa-solid fa-square-pen ml-1"></i></button>
                </div>
            </form>
            </div>
            {loading && (
                <div className="card-footer">
                    <div className="text-center">
                        <LoadingImg />
                    </div>
                </div>
            )}
            {error && (
                <div className="card-footer">
                    <div class="alert alert-danger">
                        <strong>Error!</strong> {error}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddwBarcode;