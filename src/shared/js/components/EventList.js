import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash/uniqueId';
import log from '../includes/logger';

import Event from './Event';

type EventListProps = {
  events: {}
};


export default class EventList extends Component<EventListProps> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: undefined
    };
  }

	/**
	 * @TODO
	 *    Testing debugging in child components.
	 */
	componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      errorMsg: error
    });
		log.error('Error occured:', error, '\n', info);
    throw new Error('Error!');
	}

	render() {

    if (this.state.hasError) {
      return (
        <View>
          <Text>Error!</Text>
          <Text>{this.state.errorMsg}</Text>
        </View>
      );
    }

		return (
			<View>
        {Object.keys(this.props.events).map(key => {
            return <Event
              key={_uniqueId('event-')}
              event={this.props.events[key]} />
          })
        }
      </View>
		);
	}
}


EventList.propTypes = {
  events: PropTypes.any.isRequired,
};
