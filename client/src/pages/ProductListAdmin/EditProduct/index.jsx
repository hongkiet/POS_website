import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Num2VND from '../../../components/Num2VND';
function EditProduct() {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
      };
      
      const closeModal = () => {
        setShowModal(false);
        setModalContent("");
      };
      

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
                    setEditedProduct(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSave = () => {
        axios.put(`/api/products/${barcode}`, editedProduct, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        .then(response => {
          const res = response.data;
          if (res.code === 0) {
            setProduct(res.data);
            openModal("Sản phẩm đã được cập nhật thành công.");
          }
        })
        .catch(error => {
          console.log(error);
        });
      };
      

    return (
 
            <div className="card">
                <div className="card-header bg-info text-white text-center">
                    <h3>PRODUCT INFORMATION</h3>
                </div>
                {product && (
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img src={product.image} alt={product.name} className="img-fluid" />
                            </div>
                            <div className="col-md-9">
                                <div className="fw-bold">Name:</div>
                                <h4 className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedProduct.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </h4>
                                <div className="mb-3">
                                    <span>Category: {product.category}</span>
                                </div>
                                <div className="mb-3">
                                    <span>Price: {Num2VND(product.retail_price)}</span>
                                </div>
                                <div className="mb-3">
                                    <div className="fw-bold">Quantity:</div>
                                    <input
                                        type="text"
                                        name="quantity"
                                        value={editedProduct.quantity}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <span>Creation Date: {new Date(product.creation_date).toLocaleDateString()}</span>
                                </div>
                                <div className="mb-3">
                                    <span>Barcode: {product.barcode}</span>
                                </div>
                                <div className="mb-3">
                                    <div className="fw-bold">Description:</div>
                                    <textarea
                                        name="description"
                                        value={editedProduct.description}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        rows={5}
                                        
                                    />
                                </div>
                                <button className="btn btn-primary w-100" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Modal */}
                <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                    Đóng
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>


    );
}

export default EditProduct;
