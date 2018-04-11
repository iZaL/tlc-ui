import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import RoutesList from 'driver/routes/components/RoutesList';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {FAB} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {ACTIONS as APP_ACTIONS} from '../../app/common/actions';

class RoutesUpdateScene extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.object.isRequired,
        destination: PropTypes.object.isRequired,
      }),
    ).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  toggleItem = (item: object) => {
    this.props.dispatch(
      DRIVER_ACTIONS.saveRoute({
        route_id: item.id,
      }),
    );
  };

  onItemIconPress = item => {
    this.toggleItem(item);
  };

  onRoutesListItemPress = item => {
    console.log('item',item);

    this.props.navigation.navigate('RoutesAdd', {
      route: item,
      mode:'edit'
      // origin_country: this.props.origin_country,
    });
  };

  onAddPress = () => {
    this.props.navigation.navigate('RoutesAdd',{
      route:undefined,
      mode:'add'
    });
  };

  render() {
    const {routes} = this.props;
    return (
      <View style={{flex: 1}}>
        <RoutesList
          items={routes}
          onItemPress={this.onRoutesListItemPress}
          onIconPress={this.onItemIconPress}
        />
        <FAB
          icon="add"
          dark
          onPress={this.onAddPress}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    routes: DRIVER_SELECTORS.getRoutes(state),
    // origin_country:DRIVER_SELECTORS.getTruckRegistrationCountry(state)
  };
}

export default connect(mapStateToProps)(RoutesUpdateScene);
