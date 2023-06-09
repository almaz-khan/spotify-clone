import Song from "@/components/Song";
import { fetchSpotify } from "@/lib/spotify";
import { Owner, Track, SpotifyImage } from "@/types/spotify";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface pageProps {
  params: {
    playlistId: string;
  };
}

interface PlaylistData {
  type: "playlist";
  name: string;
  colobarative: boolean;
  description: string;
  followers: {
    total: number;
  };
  images: SpotifyImage[];
  owner: Owner;
  tracks: {
    items: PlaylistTrackObject[];
  };
}

interface PlaylistTrackObject {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  track: Track;
}

const page = async ({ params }: pageProps) => {
  const playlistData: PlaylistData = await fetchSpotify(
    `/playlists/${params.playlistId}`
  );

  return (
    <div className="flex-grow">
      <header className="text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold">
        <div className="flex items-center">
          {playlistData && (
            <Image
              width={8}
              height={8}
              alt="Playlist pic"
              className="h-8 w-8 mr-6"
              src={playlistData.images[0]?.url}
            />
          )}
          <p>{playlistData?.name}</p>
        </div>
      </header>
      <div className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
        <Image
          className="rounded-full w-7 h-7"
          width={7}
          height={7}
          src=""
          alt="profile pic"
        />
        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <div className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900">
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 h-80 text-white p-8`}
        >
          {playlistData && (
            <Image
              width={44}
              height={44}
              className="h-44 w-44"
              src={playlistData.images[0]?.url}
              alt="Playlist Image"
            />
          )}
          <div>
            <p className="text-sm font-bold">Playlist</p>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">
              {playlistData?.name}
            </h1>
          </div>
        </section>
        <div className="text-white px-8 flex flex-col space-y-1 pb-28">
          {playlistData?.tracks.items.map((track, i: number) => {
            // song component

            return <Song key={track.track.id} track={track.track} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
