import React, { useContext, useReducer, useState } from "react";
import QuizReducer from "./reducers/Quiz.reducer";
const QuizContext = React.createContext();

const initialState = {
	questionNumber: 0,
	correctAnswers: 0,
	questionAnswered: false,
	correctAnswer: null,
	questions: 2,
};
const QuizProvider = ({ children }) => {
	const [state, dispatch] = useReducer(QuizReducer, initialState);
	const [changeQuestion, setChangeQuestion] = useState(false);
	const nextQuestion = () => {
		dispatch({ type: "next-page" });
	};

	const answerQuestion = (index) => {
		console.log("answered question");
		dispatch({ type: "answer-question", payload: index });
	};
	const setCorrectAnswer = (number) => {
		console.log("setting the correct answer", number);
		dispatch({ type: "set-answer", payload: number });
	};

	const resetToDefault = () => {
		dispatch({ type: "reset", payload: initialState });
	};
	const setTotalQuestions = (questions) => {
		dispatch({ type: "change-num-questions", payload: questions });
	};
	return (
		<QuizContext.Provider
			value={{
				state,
				nextQuestion,
				answerQuestion,
				setCorrectAnswer,
				setTotalQuestions,
				setChangeQuestion,
				changeQuestion,
				resetToDefault,
			}}>
			{children}
		</QuizContext.Provider>
	);
};

const useQuizContext = () => {
	return useContext(QuizContext);
};

export { QuizProvider };

export { useQuizContext };
