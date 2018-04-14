import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView} from 'react-native';
import Divider from 'components/Divider';
import ListItem from 'components/ListItem';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {ListSection} from 'react-native-paper';

class TruckUpdateScene extends Component {
  static propTypes = {
    truck: PropTypes.shape({
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    truck: {
      model: {},
    },
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  loadTruckRegistrationScene = () => {
    this.props.navigation.navigate('TruckRegistration');
  };

  loadTruckModelScene = () => {
    this.props.navigation.navigate('TruckModel', {
      truck: this.props.truck,
    });
  };

  loadTruckInfoUpdateScene = () => {
    this.props.navigation.navigate('TruckInfoUpdate', {
      truck: this.props.truck,
    });
  };

  loadTrailerUpdateScene = () => {
    this.props.navigation.navigate('TrailerUpdate');
  };

  render() {
    return (
      <ListSection>
        <ListItem onItemPress={this.loadTruckModelScene} name="truck_model" />

        <Divider />

        <ListItem
          onItemPress={this.loadTruckRegistrationScene}
          name="truck_registration"
        />

        <Divider />

        <ListItem
          onItemPress={this.loadTruckInfoUpdateScene}
          name="truck_details"
        />

        <Divider />

        <ListItem
          onItemPress={this.loadTrailerUpdateScene}
          name="trailer_details"
        />
      </ListSection>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
  };
}

export default connect(mapStateToProps)(TruckUpdateScene);
