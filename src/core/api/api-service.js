import request from 'superagent';
import { API_TRACKS_URL, API_USERS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from 'src/core/constants';


export const api = {
  fetch(url) {
    return dispatch({url});
  },

  fetchSearchResults(query) {
    return dispatch({
      paginate: true,
      query: `q=${query}`,
      url: API_TRACKS_URL
    });
  },

  fetchUser(userId) {
    return dispatch({
      url: `${API_USERS_URL}/${userId}`
    });
  },

  fetchUserLikes(userId) {
    return dispatch({
      paginate: true,
      url: `${API_USERS_URL}/${userId}/favorites`
    });
  },

  fetchUserTracks(userId) {
    return dispatch({
      paginate: true,
      url: `${API_USERS_URL}/${userId}/tracks`
    });
  }
};


export function dispatch(options) {
  return request[options.method || 'get'](requestUrl(options))
    .set('Accept', 'application/json')
    .then(response => response.body);
}

export function requestUrl({paginate, query, url}) {
  let params = [];

  if (!url.includes(CLIENT_ID_PARAM)) params.push(CLIENT_ID_PARAM);
  if (paginate) params.push(PAGINATION_PARAMS);
  if (query) params.push(query);

  if (params.length) {
    url += url.indexOf('?') === -1 ? '?' : '&';
    url += params.join('&');
  }

  return url;
}
