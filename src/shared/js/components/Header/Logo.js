import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Txt from '../common/Txt';

import { GridRow, GridCol, RowCell } from '../common/Grid';
import hStyle from '../../../styles/Header.styles';

const Logo = (props) => {

	return (
		<GridCol className="Logo">
			<GridRow>
				<Txt styles={ hStyle.logoH1 }>Subway</Txt>
				<Txt styles={ hStyle.logoH1Thin }>Delays</Txt>
			</GridRow>
			<Txt h2="true" styles={ hStyle.logoH2 }>for New York City</Txt>
		</GridCol>
	);
}

export default Logo;
