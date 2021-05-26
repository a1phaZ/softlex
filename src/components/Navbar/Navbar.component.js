import React from 'react';
import {Link} from "react-router-dom";

const Navbar = ({isLoggedIn, logout}) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to={'/'} className={'navbar-brand'}>Home</Link>
				<div>
					{
						!isLoggedIn &&
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to={'/login'} className={'nav-link'}>Login</Link>
							</li>
						</ul>
					}
					{
						isLoggedIn &&
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link to={'/'} className={'nav-link'} onClick={logout}>Logout</Link>
							</li>
						</ul>
					}
				</div>
			</div>
		</nav>
	)
}

export default Navbar;
