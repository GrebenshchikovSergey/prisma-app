export const userRequest = async (method, body) => {
	try {
		const options = {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
		};
		if (method !== "GET") {
			options["body"] = JSON.stringify(body);
		}
		const response = await fetch("/api/users", options);
		return response.json();
	} catch (error) {
		response.json({ message: `failed to ${method} user` });
	}
};
