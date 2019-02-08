'use strict';

import * as _ from 'lodash';

import React, { Component } from 'react';
import { View } from 'react-native';

import gStyles from '../../../styles/Grid.styles';

let GridProps = {
  size: 0,
  styles: [],
};

export class GridRow extends Component <GridProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }


    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.row] }>
			    {this.props.children}
  			</View>
  		);
  	}
};

export class RowCell extends Component <GridProps> {

    getSize() {
      return _.get(gStyles, 'row' + this.props.cols, []);
    }

    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.rowCell, this.getSize()] }>
			    {this.props.children}
  			</View>
  		);
  	}
};

export class GridCol extends Component <GridProps> {

    getHeading(type) {
      return (this.props.heading && this.props.heading === type) ? true : false;
    }

    render() {
  		return(
  			<View
          style={ [this.props.styles, gStyles.col] }>
			    {this.props.children}
  			</View>
  		);
  	}
};
