import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {View} from 'react-native';
import I18n from 'utils/locale';
import DriversList from 'customer/loads/components/DriversList';
import FAB from 'components/FAB';
import colors from 'assets/theme/colors';
import ListModal from 'components/ListModal';

class DriversBlockListScene extends Component {

  static propTypes = {
    blocked_drivers: PropTypes.arrayOf(PropTypes.object).isRequired,
    drivers: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    isDriversModalVisible: false,
  };

  static defaultProps = {
    driver: null,
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchDrivers());
    this.props.dispatch(CUSTOMER_ACTIONS.fetchBlockedDrivers());
  }

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail',{
      driverID:driver.id
    });
  };

  onBlockedDriversListItemPress = (driver: object) => {
    this.setState({
      driver:driver.id
    });
  };

  showDriversModal = () => {
    this.setState({
      isDriversModalVisible: true,
    });
  };

  hideDriversModal = () => {
    this.setState({
      isDriversModalVisible: false,
    });
  };

  blockDriver = () => {
    this.props.dispatch(CUSTOMER_ACTIONS.blockDriver({
      driver_id:this.state.driver
    }));

    this.setState({
      driver:null
    });
    this.hideDriversModal();
  };

  render() {
    const {drivers, blocked_drivers} = this.props;

    let blockedDriverIds = blocked_drivers.map(driver => driver.id);

    return (
      <View style={{flex: 1}}>

        <DriversList
          items={blocked_drivers}
          onItemPress={this.onDriversListItemPress}
        />

        <View style={{alignItems: 'flex-end', padding: 20}}>
          <FAB
            icon="add"
            dark
            onPress={this.showDriversModal}
            medium
            style={{
              backgroundColor: colors.primary,
            }}
          />
        </View>

        <ListModal
          header={I18n.t('drivers_select')}
          onItemPress={this.onBlockedDriversListItemPress}
          activeIDs={blocked_drivers.map(driver => driver.id).concat(this.state.driver)}
          title={item => item.user.name}
          items={drivers.filter(driver => {
            return !blockedDriverIds.includes(driver.id);
          })}
          visible={this.state.isDriversModalVisible}
          onCancel={this.hideDriversModal}
          onSave={this.blockDriver}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    blocked_drivers: CUSTOMER_SELECTORS.getBlockedDrivers(state),
    drivers: CUSTOMER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(DriversBlockListScene);
