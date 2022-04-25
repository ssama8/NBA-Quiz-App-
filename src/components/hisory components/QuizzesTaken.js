import React, { useState } from "react";
import PreviousQuizTaken from "./PreviousQuizTaken";
const QuizzesTaken = ({ previousQuizzes }) => {
	const [test, setTest] = useState([...previousQuizzes]);

	const sortArr = (arr, val) => {
		let newArr;
		switch (val) {
			case "sort-descending": {
				newArr = arr.sort((a, b) => {
					let percentA = a.correctAnswers / a.totalQuestions;
					let percentB = b.correctAnswers / b.totalQuestions;
					if (percentA === percentB) {
						return b.totalQuestions - a.totalQuestions;
					} else {
						return percentB - percentA;
					}
				});
				break;
			}
			case "sort-ascending": {
				newArr = arr.sort((a, b) => {
					let percentA = a.correctAnswers / a.totalQuestions;
					let percentB = b.correctAnswers / b.totalQuestions;
					if (percentA === percentB) {
						return a.totalQuestions - b.totalQuestions;
					} else {
						return percentA - percentB;
					}
				});
				break;
			}
			case "newest": {
				newArr = arr.sort((a, b) => {
					return b.date - a.date;
				});
				break;
			}
			case "oldest": {
				newArr = arr.sort((a, b) => {
					return a.date - b.date;
				});
				break;
			}
			case "a-z": {
				newArr = arr.sort((a, b) => {
					return a.mascot.localeCompare(b.mascot);
				});
				break;
			}
			case "z-a": {
				newArr = arr.sort((a, b) => {
					return b.mascot.localeCompare(a.mascot);
				});
				break;
			}
		}

		setTest([...newArr]);
	};

	return (
		<div>
			<select
				className='text-center'
				onChange={(e) => sortArr(test, e.target.value)}>
				<option value='oldest'>Oldest </option>

				<option value='newest'> Most Recent</option>
				<option value='sort-ascending'> Score Lowest - Highest</option>

				<option value='sort-descending'> Score Highest - Lowest</option>
				<option value='a-z'> Alphabetically</option>
				<option value='z-a'> Reverse Alphabetically</option>
			</select>
			<div className='grid grid-cols-3 gap-8 px-3 quizzes-container mx-auto text-center'>
				{test.map((quiz, index) => {
					return <PreviousQuizTaken {...quiz} key={index} />;
				})}
			</div>
		</div>
	);
};

export default QuizzesTaken;
