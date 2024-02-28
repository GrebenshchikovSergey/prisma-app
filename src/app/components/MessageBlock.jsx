import React, { useEffect, useState } from "react";
import { useSocketStore } from "../stores/socketStore";

const MessageBlock = () => {
	const [messages, setMessages] = useState([]);
	const socket = useSocketStore((state) => state.socket);
	const connectSocket = useSocketStore((state) => state.connectSocket);

	const messageHandler = (data) => {
		setMessages((prev) => [...prev, data]);
	};

	useEffect(() => {
		if (socket) {
			socket.on("messageSocket", messageHandler);
		} else {
			connectSocket();
		}
		return () => {
			if (socket) socket.off("messageSocket", messageHandler);
		};
	}, [socket, messages]);
	return (
		<div style={{ overflowY: "auto", maxHeight: "600px", padding: "30px" }}>
			{messages.length > 0 &&
				messages.map((message) => {
					return message.email === localStorage.getItem("email") ? (
						<div style={{ textAlign: "right" }}>
							<h3>Вы</h3>
							<p>{message.text}</p>
						</div>
					) : (
						<div style={{ textAlign: "left" }}>
							<h3>{message.email}</h3>
							<p>{message.text}</p>
						</div>
					);
				})}
		</div>
	);
};

export default MessageBlock;
