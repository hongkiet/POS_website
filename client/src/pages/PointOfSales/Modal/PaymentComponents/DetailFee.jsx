import Num2VND from "../../../../components/Num2VND";
function DetailFee() {

    const cartDetail = JSON.parse(localStorage.getItem('cartDetail')) || {};
    return ( 
        <table className="table table-sm table-bordered w-25 ml-auto m-3">
            <tbody>
                <tr>
                    <th>Subtotal</th>
                    <td>{Num2VND(cartDetail.subTotal)}</td>
                </tr>
                <tr>
                    <th>Tax rate</th>
                    <td>{cartDetail.tax} %</td>
                </tr>
                <tr>
                    <th>Tax fee</th>
                    <td>{Num2VND(cartDetail.taxfee)}</td>
                </tr>
                <tr>
                    <th>Cash</th>
                    <td>{Num2VND(cartDetail.cash)}</td>
                </tr>
                <tr>
                    <th>Change</th>
                    <td>{Num2VND(cartDetail.change)}</td>
                </tr>
                <tr>
                    <th>Total of quantity</th>
                    <td>{cartDetail.count}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>{Num2VND(cartDetail.total)}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default DetailFee;