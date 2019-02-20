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

  prepRouteObject(r) {
    const along = this.isRouteLineChange(r);
    return {
      line_change: this.isRouteLineChange(r),
      lcl: (!along && _.get(r, 'exp_lcl') == 'local') ? true : false,
      exp: (!along && _.get(r, 'exp_lcl') == 'express') ? true : false,
      bypass: (r.bypass && r.bypass.length > 0) ? true : false,
      no_svc_between: (r.noTrains) ? true : false
    };
  }

  isRouteLineChange(route) {
    if (route.along && Array.isArray(route.lines)) {
      if (route.lines.indexOf(route.along) === -1) {
        return true;
      }
    }
    return false;
  }

  getRouteAlong(route, rObj) {
    return (rObj.line_change)
      ? (<TrainLine
          key={_.uniqueId('train-' + mta.getlineById(route.along))}
          line={mta.getlineById(route.along)}
          dir={'both'}
          styleType='small'/>)
      : (<Txt> run between</Txt>)
  }

  getRouteFrom(route) {
    return (route.from)
      ? (
          <Station
            key={_.uniqueId('station-' + route.from)}
            stations={this.props.stations}
            line={_.union([route.along],route.lines)}
            sid={route.from}/>
        )
      : null;
  }

  getRouteTo(route) {
    return (route.to)
      ? (
          <Station
            key={_.uniqueId('station-' + route.to)}
            stations={this.props.stations}
            line={_.union([route.along],route.lines)}
            sid={route.to}/>
        )
      : null;
  }

  getRouteBoroGeneral(route) {
    return (route.in)
      ? (<Txt> { route.in }</Txt>)
      : null;
  }

  getRouteTrains(route) {
    return route.lines.map(t => (
      <TrainLine
        key={_.uniqueId('train-' + mta.getlineById(t))}
        line={mta.getlineById(t)}
        dir='both'
        styleType='small'/>
      ));
  }

  getRouteBypassStations(route) {
    return (route.bypass)
      ? (route.bypass
          .map( s => (<Station
            key={_.uniqueId('station-' + s)}
            stations={this.props.stations}
            line={_.union([route.along],route.lines)}
            sid={s}/> ) )
          .reduce((prev, curr) => [prev, '<Txt>, </Txt>', curr])
        )
      : null;
  }

  getRouteAction(route, rObj) {
    if (route.action === 'replace') {
      return 'replace the';
    }
    else if (rObj.line_change) {
      return 'via the';
    }
    else if (rObj.no_svc_between) {
      return 'service';
    }
    else if (rObj.bypass) {
      return 'skip';
    }
//        else if (r.section) {   action = 'section ' + r.section; }
    else if (rObj.lcl || rObj.exp) {
      return 'run ' + route.exp_lcl;
    }

    return 'run';
  }

  getRoutePrefix(route, rObj) {
    let pre = (route.section)
      ? '(' + route.section + ')'
      : '';

    if (route.allTrains === false) {
      pre += (pre.length > 0)
        ? ' ' + 'Some'
        : 'Some';
    }
    if (rObj.no_svc_between) {
      pre += (pre.length > 0)
        ? ' ' + 'No'
        : 'No';
    }

    return pre;
  }

  getRoutes() {
    return this.props.routeInfo.route.map(r => {
      try {

        // Along null is running on same line between stations.
        if (r.along == null) {
          r.along = r.lines[0];
        }

        const rObj = this.prepRouteObject(r);

        let trains = this.getRouteTrains(r);
        let along = this.getRouteAlong(r, rObj);
        let from = this.getRouteFrom(r);
        let to = this.getRouteTo(r);
        let boro_general = this.getRouteBoroGeneral(r);
        let bypass_stations = this.getRouteBypassStations(r);
        let action = this.getRouteAction(r, rObj);
        let pre = this.getRoutePrefix(r, rObj);


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

                { rObj.line_change && along }

                { // No stations, just "in Boro".
                  (boro_general) &&
                  getBoroGeneralText(boro_general) }

                { // No stations, just "in Boro".
                  (!boro_general && bypass_stations) &&
                  getBypassText(bypass_stations) }

                { // Normal Stations from/to.
                  (!boro_general && !bypass_stations) && !rObj.no_svc_between &&
                  getNormalText(from, to) }

                { // Normal Stations from/to.
                  (rObj.no_svc_between) &&
                  getBetweenText(from, to) }

            </Txt>
          </View>
  			);
      }
      catch (err) {
        console.error('Problem with route change: ', r, '|', err);
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
