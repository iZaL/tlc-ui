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
import Map from 'customer/trips/components/Map';
import Modal from 'components/Modal';
import ConfirmedButton from "components/ConfirmedButton";

class BookableDriversListScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    navigation: {state: {params: {loadID: 0}}},
    load: {},
  };

  state = {
    selectedDriverID: null,
    dialogVisible: false,
    dialogTitle: null,
    driverDetailModalVisible: false,
  };

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchLoadBookableDrivers({
        loadID: this.props.navigation.getParam('loadID',3),
      }),
    );
  }

  onDriverListItemPress = (item: object) => {
    this.props.navigation.navigate('DriverSelect', {
      loadID: this.props.load.id,
      driverID:item.id
    });
  };

  render() {
    let {load} = this.props;

    if (load.id) {
      return (
        <DriversList
          onItemPress={this.onDriverListItemPress}
          items={load.bookable_drivers || []}
        />
      );
    }

    return null;
  }
}

const makeMapStateToProps = () => {
  const getLoadByID = CUSTOMER_SELECTORS.getLoadByID();
  const mapStateToProps = (state, props) => {
    return {
      load: getLoadByID(state, props.navigation.getParam('loadID',3)),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(BookableDriversListScene);
