export const testUtils = {
  createIds: (count, id = 1) => {
    let ids = [];
    for (let i = 0; i < count; i++, id++) {
      ids.push(id);
    }
    return ids;
  },

  createTrack: (id = 1) => {
    return {
      artwork_url: `https://i1.sndcdn.com/artworks-${id}-large.jpg`,
      duration: 240000,
      id,
      likes_count: id,
      playback_count: id,
      stream_url: `https://api.soundcloud.com/tracks/${id}/stream`,
      streamable: true,
      title: `Title - ${id}`,
      user: {
        avatar_url: `https://i1.sndcdn.com/avatars-${id}-large.jpg`,
        id: 100 + id,
        username: `User-${id}`
      },
      user_favorite: false,
      waveform_url: `https://w1.sndcdn.com/${id}_m.png`
    };
  },

  createTracks: (count, id = 1) => {
    let tracks = [];
    for (let i = 0; i < count; i++, id++) {
      tracks.push(testUtils.createTrack(id));
    }
    return tracks;
  }
};
