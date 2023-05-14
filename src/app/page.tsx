import { fetchSpotify } from "@/lib/spotify";
import Song from "@/components/Song";

interface HomeProps {
  children: React.ReactNode;
}

type TimeRange = "short_term" | "medium_term" | "long_term";

export default async function Home({ children }: HomeProps) {
  const topTracks = await fetchSpotify(
    "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50"
  );
  // const topTracks = await fetchSpotify(
  //   "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50"
  // );

  return (
    <div className="grow-[1] h-full overflow-auto">
      <ul className="w-full">
        {topTracks?.items.map((track: any, i: number) => {
          return <Song key={track.id} track={track} />;
        })}
      </ul>
    </div>
  );
}
