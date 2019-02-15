import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _uniqueId from 'lodash/uniqueId';

import Txt from './common/Txt';
import tStyleFn from '../../styles/Train.styles';

const tStyleHeader = tStyleFn(24),
	tStyleRouteChange = tStyleFn(12);

import { mtaSubway as mta } from '../includes/mta.subway';

type TrainLineProps = {
	'line': null,
	'dir': -1,
	'disabled': false,
	'disabledBase': false,
	'outline': false,
	'styleType': 'large',
};

export default class TrainLine extends Component <TrainLineProps> {

	getBaseStyleGroup() {
		return (this.props.styleType === 'large')
			? tStyleHeader
			: tStyleRouteChange;
	}

	getLine() {
		return (this.props.line.length > 4)
			? mta.getlineById(this.props.line)
			: this.props.line;
	}

	getDirection(styles) {
		return (this.props.dir !== 'both' && this.props.dir && this.props.styleType === 'large')
			? (<Txt className="direction" styles={ styles }> { mta.getlineDirectionAbbreviation(this.props.dir)}</Txt> )
			: null;
	}

	getStyles(s) {
		let stylesBase = [];
		let stylesText = [];
		if (this.props.disabled) {
			stylesBase.push(s.disabledBase);
			stylesBase.push(s.outline);
			stylesText.push(s.disabledText);
		}
		if (this.props.outline) {
			stylesBase.push(s.outline);
		}

		return {
			'base': stylesBase,
			'text': stylesText
		}
	}

	render() {

		let s = this.getBaseStyleGroup();
		let styles = this.getStyles(s);

		if (this.props.styleType !== 'large') {
			return this.renderInline(s, styles);
		}

		return (
			<View style={s.container}>
				<View style={[s.base, ...styles.base]}>
					<Txt styles={[s.text, ...styles.text]}>
						{ this.getLine() }
					</Txt>
				</View>
				{ this.getDirection(s.direction) }
			</View>
		);
	}

	renderInline(s, styles) {
		return (
			<View style={ s.containerSmall }>
				<View style={[s.base, ...styles.base]}>
					<Txt styles={[s.text, ...styles.text]}>
						{ this.getLine() }
					</Txt>
				</View>
				{ this.getDirection(s.direction) }
			</View>
		);
	}
}
