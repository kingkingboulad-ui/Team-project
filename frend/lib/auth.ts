import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateOAuthUser, findUserByEmail, verifyPassword, type Role } from "@/lib/users";
//page la jwt w signin
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",//hun NextAuth rah yesta5dem jwt la ye7faz info tab3et sessions
  },
  pages: {
    signIn: "/login",
  },
  //providers hiyeh tari3et dekhul  
  providers: [
    // --- Email + password ("Patient Login" / "Nurse Login" tabs post here) ---
    //byesma7 lal user ysajel aan tari2 email 
	CredentialsProvider({
      id: "credentials",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // "patient" | "nurse", set by the active tab
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = findUserByEmail(credentials.email);
        if (!user) {
          throw new Error("No account found with that email.");
        }

        const passwordOk = verifyPassword(credentials.password, user.passwordHash);
        if (!passwordOk) {
          throw new Error("Incorrect password.");
        }

        const requestedRole = credentials.role as Role | undefined;//ya ama role ya ama undefined
        if (requestedRole && user.role !== requestedRole) {//ye3ni eza reqRole=="nurse" and user.Role=="Patients"
//reqRole!= requestedRole btsir error 
			throw new Error(
            `This email is registered as a ${user.role}. Switch to the "${
              user.role === "patient" ? "Patient" : "Nurse"
            } Login" tab.`
          );
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),

    // --- "Continue with Google" ---
	//byesma7 lal user ysajel aan tari2 google 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  //ba3ed ma tsir operation login 
  callbacks: {
    async signIn({ user, account }) {//wa2et user ye3mel signin 
      // Credentials sign-ins already have a validated role from authorize().
      // Google sign-ins don't carry a role, so we attach/find one here.
      if (account?.provider === "google" && user.email) {
        const role: Role = "patient"; // default new Google sign-ups to "patient"
        const stored = findOrCreateOAuthUser(user.email, user.name ?? "New User", role);
        user.role = stored.role;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
//User Login
// ↓
//user.role = "patient"
// ↓
//jwt callback
//   ↓
//token.role = user.role
//   ↓
//session callback
//   ↓
//session.user.role = token.role
//↓
//Navbar
//   ↓
//session?.user?.role

//bdna nhafez aa role ba3ed signin user.role
//   ↓
//token.role
//   ↓
//session.user.role
async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
