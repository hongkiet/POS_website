import {Link} from 'react-router-dom';
function ItemDropDown({title, url, icon}) {
    return ( 
        <Link to={url} title={title} className="link">
        <i className={"mr-2 "+ icon}></i>
        {title}</Link>
     );
}

export default ItemDropDown;