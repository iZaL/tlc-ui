import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import TabPanel from 'customer/loads/components/TabPanel';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import I18n from 'utils/locale';
import DriverInfo from 'driver/components/DriverInfo';
import TruckInfo from 'trucks/components/TruckInfo';
import TrailerInfo from 'trucks/components/TrailerInfo';
import Map from 'customer/trips/components/Map';

class TripDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          tripID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    trip: {},
  };

  componentDidMount() {
    let tripID = this.props.navigation.getParam('tripID');

    this.props.dispatch(
      CUSTOMER_ACTIONS.subscribeToTripTrack({
        trip_id: tripID,
      }),
    );

    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchTripDetails({
        trip_id: tripID,
      }),
    );
  }

  render() {
    let {trip, tracking} = this.props;

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

    if (trip.id) {
      return (
        <ScrollView style={{flex: 1}}>
          <Tabs>
            <TabList>
              <TabHeader title={I18n.t('driver')} />
              <TabHeader title={I18n.t('truck')} />
              <TabHeader title={I18n.t('trailer')} />
              <TabHeader title={I18n.t('track')} />
            </TabList>

            <TabPanels>
              <TabPanel hideNextButton={true}>
                {trip.driver ? <DriverInfo driver={trip.driver} /> : <View />}
              </TabPanel>

              <TabPanel hideNextButton={true}>
                {trip.driver && trip.driver.truck ? (
                  <TruckInfo truck={trip.driver.truck} />
                ) : (
                  <View />
                )}
              </TabPanel>

              <TabPanel hideNextButton={true}>
                {trip.driver &&
                trip.driver.truck &&
                trip.driver.truck.trailer ? (
                  <TrailerInfo trailer={trip.driver.truck.trailer} />
                ) : (
                  <View />
                )}
              </TabPanel>

              <TabPanel hideNextButton={true}>
                <Map
                  origin={origin}
                  destination={{
                    latitude: address.latitude,
                    longitude: address.longitude,
                  }}
                  style={{
                    height: 500,
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ScrollView>
      );
    }

    return null;
  }
}

const makeMapStateToProps = () => {
  const getTripByID = CUSTOMER_SELECTORS.getTripByID();
  const getLocationUpdatesForJob = CUSTOMER_SELECTORS.getLocationUpdatesForTrip();
  const mapStateToProps = (state, props) => {
    const tripID = props.navigation.getParam('tripID');
    return {
      trip: getTripByID(state, tripID),
      tracking: getLocationUpdatesForJob(state, tripID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripDetailScene);
