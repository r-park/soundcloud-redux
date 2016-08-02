import { Record } from 'immutable';
import { formatTrackTitle, streamUrl, trackImageUrl, waveformUrl } from './utils';


export const Track = new Record({
  artworkUrl: null,
  duration: null,
  id: null,
  liked: null,
  likesCount: null,
  playbackCount: null,
  streamable: null,
  streamUrl: null,
  title: null,
  userId: null,
  username: null,
  waveformUrl: null
});


export function createTrack(data) {
  return new Track({
    artworkUrl: trackImageUrl(data),
    duration: data.duration,
    id: data.id,
    liked: !!data.user_favorite,
    likesCount: data.favoritings_count || data.likes_count || 0,
    playbackCount: data.playback_count || 0,
    streamable: data.streamable,
    streamUrl: data.streamable ? streamUrl(data.stream_url) : null,
    title: formatTrackTitle(data.title),
    userId: data.user.id,
    username: data.user.username,
    waveformUrl: waveformUrl(data.waveform_url)
  });
}
