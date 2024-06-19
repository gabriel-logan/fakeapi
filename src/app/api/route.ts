import { NextResponse } from "next/server";

export function GET() {
	const endpoints = {
		"/api/user": "GET",
		"/api/user/:id": "GET",
	};

	return NextResponse.json({ endpoints });
}
