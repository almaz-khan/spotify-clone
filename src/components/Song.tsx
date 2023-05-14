import Image from "next/image";
import { FC } from "react";

interface SongProps {
  track: any;
}

const Song: FC<SongProps> = ({ track }) => {
  return (
    <div className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default">
      <div className="flex items-center space-x-4">
        {/* {hover ? (
          <PlayIcon
            onClick={async () => await playSong(track)}
            className="h-5 w-5 text-white"
          />
        ) : (
          <p className="w-5">{sno + 1}</p>
        )} */}
        {track?.album?.images[0]?.url && (
          <Image
            alt="Album pic"
            width={10}
            height={10}
            className="h-10 w-10"
            src={track.album.images[0].url}
          />
        )}
        <div>
          <p className="w-36 lg:w-64 truncate text-white text-base">
            {track.name}
          </p>
          <p className="w-36 truncate">
            {track.artists.map((artist: any, i: number) => {
              return (
                <>
                  <span className="hover:underline">{artist.name}</span>
                  <span>{i != track.artists.length - 1 ? ", " : null}</span>
                </>
              );
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 truncate hidden md:inline">{track.album.name}</p>
        {/* <p>{millisToMinutesAndSeconds(track.duration_ms)}</p> */}
      </div>
    </div>
  );
};

export default Song;
