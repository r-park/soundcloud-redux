import { appActions } from '../actions';


describe('app', () => {
  describe('actions', () => {
    describe('initApp()', () => {
      it('should create an action', () => {
        let config = {foo: 'bar'};
        let action = appActions.initApp(config);

        expect(action).toEqual({
          type: appActions.INIT_APP,
          payload: config
        });
      });
    });
  });
});
