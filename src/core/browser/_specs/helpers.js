import sinon from 'sinon';


export class MediaQueryListStub {
  handlers = [];

  constructor(media, matches = false) {
    this.media = media;
    this.matches = matches;
  }

  dispatch() {
    this.handlers.forEach(handler => handler(this));
  }

  addListener(handler) {
    this.handlers.push(handler);
  }

  removeListener() {}
}


export function getMediaQueryRules() {
  return [
    {
      id: 'medium',
      minWidth: 740,
      maxWidth: 979
    },
    {
      id: 'large',
      minWidth: 980
    },
    {
      id: 'landscape',
      orientation: 'landscape'
    }
  ];
}


export function stubMatchMedia(fn) {
  global.matchMedia = sinon.stub().callsFake(fn);
}
