import { NextResponse } from "next/server";

import UserFakeModel from "@/db/models/UserFakeModel";

export async function GET() {
	const users = await UserFakeModel.findAll();

	return NextResponse.json(users, { status: 200 });
}
