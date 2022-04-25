import React, { useEffect, useState } from "react";
import PlayerShowcase from "./PlayerShowcase";
import { useQuizContext } from "../../QuizContext";
import { serverUrl } from "../../utils/ServerUrl";
import QuizSummary from "./QuizSummary";
import { useGlobalContext } from "../../Context";
const QuizForm = ({
	randPlayers,
	randomStatNumber,
	correctPlayer,
	answered,
}) => {
	const { state, nextQuestion, changeQuestion, setChangeQuestion } =
		useQuizContext();
	const { setQuiz } = useGlobalContext();
	const [currentTeamLogo, setCurrentTeamLogo] = useState("");
	const { questionNumber, correctAnswers, questionAnswered, questions } = state;
	const [correct, setCorrect] = useState(false);

	if (!randPlayers || !randomStatNumber || correctPlayer === undefined) {
		return (
			<>
				<section></section>
			</>
		);
	}

	const number = randPlayers[correctPlayer][randomStatNumber];

	const changeString = (string) => {
		const seperate = string.split("_");
		const transformedString = removeUnderScores(string);
		if (seperate[seperate.length - 1] === "game") {
			return `averaged ${number} ${transformedString}?`;
		} else {
			return `had ${number} ${transformedString}?`;
		}
	};
	const removeUnderScores = (string) => {
		return string.split("_").join(" ");
	};
	const displayMessage = () => {
		if (correct) {
			return "Correct answer";
		} else {
			console.log(randPlayers[correctPlayer]);
			return `Wrong answer, it was ${randPlayers[correctPlayer].name}`;
		}
	};
	return (
		<section className='text-center relative flex flex-col justify-center quiz-container'>
			<section className='quiz border-2 p-8'>
				<div>
					<h2 className='text-4xl'>{questions} question quiz</h2>
					<section className='flex justify-center '>
						{answered && displayMessage()}
						<p className='question mx-3'>
							{" "}
							Who {changeString(randomStatNumber)}
						</p>
						<p>
							{correctAnswers}/{questionNumber}
						</p>
					</section>
				</div>

				<PlayerShowcase listPlayers={randPlayers} />

				{questionAnswered &&
					(questions > questionNumber ? (
						<button
							className='btn p-2 font-bold my-4'
							onClick={() => {
								if (!questionAnswered) return;
								nextQuestion();
								setChangeQuestion(!changeQuestion);
							}}>
							{" "}
							Next Question
						</button>
					) : (
						<button
							onClick={() => {
								let currentTeam = JSON.parse(
									localStorage.getItem("currentTeamQuiz")
								);
								console.log(currentTeam);
								setCurrentTeamLogo(currentTeam);
								const userInfo = localStorage.getItem("currentUser");
								const url = `${serverUrl}users/${userInfo}`;
								console.log(url);
								fetch(`${serverUrl}users/${userInfo}`, {
									method: "post",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										team: currentTeam.url,
										mascot: currentTeam.mascot,
										correctAnswers: correctAnswers,
										totalQuestions: questions,
									}),
								});
							}}>
							See Results
						</button>
					))}
				{currentTeamLogo && <QuizSummary changeLogo={setCurrentTeamLogo} />}
			</section>
		</section>
	);
};

export default QuizForm;
