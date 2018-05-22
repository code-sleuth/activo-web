import * as React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import AuthPage from './AuthPage.component';

describe('Auth component', () => {
  it('should be rendered properly', () => {
    const wrapper = shallow(<AuthPage />);

    expect(wrapper.find('button').exists).toBeTruthy();
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should be rendered with the component default state values', () => {
    const wrapper = shallow(<AuthPage />);

    wrapper.instance().setState({
      isLoggedIn: false,
      errorMessage: ''
    });

    expect(wrapper.instance().state).toEqual({
      isLoggedIn: false,
      errorMessage: ''
    });
  });

  it('should call the onChange method when the button is clicked', () => {
    const wrapper = shallow(<AuthPage />);

    expect(wrapper.instance().state.isLoggedIn).toBeFalsy();
    wrapper.find('button').simulate('click', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.isLoggedIn).toBeTruthy();
  });
});
