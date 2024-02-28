"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MessageBlock from "../components/MessageBlock";
import AddMessageForm from "../components/AddMessageForm";
import UsersInChat from "../components/UsersInChat";

const Chat = () => {
	const [myEmail, setMyEmail] = useState("");
	useEffect(() => {
		setMyEmail(localStorage.getItem("email"));
	});
	return (
		<div style={{ maxWidth: "800px", margin: "0 auto" }}>
			<nav>
				<Link href="/">На главную</Link>
			</nav>
			<UsersInChat />

			<MessageBlock />

			<AddMessageForm />
		</div>
	);
};

export default Chat;
