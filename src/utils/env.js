const defaults = {};
import React from 'react';
import {Platform} from 'react-native';

if (__DEV__) {
  module.exports = {
    ...defaults,
    API_URL:
      Platform.OS === 'ios'
        ? 'http://tlc.test/api'
        : 'http://10.0.2.2:9000/api',
    SOCKET_SERVER: 'http://10.0.2.2:3000',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'KW',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    CODE_PUSH_ENABLED: false,
  };
} else {
  module.exports = {
    ...defaults,
    API_URL: '',
    SOCKET_SERVER: 'http://bp.ideasowners.net:3000',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'en',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    CODE_PUSH_ENABLED: false,
  };
}
