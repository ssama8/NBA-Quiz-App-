import React, { useState, useEffect } from "react";
import FormField from "../components/form components/FormField";
import RedirectLink from "../components/form components/RedirectLink";
import FormButton from "../components/form components/FormButton";
import Message from "../components/form components/Message";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../utils/ServerUrl";

const SignupForm = () => {
	document.title = "NBA Trivia -Signup";
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
		<section
			className='logos-section py-12 flex flex-col justify-center'
			id='form-container'>
			<section>
				<div className='block p-6 rounded-lg shadow-lg bg-white max-w-lg mx-auto self-center'>
					<h2 className='text-center text-4xl mt-3 font-bold z-50 '>
						{" "}
						Sign Up{" "}
					</h2>

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
		</section>
	);
};

export default SignupForm;
