import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: User & {
      id: UserId;
    };
  }
}
