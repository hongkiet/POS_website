import Num2VND from "../../../../components/Num2VND";
function ProductItem({index, product}) {
    return ( 
        <tr>
            <td>{index}</td>
            <td>
                <img src={product.image} width={50} />
            </td>
            <td>{product.name}</td>
            <td>{Num2VND(product.retail_price)}</td>
            <td>{product.amount}</td>
        </tr>
    );
}

export default ProductItem;