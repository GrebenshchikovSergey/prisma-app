import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { userRequest } from "../server/user.request";

export const useUserStore = create(
	immer((set) => ({
		users: [],
		getAllUsers: async () => {
			try {
				const response = await userRequest("GET");
				set((state) => {
					state.users = response.users.sort((a, b) => a.id - b.id);
				});
			} catch (error) {
				console.error(error);
			}
		},
		addUser: async (name, email) => {
			try {
				await userRequest("POST", { name, email });
				set((state) => {
					state.getAllUsers();
				});
			} catch (error) {
				console.error(error);
			}
		},
		deleteUser: async (id) => {
			try {
				await userRequest("DELETE", { id });
				set((state) => {
					state.getAllUsers();
				});
			} catch (error) {
				console.error("Failed to delete user");
			}
		},
		patchUser: async (id, name) => {
			try {
				await userRequest("PATCH", { id, name });
				set((state) => {
					state.getAllUsers();
				});
			} catch (e) {
				console.error("Failed to delete user");
			}
		},
	}))
);
