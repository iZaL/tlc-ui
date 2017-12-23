import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import TransitTab from 'driver/routes/components/TransitTab';

type State = {
  activeCountryID: number,
};

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
      transits: PropTypes.array.isRequired,
    }).isRequired,
  };

  state : State = {
    activeCountryID: 0,
  };

  static defaultProps = {
    navigation: {state: {params: {routeID: 0}}},
    route: {
      origin: {},
      destination: {},
      transits: [],
    },
  };

  componentDidMount() {
    const {routeID} = this.props.navigation.state.params;
    this.props.dispatch(
      DRIVER_ACTIONS.fetchRouteTransits({
        route_id: routeID,
      }),
    );
  }

  setActiveCountry = countryID => {
    this.setState({
      activeCountryID: countryID,
    });
  };

  onTransitTabItemPress = item => {
    this.setActiveCountry(item.id);
  };

  render() {
    const {origin,destination,transits} = this.props.route;
    const {activeCountryID} = this.state;
    return (
      <ScrollView style={{flex: 1,backgroundColor:'white'}}>
        <TransitTab
          items={[origin,destination,...transits]}
          activeCountryID={activeCountryID}
          onItemPress={this.onTransitTabItemPress}
        />
      </ScrollView>
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
