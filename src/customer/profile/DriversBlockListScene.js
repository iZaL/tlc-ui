import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {View} from 'react-native';
import I18n from 'utils/locale';
import DriversList from 'customer/loads/components/DriversList';
import {FAB} from 'react-native-paper';
import colors from 'assets/theme/colors';
import ListModal from 'components/ListModal';

class DriversBlockListScene extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    isDriversModalVisible: false,
  };

  static defaultProps = {
    employees: [],
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchDrivers());
    this.props.dispatch(CUSTOMER_ACTIONS.fetchBlockedDrivers());
  }

  onDriversListItemPress = (driver: object) => {
    console.log('@todo:delete driver');
  };

  onDriversBlockListItemPress = () => {};

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

  onBlockedDriversSavePress = () => {
    console.log('save');
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

        <FAB
          icon="add"
          dark
          onPress={this.showDriversModal}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />

        <ListModal
          header={I18n.t('drivers_select')}
          onItemPress={this.onDriversBlockListItemPress}
          activeIDs={blocked_drivers.map(driver => driver.id)}
          title={item => item.user.name}
          items={drivers.filter(driver => {
            return !blockedDriverIds.includes(driver.id);
          })}
          visible={this.state.isDriversModalVisible}
          onCancel={this.hideDriversModal}
          onSave={this.onBlockedDriversSavePress}
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
