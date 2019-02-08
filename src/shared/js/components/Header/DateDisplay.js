import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';

import dStyle from '../../../styles/Header.styles';
import commonStyle from '../../../styles/Common.styles';
import stStyle from '../../../styles/Station.styles';

export const DateDisplay = (props) => {

	return (
		<View className="DateHeader" style={ dStyle.dateContainer }>
			<Text h5="true" style={ [dStyle.dateBase, dStyle.date] }>{moment(props.age).format('dddd, MMMM Do')}</Text>
			<Text h1="true" style={ [dStyle.dateBase, dStyle.time] }>{moment(props.age).format('h:mm A')}</Text>
			<Text h4="true" style={ [dStyle.dateBase, dStyle.releaseName] }><Text className="station" style={ [stStyle.base, dStyle.releaseName] }>Cathedral Pkwy</Text> Release</Text>
		</View>
	);
}
