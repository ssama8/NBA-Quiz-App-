import React from "react";

const Legend = () => {
	return (
		<section className='flex flex-col justify-center absolute legend border-2'>
			<h3 className='text-xl'>Border Colors</h3>
			<div className='flex  my-2'>
				<div
					className='legend-color'
					style={{ background: "white", height: "15px", width: "15px" }}></div>
				<p> *Haven't taken quiz yet </p>
			</div>
			<div className='flex '>
				<div
					className='legend-color '
					style={{ background: "red", height: "15px", width: "15px" }}></div>
				<p> * Failed, Less than 50% </p>
			</div>
			<div className='flex  my-3'>
				<div
					className='legend-color '
					style={{ background: "yellow", height: "15px", width: "15px" }}></div>
				<p> *Passed, 50-74% </p>
			</div>
			<div className='flex '>
				<div
					className='legend-color '
					style={{ background: "green", height: "15px", width: "15px" }}></div>
				<p> *Excellent, 75-100% </p>
			</div>
		</section>
	);
};

export default Legend;
