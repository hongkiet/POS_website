import { Link } from 'react-router-dom';
function ItemProfile({url, title, icon}) {
    return ( 
        <Link className="nav-item menu__profile-item"  to={url}>
            <i className={icon}></i>
            <Link to={url}>{title}</Link>
        </Link>
     );
}

export default ItemProfile;