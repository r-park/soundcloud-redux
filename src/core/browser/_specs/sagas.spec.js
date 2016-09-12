import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { appActions } from 'src/core/app';
import { browserActions } from '../actions';
import { subscribe, subscribeToMediaQueries, watchInitApp } from '../sagas';


describe('browser', () => {
  describe('sagas', () => {
    describe('watchInitApp()', () => {
      const generator = watchInitApp();

      it('should take INIT_APP action', () => {
        expect(generator.next().value).toEqual(take(appActions.INIT_APP));
      });

      it('should fork subscribeToMediaQueries()', () => {
        let config = {large: {minWidth: 980}};
        let action = appActions.initApp(config);

        expect(generator.next(action).value).toEqual(
          fork(subscribeToMediaQueries, action.payload)
        );
      });
    });


    describe('subscribeToMediaQueries()', () => {
      const payload = {large: {minWidth: 980}};
      const generator = subscribeToMediaQueries(payload);

      it('should call subscribe()', () => {
        expect(generator.next().value).toEqual(
          call(subscribe, payload)
        );
      });

      it('should take eventChannel', () => {
        let channel = eventChannel(() => () => {});

        expect(generator.next(channel).value).toEqual(
          take(channel)
        );
      });

      it('should put action emitted by eventChannel', () => {
        let action = browserActions.mediaQueryChanged({large: true});

        expect(generator.next(action).value).toEqual(
          put(action)
        );
      });
    });
  });
});
