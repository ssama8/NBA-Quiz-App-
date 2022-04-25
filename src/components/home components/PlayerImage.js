import React from "react";
import { useQuizContext } from "../../QuizContext";
const emptyPlayer =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBeSddk6o4KutbqQaadUrZdtaWia-Yns2ywR9jTmzInrvEhesiyEobbnX2sUWfsWWACI&usqp=CAU";
const baseImageUrl = "https://nba-players.herokuapp.com/players/";
const PlayerImage = ({ names, index }) => {
	const { answerQuestion, state } = useQuizContext();
	const { questionAnswered } = state;
	const handleError = (e) => {
		e.target.src = emptyPlayer;
	};
	let imageUrl = `${baseImageUrl}${names[1]}/${names[0]}`;
	if (names.length > 2) {
		imageUrl = emptyPlayer;
	}
	return (
		<div
			className='player-div'
			onClick={() => {
				if (questionAnswered) return;
				answerQuestion(index);
			}}>
			<img
				src={imageUrl}
				className='player-image'
				alt={`${names.join(" ")}`}
				onError={(e) => handleError(e)}
			/>
			<p>{names.join(" ")}</p>
		</div>
	);
};

export default PlayerImage;
