import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import RoutesList from 'driver/routes/components/RoutesList';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';

class UpdateRoutesScene extends Component {

  static propTypes = {
    // routes:PropTypes.array.isRequired
  };

  componentDidMount() {
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
    this.props.navigation.navigate('RoutesDetail', {
      routeID: item.id,
    });
  };

  render() {
    const {available_routes} = this.props;
    return (
      <View style={{flex: 1}}>
        <RoutesList
          items={available_routes}
          onItemPress={this.onRoutesListItemPress}
          onIconPress={this.onItemIconPress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    available_routes:DRIVER_SELECTORS.getAvailableRoutes(state),
  };
}

export default connect(mapStateToProps)(UpdateRoutesScene);
