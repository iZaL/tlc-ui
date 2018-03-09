import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';

type State = {
  activeCountry: undefined,
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

  state: State = {
    activeCountry: undefined,
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


  static getDerivedStateFromProps(nextProps) {
    if (!this.state.activeCountry && nextProps.route.origin.id) {
      return {
        activeCountry: nextProps.route.origin,
      }
    }
  }

  setActiveCountry = country => {
    this.setState({
      activeCountry: country,
    });
  };

  onTransitTabItemPress = item => {
    this.setActiveCountry(item);
  };

  saveProfile = () => {};

  render() {
    const {route, visas, licenses} = this.props;
    const {origin, destination, transits} = route;
    const {activeCountry} = this.state;

    let countries = [origin, ...transits, destination];

    let license = {};
    let visa = {};
    if (activeCountry && activeCountry.id) {
      license = licenses.find(license => license.country === activeCountry.id);
      visa = visas.find(visa => visa.country === activeCountry.id);
    }

    return (
      <ScrollView style={{flex: 1}}>
        {/*<RouteTransitsList*/}
        {/*items={countries}*/}
        {/*activeCountryID={activeCountry ? activeCountry.id : 0}*/}
        {/*onItemPress={this.onTransitTabItemPress}*/}
        {/*/>*/}

        {/*<VisaLicenseForm*/}
        {/*items={countries}*/}
        {/*onButtonPress={this.saveProfile}*/}
        {/*country={activeCountry}*/}
        {/*license={license}*/}
        {/*visa={visa}*/}
        {/*/>*/}
      </ScrollView>
    );
  }
}

/**
 * @todo:// make use of current country as a real prop by using it as a selector
 */
const makeMapStateToProps = () => {
  const getRouteByID = DRIVER_SELECTORS.getRouteByID();
  const mapStateToProps = (state, props) => {
    return {
      licenses: DRIVER_SELECTORS.getLicenses(state),
      visas: DRIVER_SELECTORS.getVisas(state),
      route: getRouteByID(state, props.navigation.state.params.routeID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoutesDetailScene);
