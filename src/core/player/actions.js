export const playerActions = {
  AUDIO_ENDED: 'AUDIO_ENDED',
  AUDIO_PAUSED: 'AUDIO_PAUSED',
  AUDIO_PLAYING: 'AUDIO_PLAYING',
  AUDIO_VOLUME_CHANGED: 'AUDIO_VOLUME_CHANGED',
  PLAY_SELECTED_TRACK: 'PLAY_SELECTED_TRACK',


  audioEnded: () => ({
    type: playerActions.AUDIO_ENDED
  }),

  audioPaused: () => ({
    type: playerActions.AUDIO_PAUSED
  }),

  audioPlaying: () => ({
    type: playerActions.AUDIO_PLAYING
  }),

  audioVolumeChanged: volume => ({
    type: playerActions.AUDIO_VOLUME_CHANGED,
    payload: {
      volume
    }
  }),

  playSelectedTrack: (trackId, tracklistId) => ({
    type: playerActions.PLAY_SELECTED_TRACK,
    payload: {
      trackId,
      tracklistId
    }
  })
};
