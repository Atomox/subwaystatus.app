'use strict';
import moment from 'moment';
import * as _ from 'lodash';
import log from '../../includes/logger';
import { mtaSubway as mta } from '../../includes/mta.subway';
import { assembleBoros, assembleLines } from './Summary.helpers';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { GridRow, RowCell } from '../common/Grid';
import GroupLineEvent from './GroupLineEvent';

import glStyle from '../../../styles/Summary.styles';

/**
type GroupLineCardProps = {
  events: [],
	age: 0,
};
*/

export default class GroupLineCard extends React.Component /** <GroupLineCardProps> */ {

	assembleEvents(events) {

    if (!events || !Array.isArray(events)) {
      return null;
    }

		return events.map( (e, index) => (
      <GroupLineEvent
        event={ e }
        key={_.uniqueId('sum-event')}
        first={ (index === 0) ? true : false }/>));
	}

	render() {

		let lines = this.props.line_group.split('-');

		if (!lines || !this.props.events) {
			return null;
		}
		let color = mta.getLineGroupColor(this.props.line_group);
		let myGlColor = {
			borderLeftColor: color
		};
    let myGLHeaderColor = {
      backgroundColor: "#DDD" // @TODO color
    };

		return(
			<View style={ [glStyle.groupLineCard, myGlColor]}>
				<GridRow styles={ [ myGLHeaderColor, glStyle.groupLineCardHeader ]}>
					<GridRow h3="true" styles={ glStyle.h3 }>
						{ assembleLines(lines, this.props.affectedLines) }
					</GridRow>
					<View>
						<Text>
              { assembleBoros(this.props.boros, false, false, glStyle.boro) }
            </Text>
					</View>
				</GridRow>

				<View>
					{ this.assembleEvents(this.props.events) }
				</View>
			</View>
		);
	}
}
