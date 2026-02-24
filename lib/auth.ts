import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const TOKEN_NAME = "portfolio_token";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  return new TextEncoder().encode(secret);
}

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

export async function signToken(payload: JwtPayload) {
  const secretKey = getSecretKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  const secretKey = getSecretKey();
  const { payload } = await jwtVerify(token, secretKey);
  return payload as unknown as JwtPayload;
}

export async function requireApiAuth(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);
    if (payload.role !== "admin") {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export const AUTH_TOKEN_NAME = TOKEN_NAME;
