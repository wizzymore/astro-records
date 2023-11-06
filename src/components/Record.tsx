import { useEffect, useMemo, useState } from "react";
import { isPlaying, currentTrack } from "./state";
import { computed } from "nanostores";
import { useStore } from "@nanostores/react";

export default function Record({
  albumId,
  title,
  imageUrl,
}: {
  albumId: string;
  title: string;
  imageUrl: string;
}) {
  const $isPlaying = useStore(isPlaying);
  const $currentTrack = useStore(currentTrack);
  const [isPlayingCurrentRecord, setIsPlayingCurrentRecord] = useState(false);

  useEffect(() => {
    if ($isPlaying && $currentTrack.albumId === albumId) {
      setIsPlayingCurrentRecord(true);
    } else {
      setIsPlayingCurrentRecord(false);
    }
  }, [albumId, $isPlaying, $currentTrack]);

  return (
    <div className="relative shadow-xl mr-32 w-72 md:w-auto">
      <img
        src={imageUrl}
        alt={title}
        width="400"
        height="400"
        className="block rounded-md tag-album-cover relative z-10 bg-white"
        style={{ viewTransitionName: `record-${albumId};` }}
      />
      <img
        src="/vynil-lp.webp"
        width="400"
        height="400"
        className={
          "absolute top-0 opacity-0 vynil-image vynil-animation-in" +
          (isPlayingCurrentRecord ? "-spinning" : "")
        }
        style={{ viewTransitionName: `vinyl-${albumId};` }}
      />
    </div>
  );
}
