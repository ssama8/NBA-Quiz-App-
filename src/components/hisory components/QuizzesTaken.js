import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import PreviousQuizTaken from "./PreviousQuizTaken";
import EasternConference from "../../utils/Confereces";
const QuizzesTaken = ({ previousQuizzes }) => {
	const [test, setTest] = useState([...previousQuizzes]);
	const [cardsActive, setCardsActive] = useState(true);
	useEffect(() => {
		setTest(
			test.map((quiz) => {
				const { mascot } = quiz;
				let conference;
				EasternConference.find((team) => team === mascot)
					? (conference = "east")
					: (conference = "west");
				return { ...quiz, conference };
			})
		);
	}, []);

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

	const setToGraph = () => {
		if (!cardsActive) return;
		setCardsActive(false);
	};
	const setToCard = () => {
		if (cardsActive) return;
		setCardsActive(true);
	};
	return (
		<div>
			<div className='flex justify-center items-center history-menu '>
				<select
					className='text-center self-center ml-8 my-4  p-2 border-2 border-black'
					onChange={(e) => sortArr(test, e.target.value)}>
					<option value='oldest'> Sort By Oldest </option>

					<option value='newest'> Sort By Most Recent</option>
					<option value='sort-ascending'> Score Lowest - Highest</option>

					<option value='sort-descending'> Score Highest - Lowest</option>
					<option value='a-z'> Alphabetically</option>
					<option value='z-a'> Reverse Alphabetically</option>
				</select>
				<h3
					className={`mx-2 cursor-pointer data-formats p-2 ${
						cardsActive && "active"
					} `}
					onClick={setToCard}>
					{" "}
					View Cards
				</h3>
				<h3
					className={`mx-2 cursor-pointer data-formats p-2 ${
						!cardsActive && "active"
					} `}
					onClick={setToGraph}>
					View Graph
				</h3>
			</div>

			{cardsActive ? (
				<div className='grid grid-cols-3 gap-8 px-3 quizzes-container mx-auto text-center'>
					{test.map((quiz, index) => {
						return <PreviousQuizTaken {...quiz} key={index} />;
					})}
				</div>
			) : (
				<Graph values={test} />
			)}
		</div>
	);
};

export default QuizzesTaken;
