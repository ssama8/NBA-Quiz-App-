const getTime = (time) => {
	let seconds = time / 1000;
	const minutes = Math.floor(seconds / 60) % 60;
	let hours = Math.floor(seconds / 3600);
	const days = Math.floor(hours / 24);
	hours = hours % 24;
	seconds = Math.floor(seconds % 60);
	// console.log(days, hours, minutes, seconds);
	return Object.entries({ days, hours, minutes, seconds });
};

export default getTime;
