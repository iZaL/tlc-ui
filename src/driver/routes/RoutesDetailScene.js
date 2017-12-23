import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import RoutesList from 'driver/routes/components/RoutesList';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';

class RoutesDetailScene extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          routeID: PropTypes.number.isRequired,
        }),
      }),
    }),
    route: PropTypes.shape({
      origin: PropTypes.object.isRequired,
      destination: PropTypes.object.isRequired,
      transits:PropTypes.array.isRequired
    }).isRequired
  };

  static defaultProps = {
    navigation:{state:{params:{routeID:0}}},
    route:{
      origin:{},
      destination:{},
      transits:[]
    }
  };

  componentDidMount() {
    const {routeID} = this.props.navigation.state.params;
    this.props.dispatch(DRIVER_ACTIONS.fetchRouteTransits({
      route_id: routeID
    }));
  }

  render() {
    const {route} = this.props;
    console.log('route', route);
    return (
      <View style={{flex: 1}}>

      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getRouteByID = DRIVER_SELECTORS.getRouteByID();
  const mapStateToProps = (state, props) => {
    return {
      route: getRouteByID(state, props.navigation.state.params.routeID),
    };
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps)(RoutesDetailScene);
