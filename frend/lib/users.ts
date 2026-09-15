import bcrypt from "bcryptjs";

export type Role = "patient" | "nurse" | "admin";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
};

/**
 * TEMPORARY in-memory user store.
 *
 * Swap this whole file for real queries against your database (Prisma,
 * Supabase, etc.) once you have one — everything downstream (auth.ts,
 * middleware.ts) only depends on the three functions exported below, not on
 * how the data is stored.
 *
 * Demo credentials (for local testing only):
 *   Patient -> patient@example.com / Patient123!
 *   Nurse   -> nurse@example.com   / Nurse123!
 *   Admin   -> admin@example.com   / Admin123!
 */
const users: StoredUser[] = [
  {
    id: "patient_1",
    name: "Jane Patient",
    email: "patient@example.com",
    role: "patient",
    passwordHash: bcrypt.hashSync("Patient123!", 10),
  },
  {
    id: "nurse_1",
    name: "Sarah Mitchell",
    email: "nurse@example.com",
    role: "nurse",
    passwordHash: bcrypt.hashSync("Nurse123!", 10),
  },
  {
    id: "admin_1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    passwordHash: bcrypt.hashSync("Admin123!", 10),
  },
];

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash);
}

/**
 * Called when someone signs in via Google and doesn't already exist in the
 * store. In production you'd insert a real row here; for the demo we just
 * create one in memory so the session has a role to attach.
 */
export function findOrCreateOAuthUser(email: string, name: string, role: Role): StoredUser {
  const existing = findUserByEmail(email);
  if (existing) return existing;
//lal gmail eza ken mch mawjud bye3mel email jdid 
  const newUser: StoredUser = {
    id: `oauth_${users.length + 1}`,
    name,
    email,
    role,
    passwordHash: "", // OAuth users don't have a local password
  };
  users.push(newUser);
  return newUser;
}
