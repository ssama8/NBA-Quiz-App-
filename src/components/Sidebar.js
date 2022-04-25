import React from "react";
import navItems from "../utils/NavigationPaths";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import styled from "styled-components";
const Sidebar = () => {
	const { login, logOut, sidebarOpen, setSidebarOpen } = useGlobalContext();
	const setClass = () => {
		if (sidebarOpen) return "sidebar-open";
		return "sidebar";
	};
	return (
		<Wrapper className={`${setClass()} flex justify-center fixed items-center`}>
			<ul className='flex flex-col items-center'>
				{navItems.map((item, index) => {
					const { name, link } = item;
					return (
						<li
							key={index}
							className='mx-5'
							onClick={() => setSidebarOpen(!sidebarOpen)}>
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
		</Wrapper>
	);
};

export default Sidebar;

const Wrapper = styled.nav`
	top: 0;
	transition: all 0.55s ease-out;
	// transition: opacity 0.5s;
	color: white;
	font-weight: bold;
	li {
		margin: 1rem 0;
	}
	@media screen and (min-width: 769px) {
		display: none;
	}

	background: #21a;
`;
