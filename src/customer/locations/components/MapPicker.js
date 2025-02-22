/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPicker extends Component {
  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.address.area_id !== this.props.address.area_id;
  // }

  constructor(props) {
    super(props);
    this.state = {
      mapInitialized: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        mapInitialized: true,
      });
    }, 1000);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.address.area_id !== this.props.address.area_id) {
      this.map.animateToRegion(this.props.address);
    }
  }

  updateAddress = (address: object) => {
    this.props.updateAddress(address);
  };

  onRegionChangeComplete = region => {
    let {latitude, longitude} = region;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.updateAddress(params);
  };

  render() {
    const {latitude, longitude} = this.props.address;
    if (this.state.mapInitialized) {
      return (
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={[styles.container]}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          pitchEnabled={false}
          rotateEnabled={false}>
          <Image
            source={require('./../../../assets/images/pin.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </MapView>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});
