import React, { useContext, useState, useEffect } from "react";
import { serverUrl } from "./utils/ServerUrl";
import Showcase from "./components/home components/Showcase";
const App = React.createContext();

const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
const AppContext = ({ children }) => {
	const [login, setLogin] = useState(loginStatus);
	const [quizzesTaken, setQuizzesTaken] = useState([]);
	const [currentLogo, setCurrentLogo] = useState({ url: "", mascot: "" });
	const [quiz, setQuiz] = useState(false);
	const [connectionLoading, setConnectionLoading] = useState(false);
	const [reloadUser, setReloadUser] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	useEffect(() => {
		fetchUser();
	}, [reloadUser]);

	const fetchUser = async () => {
		if (!login) {
			return;
		}
		setConnectionLoading(true);

		const currentUser = localStorage.getItem("currentUser");
		const resp = await fetch(`${serverUrl}users/${currentUser}`);
		const data = await resp.json();
		setQuizzesTaken(data.results);
		setConnectionLoading(false);
	};

	const changeLogo = (url, mascot) => {
		setCurrentLogo({ url, mascot });
	};

	const logOut = () => {
		localStorage.setItem("loginStatus", false);
		setLogin(false);
		localStorage.setItem("currentUser", "");
		setTimeout(() => {
			setQuizzesTaken([]);
		}, 250);
		window.location.reload();
	};

	const signIntoAccount = (id) => {
		setLogin(true);
		localStorage.setItem("loginStatus", true);
		localStorage.setItem("currentUser", id);
		setTimeout(() => {
			setReloadUser(!reloadUser);
		}, 2100);
	};

	// if (loading) {
	// 	return (
	// 		<section>
	// 			{/* <Showcase /> */}
	// 			{loading && <div className='loading mx-auto'></div>}
	// 		</section>
	// 	);
	// }

	return (
		<App.Provider
			value={{
				login,
				setLogin,
				changeLogo,
				currentLogo,
				logOut,
				quiz,
				setQuiz,
				quizzesTaken,
				setQuizzesTaken,
				reloadUser,
				setReloadUser,
				sidebarOpen,
				setSidebarOpen,
				signIntoAccount,
				connectionLoading,
			}}>
			{children}
		</App.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(App);
};

export { AppContext };

export { useGlobalContext };
