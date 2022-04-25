import React from "react";
import { useQuizContext } from "../../QuizContext";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context";
const QuizSummary = ({ changeLogo }) => {
	const { state, resetToDefault } = useQuizContext();
	const { setQuiz, reloadUser, setReloadUser } = useGlobalContext();
	const { correctAnswers, questions } = state;
	const currentTeamLogo = JSON.parse(localStorage.getItem("currentTeamQuiz"));
	console.log(currentTeamLogo);
	return (
		<div className='absolute quiz-summary'>
			<img src={currentTeamLogo.url} alt={currentTeamLogo.mascot} />
			<p className='text-lg'>
				{" "}
				You got {correctAnswers} / {questions} of the questions right
			</p>
			<p className='text-lg'>
				{" "}
				For a score of {((correctAnswers / questions) * 100).toFixed()} %
			</p>
			<Link
				to='/history'
				className='btn p-2 font-bold my-2'
				onClick={() => {
					resetToDefault();
					changeLogo("");
					setQuiz(false);
					setReloadUser(!reloadUser);
				}}>
				See all of your Results
			</Link>
			<Link
				to='/'
				className='btn p-2 font-bold my-2'
				onClick={() => {
					changeLogo("");
					setQuiz(false);
					resetToDefault();
					setReloadUser(!reloadUser);
				}}>
				{" "}
				Go back Home{" "}
			</Link>
		</div>
	);
};

export default QuizSummary;
