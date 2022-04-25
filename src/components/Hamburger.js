import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context";
const Hamburger = () => {
	const { sidebarOpen, setSidebarOpen } = useGlobalContext();
	return (
		<Wrapper
			className='fixed flex items-center cursor-pointer  hamburger justify-center'
			onClick={() => setSidebarOpen(!sidebarOpen)}>
			<div className='line'></div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	height: 50px;
	width: 50px;
	background: orange;
	right: 0px;
	top: 0;
	z-index: 100 !important;
	padding: 0.5rem;
	.line {
		height: 5px;
		width: 100%;
		background: white;
		position: relative;
	}
	.line:before,
	.line:after {
		content: "";
		position: absolute;
		height: 5px;
		width: 100%;
		top: 10px;
		background: white;
	}
	.line:after {
		top: -10px;
	}

	@media screen and (min-width: 769px) {
		display: none;
	}
`;
export default Hamburger;
