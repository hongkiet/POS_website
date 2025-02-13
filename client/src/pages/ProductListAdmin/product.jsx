import {Link} from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Num2VND from '../../components/Num2VND';
function ProductItem({index, product,refreshProducts}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showPurchasedModal, setShowPurchasedModal] = useState(false);

    const openPurchasedModal = () => {
        setShowPurchasedModal(true);
    };
    
    const closePurchasedModal = () => {
        setShowPurchasedModal(false);
    };
    const openConfirmModal = () => {
        setShowConfirmModal(true);
      };
      
      const closeConfirmModal = () => {
        setShowConfirmModal(false);
      };

      const handleRemoveProduct = () => {

        axios.delete(`/api/products/${product.barcode}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        .then(response => {
          const res = response.data;
          if (res.code === 2) {
            closeConfirmModal();
            openPurchasedModal();
          }
          if (res.code === 0) {
            refreshProducts()
          }
        })
        .catch(error => {
          console.log(error);
        });
      };
    return ( 
        <tr>
            <th scope="row">{product.barcode}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{Num2VND(product.import_price)}</td>
            <td>{Num2VND(product.retail_price)}</td>
            <td>{new Date(product.creation_date).toLocaleDateString()}</td>
            <td>
                <Link to={"/products/"+product.barcode} type="button" className="btn btn-outline-main btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
                <Link to={"/products/edit/"+product.barcode} type="button" className="btn btn-outline-secondary btn-sm m-1">
                    <i className="fa-regular fa-pen-to-square mr-2"></i>
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn btn-danger btn-sm m-1"
                    onClick={openConfirmModal}
                    >
                    <i className="fa-solid fa-trash mr-2"></i>
                    Remove
                </button>
                {/* Modal xác nhận */}
                <Modal show={showConfirmModal} onHide={closeConfirmModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>Confirm delete</Modal.Title>
                      <button type="button" className="close" onClick={closeConfirmModal}>
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </Modal.Header>
                  <Modal.Body>
                      Are you sure to delete this product?
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={closeConfirmModal}>
                      Cancel
                      </Button>
                      <Button variant="danger" onClick={handleRemoveProduct}>
                      Remove
                      </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={showPurchasedModal} onHide={closePurchasedModal}>
                  <Modal.Header closeButton>
                      <Modal.Title className='text-danger'>Warning!</Modal.Title>
                      <button type="button" className="close" onClick={closePurchasedModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                  </Modal.Header>
                  <Modal.Body>
                      Product was purchased
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={closePurchasedModal}>
                          Close
                      </Button>
                  </Modal.Footer>
              </Modal>
            </td>
        </tr>
     );
}

export default ProductItem;