import React from "react";

const removeHyphen = (string) => {
	console.log(string);
	let capitalWord = string.split("-");
	let uppercaseWord =
		capitalWord[1].charAt(0).toUpperCase() + capitalWord[1].slice(1);
	capitalWord[1] = uppercaseWord;
	return capitalWord.join("");
};
const FormButton = ({ btnText, click, inputFields }) => {
	console.log(inputFields);
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				let newArr = inputFields.map((field) => {
					let key = field;
					const value = document.querySelector(`.${key}`).value;
					if (key.indexOf("-") !== -1) {
						key = removeHyphen(key);
					}
					return { [key]: value };
				});
				console.log(newArr);
				click(newArr);

				// const username = document.querySelector(".username").value;
				// const confirmUsername =
				// 	document.querySelector(".confirm-username").value;
				// const password = document.querySelector(".password").value;
				// const confirmPassword =
				// 	document.querySelector(".confirm-password").value;
			}}
			type='submit'
			className='
					w-full
					px-6
					py-2.5
					bg-blue-600
					text-white
					font-medium
					text-xs
					leading-tight
					uppercase
					rounded
					shadow-md
					hover:bg-blue-700 hover:shadow-lg
					focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
					active:bg-blue-800 active:shadow-lg
					transition
					duration-150
					ease-in-out'>
			{btnText}
		</button>
	);
};

export default FormButton;
