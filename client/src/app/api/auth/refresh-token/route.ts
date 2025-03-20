import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";
import { COOKIE_OPTIONS } from "@/config/constants";
import type { AuthResponse } from "@/types/auth";

export async function GET() {
	try {
		const refreshToken = (await cookies()).get("refreshToken");
		if (!refreshToken?.value) {
			return NextResponse.json({ success: true, accessToken: null });
		}

		const { data } = await axios.get<AuthResponse>("/auth/refresh-token", {
			headers: { Cookie: `refreshToken=${refreshToken?.value}` },
		});

		if (!data.accessToken) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		(await cookies()).set("accessToken", data.accessToken, COOKIE_OPTIONS(10 * 60)); // 10 minutes
		return NextResponse.json({ success: true, accessToken: data.accessToken });
	} catch {
		return NextResponse.json({ error: "Failed to refresh token" }, { status: 401 });
	}
}
