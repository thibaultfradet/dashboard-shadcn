import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { prisma } from "./src/lib/prisma";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Mot de passe hashé :", hashedPassword);
  }
  console.log("test");
  hashPassword("tonMotDePasse");

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user as unknown as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log(parsedCredentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user);
          if (!user) throw new Error("");

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        throw new Error("");
      },
    }),
  ],
});
