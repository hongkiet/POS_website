import { useState } from 'react';
import axios from 'axios'; 
function Barcode({AddToCart}) {
    const [barcode, setBarcode] = useState("");    
    // Find product by barcode
    const handleEnter = async (e) => {
        if (e.key === "Enter") {
            if(barcode) {
                axios.get(`/api/pos/search-product/${barcode}`, {
                    headers: { 
                        'Authorization': localStorage.getItem('token'),
                    }
                })
                .then(response => {
                    const res = response.data;
                    if(res.code === 0){
                        setBarcode("");
                        handleAddToCart(res.data);
                        alert("Product added to cart successfully!");
                    }else{
                        alert(res.message);
                    }
                }).catch(error => {
                    console.log(error.message);
                
                })
            
            }
        }
    }

    // Add product to cart
    const handleAddToCart = (product) => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];

        if(cart.length === 0) {
            cart.push({
                ...product,
                amount: 1,
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            // insert a new product into cart if it dupplicates add amount to 1
            let flag = false;
            for(let i = 0; i < cart.length; i++){
                if(cart[i].barcode === product.barcode){
                    cart[i].amount += 1;
                    flag = true;
                    break;
                }
            }

            if(!flag){
                cart.push({
                    ...product,
                    amount: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            
        }

        AddToCart();
    }


    return ( 
        <div className="input-group">
            <div className="form-outline w-100">
                <label className="form-label">Type barcode</label>
                <div className="d-flex w-100">
                <input
                    type="search"
                    className="form-control w-100"
                    onKeyDown={(e) => handleEnter(e)}
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value.trim())}
                />
                </div>
            </div>
        </div>
    );
}

export default Barcode;