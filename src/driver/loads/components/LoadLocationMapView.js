import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 29.3759;
const LATITUDESA = 23.8859;
const LONGITUDE = 47.9774;
const LONGITUDESA = 45.0792;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function createMarker(modifier = 1) {
  return {
    latitude: LATITUDE - (SPACE * modifier),
    longitude: LONGITUDE - (SPACE * modifier),
  };
}

function createMarker2(modifier = 1) {
  return {
    latitude: LATITUDESA - (SPACE * modifier),
    longitude: LONGITUDESA - (SPACE * modifier),
  };
}

const MARKERS = [
  createMarker(),
  createMarker2(2),
];

const DEFAULT_PADDING = { top: 50, right: 50, bottom: 50, left: 50 };

export default class LoadLocationMapView extends React.Component {

  componentDidMount() {
    this.map.fitToCoordinates(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {MARKERS.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker}
            />
          ))}
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
