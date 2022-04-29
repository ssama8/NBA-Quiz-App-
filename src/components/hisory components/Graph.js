// import React from "react";

// const Graph = () => {
// 	return <div>Graph</div>;
// };

// export default Graph;
// STEP 1 - Include Dependencies
import React from "react";
import EasternConference from "../../utils/Confereces";

import Chart from "./Chart";
import DataTable from "./DataTable";
import getTotals from "../../utils/Totals";
import { useGlobalContext } from "../../Context";

const Graph = () => {
	const { quizzesTaken } = useGlobalContext();
	const data = quizzesTaken.map((quiz) => {
		const { mascot, correctAnswers, totalQuestions } = quiz;
		const percent = ((correctAnswers / totalQuestions) * 100).toFixed();
		return {
			label: mascot,
			value: percent,
		};
	});
	const east = [];
	const west = [];
	quizzesTaken.forEach((team) => {
		const { mascot } = team;
		if (EasternConference.find((team) => team === mascot)) {
			east.push(team);
		} else {
			west.push(team);
		}
	});
	east.push(getTotals(east));
	west.push(getTotals(west));
	return (
		<section className='flex flex-col items-center '>
			<Chart data={data} />
			<section className='flex justify-between results-container text-center'>
				<div className='border-2 border-gray'>
					<h2 className='text-2xl'>Eastern Conference</h2>
					<DataTable data={east} />
				</div>
				<div className='border-2 border-gray'>
					<h2 className='text-2xl'>Western Conference</h2>
					<DataTable data={west} />
				</div>
			</section>
		</section>
	);
};

export default Graph;
