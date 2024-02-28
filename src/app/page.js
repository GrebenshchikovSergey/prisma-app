"use client";
import { useEffect } from "react";
import UserAdd from "./components/UserAdd";
import UserList from "./components/UserList";
import { useUserStore } from "./stores/userStore";
import { useSocketStore } from "./stores/socketStore";
import Link from "next/link";

export default function Home() {
	const getAllUsers = useUserStore((state) => state.getAllUsers);
	const allUsers = useUserStore((state) => state.users);
	const socket = useSocketStore((state) => state.socket);
	const connectSocket = useSocketStore((state) => state.connectSocket);

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		if (!socket) {
			connectSocket();
		}
	}, [socket]);

	return (
		<main>
			<Link href="/chat">В чат</Link>
			<UserAdd />

			<ul>
				{allUsers.length > 0 && allUsers.map((user) => <UserList key={user.id} user={user} />)}
			</ul>
		</main>
	);
}
