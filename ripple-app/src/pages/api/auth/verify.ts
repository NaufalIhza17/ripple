import type { NextApiRequest, NextApiResponse } from "next";
import { verifyFirebaseToken } from "@/lib/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split("Bearer ")[1];
  const decoded = await verifyFirebaseToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  // Token is valid
  return res.status(200).json({
    message: "Token is valid",
    user: {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null,
    },
  });
}
