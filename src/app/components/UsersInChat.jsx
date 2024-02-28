import React, { useEffect, useState } from "react";
import { useSocketStore } from "../stores/socketStore";

const UsersInChat = () => {
	const socket = useSocketStore((state) => state.socket);
	const [users, setUsers] = useState([]);

	const getInitUsers = (users) => {
		console.log("users", users);
		setUsers(users);
	};

	// const setNewUser = (user) => {
	// 	console.log("user", user);
	// 	setUsers((prev) => [...prev, user]);
	// };

	useEffect(() => {
		if (socket) {
			socket.on("initUsers", getInitUsers);
		}

		return () => {
			if (socket) {
				socket.off("initUsers", getInitUsers);
			}
		};
	}, [socket, users]);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("newUserSocket", setNewUser);
	// 	}

	// 	return () => {
	// 		if (socket) {
	// 			socket.off("newUserSocket", setNewUser);
	// 		}
	// 	};
	// }, [socket, users]);

	return (
		<div style={{ marginTop: "30px" }}>
			<ul>
				{/* {users.length > 0 &&
					users.map((user) => {
						return <li key={user.email}>{user.email}</li>;
					})} */}
				{users?.length > 0 && JSON.stringify(users)}
			</ul>
		</div>
	);
};

export default UsersInChat;
