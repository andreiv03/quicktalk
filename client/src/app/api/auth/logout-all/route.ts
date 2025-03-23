import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";

export async function POST(req: Request) {
	try {
		const { userId } = await req.json();
		await axios.post("/auth/logout-all", { userId });

		(await cookies()).delete("accessToken");
		(await cookies()).delete("refreshToken");
		(await cookies()).delete("sessionId");

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Failed to logout" }, { status: 400 });
	}
}
