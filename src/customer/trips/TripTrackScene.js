/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import Map from 'customer/trips/components/Map';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

class TripTrackScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          tripID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.subscribeToTripTrack({
        trip_id: 1,
      }),
    );
  }

  render() {
    let {tracking} = this.props;
    let origin;

    if (tracking.latitude) {
      origin = tracking;
    } else {
      origin = {
        latitude: 37.78825,
        longitude: -122.4324,
        // latitude: 29.3772392006689,
        // longitude: 47.98511826155676,
        heading: 0,
      };
    }

    let address = {
      latitude: 37.37166518,
      longitude: -122.217832462,
    };

    return (
      <Map
        origin={origin}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getLocationUpdatesForJob = CUSTOMER_SELECTORS.getLocationUpdatesForTrip();

  const mapStateToProps = (state, props) => {
    const tripID = props.navigation.state.params.tripID;
    return {
      tracking: getLocationUpdatesForJob(state, tripID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripTrackScene);
