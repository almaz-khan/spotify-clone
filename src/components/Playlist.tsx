import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { Playlist } from "@/types/spotify";

interface PlaylistViewProps {
  playlist: Playlist;
}

export const PlaylistView: FC<PlaylistViewProps> = ({ playlist }) => {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="grid grid-cols-2 text-neutral-400 text-sm py-1 px-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default"
    >
      <div className="flex items-center space-x-4">
        {playlist?.images[0]?.url && (
          <Image
            alt="Album pic"
            width={40}
            height={40}
            className="h-10 w-10"
            src={playlist.images[0].url}
          />
        )}
        <div>
          <p className="w-36 lg:w-64 truncate text-white text-base">
            {playlist.name}
          </p>
          <p className="w-36 truncate">{playlist.owner.display_name}</p>
        </div>
      </div>
    </Link>
  );
};
