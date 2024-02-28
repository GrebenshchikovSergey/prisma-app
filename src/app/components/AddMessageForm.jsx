import React, { useState } from "react";
import { useSocketStore } from "../stores/socketStore";

const AddMessageForm = () => {
	const [message, setMessage] = useState("");
	const socket = useSocketStore((state) => state.socket);

	const sendMessageHandler = (e) => {
		e.preventDefault();
		if (message.trim() && socket) {
			socket.emit("message", {
				text: message,
				id: socket.id,
				email: localStorage.getItem("email"),
			});
			setMessage("");
		}
	};
	return (
		<form
			style={{
				position: "fixed",
				display: "flex",
				flexDirection: "column",
				gap: "30px",
				bottom: "100px",
				width: "40%",
			}}
			onSubmit={sendMessageHandler}
		>
			<h6 style={{ textAlign: "center" }}>Введите ваше сообщение</h6>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				style={{ width: "100%" }}
			/>
			<button type="submit" style={{ width: "100%" }}>
				Отправить сообщение
			</button>
		</form>
	);
};

export default AddMessageForm;
