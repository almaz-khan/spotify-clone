import { authOptions } from "@/lib/auth";
import { fetchSpotify } from "@/lib/spotify";
import { HomeIcon, MagnifyingGlassIcon, RowsIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { PlaylistView } from "./Playlist";
import { Playlist } from "@/types/spotify";

interface SidebarProps {}

const Sidebar = async ({}: SidebarProps) => {
  const session = await getServerSession(authOptions);
  const playlistsRaw = await fetchSpotify(
    `/users/${session?.user.id}/playlists?offset=0&limit=50`
  );
  const playlists: Playlist[] = await playlistsRaw.items;

  return (
    <div className="w-full text-neutral-400 h-full overflow-auto text-sm hidden md:inline-flex">
      <div className="flex flex-col gap-2 w-full">
        <ul className="bg-neutral-900 rounded-md shrink-0 w-full text-base py-2 px-3">
          <li className="py-1 px-3">
            <Link
              href="/"
              className="flex items-center gap-5 h-10 hover:text-white transition-colors duration-200"
            >
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
          </li>
          <li className="py-1 px-3">
            <Link
              href="/search"
              className="flex items-center gap-5 h-10 hover:text-white"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
              <span>Search</span>
            </Link>
          </li>
        </ul>

        <div className="bg-neutral-900 rounded-md grow-[1] w-full">
          <ul className="bg-neutral-900 rounded-md shrink-0 w-full text-base py-2 px-3">
            <li className="py-1 px-3">
              <button className="flex items-center gap-5 h-10 hover:text-white transition-colors duration-200">
                <RowsIcon className="h-5 w-5" />
                <p>Your Library</p>
              </button>
            </li>
          </ul>

          <ul className="bg-neutral-900 rounded-md shrink-0 w-full text-base py-2 px-3">
            {playlists?.map((playlist) => {
              return <PlaylistView key={playlist.id} playlist={playlist} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
