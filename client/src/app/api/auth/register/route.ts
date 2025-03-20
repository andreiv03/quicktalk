import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";
import { COOKIE_OPTIONS } from "@/config/constants";
import type { AuthResponse, RegisterFormData } from "@/types/auth";
import { extractToken } from "@/utils/helpers";

export async function POST(req: Request) {
	try {
		const { username, email, password } = await req.json();
		const formData: RegisterFormData = { username, email, password };

		const { data, headers } = await axios.post<AuthResponse>("/auth/register", formData);
		if (!data.accessToken) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const refreshToken = extractToken(headers["set-cookie"], "refreshToken");
		if (!refreshToken) {
			return NextResponse.json({ error: "Refresh token is missing" }, { status: 400 });
		}

		(await cookies()).set("refreshToken", refreshToken, COOKIE_OPTIONS(7 * 24 * 60 * 60)); // 7 days
		(await cookies()).set("accessToken", data.accessToken, COOKIE_OPTIONS(10 * 60)); // 10 minutes

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}
}
