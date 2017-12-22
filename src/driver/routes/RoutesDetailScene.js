import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {View} from 'react-native';
import RoutesList from 'driver/routes/components/RoutesList';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';

class RoutesDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          routeID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  render() {
    return (
      <View style={{flex: 1}}>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(RoutesDetailScene);
