import React from "react";

import ReactFC from "react-fusioncharts";

import FusionCharts from "fusioncharts";

import Column2D from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Chart = ({ data }) => {
	console.log(window.innerWidth);
	const chartConfigs = {
		type: "column2d",
		width: "100%",
		height: "100%",
		dataFormat: "json",
		dataSource: {
			chart: {
				caption: "Teams",
				xAxisName: "team",
				yAxisName: "Percentage",
				numberSuffix: "%",
				yAxisMaxValue: "100",
				theme: "fusion",
			},
			data: data,
		},
	};

	return <ReactFC className='bar-graph' {...chartConfigs} />;
};

export default Chart;
