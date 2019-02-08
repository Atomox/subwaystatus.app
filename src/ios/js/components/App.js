import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View} from 'react-native';

import {styles} from '../../styles/App.styles';

import Header from '../../../shared/js/components/Header';
import Summary from '../../../shared/js/components/Summary/Summary';
import EventList from '../../../shared/js/components/EventList';

import log from '../../../shared/js/includes/logger';

import MTADApi from '../../../shared/js/MtaDelaysApi';

if (global && !global.self && Platform.OS === 'ios') {
  global.self = global;
}

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    const delaysApi = new MTADApi();

    this.state = {
      status: 'initializing',
      debug: 'requesting',
      env: delaysApi.getEnv(),
      apiUrl: delaysApi.getEnvUrl(),
      age: 0,
      events: [],
      archive: null,
      summary: null
    }

    delaysApi.getStatus()
    .then( data => {
      this.setState(prevState => {
        prevState.debug = 'Received data of type ' + typeof data;
        return prevState;
      });
      return data;
    })
    .then( data => {
      this.setState(prevState => {
        prevState.debug = 'Begin Init Lists...';
        return prevState;
      });
      return this.initLists(data);
    })
    .catch( data => {
      this.setState(prevState => {
        prevState.debug = 'received with error' + data;
        return prevState;
      });
      this.initLists({ status: false });
    });
  }

  initLists = (data) => {

    log.info('initLists: ', data);

    this.setState(prevState => {
      prevState.status = (data.status) ? data.status : false;
      prevState.events = (data.events) ? data.events : [];
      prevState.age = (data.timestamp) ? data.timestamp : Date.now();
      prevState.archive = (data.archive) ? data.archive : null;
      prevState.summary = (data.summary) ? data.summary : null;

      return prevState;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between'
          }}>
          <Header
            age={this.state.age}
            status={this.state.status}
            numEvents={this.state.events.length}
            archive={this.state.archive}
            summary={this.state.summary}/>

          <Summary
            events={this.state.events}
            age={this.state.age}
            status={this.state.status}
            numEvents={this.state.events.length}
            archive={this.state.archive}
            summary={this.state.summary}
            />

          <EventList
            events={this.state.events}/>
        </ScrollView>
      </View>
    );
  }
}
