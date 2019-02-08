'use strict';

import * as _ from 'lodash';
import log from '../../includes/logger';
import { helpers } from '../../includes/helpers';
import { assembleBoros } from './Summary.helpers';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Txt from '../common/Txt';
import { GridRow, RowCell } from '../common/Grid';
import TrainLine from '../TrainLine';

import glStyle from '../../../styles/Summary.styles';
type GroupLineEventProps = {
  event: {
    keyword: []
  },
	first: false,
};

export default class GroupLineEvent extends React.Component <GroupLineEventProps> {

  getMainTag() {
    let mainTag = (this.props.event.keyword[0])
      ? this.props.event.keyword[0]
      : {tag: '', weight: 5};

    mainTag.tag = helpers.underscoreToCaps(this.props.event.keyword[0].tag);
    return mainTag;
  }

	render() {

    let mainTag = this.getMainTag();
    let tagStyleName = (mainTag.weight)
      ? 'weight' + mainTag.weight
      : 'weight5';
    let rowStyle = (this.props.first !== true)
      ? [glStyle.groupLineRowLine, glStyle.groupLineRow]
      : [glStyle.groupLineRow];

    return (
      <GridRow styles={ rowStyle }>
        <RowCell cols={ 3 }>
          <Txt styles={ glStyle.lines }>
            { (this.props.event.lines && Array.isArray(this.props.event.lines)) ? this.props.event.lines.join(' / ') : '' }
          </Txt>
        </RowCell>

        <RowCell cols={ 5 }>
          <Txt styles={ glStyle[tagStyleName] }>
            {	(mainTag.tag) ? mainTag.tag : 'UNKNOWN' }
          </Txt>
        </RowCell>

        <RowCell styles={ [{marginLeft: 'auto'}] }>
          <Txt>
            {	(this.props.event.boro) ? assembleBoros(this.props.event.boro, true, false, [glStyle.boro]) : null }
          </Txt>
        </RowCell>
      </GridRow>
    );
  }
}
