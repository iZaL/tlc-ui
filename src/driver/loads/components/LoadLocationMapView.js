import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = {top: 50, right: 50, bottom: 50, left: 50};

export default class LoadLocationMapView extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    destination: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    initialized: false,
  };

  shouldComponentUpdate(nextProps, prevState) {
    return (
      nextProps.origin !== this.props.origin ||
      this.state.initialized !== prevState.initialized
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialized: true,
      });
    }, 1000);
  }

  onMapLayout = () => {
    let {origin, destination} = this.props;
    console.log('origin', origin);
    console.log('destination', destination);

    this.map.fitToCoordinates(
      [
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },

        {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
      ],
      {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      },
    );
  };

  render() {
    let {origin, destination, style} = this.props;
    let markers = [
      {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
      {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    ];

    return (
      <MapView
        style={styles.container}
        ref={ref => (this.map = ref)}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onLayout={this.onMapLayout}>
        {markers.map((marker, i) => (
          <MapView.Marker key={i} coordinate={marker} />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
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
