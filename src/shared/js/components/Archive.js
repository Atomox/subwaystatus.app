import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class Archive extends React.Component {

		render() {
			if (!this.props.archive || !this.props.archive.id) {
				return null;
			}

			if (!this.props.stats) {
				this.props.stats.lines = [];
				this.props.stats.count = 0;
				this.props.stats.time = {};
			}

			let detail = this.props.archive.detail.split('.');
			let id = detail[1];
			detail = (detail[2]) ? detail[2].split('_').join(' ') : 'No Description';

			return (
				<View className="Archive">

					<View className="id">
						<Text h1>{this.props.archive.id}</Text>
						<Text h2>{id}</Text>
					</View>
					<View>
						<Text h2>{(this.props.stats.time)
							? this.props.stats.time.time_of_day : ''}</Text>
						<Text h4>
							{(this.props.stats.time.weekend)
								? 'Weekend' : 'Week Day'}
							&nbsp;/&nbsp;
							{(this.props.stats.time.rush_hour)
								? 'Rush Hour' : 'Off Peak'}
						</Text>
					</View>

					<Text className="description">{detail}</Text>

					<Text>{this.props.stats.count}</Text> events,
					(<Text className="warn">{this.props.stats.planned_events}</Text>/
					<Text className="bad">{this.props.stats.unplanned_events}</Text>), affecting	<Text>{this.props.stats.lines.length}</Text> lines: {(this.props.stats.lines)
						? this.props.stats.lines.join(', ')
						: null }


				</View>
			);
		}
}
