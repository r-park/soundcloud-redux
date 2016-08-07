import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

import { Observable } from 'rxjs/Observable';


export const scrollData$ = Observable
  .fromEvent(window, 'scroll')
  .debounceTime(100)
  .let(getScrollData())
  .publish()
  .refCount();


function getScrollData() {
  return event$ => event$
    .map(event => {
      const { body, defaultView } = event.target;
      return {
        windowInnerHeight: defaultView.innerHeight,
        windowPageYOffset: defaultView.pageYOffset,
        bodyScrollHeight: body.scrollHeight
      };
    });
}
