import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;
const TOKEN_NAME = "portfolio_token";

async function isValidToken(token: string) {
  if (!secret) {
    return false;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(TOKEN_NAME)?.value;

    if (!token || !(await isValidToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
