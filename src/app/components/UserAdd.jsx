"use client";
import { useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "next/navigation";
import { useSocketStore } from "../stores/socketStore";
const UserAdd = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const addUser = useUserStore((state) => state.addUser);
	const socket = useSocketStore((state) => state.socket);
	const router = useRouter();

	const submitFormHandler = async (e) => {
		e.preventDefault();
		try {
			await addUser(name, email);
			setEmail("");
			setName("");
			localStorage.setItem("email", email);
			socket.emit("newUser", { name, email });
			router.push("/chat");
		} catch (e) {
			console.error("Failed to create user");
		}
	};

	return (
		<main>
			<form onSubmit={submitFormHandler} style={{ marginBottom: "50px" }}>
				<h2>Регистрация</h2>
				<input value={name} onChange={(e) => setName(e.target.value)} />
				<input value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type="submit">Отправить</button>
			</form>
		</main>
	);
};

export default UserAdd;
