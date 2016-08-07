import { combineReducers, createStore } from 'redux';
import { Map } from 'immutable';
import { userActions } from '../actions';
import { getCurrentUser, getUserById, getUsers } from '../selectors';
import { User } from '../user';
import { usersReducer } from '../reducer';


describe('users', () => {
  describe('selectors', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        combineReducers({
          users: usersReducer
        }),

        {
          users: new Map({currentUserId: 2})
            .set(1, new User({id: 1}))
            .set(2, new User({id: 2}))
        }
      );
    });


    describe('getCurrentUser()', () => {
      afterEach(() => getCurrentUser.resetRecomputations());

      it('should return the current user', () => {
        let user = getCurrentUser(store.getState());
        expect(user.id).toBe(2);
      });

      it('should recompute when current user changes', () => {
        getCurrentUser(store.getState());
        expect(getCurrentUser.recomputations()).toBe(1);

        store.dispatch(userActions.loadUser(1));
        getCurrentUser(store.getState());
        expect(getCurrentUser.recomputations()).toBe(2);

        store.dispatch(userActions.loadUser(1)); // should not recompute: same user
        getCurrentUser(store.getState());
        expect(getCurrentUser.recomputations()).toBe(2);
      });
    });


    describe('getUserById()', () => {
      it('should return user with provided user id', () => {
        let state = store.getState();
        expect(getUserById(state, 1)).toBe(state.users.get(1));
        expect(getUserById(state, 2)).toBe(state.users.get(2));
      });
    });


    describe('getUsers()', () => {
      it('should return UsersState', () => {
        let state = store.getState();
        expect(getUsers(state)).toBe(state.users);
      });
    });
  });
});
