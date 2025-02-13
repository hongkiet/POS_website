import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Num2VND from "../../../components/Num2VND";

function CardDetail({AddToCart, UpdateCart}) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const [count, setCount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [cash, setCash] = useState(0);
	const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0);
	const [isPayable, setIsPayable] = useState(false);
    const [error, setError] = useState(null);
	const handleUpdateCart = () => UpdateCart();

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        const { tempCount, subTotalTemp } = cart.reduce(
          (accumulator, item) => {
            accumulator.tempCount += item.amount;
            accumulator.subTotalTemp += item.retail_price * item.amount;
            return accumulator;
          },
          { tempCount: 0, subTotalTemp: 0 }
        );
		if(cart.length === 0){
			setTax(0);
			setCash(0);
		}
        const taxfee = (subTotalTemp * tax) / 100;
        const totalTemp = subTotalTemp + taxfee;


        setTotal(totalTemp);
		setSubTotal(subTotalTemp);
        setCount(tempCount);
		setChange(cash - totalTemp);
		setIsPayable(cash >= totalTemp ? true : false);
		

		const cartDetail = {
			subTotal: subTotalTemp,
			count: tempCount,
			taxfee: taxfee,
			cash: cash,
			change: cash - totalTemp,
			total: totalTemp,
			tax: tax
		}

		// Store cart detail to localStorage
        localStorage.setItem('cartDetail', JSON.stringify(cartDetail));

    }, [AddToCart, tax, cash]);


    const handleSetTax = (e) => {
        setError(null);
        const newTax = e.target.value;
        if (newTax < 0 || newTax > 100) {
            setError("Tax must be between 0 and 100");
        } else {
            setTax(newTax);
        }
		  handleUpdateCart();
    };

    const handleSetCash = (e) =>{
        setError(null);
        const newCash = e.target.value;
        if (newCash < 0) {
            setError("Cash must be greater than 0");
        } else {
            setCash(newCash);
        }
        handleUpdateCart();
    }

    const handleReset = () => {
      	localStorage.removeItem('cart');
		handleUpdateCart();
    }

    const handleConfirmReset = () => {
        const btn = document.getElementById('btn-rs__cart');
        btn.addEventListener('click', handleReset);
    }

    return (
    <div className="card shadow" style={{height: '90vh'}}>
      <div className="card-header bg-dark text-light">
        Cart Detail
        <i className="fa-solid fa-cart-shopping ml-2"></i>
      </div>
      <div className="card-body overflow-auto">
        {cart.map((product, index) => {
          return <CartItem key={index}
		  	product={product}
			UpdateCart={UpdateCart}/>;
        })}
      </div>

      <div className="card-footer text-center">
        <div className="d-flex justify-content-between">
          <span>{count} items</span>
          <span>
            Subtotal: <strong>{Num2VND(subTotal)}</strong>
          </span>
        </div>
        <div className="text-right my-1">
          <label><strong>Tax fee</strong></label>
          <input
            placeholder="%"
            min={0}
            max={100}
            type="number"
            className="form-control"
			value={tax}
            onChange={(e) => handleSetTax(e)}
          />
        </div>
        <div className="text-right my-1">
          <label><strong>Cash</strong></label>
          <input
            placeholder="1,000,000vnđ"
            min={0}
            type="text"
            className="form-control"
			value={cash}
            onChange={(e) => handleSetCash(e)}
          />
        </div>
        <div className="text-right my-1">
          <label><strong>Change</strong></label>
          <input
            placeholder="1,000,000vnđ"
            min={0}
            type="text"
            className="form-control"
            value={Num2VND(change)}
            disabled={true}
          />
        </div>
        <div className="my-3">
          <span>
            Total: <strong>{Num2VND(total)}</strong>
          </span>
        </div>
        <div className="d-flex text-center justify-content-between">
          <button
            title="Click here to reset bill"
            className="btn btn-warning mr-3"
            data-toggle="modal" data-target="#resetModal"
			      onClick={() => handleConfirmReset()}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button
            disabled={error || isPayable === false? true : false}
            title="Click here to make a payment"
            className="btn btn-success"
            data-toggle="modal" data-target="#paymentModal"
          >
            PAYMENT
            <i className="fa-solid fa-chevron-right ml-3"></i>
          </button>
        </div>
        {error && (
          <div class="alert alert-danger mt-4">
            <strong>Error!</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardDetail;
