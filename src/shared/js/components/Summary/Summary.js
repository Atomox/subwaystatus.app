import moment from 'moment';
import * as _ from 'lodash';
import log from '../../includes/logger';

import { determineSeverity, prepareEventSummary } from '../../includes/calculations';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Card } from '../Card';
// import { GridRow } from '../common/Grid';
import GroupLineCard from './GroupLineCard';
import Logo from '../Header/Logo';
import { DateDisplay } from '../Header/DateDisplay';
import BoroMap from '../Maps/BoroMap';
//import BoroSummary from '../Header/BoroSummary';

type SummaryProps = {
  events: [],
	age: 0,
};

export default class Summary extends Component<SummaryProps> {

  requiredData() {
    return (this.props.events || this.props.events.length > 0)
      ? true : false;
  }

		render() {

			if (!this.requiredData()) {
        return null;
      }

			// Analyze all events, and gather summary information.
			let { lines, line_boros, lines_affected, boro_count} = prepareEventSummary(this.props.events);

			// Get a final boro_severity for each boro.
			let boro_severity = determineSeverity(boro_count);

			return (
				<View>
          {/** Summary */ }

          <DateDisplay
						age={this.props.age} />

          <BoroMap
            manhattan={boro_severity['Mn']}
            brooklyn={boro_severity['Bk']}
            queens={boro_severity['Qs']}
            bronx={boro_severity['Bx']}
            statenIsland={boro_severity['SI']} />

            {/**
          <SvgExample />
          */ }

          <Logo />

          {
            Object.keys(lines).map(l => (<GroupLineCard
              key={_.uniqueId('lineCard-')}
              line_group={l}
              affectedLines={lines_affected}
              boros={line_boros[l]}
              events={lines[l]}/>) )
          }
				</View>
			);
		}
}
