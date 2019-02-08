/** @format */

import {AppRegistry} from 'react-native';
import App from './web/js/components/App';
import {name as appName} from '../app.json';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication('app', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});
