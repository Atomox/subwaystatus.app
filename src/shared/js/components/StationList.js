import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import { mtaSubway as mta } from '../includes/mta.subway';
import { TrainLine } from './TrainLine';
import { Station } from './Station';

export default class StationList extends Component {

	render() {
		if (Object.keys(this.props.stations).length === 0) {
			return null;
		}

    let station_list = (Object.keys(this.props.stations).map(line => (
        <View key={_uniqueId()} className="station-list-line">
					<TrainLine
						key={_uniqueId('train-' + line)}
						line={line}
						outline={true} />
          {
            Object.keys(this.props.stations[line].stations).map( sid =>  (
              <Station
								key={_uniqueId('sid-')}
                stations={this.props.stations}
                line={line}
                sid={sid} />
              ))
          }
        </View>
      )
    ));

		return (
      <View key={_uniqueId('stations-')} className="station-list">
  			{	station_list }
  		</View>
    );
	}
}

StationList.propTypes = {
  stations: PropTypes.any.isRequired,
};
