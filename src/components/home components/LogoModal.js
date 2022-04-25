import React from "react";
import getTime from "../../utils/ConvertTime";
const LogoModal = (quizData) => {
	console.log(quizData);
	if (!quizData) return <></>;
	const { correctAnswers, mascot, totalQuestions, team, date, resetModalQuiz } =
		quizData;
	const currentTime = new Date().getTime().toString();
	const timefields = getTime(currentTime - date);
	const percent = ((correctAnswers / totalQuestions) * 100).toFixed();
	return (
		<div className='absolute quiz-modal'>
			<div className='modal-content'>
				<img src={team} alt={mascot} />
				<div className='info flex flex-col'>
					<p>
						You got {" " + correctAnswers} out of {" " + totalQuestions + " "}
						for a score of {percent}%
					</p>
					<p className='my-3'>Your best result for the {mascot} was taken</p>
					<div className='flex mx-auto'>
						{timefields.map((field, index) => {
							const [timePeriod, time] = field;
							return (
								<div key={index} className='flex flex-col mx-2'>
									<p>{time}</p>
									<p>{timePeriod}</p>
								</div>
							);
						})}
					</div>
				</div>
				<button
					className='btn px-5 py-2 my-7'
					onClick={() => resetModalQuiz({})}>
					{" "}
					Close Modal
				</button>
			</div>
		</div>
	);
};

export default LogoModal;
