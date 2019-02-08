import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Card from './Card';

type HeaderProps = {
  status: 'initializing',
  numEvents: -1
};

export default class Header extends Component<HeaderProps> {

	render() {
		return (
			<View>
				{(this.props.status == 'initializing' || this.props.status === false)
					? <StateMessage status={this.props.status} />
					: (this.props.numEvents === 0)
						? <AllClear />
						: null
				}
			</View>
		);
	}
}

type StatusMessageProps = {
  status: null
};

export class StateMessage extends Component<typeStatusMessageProps> {
	render() {
		let message = '';

		switch (this.props.status) {
			case 'initializing':
				message = 'Initializing System...';
				break;

			case false:
				message = 'Error talking to Server.';
				break;
		}

		return(
			<Card id={'state-message'} header={''} headerClass={''}>
				<Text>{message}</Text>
			</Card>
		);
	}
}

class AllClear extends React.Component {
	render() {
		return(
			<Card id={'all-clear'} header={''} headerClass={''}>
				<Text>All Good in the 'hood</Text>
			</Card>
		);
	}
}
