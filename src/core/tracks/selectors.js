export function getTracks(state) {
  return state.tracks;
}

export function getTrackById(state, trackId) {
  return getTracks(state).get(trackId);
}
