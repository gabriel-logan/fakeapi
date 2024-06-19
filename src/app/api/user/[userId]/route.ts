import { NextRequest, NextResponse } from "next/server";

import UserFakeModel from "@/db/models/UserFakeModel";
import { Users } from "@/types/UserProps";

export async function generateStaticParams() {
	const users: Users = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_URL}/api/user`,
	).then((res) => res.json());

	return users.map((user) => ({
		userId: user.id.toString(),
	}));
}

export async function GET(
	request: NextRequest,
	{ params: { userId } }: { params: { userId: string } },
) {
	let parsedUserId: number;

	try {
		parsedUserId = parseInt(userId, 10);
	} catch {
		return NextResponse.json({
			status: 400,
			message: "Invalid user id",
		});
	}

	const user = await UserFakeModel.findById(parsedUserId.toString());

	if (!user) {
		return NextResponse.json({
			status: 404,
			message: `User with id ${userId} not found`,
		});
	}

	return NextResponse.json(user, { status: 200 });
}
