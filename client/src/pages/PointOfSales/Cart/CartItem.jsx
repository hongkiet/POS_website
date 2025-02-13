function CartItem({product, UpdateCart}) {

    const handleChangeAmount = (type)=>{
        const id = document.getElementById(product._id);
        const value = id.value;


        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if(cart.length === 0){
            return  window.alert('Invalid product');
        }

        for(let i = 0; i < cart.length; i++){
            if(cart[i]._id === product._id){
                if(type === '-'){
                    // Minus Amount
                    cart[i].amount--;
                    if(cart[i].amount <= 0){
                        cart.splice(i, 1);
                        UpdateCart();
                    }                    
                }else if(type === '+'){
                    // Plus Amount
                    cart[i].amount++;

                }else{
                    window.alert('Invalid operator');
                }
                break;
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        UpdateCart();

    }

    const handleRemoveItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if(cart.length === 0){
            window.alert('Cart is not available');
        }

        for(let i = 0; i < cart.length; i++){
            if(cart[i]._id === id){
                cart.splice(i, 1);
                break;
            }
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        UpdateCart();
    }

    const handleConfirmDelete = (id, name) => {
        const nameHTML = document.getElementById('rm__name-product');
        nameHTML.innerHTML = name;

        const btnDelete = document.getElementById('btn-rm__cartItem');
        btnDelete.addEventListener('click', ()=>{
            handleRemoveItem(id);
        });
    }
    return (
        <div className="d-flex my-1">
            <img src={product.image} width={100} alt="" />
            <div className="d-flex justify-content-between ml-2 phone__info w-100">
                <div className="d-flex flex-column">
                    <h5 className="">{product.name}</h5>
                    <span>{formatCurrencyVND(product.retail_price)}</span>
                </div>
                <div className="text-right">
                    <span>Quantity</span>
                    <div className="d-flex flex-rows align-content-center">
                        <button onClick={()=> handleChangeAmount('-')} className="btn btn-sm btn-secondary">-</button>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            value={product.amount}
                            min="1"
                            style={{width: '50px'}}
                            id={product._id}
                        />
                        <button onClick={()=> handleChangeAmount('+')} className="btn btn-sm btn-secondary">+</button>
                    </div>
                    <button
                        onClick={() => handleConfirmDelete(product._id, product.name)}
                        title="Click here to remove this product"
                        className="btn btn-sm btn-danger mt-1"
                        data-toggle="modal" data-target="#deleteModal"
                    ><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    );
    // Convert to currency
    function formatCurrencyVND(value) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
            });
    
            return formatter.format(numericValue);
        } else {
            return 'Invalid Number';
        }
    }
}

export default CartItem;