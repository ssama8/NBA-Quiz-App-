import React from "react";
import styled from "styled-components";
const DataTable = ({ data }) => {
	if (data === undefined) return <></>;
	const setPercentClass = (percent) => {
		if (percent < 50) return "fail-quiz";
		if (percent < 75) return "pass-quiz";
		return "honors-quiz";
	};
	return (
		<Wrapper>
			<tr>
				<th> Logo </th>
				<th> Team </th>
				<th> Correct</th>
				<th>Total</th>
				<th>Score </th>
			</tr>

			{data.map((quiz) => {
				const { correctAnswers, mascot, team, totalQuestions } = quiz;
				const percent = ((correctAnswers / totalQuestions) * 100).toFixed();
				return (
					<tr>
						{mascot && (
							<td>
								<img src={team} alt={mascot} className='data-image' />
							</td>
						)}
						{mascot && <td> {mascot}</td>}
						{!mascot && <td className='colspan-2'> Total </td>}
						{!mascot && <td className='colspan-2'> Scores </td>}
						<td> {correctAnswers}</td>
						<td> {totalQuestions}</td>
						<td className={`${setPercentClass(percent)} font-bold`}>
							{percent}%{" "}
						</td>
					</tr>
				);
			})}
		</Wrapper>
	);
};

export default DataTable;

const Wrapper = styled.table`
	// padding: 10rem;
	td,
	th {
		padding: 1rem;
		font-size: 1.05rem;
	}
	.fail-quiz {
		color: red;
	}
	.pass-quiz {
		color: orange;
	}
	.honors-quiz {
		color: green;
	}

	@media screen and (max-width: 1200px) {
		td,
		th {
			padding: 0.5rem;
			font-size: 1rem;
		}
	}

	@media screen and (max-width: 1000px) {
		td,
		th {
			padding: 0.25rem;
			font-size: 0.9rem;
		}
	}
`;
