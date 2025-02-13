import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Num2VND from '../../../components/Num2VND';
function Product() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    axios.get(`/api/products/${barcode}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        const res = response.data;
        if (res.code === 0) {
          setProduct(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (

      <div className="card">
        <div className="card-header bg-main text-white text-center">
          <h3>PRODUCT INFORMATION</h3>
        </div>
        {product && (
          <div className="card-body">
            <div className="row mt-4">
              <div className="col-md-3">
                <img src={product.image} alt={product.name} className="img-fluid product-img-preview" />
              </div>
              <div className="col-md-9">
                <h3>{product.name}</h3>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <strong>Category:</strong>
                      <dl>{product.category}</dl>
                    </div>
                    <div className="col">
                      <strong>Quantity:</strong>
                      <dl>{product.quantity}</dl>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <strong>Price:</strong>
                      <dl>{Num2VND(product.retail_price)}</dl>
                    </div>
                    <div className="col">
                      <strong>Creation Date:</strong>
                      <dl>{new Date(product.creation_date).toLocaleDateString()}</dl>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  
                </div>
                <div className="form-group">
                  <strong>Barcode:</strong>
                  <dl>{product.barcode}</dl>
                </div>
                <div className="form-group">
                  <strong>Description:</strong>
                  <div className='my-2'><button data-toggle="collapse" data-target="#description" className='btn btn-sm btn-outline-info'>Show description <i class="fa-solid fa-caret-down"></i></button></div>
                  <dl id="description" class="collapse">{product.description}</dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default Product;
