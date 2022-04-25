import React from "react";

const Message = ({ name, message }) => {
	return <p className={name}> {message}</p>;
};

export default Message;
