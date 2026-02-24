import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";
import { loginSchema } from "@/lib/validators";
import { setAuthCookie, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ message: "Invalid input." }, { status: 400 });
    }

    await connectDB();

    const email = parseResult.data.email.toLowerCase();
    const password = parseResult.data.password;

    let admin = await Admin.findOne({ email });

    if (!admin && process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      admin = await Admin.create({
        email,
        password: hashed,
        role: "admin",
      });
    }

    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = await signToken({
      sub: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({ message: "Login successful." });
  } catch {
    return NextResponse.json(
      { message: "Could not complete login request." },
      { status: 500 }
    );
  }
}
