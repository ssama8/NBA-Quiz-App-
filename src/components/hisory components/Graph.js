// import React from "react";

// const Graph = () => {
// 	return <div>Graph</div>;
// };

// export default Graph;
// STEP 1 - Include Dependencies
// Include react
import React from "react";

import Chart from "./Chart";
import DataTable from "./DataTable";
import getTotals from "../../utils/Totals";
// STEP 2 - Chart Data

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
const Graph = ({ values }) => {
	const data = values.map((quiz) => {
		const { mascot, correctAnswers, totalQuestions } = quiz;
		const percent = ((correctAnswers / totalQuestions) * 100).toFixed();
		return {
			label: mascot,
			value: percent,
		};
	});
	const east = [];
	const west = [];
	values.forEach((team) => {
		const { conference } = team;
		conference === "east" ? east.push(team) : west.push(team);
	});
	east.push(getTotals(east));
	west.push(getTotals(west));
	// const west = values.filter((tea))
	console.log(east);
	return (
		<section className='flex flex-col items-center '>
			<Chart data={data} />
			<section className='flex justify-between results-container text-center'>
				<div className='border-2 border-gray'>
					<h2>Eastern Conference</h2>
					<DataTable data={east} />
				</div>
				<div className='border-2 border-gray'>
					<h2>Western Conference</h2>
					<DataTable data={west} />
				</div>
			</section>
		</section>
	);
};

export default Graph;
