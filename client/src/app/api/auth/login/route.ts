import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";
import { COOKIE_OPTIONS } from "@/config/constants";
import type { AuthResponse, LoginFormData } from "@/types/auth";

export async function POST(req: Request) {
	try {
		const { username, password, userAgent, ip } = await req.json();
		const formData: LoginFormData = { username, password, userAgent, ip };

		const { data } = await axios.post<AuthResponse>("/auth/login", formData);
		if (!data.accessToken || !data.refreshToken || !data.sessionId) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		(await cookies()).set("accessToken", data.accessToken, COOKIE_OPTIONS(10 * 60)); // 10 minutes
		(await cookies()).set("refreshToken", data.refreshToken, COOKIE_OPTIONS(7 * 24 * 60 * 60)); // 7 days
		(await cookies()).set("sessionId", data.sessionId, COOKIE_OPTIONS(7 * 24 * 60 * 60)); // 7 days

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
}
