const defaults = {};
import React from 'react';
import {Platform} from 'react-native';

if (__DEV__) {
  module.exports = {
    ...defaults,
    API_URL:
      Platform.OS === 'ios' ? 'http://tlc.dev/api' : 'http://10.0.2.1:9000/api',
    // API_URL: 'http://127.0.0.1:9000/api',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    CODEPUSH_ENABLED: false,
  };
} else {
  module.exports = {
    ...defaults,
    API_URL: '',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    CODEPUSH_ENABLED: true,
  };
}
