import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import txtStyles from '../../../styles/Txt.styles';

let TxtProps = {
  styles: [],
};

export default class Txt extends Component <TxtProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }

    render() {
  		return(
  			<Text
          style={ [this.props.styles, txtStyles.global] }>
			    {this.props.children}
  			</Text>
  		);
  	}
};
