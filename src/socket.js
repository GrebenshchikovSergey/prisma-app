import { Server } from "socket.io";

const io = new Server({
	cors: {
		origin: "http://localhost:3000",
	},
});

io.listen(4000);

const users = [{ name: "vasya", email: "pupkinee12" }];

io.on("connection", (socket) => {
	console.log(`user ${socket.id} was connected`);

	socket.on("message", (data) => {
		io.emit("messageSocket", data);
	});

	io.emit("initUsers", users);

	socket.on("newUser", (user) => {
		users.push(user);
		io.emit("newUserSocket", user);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
