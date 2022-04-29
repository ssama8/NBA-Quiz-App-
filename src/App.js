import Home from "./Pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import History from "./Pages/History";
import Footer from "./components/Footer";
import Hamburger from "./components/Hamburger";

//How well do you know your team from the 2017-2018 season
function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Sidebar />
				<Hamburger />

				<Routes>
					<Route path='/' element={<Home />}>
						{" "}
					</Route>
					<Route path='/history' element={<History />}></Route>
					<Route path='/login' element={<LoginForm />}></Route>
					<Route path='/sign-up' element={<SignupForm />}></Route>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
