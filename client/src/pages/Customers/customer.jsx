import {Link} from 'react-router-dom';
function Customer({index, customer}) {

    return ( 
        <tr>
            <th scope="row">{index}</th>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.address}</td>
            <td>{new Date(customer.creation_date).toDateString()}</td>
            <td>
                <Link to={"/customers/"+customer._id} type="button" className="btn btn-outline-main btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
                <Link to={"/customers/history/"+customer._id} type="button" className="btn btn-outline-danger btn-sm m-1">
                    <i class="fa-solid fa-book mr-1"></i>
                    History purchased
                </Link>
            </td>
        </tr>
     );
}

export default Customer;