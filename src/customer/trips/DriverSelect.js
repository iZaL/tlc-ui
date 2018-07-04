import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import DriversList from 'customer/loads/components/DriversList';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';
import Tabs from 'components/Tabs';
import TabList from 'components/TabList';
import TabPanels from 'components/TabPanels';
import TabHeader from 'customer/loads/components/TabHeader';
import TabPanel from 'customer/loads/components/TabPanel';
import DriverInfo from 'driver/components/DriverInfo';
import TruckInfo from 'trucks/components/TruckInfo';
import TrailerInfo from 'trucks/components/TrailerInfo';
import ConfirmedButton from "components/ConfirmedButton";

class DriverSelect extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
          driverID:PropTypes.number.isRequired
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
    driver:{}
  };

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadBookableDrivers({
        loadID: this.props.navigation.getParam('loadID',3),
      }),
    );
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchDriver({
        driver_id: this.props.navigation.getParam('driverID',1),
      }),
    );
  }

  onDriverSelect = () => {
    let params = {
      driver_id:this.props.driver.id,
      load_id:this.props.load.id
    };

    return new Promise((resolve, reject) => {
      this.props.dispatch(CUSTOMER_ACTIONS.selectDriver({params, resolve, reject}));
    })
      .then(load => {

        console.log('load',load);


      })
      .catch(e => {
        console.log('e', e);
      });
    // on Success
  };

  render() {
    let {load,driver} = this.props;

    if (load.id && driver.id) {
      return (
        <ScrollView style={{flex: 1}}>
          <Tabs>
            <TabList>
              <TabHeader title={I18n.t('driver')} />
              <TabHeader title={I18n.t('truck')} />
              <TabHeader title={I18n.t('trailer')} />
              {/*<TabHeader title={I18n.t('track')} />*/}
            </TabList>

            <TabPanels>
              <TabPanel hideNextButton={true}>
                <DriverInfo driver={driver} />
              </TabPanel>

              <TabPanel hideNextButton={true}>
                {driver && driver.truck ? (
                  <TruckInfo truck={driver.truck} />
                ) : (
                  <View />
                )}
              </TabPanel>

              <TabPanel hideNextButton={true}>
                {driver && driver.truck && driver.truck.trailer ? (
                  <TrailerInfo trailer={driver.truck.trailer} />
                ) : (
                  <View />
                )}
              </TabPanel>

            </TabPanels>
          </Tabs>

          <ConfirmedButton
            onPress={this.onDriverSelect}
            title={I18n.t('select')}
            description={I18n.t('driver_select_confirmation')}
          />

        </ScrollView>
      );
    }

    return null;
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadByID();
  const getDriverByID = CUSTOMER_SELECTORS.getDriverByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, props.navigation.getParam('loadID',3)),
      driver: getDriverByID(state, props.navigation.getParam('driverID',1)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DriverSelect);
