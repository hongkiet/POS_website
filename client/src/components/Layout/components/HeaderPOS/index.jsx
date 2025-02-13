import React, { useState } from 'react';
import '../../../GlobalStyle/index.css';
import ProfileMenu from './ProfileMenu';
function Header({user, layout}) {
	let tempUser = {
		name: '',
		role: '',
		image: '',
	}
	if(user) {
		tempUser = user;
	}
    const [options, setOptions] = useState(false);

    const toggleMenu = () => {
      setOptions(!options);
    };

	const handleCloseSession = () => {
		window.location.href = '/';
	}

	return (
		<nav className="navbar navbar-light bg-light nav-custom nav__pos position-fixed fixed-top shadow-sm">

		<div className="custom-nav-side ml-auto" id="navbarNav">
			<ul className="navbar-nav navbar-nav-inline">
				<li>
					<i className="fa-solid fa-wifi" style={{'color': '#1eff00'}}></i>
				</li>
				<li className="nav-item active">
					<span className="badge badge-danger">{tempUser.role}</span>
				</li>

				<li className="nav-item" onClick={toggleMenu}>
					{tempUser.name}
					<img className="p-1 mx-2 rounded-circle border border-success" src={tempUser.image} height="40" width="40" alt="User Avatar" />
				</li>
				<li onClick={handleCloseSession}>
					<i className="fa-solid fa-right-from-bracket"></i>
				</li>
			</ul>
		</div>
		</nav>
	);
}

export default Header;
