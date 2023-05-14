"use client";

import { Track } from "@/types/spotify";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FC, useState } from "react";

interface PlayerProps {}

const Player: FC<PlayerProps> = ({}) => {
  const songInfo: any = null;

  const [playing, setPlaying] = useState(false);

  return (
    <div className="h-full text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        {songInfo?.album.images[0].url && (
          <Image
            alt="Album cover"
            width={10}
            height={10}
            className="hidden md:inline h-10 w-10"
            src={songInfo.album.images[0].url}
          />
        )}
        <div>
          <p className="text-white text-sm">{songInfo?.name}</p>
          <p className="text-neutral-400 text-xs">
            {songInfo?.artists[0]?.name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {playing ? (
          <PauseIcon
            onClick={() => {
              setPlaying(false);
            }}
            className="h-10 w-10 cursor-pointer"
          />
        ) : (
          <PlayIcon
            onClick={() => {
              setPlaying(true);
            }}
            className="h-10 w-10 cursor-pointer"
          />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Player;
