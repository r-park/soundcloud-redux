import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Observable } from 'rxjs/Observable';
import { scrollData$ } from '../scroll/scroll-data';


describe('browser', () => {
  describe('scrollData$', () => {
    const debounceTime = 100;
    const scrollInterval = 20;

    beforeEach(() => {
      document.body.style.minHeight = `${window.innerHeight * 2}px`;
    });


    function dispatchScrollEvent(target, scrollTop) {
      const scrollEvent = new CustomEvent('scroll');
      target.scrollTo(0, scrollTop);
      target.dispatchEvent(scrollEvent);
    }

    function resolveScroll(take, done) {
      Observable
        .interval(20)
        .take(5)
        .do(value => dispatchScrollEvent(window, value))
        .subscribe();

      setTimeout(done, debounceTime + (take * scrollInterval) + 10);
    }


    it('should emit debounced scroll data', done => {
      scrollData$.subscribe(data => {
        expect(data).toEqual({
          windowInnerHeight: window.innerHeight,
          windowPageYOffset: 4,
          bodyScrollHeight: document.body.scrollHeight
        });
      });

      resolveScroll(5, done);
    });
  });
});
