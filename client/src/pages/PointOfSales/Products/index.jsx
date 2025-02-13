import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import LoadingImg from "../../../components/Layout/components/LoadingImg";
function Products({searchProductItem, AddToCart}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    const [products, setProducts] = useState([]);
    const [divider, setDivider] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if(searchProductItem.length === 0){
            handleFetchProducts();
        }else{
            setProducts(searchProductItem);
        }
    }, [page, searchProductItem]);


    const handleFetchProducts = async () => {
        setError(null);
        setLoading(true);
        axios.get('/api/products?page='+page, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setProducts(res.data.products);
                setDivider(res.data.divider);
            }else{
                setError(res.message);
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError(error.message);
        });
    }
    
    return (
        <div className="row mt-5">
            <div className="col-md-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            {loading && (
                                <div className="col-md-12 text-center">
                                    <LoadingImg />
                                </div>
                            )}
                            {products.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    product={product}
                                    AddToCart={AddToCart}
                                />
                            ))}
                        </div>
                        <div className="row">
                            <Pagination root='point-of-sale' divider={divider}/>
                        </div>
                    </div> 
                    {error && (
                        <div className="card-footer">
                            <div class="alert alert-dangere H
                            
                            ">
                                <strong>Error!</strong> {error}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
