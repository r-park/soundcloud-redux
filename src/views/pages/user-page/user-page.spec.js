import React from 'react';
import { shallow } from 'enzyme';
import { testUtils } from 'src/core/utils/test-utils';
import { createUser } from 'src/core/users';
import { UserPage } from './user-page';


describe('views', () => {
  describe('UserPage', () => {
    let props;

    beforeEach(() => {
      props = {
        loadUser: jasmine.createSpy('loadUser'),
        loadUserLikes: jasmine.createSpy('loadUserLikes'),
        loadUserTracks: jasmine.createSpy('loadUserTracks'),
        match: {
          params: {
            id: '123',
            resource: 'tracks'
          }
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
      expect(props.loadUser).toHaveBeenCalledWith(props.match.params.id);
    });

    it('should call props.loadUserLikes() if props.params.resource is `likes`', () => {
      props.match.params.resource = 'likes';

      shallow(<UserPage {...props} />);

      expect(props.loadUserLikes).toHaveBeenCalledTimes(1);
      expect(props.loadUserLikes).toHaveBeenCalledWith(props.match.params.id);
      expect(props.loadUserTracks).not.toHaveBeenCalled();
    });

    it('should call props.loadUserTracks() if props.params.resource is `tracks`', () => {
      props.match.params.resource = 'tracks';

      shallow(<UserPage {...props} />);

      expect(props.loadUserTracks).toHaveBeenCalledTimes(1);
      expect(props.loadUserTracks).toHaveBeenCalledWith(props.match.params.id);
      expect(props.loadUserLikes).not.toHaveBeenCalled();
    });
  });
});
