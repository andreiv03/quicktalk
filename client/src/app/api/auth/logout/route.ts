import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";

export async function POST() {
	try {
		await axios.post("/auth/logout");
		(await cookies()).delete("refreshToken");
		(await cookies()).delete("accessToken");
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Failed to logout" }, { status: 400 });
	}
}
