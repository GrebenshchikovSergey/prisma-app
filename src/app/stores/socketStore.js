import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import socketIO from "socket.io-client";

export const useSocketStore = create(
	immer((set) => ({
		socket: "",
		connectSocket: () => {
			set((state) => {
				state.socket = socketIO.connect("http://localhost:4000");
			});
		},
	}))
);
