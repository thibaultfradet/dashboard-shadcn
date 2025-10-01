import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    console.log("test")
    console.log(user)
    console.log("test2")
    return user as unknown as User;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log(credentials);
          if (parsedCredentials.success) {
            console.log("passage")
          const { email, password } = parsedCredentials.data;
            console.log("b")
          const user = await getUser(email);
          console.log("passage2");
          console.log(user);
          console.log(password);
          console.log(await bcrypt.compare(password, user.password));
          if (!user) throw new Error("");
            console.log("passage3")
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          console.log("passage4")
        }

        throw new Error("");
      },
    }),
  ],
});
