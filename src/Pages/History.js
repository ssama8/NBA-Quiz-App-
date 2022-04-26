import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import QuizzesTaken from "../components/hisory components/QuizzesTaken";
import styled from "styled-components";
import { Link } from "react-router-dom";
const History = () => {
	document.title = "NBA Trivia -History";
	const { quizzesTaken, setQuizzesTaken, login } = useGlobalContext();
	if (!login) {
		return (
			<Wrapper className='flex text-center relative items-center justify-center'>
				<h2 className='text-5xl top-24 absolute main-header font-bold'>
					You Are Not Logged In{" "}
				</h2>
				<div className='flex flex-col items-center'>
					<h3 className='text-3xl side-header'>
						Please login to see past quizzes that you've taken
					</h3>
					<Link to='/login' className='btn rounded-md px-8 py-2 text-xl my-8 '>
						Login
					</Link>
					<h3 className='text-3xl side-header'>
						Don't have an account? Click here to sign up
					</h3>
					<Link
						to='/sign-up'
						className='btn rounded-md px-8 py-2 text-xl  my-8  '>
						Sign Up
					</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<section className='logos-section'>
			<QuizzesTaken
				previousQuizzes={quizzesTaken}
				changeOrder={setQuizzesTaken}
			/>
		</section>
	);
};

export default History;

const Wrapper = styled.section`
	height: calc(100vh - 10rem);
	margin-top: -3rem;
	margin-bottom: -5rem;
	background: url(https://pbs.twimg.com/media/FD4xRYxXwAMJxXN?format=jpg&name=small)
		center center/cover;
	z-index: 1;
	color: white;
	position: relative;
	:before {
		content: "";
		top: 0;
		position: absolute;
		height: inherit;
		width: 100%;
		background: black;
		opacity: 0.8;
		z-index: -1;
	}
	@media screen and (max-width: 768px) {
		margin: 0;
		margin-bottom: -5rem;
		height: calc(100vh - 5rem);
	}
	@media screen and (max-width: 400px) {
		.main-header {
			font-size: 2.25rem;
			top: 15px;
		}
		.side-header {
			margin-top: 2rem;
			font-size: 1.5rem;
		}
	}
`;
