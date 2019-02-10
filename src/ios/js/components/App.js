import React, {Component} from 'react';
import {Platform, StyleSheet, Text, ScrollView, View, RefreshControl } from 'react-native';

import {styles} from '../../styles/App.styles';

import Header from '../../../shared/js/components/Header';
import Summary from '../../../shared/js/components/Summary/Summary';
import EventList from '../../../shared/js/components/EventList';

import log from '../../../shared/js/includes/logger';

import MTADApi from '../../../shared/js/MtaDelaysApi';

if (global && !global.self && Platform.OS === 'ios') {
  global.self = global;
}

const delaysApi = new MTADApi();

type Props = {};

export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: true,
      status: 'initializing',
      debug: 'requesting',
      env: delaysApi.getEnv(),
      apiUrl: delaysApi.getEnvUrl(),
      age: 0,
      events: [],
      archive: null,
      summary: null
    }

    this.fetchApi(true);
  }

  fetchApi = (onInit) => {
    // If we're already fetching, don't trigger another refresh.
    // We set refreshing to true on the first load, because the state
    // isn't set yet, so don't exit.
    if (onInit !== true && this.state && this.state.refreshing === true) {
      return;
    }
    if (onInit !== true) {
      this.setRefresh(true);
    }

    return delaysApi.getStatus()
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
    })
    .then( data => {
      this.setRefresh(false);
    });
  }

  // Refresh callback triggered from <RefreshControl>
  _onRefresh = () => {
    this.fetchApi();
  }

  setRefresh = (refresh) => {
    this.setState(prevState => {
      prevState.refreshing = (refresh) ? true : false;
      return prevState;
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
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>

          <Header
            age={this.state.age}
            status={this.state.status}
            numEvents={this.state.events.length}
            archive={this.state.archive}
            summary={this.state.summary}
            debug={this.state.debug} />

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
