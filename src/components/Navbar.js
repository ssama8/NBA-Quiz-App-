import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import navItems from "../utils/NavigationPaths";
const Navbar = () => {
	const { login, logOut } = useGlobalContext();
	return (
		<nav className='navbar flex items-center '>
			<ul className='flex'>
				{navItems.map((item, index) => {
					const { name, link } = item;
					return (
						<li key={index} className='mx-5'>
							<Link to={link}>
								<h3 className='text-2xl'>{name}</h3>
							</Link>
						</li>
					);
				})}
				{login ? (
					<li>
						<Link
							onClick={(e) => {
								e.preventDefault();
								logOut();
							}}
							to='/'>
							<h3 className='text-2xl'>Logout</h3>
						</Link>
					</li>
				) : (
					<li>
						<Link to='login'>
							<h3 className='text-2xl'>Login </h3>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
