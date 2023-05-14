import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

function geSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify client ID or secret not found. Please add them to your .env.local file."
    );
  }

  return { clientId, clientSecret };
}

async function refreshAccessToken(token: JWT) {
  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");
  const basic = Buffer.from(`${geSpotifyCredentials().clientId}:${geSpotifyCredentials().clientSecret}`).toString("base64")
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basic,
    },
    body: params,
  });
  const data = await response.json();

  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

const spotifyScopes = ["user-read-email", "user-read-private", "user-top-read"];
export const authOptions: NextAuthOptions = {
  // adapter: PgAdapter(db),
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/login",
  },
  providers: [
    SpotifyProvider({
      clientId: geSpotifyCredentials().clientId,
      clientSecret: geSpotifyCredentials().clientSecret,
      authorization: `https://accounts.spotify.com/authorize?scope=${spotifyScopes}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token!;
        token.accessTokenExpires = account.expires_at!;
        return token;
      }
      // access token has not expired
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires * 1000
      ) {
        return token;
      }

      // access token has expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;

        session.user = {
          id: token.sub!,
          name: token.name,
          email: token.email,
          image: token.picture as string,
        };
      }

      return session;
    },
    redirect() {
      return "/";
    },
  },
};
