// import assert from 'assert';
// import { expect } from 'chai';
// import * as _ from 'lodash';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React, { Component } from 'react';

import RouteChange from '../src/shared/js/components/RouteChange.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Route Change Card', () => {

  function assembleRouteInstance(route) {
    const routeInfo = {
      route: route
    };

    const wrapper = shallow(<RouteChange routeInfo={ routeInfo } stations={ {} } />);
    const instance = wrapper.instance();

    return instance;
  }

  it('Route Change -- Bypass Stations', () => {
    const route = [
      {
        allTrains: true,
        lines: ["4"],
        along: null,
        bypass: [
          "Bx385-410",
          "Bx386-411",
          "Bx387-412",
          "Bx388-413",
          "Bx604-414"
        ],
        action: "bypass",
        section: null,
      }
    ];

    const instance = assembleRouteInstance(route);
    const result = instance.prepRouteObject(route[0]);

    expect(result.line_change).toEqual(false);
    expect(result.bypass).toEqual(true);
  });

});
