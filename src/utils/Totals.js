const getTotals = (arr) => {
	let obj = {
		correctAnswers: 0,
		totalQuestions: 0,
	};
	const { correctAnswers, totalQuestions } = arr.reduce((a, b) => {
		const { correctAnswers, totalQuestions } = b;
		// console.log(totalQuestions);
		a.correctAnswers += correctAnswers;
		a.totalQuestions += parseInt(totalQuestions);
		return a;
	}, obj);
	// console.log(test);
	return { correctAnswers, totalQuestions };
};

export default getTotals;
