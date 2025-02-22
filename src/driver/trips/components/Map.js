import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Image, Linking, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import images from 'assets/theme/images';
import Button from 'components/Button';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from 'utils/env';

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
    startTrip: PropTypes.func.isRequired,
    finishTrip: PropTypes.func.isRequired,
    tripStatus: PropTypes.string,
  };

  static defaultProps = {
    tripStatus: 'pending',
  };

  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      origin: {
        latitude: this.props.origin.latitude,
        longitude: this.props.origin.longitude,
        heading: 0,
      },
    };
  }

  componentDidMount() {
    const {trip} = this.props;

    let url = `${API_URL}/trips/${trip.id}/location/update`;

    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('http', this.onHttp);

    BackgroundGeolocation.configure(
      {
        distanceFilter: 10,
        stopOnTerminate: false,
        preventSuspend: false,
        startOnBoot: true,
        foregroundService: true,
        url: url,
        autoSync: true,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        maxRecordsToPersist: 1,
      },
      state => {
        this.setState({
          enabled: state.enabled,
          // enabled: state.enabled && tripStatus === 'working',
        });
      },
    );
  }

  componentWillUnmount() {
    BackgroundGeolocation.un('location', this.onLocation);
  }

  onLocation = location => {
    this.map.fitToElements(true);
    const lastPosition = this.state.origin;
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    };

    if (lastPosition.latitude !== currentLocation.latitude) {
      this.setState({
        origin: {
          ...this.state.origin,
          ...currentLocation,
        },
      });
    }
  };

  onHttp = response => {
    // this.addEvent('http', new Date(), response);
  };
  //
  // onMotionChange(event) {
  //   this.setState({
  //     isMoving: event.isMoving,
  //   });
  //   // this.addEvent('motionchange', new Date(event.location.timestamp), event.location);
  // }

  onMapLayout = () => {
    this.map.fitToElements(true);
  };

  reCenterMap = () => {
    this.map.fitToElements(true);
  };

  openInGoogleMaps = () => {
    this.openMaps();
  };

  openMaps() {
    let {latitude, longitude} = this.props.destination;

    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  }

  startTrip = () => {
    this.map.fitToElements(true);
    if (!this.state.enabled) {
      this.setState({
        enabled: true,
      });
    }

    this.props.startTrip();
    BackgroundGeolocation.start();
  };

  stopTrip = () => {
    this.map.fitToElements(true);
    if (this.state.enabled) {
      this.setState({
        enabled: false,
      });
    }
    this.props.finishTrip();
    BackgroundGeolocation.stop();
  };

  render() {
    const {destination} = this.props;
    const {origin, enabled} = this.state;
    const {heading} = this.state.origin;
    const rotate =
      typeof heading === 'number' && heading >= 0 ? `${heading}deg` : undefined;

    return (
      <View style={styles.container}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={false}
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
          {/*<MapView.Marker*/}
          {/*style={styles.mapMarker}*/}
          {/*anchor={{x: 0.5, y: 0.5, position: 'relative'}}*/}
          {/*coordinate={origin}*/}
          {/*identifier="MarkerOrigin">*/}
          {/*<Image*/}
          {/*source={images.car}*/}
          {/*style={[styles.image, rotate && {transform: [{rotate}]}]}*/}
          {/*/>*/}
          {/*</MapView.Marker>*/}

          <MapView.Marker
            coordinate={destination}
            identifier="MarkerDestination"
          />
        </MapView>

        <View style={{backgroundColor: 'white'}}>
          <View style={styles.navContainer}>
            <Touchable onPress={this.reCenterMap}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons name="arrow-all" size={35} />
                {/*<Text>Re center</Text>*/}
              </View>
            </Touchable>
            <Text style={styles.address}>
              Salwa, Block 7, Street 5, House 22
            </Text>

            <Touchable onPress={this.openInGoogleMaps}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="ios-navigate-outline" size={35} />
                {/*<Text>Direction</Text>*/}
              </View>
            </Touchable>
          </View>

          <Button
            title={enabled ? 'Stop Trip' : 'Start Trip'}
            onPress={enabled ? this.stopTrip : this.startTrip}
            style={{marginBottom: 10}}
          />
        </View>
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
