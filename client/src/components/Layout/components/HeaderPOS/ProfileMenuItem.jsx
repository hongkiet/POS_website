import { Link } from 'react-router-dom';
function ItemProfile({url, title, icon}) {
    return ( 
        <li className="nav-item menu__profile-item">
            <i className={icon}></i>
            <Link to={url}>{title}</Link>
        </li>
     );
}

export default ItemProfile;