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

  describe('Route Change Detection', () => {

    describe('Line Change (AoverC)', () => {
      const route = [
        {
          allTrains: false,
          dir: null,
          lines: ["W"],
          along: "D",
          from: "Bk26-R30",
          to: "Bk59-B12"
        }
      ];

      const instance = assembleRouteInstance(route);
      const result = instance.prepRouteObject(route[0]);

      it('Line Change is true', () => expect(result.line_change).toEqual(true));
      it('Bypass is false', () => expect(result.bypass).toEqual(false));

    });

    describe('Running Express', () => {
      const route = [
        {
					allTrains: true,
					dir: null,
					exp_lcl: 'express',
					lines: ['F'],
					along: 'F',
					from: 'in',
					to: null,
					process: 'RouteChangeStandard',
					in: 'Manhattan'
				},
      ];

      const instance = assembleRouteInstance(route);
      const result = instance.prepRouteObject(route[0]);

      it('Line Change is false', () => expect(result.line_change).toEqual(false));
      it('Express is true', ()=> expect(result.exp).toEqual(true));
      it('Local is false',() => expect(result.lcl).toEqual(false));
    });

    describe('Running Local', () => {
      const route = [
        {
					allTrains: true,
					dir: "[mn151-a12]-bound",
					exp_lcl: "local",
					lines: ["B"],
					along: null,
					from: "Bk54-D39",
					to: "Bk42-D26",
					section: null,
					process: "RouteChangeStandard",
					parsed: "[Mn151-A12]-bound [B] trainsrun local from [Bk54-D39] to [Bk42-D26]"
				}
      ];

      const instance = assembleRouteInstance(route);
      const result = instance.prepRouteObject(route[0]);

      it('Line Change is false', () => expect(result.line_change).toEqual(false));
      it('Express is false', () => expect(result.exp).toEqual(false));
      it('Local is true', () => expect(result.lcl).toEqual(true));
    });


    describe('Bypass Stations', () => {
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

      it('Line change is false', () => expect(result.line_change).toEqual(false));
      it('Bypass is true', () => expect(result.bypass).toEqual(true));
    });

    describe('No Service Between', () => {
      const route = [
        {
					noTrains: true,
			    allTrains: true,
			    dir: null,
			    lines: [ 'E' ],
			    along: null,
			    from: 'Qs616-G14',
			    to: 'Mn167-A32',
			    section: null,
			    action: 'No',
			    parsed: '[E] No service between [Qs616-G14] and [Mn167-A32]'
				},
      ];

      const instance = assembleRouteInstance(route);
      const result = instance.prepRouteObject(route[0]);

      console.log();

      it('Line change is false', () => expect(result.line_change).toEqual(false));
      it('No SVC Between is true', () => expect(result.no_svc_between).toEqual(true));
    });
  });
});
