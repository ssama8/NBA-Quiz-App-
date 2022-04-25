import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const HomeImage = () => {
	// const
	return (
		<Wrapper className='showcase relative text-center flex items-stretch justify-center '>
			<div className='absolute main flex flex-col  '>
				<h1 className='text-5xl my-16'>NBA Trivia (2017-2018)</h1>
			</div>
			<div className='self-center description absolute'>
				<h3 className='text-3xl my-4 flex flex-col '>
					Are You a True NBA Fan of Your Favorite Team?{" "}
				</h3>
				<p className='my-3 mb-16 text-lg font-bold'>
					Put your knowledge to the test by choosing a team and taking the quiz
				</p>
				<Link className='btn py-4 px-8 font-bold rounded' to='/'>
					{" "}
					Sign Up{" "}
				</Link>
			</div>
			<div className='absolute self-end mb-8 warning '>
				<p>
					Warning * This quiz is a lot harder than you think and you need to be
					a true fan of your team to be able to get some of these questions
					right. In fact, a 50% which is normally an F is passing and anything
					above 75 is considered excellent!{" "}
				</p>
			</div>
		</Wrapper>
	);
};

export default HomeImage;

const Wrapper = styled.section`
	margin-top: -2rem;

	top: 0;
	.absolute.main {
		margin: 0 auto;
		width: 80vw;
		height: 70vh;
		max-width: 1200px;
	}
	.description {
		width: 800px;
		max-width: 50%;
	}
	.warning {
		color: red;
		width: 1000px;
		max-width: 70%;
	}
`;
