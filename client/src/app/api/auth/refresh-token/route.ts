import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import axios from "@/config/axios";
import { COOKIE_OPTIONS } from "@/config/constants";
import type { AuthResponse } from "@/types/auth";

export async function POST() {
	try {
		const refreshToken = (await cookies()).get("refreshToken");
		const sessionId = (await cookies()).get("sessionId");
		if (!refreshToken?.value || !sessionId?.value) {
			(await cookies()).delete("accessToken");
			return NextResponse.json({ success: true, accessToken: null });
		}

		const { data } = await axios.post<AuthResponse>("/auth/refresh-token", {
			refreshToken: refreshToken.value,
			sessionId: sessionId.value,
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
