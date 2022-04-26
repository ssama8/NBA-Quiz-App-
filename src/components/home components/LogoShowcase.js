import React, { useEffect, useState } from "react";
import { serverUrl } from "../../utils/ServerUrl";
import { useGlobalContext } from "../../Context";
import LogoModal from "./LogoModal";
import Legend from "./Legend";
import styled from "styled-components";
const logoUrl = `${serverUrl}logos`;

const LogoShowcase = ({ changeTeam }) => {
	const [logos, setLogos] = useState([]);
	const [modalQuiz, setModalQuiz] = useState({});
	const [loading, setLoading] = useState(false);
	const { changeLogo, quizzesTaken, connectionLoading } = useGlobalContext();

	const fetchLogos = async () => {
		setLoading(true);
		try {
			const response = fetch(logoUrl)
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					setLogos(data);
				});
		} catch (error) {}
		setLoading(false);
	};

	useEffect(() => {
		fetchLogos();
	}, []);

	console.log(connectionLoading);
	if (connectionLoading || logos.length < 1) {
		return (
			<section>
				<div className='loading mx-auto'></div>
			</section>
		);
	}

	const getLogoQuiz = (percent) => {
		if (percent < 50) {
			return "fail";
		}
		if (percent < 75) {
			return "pass";
		}
		return "excellent";
	};
	const handleClick = (alt, mascot, url, e) => {
		let node = e.target;
		if (e.target.src) {
			node = e.target.parentNode;
		}
		const alreadySelected = document.querySelector(".selected");
		if (alreadySelected) {
			if (node === alreadySelected) return;
			alreadySelected.classList.remove("selected");
		}
		changeLogo(url, mascot);
		changeTeam(alt, mascot);
		node.classList.add("selected");
	};

	if (loading) {
		return <div className='loading mx-auto my-8'></div>;
	}
	return (
		<Wrapper>
			<div className='grid grid-cols-8 gap-4 logo-grid mx-auto relative'>
				{logos.map((logo, index) => {
					let taken = "";
					const { id, name, url, mascot } = logo;
					const quiz = quizzesTaken.find((quiz) => quiz.mascot === mascot);
					if (quiz) {
						const { correctAnswers, totalQuestions } = quiz;

						taken = getLogoQuiz((correctAnswers / totalQuestions) * 100);
					}
					return (
						<div
							className={`logo-image ${taken} border-2`}
							key={index}
							onClick={(e) => handleClick(name, mascot, url, e)}>
							<img src={url} alt={name} />
							{taken && (
								<button
									className='modal-button'
									onClick={() => setModalQuiz(quiz)}>
									{" "}
									View Result
								</button>
							)}
						</div>
					);
				})}
				{modalQuiz.hasOwnProperty("correctAnswers") && (
					<LogoModal {...modalQuiz} resetModalQuiz={setModalQuiz} />
				)}
				<Legend />
			</div>
		</Wrapper>
	);
};

export default LogoShowcase;

const Wrapper = styled.section`
	@media screen and (max-width: 1050px) {
		.modal-button {
			display: none;
		}
	}
	@media screen and (max-width: 850px) {
		.logo-grid {
			grid-template-columns: repeat(6, 1fr);
		}
	}
	@media screen and (max-width: 650px) {
		.logo-grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}
	@media screen and (max-width: 500px) {
		.logo-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
`;
