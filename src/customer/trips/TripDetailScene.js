import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
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

class TripDetailScene extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.load !== this.props.load;
  // }

  componentDidMount() {
    // let {tripID} = this.props.navigation.state.params;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchTripDetails({
        tripID: 1,
      }),
    );
  }

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

  render() {
    let {trip} = this.props;

    console.log('props', trip);

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

              <TabPanel hideNextButton={true}/>

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
  const mapStateToProps = (state, props) => {
    return {
      trip: getTripByID(state, 1),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TripDetailScene);
