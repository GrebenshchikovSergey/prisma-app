import Server from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request) {
	const data = await request.json();
	const user = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
		},
	});
	return Server.NextResponse.json({ message: `user with name ${user.name} was created` });
}

export async function GET() {
	const users = await prisma.user.findMany();
	return Server.NextResponse.json({ users });
}

export async function PATCH(request) {
	const { id, name } = await request.json();
	await prisma.user.update({
		where: {
			id: id,
		},
		data: {
			name: name,
		},
	});
	return Server.NextResponse.json({ message: `user with id ${id} was updated` });
}
export async function DELETE(request) {
	const { id } = await request.json();
	await prisma.user.delete({
		where: {
			id: id,
		},
	});
	return Server.NextResponse.json({ message: `user with id ${id} was removed` });
}
