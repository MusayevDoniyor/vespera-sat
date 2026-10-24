import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser, hashPassword, comparePassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Fetch user to check password
    const userRes = await pool.query(
      "SELECT password_hash FROM vespera.users WHERE id = $1 LIMIT 1;",
      [session.userId]
    );

    if (userRes.rows.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const currentHash = userRes.rows[0].password_hash;

    // If user has existing password (not google-only dummy password), verify it
    if (currentPassword) {
      const match = await comparePassword(currentPassword, currentHash);
      if (!match) {
        return NextResponse.json(
          { error: "Current password does not match our records." },
          { status: 400 }
        );
      }
    }

    const newHash = await hashPassword(newPassword);
    await pool.query(
      "UPDATE vespera.users SET password_hash = $1 WHERE id = $2;",
      [newHash, session.userId]
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now use it to sign in.",
    });
  } catch (err: any) {
    console.error("Password change error:", err);
    return NextResponse.json({ error: err.message || "Failed to update password." }, { status: 500 });
  }
}
