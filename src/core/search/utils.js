const SPACE_SPLITTER = /\s+/;

export function tracklistIdForSearch(query) {
  query = query.trim().split(SPACE_SPLITTER).join(' ');
  return `search/${query}`.toLowerCase();
}
