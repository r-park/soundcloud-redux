//=========================================================
//  CONSTANTS
//---------------------------------------------------------
export const APP_NAME = 'soundcloud-redux';


//=====================================
//  API
//-------------------------------------
export const API_BASE_URL = 'https://api.soundcloud.com';

export const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || 'd02c42795f3bcac39f84eee0ae384b00';
export const CLIENT_ID_PARAM = `client_id=${CLIENT_ID}`;

export const PAGINATION_LIMIT = 3;
export const PAGINATION_PARAMS = `limit=${PAGINATION_LIMIT}&linked_partitioning=1`;


//=====================================
//  IMAGES
//-------------------------------------
export const IMAGE_DEFAULT_SIZE = 'large.jpg';
export const IMAGE_XLARGE_SIZE = 't500x500.jpg';


//=====================================
//  TRACKLISTS
//-------------------------------------
export const SESSION_TRACKLIST_ID = 'session';

export const TRACKS_PER_PAGE = 3;


//=====================================
//  WAVEFORMS
//-------------------------------------
export const WAVEFORM_IMAGE_HOST = 'w1.sndcdn.com';
export const WAVEFORM_JSON_HOST = 'wis.sndcdn.com';
