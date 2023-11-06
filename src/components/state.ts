import { atom, computed } from "nanostores";

export type Track = {
  id: string;
  title: string;
  position: number;
  length: string;
};

export type PlayerTrack = Track & {
  albumId: string;
  artist: string;
  imageUrl: string;
};

export const isPlaying = atom(false);
export const currentTrackId = atom<Track["id"]>(null);
export const currentTracks = atom<PlayerTrack[]>([]);
export const currentTrack = computed([currentTrackId, currentTracks], () => {
  if (!currentTrackId.get()) return null;
  return currentTracks.get().find((t) => t.id === currentTrackId.get());
});
