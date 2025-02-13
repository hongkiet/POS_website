import { Link } from 'react-router-dom';
import { useState } from 'react';

function ItemSidebar({ title, url, icon, children }) {
  const shouldRenderForward = children ? false : true;
  const [show, setShow] = useState(false);


  return (
    <li onClick={() => shouldRenderForward ? null : setShow(!show)} className={`${shouldRenderForward ? '' : 'dropdown'} ${show ? 'active' : ''}`}>
      <div className="title" title={title}>
        {shouldRenderForward ? (
          <Link to={url} className="link">
            <i className={`sidebar-icon fa-3x ${icon}`}></i>
            <span className="name">{title}</span>
          </Link>
        ) : (
          <div className="link ">
            <i className={`sidebar-icon fa-3x ${icon}`}></i>
            <span className="name">{title}</span>
            {!show? <i className="sidebar-icon fa-solid fa-caret-down dropdown-ico"></i> : <i class="sidebar-icon fa-solid fa-caret-up dropdown-ico"></i>}
          </div>
        )}
      </div>
      <div className="submenu shadow-sm" title={title}>
        <Link style={{cursor: 'pointer'}} className="link submenu-title">
          {title}
        </Link>
        {/* <!-- submenu links here  --> */}
        {children}
      </div>
    </li>
  );
}

export default ItemSidebar;
