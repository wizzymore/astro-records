import { useStore } from "@nanostores/react";
import {
  currentTrack,
  currentTrackId,
  currentTracks,
  isPlaying,
  type Track,
} from "./state";
import { useEffect, useState } from "react";

type Props = {
  tracks: Track[];
  albumId: string;
  artist: string;
  imageUrl: string;
};

const playIcon = (
  <svg
    aria-hidden="true"
    className="w-6 h-6 mr-2 -ml-1 text-pink-600"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 mr-2 -ml-1 text-pink-600"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z"
      clipRule="evenodd"
    />
  </svg>
);

const TrackItem = ({
  track,
  tracks,
  albumId,
  artist,
  imageUrl,
}: {
  track: Track;
  tracks: Track[];
  albumId: string;
  artist: string;
  imageUrl: string;
}) => {
  const $isPlaying = useStore(isPlaying);
  const $currentTrack = useStore(currentTrack);

  const [isCurrentTrack, setIsCurrentTrack] = useState(false);

  useEffect(() => {
    setIsCurrentTrack($currentTrack?.id === track.id);
  }, [$currentTrack]);

  return (
    <li
      key={track.id}
      className="hover:bg-gray-50 cursor-pointer px-6 py-4 flex border-b first:border-t items-center"
      onClick={() => {
        currentTracks.set(
          tracks.map(($track) => ({ ...$track, albumId, artist, imageUrl })),
        );

        currentTrackId.set(track.id);

        isPlaying.set(true);
      }}
    >
      <span className="text-gray-500 w-8 mr-2">
        {isCurrentTrack && !$isPlaying
          ? pauseIcon
          : isCurrentTrack && $isPlaying
          ? playIcon
          : track.position}
      </span>
      <span className="font-medium">{track.title}</span>
      <span className="text-gray-500 ml-auto">{track.length}</span>
    </li>
  );
};

export default function TrackList({
  tracks,
  albumId,
  artist,
  imageUrl,
}: Props) {
  const $isPlaying = useStore(isPlaying);
  const $currentTrack = useStore(currentTrack);

  return (
    <ul className="text-xl">
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          tracks={tracks}
          albumId={albumId}
          artist={artist}
          imageUrl={imageUrl}
        />
      ))}
    </ul>
  );
}
