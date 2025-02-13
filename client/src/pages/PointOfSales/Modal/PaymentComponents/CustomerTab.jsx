import { useState, useEffect, Fragment } from "react";
import InvoiceTab from "./InvoiceTab";
import axios from "axios";

function CustomerTab({isPay}) {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const customer = {
            phone: phone,
            name: name,
            address: address,
            paymentMethod: paymentMethod
        };

        localStorage.setItem('customer', JSON.stringify(customer));
        
        if(phone.length > 0 && name.length > 0 && address.length > 0){
            setError(null);
            isPay(true);
        }else{
            isPay(false);
        }
    }, [phone, name, address, paymentMethod])

    /*
        0: COD
        1: Visa/Credit
        2: Momo
        3: VNPay
    */


    const handleCheckout = () => {
        setError(null);
        if(phone.length === 0){
            setError("The phone number is not ok");
            return;
        }
        try{
            axios.get('/api/pos/find-customer/'+phone,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            
            })
            .then(response => {
                const data = response.data;
                if(data.code !== 0){
                    setError(data.message);
                }else{
                    setName(data.data.name);
                    setAddress(data.data.address);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
        }catch(err){
            setError(err.message);
        }
    }


    return ( 
        <Fragment>
            <div className="text-center">
                <h3>Filling Information of Customer</h3>
            </div>
            <div className="my-5">
                <div class="row">
                    <div class="col">
                        <label>Phone number</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phone" placeholder="Enter phone's customer"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {error && <span class="d-block text-danger">{error}</span>}
                        <button  onClick={handleCheckout} className="my-2 btn btn-primary">Checkout <i class="fa-solid fa-check-to-slot"></i></button>
                    </div>
                    <div class="col">
                        <label >Full of name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter customer's name"
                            id="fullname"
                            name="fullname"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div class="col">
                        <label >Address</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter customer's address"
                            id="address"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                </div>
                <div class="form-group mt-5">
                    <label for="sel1">Payment method:</label>
                    <select class="form-control" id="paymethod" onChange={(e) => {
                        setPaymentMethod(e.target.value);
                    }}>
                        <option value={0}>COD (Cash only)</option>
                        <option value={1}>Visa/Credit Card</option>
                        <option value={2}>Momo</option>
                        <option value={3}>VN Pay</option>
                    </select>
                </div>
            </div>
        </Fragment>
    );
}

export default CustomerTab;