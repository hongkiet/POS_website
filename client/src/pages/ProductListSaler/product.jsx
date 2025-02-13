import {Link} from 'react-router-dom';
import Num2VND from '../../components/Num2VND';
function ProductItem({index, product}) {
    return ( 
        <tr>
            <th scope="row">{product.barcode}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{Num2VND(product.retail_price)}</td>
            <td>{new Date(product.creation_date).toLocaleDateString()}</td>
            <td>
                <Link to={"/products/"+product.barcode} type="button" className="btn btn-outline-main btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
            </td>
        </tr>
     );
}

export default ProductItem;