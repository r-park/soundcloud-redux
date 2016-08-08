import React from 'react';
import { shallow } from 'enzyme';
import { testUtils } from 'src/core/utils/test';
import { createUser } from 'src/core/users';
import { UserPage } from './index';


describe('views', () => {
  describe('UserPage', () => {
    let props;

    beforeEach(() => {
      props = {
        loadUser: jasmine.createSpy('loadUser'),
        loadUserLikes: jasmine.createSpy('loadUserLikes'),
        loadUserTracks: jasmine.createSpy('loadUserTracks'),
        params: {
          id: '123',
          resource: 'tracks'
        },
        user: createUser(testUtils.createUser(), true)
      };
    });

    it('should have a Tracklist', () => {
      let wrapper = shallow(<UserPage {...props} />);
      let tracklist = wrapper.find('Connect(Tracklist)');

      expect(tracklist.length).toBe(1);
    });

    it('should have a UserCard', () => {
      let wrapper = shallow(<UserPage {...props} />);
      let userCard = wrapper.find('UserCard');

      expect(userCard.length).toBe(1);
      expect(userCard.prop('user')).toBe(props.user);
    });

    it('should call props.loadUser()', () => {
      shallow(<UserPage {...props} />);

      expect(props.loadUser).toHaveBeenCalledTimes(1);
      expect(props.loadUser).toHaveBeenCalledWith(props.params.id);
    });

    it('should call props.loadUserLikes() if props.params.resource is `likes`', () => {
      props.params.resource = 'likes';

      shallow(<UserPage {...props} />);

      expect(props.loadUserLikes).toHaveBeenCalledTimes(1);
      expect(props.loadUserLikes).toHaveBeenCalledWith(props.params.id);
      expect(props.loadUserTracks).not.toHaveBeenCalled();
    });

    it('should call props.loadUserTracks() if props.params.resource is `tracks`', () => {
      props.params.resource = 'tracks';

      shallow(<UserPage {...props} />);

      expect(props.loadUserTracks).toHaveBeenCalledTimes(1);
      expect(props.loadUserTracks).toHaveBeenCalledWith(props.params.id);
      expect(props.loadUserLikes).not.toHaveBeenCalled();
    });
  });
});
