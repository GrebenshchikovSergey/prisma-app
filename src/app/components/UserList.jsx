import React, { useState } from "react";
import { useUserStore } from "../stores/userStore";

const UserList = ({ user }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [newName, setNewName] = useState("");

	const deleteUserStore = useUserStore((state) => state.deleteUser);
	const patchUserStore = useUserStore((state) => state.patchUser);

	const patchUserHandler = (e) => {
		e.preventDefault();
		patchUserStore(user.id, newName);
		setIsEdit(false);
	};

	return (
		<li
			style={{ display: "flex", height: "30px", padding: "5px", alignItems: "center", gap: "5px" }}
		>
			{isEdit ? (
				<form onSubmit={patchUserHandler}>
					<input
						placeholder={user.name}
						value={newName}
						onChange={(e) => {
							setNewName(e.target.value);
						}}
					/>
					<button type="submit">+</button>
				</form>
			) : (
				<h3 onClick={() => setIsEdit(true)}>
					{user.name} {user.email}
				</h3>
			)}
			<button onClick={() => deleteUserStore(user.id)}>x</button>
		</li>
	);
};

export default UserList;
