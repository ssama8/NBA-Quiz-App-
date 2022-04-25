const QuizReducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case "next-page": {
			return {
				...state,
				questionAnswered: toggleQuestionAnswered(state),
			};
		}
		case "answer-question": {
			const allPlayersDivs = [...document.querySelectorAll(".player-div")];
			// console.log(allPlayers);
			let correctAnswers = state.correctAnswers;
			const userChoice = action.payload;
			const userPlayer = allPlayersDivs[userChoice];
			if (userChoice === state.correctAnswer) {
				userPlayer.classList.add("success");
				correctAnswers++;
			} else {
				allPlayersDivs.map((div, index) => {
					if (index === state.correctAnswer) {
						div.classList.add("success");
					} else {
						div.classList.add("error");
					}
				});
			}

			const questionState = toggleQuestionAnswered(state);
			return {
				...state,
				questionNumber: state.questionNumber + 1,
				correctAnswers: correctAnswers,
				questionAnswered: questionState,
			};
		}
		case "set-answer": {
			return { ...state, correctAnswer: action.payload };
		}
		case "reset": {
			return action.payload;
		}
		case "change-num-questions": {
			return { ...state, questions: action.payload };
		}
	}
	console.log(state);
	return state;
};

const toggleQuestionAnswered = ({ questionAnswered }) => {
	return !questionAnswered;
};

export default QuizReducer;
