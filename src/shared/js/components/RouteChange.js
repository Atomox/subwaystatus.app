import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { mtaSubway as mta } from '../includes/mta.subway';
import Txt from './common/Txt';
import Station from './Station';
import TrainLine from './TrainLine';

import rcStyle from '../../styles/RouteChange.styles';

export default class RouteChange extends Component {

  componentDidCatch(err, info) {
    console.log('<!> Route Change Error', err);
  }


  getRoutes() {
    return this.props.routeInfo.route.map(r => {
      try {

        let line_change = true,
          lcl = false,
          exp = false,
          bypass = false,
          no_svc_between = false,
          pre = null,
          action = null;

        // Along null is running on same line between stations.
        if (r.along == null) {
          r.along = r.lines[0];
          line_change = false;
          if (r.noTrains) {
            no_svc_between = true;
          }
          else if (r.bypass && r.bypass.length > 0) {
            bypass = true;
          }
          if (r.exp_lcl) {
            if (r.exp_lcl == 'local') {
              lcl = true;
            }
            else if (r.exp_lcl == 'express') {
              exp = true;
            }
          }
        }

  			let trains = r.lines.map(t => (
          <TrainLine
  					key={_.uniqueId('train-' + mta.getlineById(t))}
  					line={mta.getlineById(t)}
  					dir='both'
            styleType='small'/>
          ));

  			let along = (line_change)
          ? (<TrainLine
				      key={_.uniqueId('train-' + mta.getlineById(r.along))}
		          line={mta.getlineById(r.along)}
              dir={'both'}
              styleType='small'/>)
          : (<Txt> run between</Txt>);

  			let from = (r.from)
          ? (
              <Station
                key={_.uniqueId('station-' + r.from)}
                stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={r.from}/>
		        )
          : null;

  			let to = (r.to)
          ? (
              <Station
                key={_.uniqueId('station-' + r.to)}
      					stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={r.to}/>
	          )
          : null;

        let boro_general = (r.in)
          ? (<Txt> { r.in }</Txt>)
          : null;

        let bypass_stations = (r.bypass)
          ? (r.bypass
              .map( s => (<Station
                key={_.uniqueId('station-' + s)}
      					stations={this.props.stations}
      					line={_.union([r.along],r.lines)}
      					sid={s}/> ) )
              .reduce((prev, curr) => [prev, ', ', curr])
            )
          : null;

        if (r.action === 'replace') { action = 'replace the'; }
        else if (line_change) {       action = 'via the'; }
        else if (no_svc_between) {    action = 'service'; }
        else if (bypass) {            action = 'skip'; }
//        else if (r.section) {   action = 'section ' + r.section; }
        else if (lcl || exp) {  action = 'run ' + r.exp_lcl; }
        else {                  action = 'run'; }

        pre = (r.section) ? '(' + r.section + ')' : '';

        if (r.allTrains === false) {
          pre += (pre.length > 0)
            ? ' ' + 'Some'
            : 'Some';
        }
        if (no_svc_between) {
          pre += (pre.length > 0)
            ? ' ' + 'No'
            : 'No';
        }

        function getBypassText() {
          return (<Txt styles={[rcStyle.flex1,rcStyle.text]}>{ bypass_stations }.</Txt>);
        }

        function getBoroGeneralText(boro_general) {
          return (<Txt styles={[rcStyle.flex1,rcStyle.text]}>in { boro_general }.</Txt>);
        }

        function getNormalText(from, to) {
          return (<Txt styles={[rcStyle.flex1,rcStyle.text]}>from {from} until {to}.</Txt>);
        }

        function getBetweenText(from, to) {
          return (<Txt styles={[rcStyle.flex1,rcStyle.text]}>between {from} and {to}.</Txt>);
        }

  			return (
          <View key={_.uniqueId()} style={ rcStyle.container }>

            <Txt styles={ rcStyle.pre }>{ pre }</Txt>

            { trains }

            <Txt styles={ rcStyle.lineMessageContainer }>

              { /**

                  @TODO -- We need to unwrap this block from txt, while maintaining a line wrap.

                      iOS looks like be breaking the - along - out of the txt, which causes a margin of 2, and screwes up spacing of the message. The Line is bumping right a split second after the load, and overlapping with the following word.

                 */ }
                <Txt styles={ [rcStyle.text, rcStyle.lineSegment] }> { action } </Txt>

                { line_change && along }

                { // No stations, just "in Boro".
                  (boro_general) &&
                  getBoroGeneralText(boro_general) }

                { // No stations, just "in Boro".
                  (!boro_general && bypass_stations) &&
                  getBypassText(bypass_stations) }

                { // Normal Stations from/to.
                  (!boro_general && !bypass_stations) && !no_svc_between &&
                  getNormalText(from, to) }

                { // Normal Stations from/to.
                  (no_svc_between) &&
                  getBetweenText(from, to) }

            </Txt>
          </View>
  			);
      }
      catch (err) {
        console.error('Problem with route change: ', r);
      }

		});
  }

  render() {
		return (
			<View>
        { // className="route-change"
          this.getRoutes()
       }
			</View>
		);
	}
}

RouteChange.propTypes = {
  routeInfo: PropTypes.any.isRequired,
  stations: PropTypes.any.isRequired,
};
