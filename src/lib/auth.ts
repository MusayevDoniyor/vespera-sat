import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { pool } from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "vespera-super-secret-jwt-key-sat-2026-production-token"
);

export const COOKIE_NAME = "vespera_session";

export interface UserSessionPayload {
  userId: string;
  email: string;
  fullName: string;
}

export interface FullUserProfile {
  id: string;
  email: string;
  fullName: string;
  mathLevel: string;
  englishLevel: string;
  ieltsScore: string | null;
  currentSatScore: number | null;
  targetSatScore: number;
  examDate: string | null;
  dailyGoalMinutes: number;
  priorityWeakness: string | null;
  onboardingCompleted: boolean;
  createdAt: string;
}

/**
 * Hash a plain password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain password against stored bcrypt hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a signed JWT session token valid for 30 days
 */
export async function signSessionToken(payload: UserSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT session token and return the decoded payload
 */
export async function verifySessionToken(token: string): Promise<UserSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserSessionPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get current authenticated user session from Next.js cookies
 */
export async function getSessionUser(): Promise<UserSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Fetch full profile of current authenticated user from Neon DB
 */
export async function getFullUserProfile(userId: string): Promise<FullUserProfile | null> {
  try {
    const res = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        u.created_at,
        p.full_name,
        p.math_level,
        p.english_level,
        p.ielts_score,
        p.current_sat_score,
        p.target_sat_score,
        p.exam_date,
        p.daily_goal_minutes,
        p.priority_weakness,
        p.onboarding_completed
      FROM vespera.users u
      LEFT JOIN vespera.user_profiles p ON p.user_id = u.id
      WHERE u.id = $1
      LIMIT 1;
      `,
      [userId]
    );

    if (res.rows.length === 0) return null;
    const row = res.rows[0];

    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name || "SAT Scholar",
      mathLevel: row.math_level || "intermediate",
      englishLevel: row.english_level || "intermediate",
      ieltsScore: row.ielts_score || null,
      currentSatScore: row.current_sat_score || null,
      targetSatScore: row.target_sat_score || 1550,
      examDate: row.exam_date || null,
      dailyGoalMinutes: row.daily_goal_minutes || 45,
      priorityWeakness: row.priority_weakness || null,
      onboardingCompleted: Boolean(row.onboarding_completed),
      createdAt: row.created_at,
    };
  } catch (err) {
    console.error("Error fetching full user profile:", err);
    return null;
  }
}
