import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const { email, name } = await req.json();

    // Do something with the user (save to DB, log, etc.)
    console.log("✅ Authenticated user:", uid, email, name);

    return NextResponse.json({ message: "User saved!" });
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
