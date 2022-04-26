import { useEffect, useState } from "react";
import Showcase from "../components/home components/Showcase";
import LogoShowcase from "../components/home components/LogoShowcase";
import QuizForm from "../components/home components/QuizForm";
import Players from "../components/home components/Players";
import { useQuizContext } from "../QuizContext";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";
const baseTeamUrl = "https://nba-players.herokuapp.com/players-stats-teams/";
const Home = () => {
	const { login, currentLogo, quiz, setQuiz } = useGlobalContext();
	const { setTotalQuestions } = useQuizContext();
	const [team, setTeam] = useState("");
	const [mascot, setMascot] = useState("");
	const [players, setPLayers] = useState([]);
	const [numQuestions, setNumQuestions] = useState(4);

	useEffect(() => {
		fetchPlayers(team);
	}, [quiz]);
	const fetchPlayers = async (team) => {
		if (!team) return;
		try {
			const test = `${baseTeamUrl}${team}`;
			console.log(test);
			const request = fetch(`${baseTeamUrl}${team}`)
				.then((data) => {
					return data.json();
				})
				.then((resp) => {
					setPLayers(resp);
				});
			console.log(request);
		} catch (err) {
			console.log(err);
		}
	};
	const changeTeams = (team, mascot) => {
		setTeam(team);
		setMascot(mascot);
	};
	return (
		<section className='text-center flex flex-col justify-center logos-section'>
			<Showcase />
			<h4 className='my-7 season-explanation text-2xl'>
				All of these questions are based on the 2017-2018 NBA Season{" "}
			</h4>
			{!quiz && <h2 className='text-4xl font-bold'>Choose A Team</h2>}

			{!quiz && <LogoShowcase changeTeam={changeTeams} players={players} />}

			{mascot &&
				!quiz &&
				(login ? (
					<h2 className='text-4xl my-8'>
						{" "}
						{`See how well you know the 2017-2018 ${mascot}`}
					</h2>
				) : (
					<h2 className='text-4xl'>
						Please <Link to='/login'>Login</Link> or{" "}
						<Link to='sign-up'>SignUp</Link> to take quiz
					</h2>
				))}
			{login && !quiz && team && (
				<div>
					<h5 className='text-2xl my-2'>{numQuestions} Questions </h5>
					<div className='flex justify-center my-7'>
						<label htmlFor='questions' className='text-xl mx-2'>
							Questions
						</label>
						<input
							type='range'
							id='questions'
							min='4'
							max='10'
							value={numQuestions}
							onChange={(e) => {
								setNumQuestions(e.target.value);
							}}
						/>
					</div>
					<button
						className='py-3.5 px-5 btn '
						onClick={() => {
							localStorage.setItem(
								"currentTeamQuiz",
								JSON.stringify(currentLogo)
							);
							setQuiz(true);
							setTotalQuestions(numQuestions);
						}}>
						{" "}
						Start The Quiz
					</button>
				</div>
			)}
			{quiz && <Players players={players} />}
			{quiz && <QuizForm />}
		</section>
	);
};

export default Home;
