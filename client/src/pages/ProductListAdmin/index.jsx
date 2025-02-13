import ProductItem from './product';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import LoadingImg from '../../components/Layout/components/LoadingImg';
import Pagination from '../../components/Pagination';
function ProductListAdmin() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');


    const [products, setProducts] = useState(null);
    const [divider, setDivider] = useState(1);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchProducts();

    }, [category, search, page]);

    const fetchProducts = async () => {
        setLoading(false);
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
            setLoading(true);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }

    const refreshProducts = async () => fetchProducts();
    return ( 
        <Fragment>
            <div className="card rounded">
                <div className="card-header bg-main text-white text-center">
                    <h3>Manage product lists</h3>
                </div>
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="form-outline mb-4">
                                <input onChange={e => setSearch(e.target.value)} type="search" className="form-control" id="datatable-search-input" placeholder="Search"/>
                                <blockquote className='blockquote-footer'>Enter the name or barcode for searching</blockquote>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="">All product</option>
                                    <option value="Iphone">Iphone</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                </select>
                                <blockquote className='blockquote-footer'>Filter</blockquote>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-1">
                            {/* <label className='mr-1'>Click to refresh</label> */}
                            <button onClick={refreshProducts} className="btn btn-sm bg-main text-main">
                                <i class="fa-solid fa-rotate-right mr-1"></i>
                                Refresh
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 center-table">
                            <table className="table table-hover table-bordered table-responsive-sm table-responsive-md table-responsive-lg table-striped rounded text-center">
                                <thead className="bg-main text-main">
                                    <tr>
                                        <th scope="col">Barcode</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Import Price</th>
                                        <th scope="col">Retail Price</th>
                                        <th scope="col">Creation Date</th>
                                        <th scope="col">Option</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {loading === false && <tr className='text-center'>
                                    <td colSpan={7}><LoadingImg /></td>
                                </tr>}
                                {loading && products && products
                                    .filter(product => product.category.includes(category)
                                        && (product.name.toLowerCase().includes(search.toLowerCase())
                                        || product.barcode.toLowerCase().includes(search.toLowerCase())))
                                    .map((product, index) => (
                                        <ProductItem key={index} index={index + 1} product={product} refreshProducts={refreshProducts}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <Pagination root='products' divider={divider}/>
                    </div>
                </div>
                {error && (
                    <div className="card-footer">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>)}
            </div>
        </Fragment>
    );
}

export default ProductListAdmin;