/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
  offlineAccess: false,
});

AppRegistry.registerComponent(appName, () => App);
