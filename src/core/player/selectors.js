import { getTracklistById, getTracklistCursor } from 'src/core/tracklists';
import { getTrackById } from 'src/core/tracks';


export function getPlayer(state) {
  return state.player;
}

export function getPlayerIsPlaying(state) {
  return state.player.isPlaying;
}

export function getPlayerTimes(state) {
  return state.playerTimes;
}

export function getPlayerTrackId(state) {
  return state.player.trackId;
}

export function getPlayerTracklistId(state) {
  return state.player.tracklistId;
}

export function getPlayerTrack(state) {
  const trackId = getPlayerTrackId(state);
  return getTrackById(state, trackId);
}

export function getPlayerTracklist(state) {
  const tracklistId = getPlayerTracklistId(state);
  return getTracklistById(state, tracklistId);
}

export function getPlayerTracklistCursor(state) {
  const trackId = getPlayerTrackId(state);
  const tracklist = getPlayerTracklist(state);
  return getTracklistCursor(trackId, tracklist.trackIds);
}
