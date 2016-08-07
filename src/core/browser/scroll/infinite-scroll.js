import 'rxjs/add/observable/never';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { scrollData$ } from './scroll-data';


const end$ = new Subject();
const never$ = Observable.never();
const pause$ = new Subject();


const checkPosition$ = scrollData$
  .filter(data => {
    return data.windowInnerHeight + data.windowPageYOffset >=
      data.bodyScrollHeight - data.windowInnerHeight;
  });


const infiniteScroll$ = pause$
  .switchMap(pause => {
    return pause ? never$ : checkPosition$;
  });


export const infiniteScroll = {
  end: () => end$.next(true),
  pause: () => pause$.next(true),
  resume: () => pause$.next(false),

  start: (callback, startPaused = false) => {
    let unsubscribe = infiniteScroll$
      .takeUntil(end$)
      .do(() => callback())
      .subscribe();

    pause$.next(startPaused);
    return unsubscribe;
  }
};
