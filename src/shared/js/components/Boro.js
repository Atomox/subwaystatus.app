import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import log from '../includes/logger';

import commonStyle from '../../styles/Common.styles';

type BoroProps = {
	'boro': null,
	'short': false,
	'caps': true,
	'styles': [],
	'overrideStyle': false
};

export default class Boro extends Component <BoroProps> {

	componentDidCatch(error, info) {
		log.error(error);
	}

	requiredData() {
  	return (this.props.boro)
       ? true : false;
  }

	static defaultProps = {
		short: false,
		caps: true,
		styles: []
	}

	getName(b, caps) {
		switch(b) {
			case 'Mn': return 'Manhattan';
			case 'Bk': return 'Brooklyn';
			case 'Qs': return 'Queens';
			case 'Bx': return 'The Bronx';
			case 'SI':
			case 'Si': return 'Staten Island';
		}
	}

	getShortName(b) {
		switch(b) {

			case 'manhattan':
			case 'Mn':
				return 'Man';

			case 'brooklyn':
			case 'Bk':
				return 'Bklyn';

			case 'queens':
			case 'Qs':
				return 'Qns';

			case 'bronx':
			case 'Bx':
				return 'Bronx';

			case 'statenIsland':
			case 'SI':
			case 'Si':
				return 'S.I.';
		}
	}

	render() {

/**
 		if (!this.requiredData()) {
			log.info('Boro did not meet requirements:', this.props);
  		return null;
    }
*/
		let val = (this.props.short)
			? this.getShortName(this.props.boro)
			: this.getName(this.props.boro);

		if (this.props.caps && typeof val === 'string') {
			val = val.toUpperCase();
		}
		let styles = (this.props.overrideStyle)
			? [...this.props.styles]
			: [commonStyle.strong, ...this.props.styles];

		return (
			<View className="boro">
					<Text style={styles}>{ val }</Text>
			</View>
		);
	}
}

Boro.propTypes = {
  boro: PropTypes.string.isRequired,
  short: PropTypes.bool,
	caps: PropTypes.bool,
	overrideStyle: PropTypes.bool
};
