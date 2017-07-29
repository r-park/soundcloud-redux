import React from 'react';
import { shallow } from 'enzyme';
import { User } from 'src/core/users';
import UserCard from './user-card';


describe('views', () => {
  describe('UserCard', () => {
    let props;
    let user;

    beforeEach(() => {
      user = new User({
        id: 123,
        followingsCount: 20,
        followersCount: 40,
        likesCount: 60,
        trackCount: 80,
        username: 'username'
      });

      props = {user};
    });


    function getWrapper() {
      return shallow(
        <UserCard {...props} />
      );
    }


    it('should display username', () => {
      expect(getWrapper().find('h1').text()).toBe(user.username);
    });

    it('should display trackCount label linked to user-tracks route', () => {
      let label = getWrapper().find('.user-stats__label').at(0);
      expect(label.prop('to')).toBe(`/users/${user.id}/tracks`);
    });

    it('should display FormattedInteger for trackCount', () => {
      let formattedInteger = getWrapper().find('FormattedInteger').at(0);
      expect(formattedInteger.prop('value')).toBe(user.trackCount);
    });

    it('should display likesCount label linked to user-likes route', () => {
      let label = getWrapper().find('.user-stats__label').at(1);
      expect(label.prop('to')).toBe(`/users/${user.id}/likes`);
    });

    it('should display FormattedInteger for likesCount', () => {
      let formattedInteger = getWrapper().find('FormattedInteger').at(1);
      expect(formattedInteger.prop('value')).toBe(user.likesCount);
    });

    it('should display followersCount label', () => {
      let label = getWrapper().find('.user-stats__label').at(2);
      expect(label.length).toBe(1);
    });

    it('should display FormattedInteger for followersCount', () => {
      let formattedInteger = getWrapper().find('FormattedInteger').at(2);
      expect(formattedInteger.prop('value')).toBe(user.followersCount);
    });

    it('should display followingsCount label', () => {
      let label = getWrapper().find('.user-stats__label').at(3);
      expect(label.length).toBe(1);
    });

    it('should display FormattedInteger for followingsCount', () => {
      let formattedInteger = getWrapper().find('FormattedInteger').at(3);
      expect(formattedInteger.prop('value')).toBe(user.followingsCount);
    });
  });
});
