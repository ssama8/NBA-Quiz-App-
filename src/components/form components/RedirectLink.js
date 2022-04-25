import React from "react";
import { Link } from "react-router-dom";
const RedirectLink = ({ message, link, linkText }) => {
	return (
		<p className='text-gray-800 mt-6 text-center'>
			{message}{" "}
			<Link
				to={link}
				className='text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'>
				{linkText}
			</Link>
		</p>
	);
};

RedirectLink.defaultProps = {
	message: "",
	link: "#",
	linkText: "",
};
export default RedirectLink;
