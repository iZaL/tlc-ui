import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import images from 'assets/theme/images';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  };

  componentDidUpdate(nextProps) {
    if (this.props.origin.latitude !== nextProps.origin.latitude) {
      this.map.fitToElements(true);
    }
  }

  onMapLayout = () => {
    this.map.fitToElements(true);
  };

  render() {
    const {destination, style} = this.props;
    const {origin} = this.props;
    const {heading} = origin;

    console.log('this.props', this.props);

    const rotate = typeof heading === 'number' && heading >= 0 ? heading : 0;

    return (
      <View style={[styles.container, style]}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={{
            ...destination,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onLayout={this.onMapLayout}>
          <MapView.Marker
            style={styles.mapMarker}
            anchor={{x: 0.5, y: 0.5, position: 'relative'}}
            coordinate={origin}
            identifier="MarkerOrigin"
            image={images.car}
            rotation={rotate || 0}>
            {/*<Image*/}
            {/*source={images.car}*/}
            {/*style={[styles.image, rotate && {transform: [{rotate}]}]}*/}
            {/*/>*/}
          </MapView.Marker>

          <MapView.Marker
            coordinate={destination}
            identifier="MarkerDestination"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
  mapMarker: {},
  image: {
    width: 20,
    height: 40,
  },
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  address: {
    flex: 1,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});
