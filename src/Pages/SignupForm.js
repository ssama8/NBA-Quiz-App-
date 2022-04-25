import React, { useState, useEffect } from "react";
import FormField from "../components/form components/FormField";
import RedirectLink from "../components/form components/RedirectLink";
import FormButton from "../components/form components/FormButton";
import Message from "../components/form components/Message";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/ServerUrl";
const SignupForm = () => {
	const [message, setMessage] = useState("");
	const [messageStatus, setMessageStatus] = useState("error");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleClick = ([
		{ username },
		{ confirmUsername },
		{ password },
		{ confirmPassword },
	]) => {
		setLoading(true);
		setTimeout(() => {
			validateInformation(username, confirmUsername, password, confirmPassword);
		}, 750);

		setTimeout(() => {
			setLoading(false);
		}, 750);
	};
	const redirectToLogin = () => {
		console.log("running");
		navigate("/login");
	};
	const validateInformation = (
		username,
		confirmUsername,
		password,
		confirmPassword
	) => {
		if ((!username, !confirmUsername, !password, !confirmPassword)) {
			setMessage("Please Fill out All Fields");
			return;
		}
		const usernameNotValid = validateField(
			username,
			confirmUsername,
			"Username"
		);
		if (usernameNotValid) {
			setMessage(usernameNotValid);
			return;
		} else {
			const passwordNotValid = validateField(
				password,
				confirmPassword,
				"Password"
			);
			if (passwordNotValid) {
				console.log("running");
				setMessage(passwordNotValid);
			} else {
				//Post User
				fetch(`${serverUrl}users`, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, password: password }),
				})
					.then((resp) => resp.json())
					.then((data) => {
						console.log(data);
						const { body } = data;
						console.log(body.results);
						// localStorage.setItem("currentUser", body.id);
						setMessage(body.message);
					});
				setMessageStatus("success");
			}
		}
	};
	useEffect(() => {
		if (message !== "Account successfuly created") return;

		let redirect = setTimeout(redirectToLogin, 2000);
		return () => clearTimeout(redirect);
	}, [message]);

	const validateField = (username, usernameConfirmation, field) => {
		if (username !== usernameConfirmation) return `${field}s must match`;
		else if (username.length < 6)
			return `${field} must be atleast 6 characters long`;
		else if (!/\d/.test(username)) {
			return `${field} must have atleast one number`;
		} else if (!/[A-Z]/.test(username)) {
			return `${field} must have atleast one capital letter`;
		} else {
			return "";
		}
	};

	return (
		<section className='logos-section py-12'>
			<h2 className='text-center text-4xl mt-3 font-bold'> Sign Up </h2>
			<div className='block p-6 rounded-lg form-container shadow-lg bg-white max-w-lg mx-auto self-center'>
				<form>
					{loading && (
						<div className='form-loading'>
							<div className='loading'></div>
						</div>
					)}
					{message && <Message name={messageStatus} message={message} />}
					<FormField
						type='text'
						label='Username'
						placeholder='Enter Username'
						name='username'
					/>
					<FormField
						type='text'
						label='Confirm Username'
						placeholder='Confirm Username'
						name='confirm-username'
					/>

					<FormField
						type='text'
						label='Password'
						placeholder='Password'
						name='password'
					/>
					<FormField
						type='text'
						label='Confirm Password'
						placeholder='Confirm Password'
						name='confirm-password'
					/>

					{/* <div className='flex justify-between items-center mb-6'>
					<div className='form-group form-check'>
						<input
							type='checkbox'
							className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
							id='exampleCheck2'
						/>
						<label
							className='form-check-label inline-block text-gray-800'
							htmlFor='exampleCheck2'>
							Remember me
						</label>
					</div>
					<a
						href='#!'
						className='text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'>
						Forgot password?
					</a>
				</div> */}

					<FormButton
						btnText='Sign Up'
						click={handleClick}
						inputFields={[
							"username",
							"confirm-username",
							"password",
							"confirm-password",
						]}
					/>
					<RedirectLink
						message='Already have an Account?'
						link='/login'
						linkText='Sign In'
					/>
				</form>
			</div>
		</section>
	);
};

export default SignupForm;
