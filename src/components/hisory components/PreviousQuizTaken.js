import React from "react";
import convertTime from "../../utils/ConvertTime";

const PreviousQuizTaken = ({
	correctAnswers,
	mascot,
	team,
	totalQuestions,
	date,
}) => {
	const showTimePeriods = (timeArr, index) => {
		return timeArr.map((timeField) => {
			const [period, value] = timeField;
			if (!value && period === "days") return null;
			return (
				<div className='mx-2' key={index}>
					<p className='font-bold'>{value}</p>
					<p>{period}</p>
				</div>
			);
		});
	};
	const currentDate = new Date().getTime().toString();
	let timeInBetween = convertTime(currentDate - date);
	const percent = (correctAnswers / totalQuestions) * 100;
	return (
		<div
			className='grid grid-cols-2 block p-8 rounded-lg shadow-lg previous-quiz'
			key={mascot}>
			<img src={team} alt={mascot} />
			<div className='flex flex-col justify-center'>
				<p className='font-bold text-sm'>
					You got {correctAnswers} out of {totalQuestions} or{" "}
					<span>{percent.toFixed()} %</span> of the questions right on the{" "}
					{mascot}
				</p>
			</div>
			<div className='col-span-2 flex flex-col items-center'>
				<p className='my-1'>Time since quiz was taken : </p>
				<div className='flex'>{showTimePeriods(timeInBetween)}</div>
			</div>
		</div>
	);
};

export default PreviousQuizTaken;
