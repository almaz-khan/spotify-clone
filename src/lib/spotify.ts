import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function fetchSpotify(url: string, method = "GET") {
  const session = await getServerSession(authOptions);

  const result = await fetch(`https://api.spotify.com/v1${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  const res = await result.json();

  return res;
}
