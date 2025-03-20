import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const refreshToken = request.cookies.get("refreshToken");

	if (refreshToken && (pathname === "/login" || pathname === "/register")) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!refreshToken && pathname === "/") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}
