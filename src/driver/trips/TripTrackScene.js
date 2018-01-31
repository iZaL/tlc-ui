/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/trips/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import BackgroundGeolocation from 'react-native-background-geolocation';

class TripTrackScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          tripID:PropTypes.number.isRequired
        }),
      }),
    }).isRequired,
  };

  componentDidMount() {
    let {tripID} = this.props.navigation.state.params;
    this.props.dispatch(DRIVER_ACTIONS.fetchTripDetails(tripID))
  }

  constructor(props) {
    super(props);
    this.origin = {
      latitude: 37.78825,
      longitude: -122.4324,
      // latitude: 29.3772392006689,
      // longitude: 47.98511826155676,
    };

    BackgroundGeolocation.getCurrentPosition((location) => {
      let {latitude,longitude} = location.coords;
      this.origin = {
        latitude:latitude,
        longitude:longitude
      }
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    }, {
      persist: true,
      samples: 1,
      maximumAge: 5000
    });
  }

  onStartTripPress = () => {
    // let {accepted_job} = this.props.navigation.state.params.order;
    // this.props.dispatch(DRIVER_ACTIONS.startTrip(accepted_job.id));
  };

  onFinishTripPress = () => {
    // let {accepted_job} = this.props.navigation.state.params.order;
    // this.props.dispatch(DRIVER_ACTIONS.finishTrip(accepted_job.id));
  };

  render() {
    let {trip} = this.props;

    let address = {
      latitude: 37.37166518,
      longitude : -122.217832462
    };

    return (
      <Map
        origin={this.origin}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        startTrip={this.onStartTripPress}
        finishTrip={this.onFinishTripPress}
        trip={trip}
      />
    );
  }
}

const makeMapStateToProps = () => {
  // const getTripByID = DRIVER_SELECTORS.getTripByID();
  const mapStateToProps = (state, props) => {
    return {
      // trip: getTripByID(state, props.navigation.state.params.tripID),
      trip: {},
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripTrackScene);
