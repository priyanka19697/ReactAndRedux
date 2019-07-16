import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

const Navbar = props => {
	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container">
				<ul className="nav pb-3">
					<li className="px-2">
						<NavLink to="/Home"> Home </NavLink>
					</li>
					|
					<li className="px-2 ">
						<NavLink to="/Courses"> Courses </NavLink>
					</li>
					|
					<li className="px-2 ">
						<NavLink to="/About"> About </NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
