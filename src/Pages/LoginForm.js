import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RedirectLink from "../components/form components/RedirectLink";
import FormButton from "../components/form components/FormButton";
import FormField from "../components/form components/FormField";
import { serverUrl } from "../utils/ServerUrl";
import { useGlobalContext } from "../Context";
const LoginForm = () => {
	document.title = "NBA Trivia -Login";
	const { signIntoAccount } = useGlobalContext();
	const [message, setMessage] = useState("");
	const [messageStatus, setMessageStatus] = useState("error");
	const navigate = useNavigate();
	const handleClick = ([{ loginUsername }, { loginPassword }]) => {
		if (!loginUsername || !loginPassword) {
			setMessage("Please fill out all fields");
			return;
		} else {
			fetch(`${serverUrl}login`, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: loginUsername,
					password: loginPassword,
				}),
			})
				.then((resp) => resp.json())
				.then((data) => {
					const { body } = data;
					setMessage(body.message);
					if (!body.error) {
						setMessageStatus("success");
						signIntoAccount(body.id);
					}
				});
		}
	};
	const redirectToLogin = () => {
		navigate("/");
	};
	useEffect(() => {
		if (message !== "Successfuly logged in") return;

		let redirect = setTimeout(redirectToLogin, 2000);
		return () => clearTimeout(redirect);
	}, [message]);
	return (
		<section
			id='form-container-login'
			className='logos-section flex flex-col justify-center'>
			<div className='block p-6 rounded-lg shadow-lg bg-white max-w-lg mx-auto'>
				<h2 className='text-center my-2 text-4xl '>Login</h2>

				<form className='login-form'>
					{message && <p className={messageStatus}>{message}</p>}
					<FormField
						type='text'
						label='Username'
						placeholder='Enter Username'
						name='login-username'
					/>

					<FormField
						type='password'
						label='Password'
						placeholder='Password'
						name='login-password'
					/>

					<FormButton
						btnText='Sign In'
						click={handleClick}
						inputFields={["login-username", "login-password"]}
					/>
					<RedirectLink
						message="Don't have an Account?"
						link='/sign-up'
						linkText='Sign Up'
					/>
				</form>
			</div>
		</section>
	);
};

export default LoginForm;
