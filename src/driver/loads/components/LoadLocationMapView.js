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
    initialized:false
  };

  shouldComponentUpdate(nextProps,prevstate) {
    return (
      nextProps.origin !== this.props.origin ||
      nextProps.destination !== this.props.destination ||
      this.state.initialized !== prevstate.initialized
    );
  }

  componentDidUpdate() {
    setTimeout(()=>this.setState({
      initialized:true
    }),1000)
  }

  onMapLayout = () => {
    let {origin, destination} = this.props;
    this.map.fitToCoordinates(
      [
        {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
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

    console.log('markers', markers);

    if(!this.state.initialized) {
      return null
    }

    return (
      <View style={[styles.container, style]}>
        <MapView
          style={styles.map}
          ref={ref => (this.map = ref)}
          region={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          cacheEnabled
          onLayout={this.onMapLayout}>
          {markers.map((marker, i) => (
            <MapView.Marker key={i} coordinate={marker} />
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
    // backgroundColor: 'rgba(255,255,255,0.7)',
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
