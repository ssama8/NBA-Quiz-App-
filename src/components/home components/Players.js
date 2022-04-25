import React, { useState, useEffect } from "react";
import QuizForm from "./QuizForm";
import { useQuizContext } from "../../QuizContext";
const getRandomPlayer = (players, currentArr) => {
	if (!players) return;
	let randomNum = Math.floor(Math.random() * players.length);
	const randomPlayer = players[randomNum];

	return randomPlayer;
};

const getRandomStat = (obj) => {
	if (!obj) return;
	const values = Object.entries(obj).slice(3, -1);
	let randomNum = Math.floor(Math.random() * values.length);
	console.log(randomNum);

	if (isNaN(values[randomNum][1])) {
		console.log("Not a statistic");
		getRandomStat(obj);
	}
	return values[randomNum][0];
};

const Players = ({ players }) => {
	const { setCorrectAnswer, state, correctAnswer, changeQuestion } =
		useQuizContext();
	const { questionNumber } = state;
	const [randomPlayers, setRandomPlayers] = useState([]);
	const [randomPlayerNumber, setRandomPlayerNumber] = useState("");
	const [randomStatNumber, setRandomStatNumber] = useState("");
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [questionAnswered, setQuestionAnswered] = useState(false);
	const [loading, setLoading] = useState("true");

	useEffect(() => {
		setLoading(true);
		if (players.length > 0) {
			setRandomPlayers();
			let arr = new Set();
			console.log(arr);
			while (arr.size < 4) {
				const randPlayer = getRandomPlayer(players, arr);
				// console.log(randPlayer);
				arr.add(randPlayer);
			}

			// console.log(arr);
			if (arr.size > 0) {
				arr = [...arr];
				console.log(arr);
				setRandomPlayers(arr);
				let randomNum = Math.floor(Math.random() * 4);
				setRandomPlayerNumber(randomNum);
				setCorrectAnswer(randomNum);
				console.log(correctAnswer);
				let randomStat = getRandomStat(arr[0]);
				randomStat = getAnotherStat(randomStat);
				setRandomStatNumber(randomStat);
			}
		}
	}, [players, changeQuestion]);
	const getAnotherStat = (stat) => {
		let duplicate = false;
		let arr = [];
		randomPlayers.map((player) => {
			if (arr.find((stat) => stat === player[stat])) {
				duplicate = true;
				return;
			}
			arr.push(player[stat]);
		});
		if (duplicate) getRandomStat(randomPlayers[0]);
		return stat;
	};
	useEffect(() => {
		const wrong = [...document.querySelectorAll(".error")];
		const correct = document.querySelector(".success");
		if (wrong) {
			wrong.map((node) => {
				node.classList.remove("error");
			});
		}
		if (correct) {
			correct.classList.remove("success");
		}
	}, [currentQuestion, changeQuestion]);
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1200);
	}, [currentQuestion, changeQuestion]);
	if (!players) return <></>;

	const nextQuestion = () => {
		setCurrentQuestion(currentQuestion + 1);
	};
	return (
		<div>
			{loading && (
				<section className='text-center mx-auto loading-section absolute'>
					<div className='loading text-center'></div>;
				</section>
			)}
			<QuizForm
				randPlayers={randomPlayers}
				randomStatNumber={randomStatNumber}
				correctPlayer={randomPlayerNumber}
				questionNum={currentQuestion}
				changeQuestion={nextQuestion}
				answered={questionAnswered}
				setAnswered={setQuestionAnswered}
			/>
			;
		</div>
	);
};

export default Players;
