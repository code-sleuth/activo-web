// react libraries
import * as React from 'react';

// third party libraries
import { shallow } from 'enzyme';
// components
import Routes from './index';

describe('The Route component', () => {
  it('should register a route for the / page', () => {
    const wrapper = shallow(
      <Routes />
    );

    expect(wrapper.find({ path: '/' }).length).toBe(1);
  });

  it('should register a route for dashboard and settings', () => {
    const wrapper = shallow(
      <Routes />
    );

    expect(wrapper.find({ path: '/settings' }).length).toBe(1);
    expect(wrapper.find({ path: '/dashboard' }).length).toBe(1);
  });
});
