import { fetchSpotify } from "@/lib/spotify";
import Song from "@/components/Song";
import { TopItems, Track } from "@/types/spotify";

interface HomeProps {
  children: React.ReactNode;
}

type TimeRange = "short_term" | "medium_term" | "long_term";

export default async function Home({ children }: HomeProps) {
  const topTracks: TopItems = await fetchSpotify(
    "/me/top/tracks?offset=0&limit=50"
  );
  // const topTracks = await fetchSpotify(
  //   "/me/top/tracks?offset=0&limit=50"
  // );

  return (
    <div className="grow-[1] h-full overflow-auto">
      <ul className="w-full">
        {topTracks?.items?.map((topItem) => {
          if (topItem.type === "track") {
            return <Song key={topItem.id} track={topItem} />;
          } else {
            return <div key={topItem.id}> {topItem.name} </div>;
          }
        })}
      </ul>
    </div>
  );
}
