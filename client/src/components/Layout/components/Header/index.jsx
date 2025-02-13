import React, { useState } from 'react';
import '../../../GlobalStyle/index.css';
import ProfileMenu from './ProfileMenu';
function Header({user, layout}) {
    const [options, setOptions] = useState(false);

    const toggleMenu = () => {
      setOptions(!options);
    };

	return (
		<nav className="navbar bg-main-highlight nav-custom py-2">
			<div className="custom-nav-side ml-auto" id="navbarNav">
				<ul className="d-flex align-content-center m-0" onClick={toggleMenu}>
					<li className="nav-item text-right">
						<kbd>{user&&user.name}</kbd>
						<blockquote className='blockquote-footer m-0'>{user&&user.role}</blockquote >
					</li>
					<li className="nav-item">
						<img className="p-1 mx-2 rounded-circle border border-success" src={user&&user.image} height="40" width="40" alt="User Avatar" />
						{options && <ProfileMenu />}
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
