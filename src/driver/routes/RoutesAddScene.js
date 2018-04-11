import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import RouteTransitsList from './components/RouteTransitsList';
import VisaLicenseForm from './components/VisaLicenseForm';
import FormLabel from '../../components/FormLabel';
import TextBox from '../../components/TextBox';
import I18n from 'utils/locale';
import colors from '../../assets/theme/colors';
import List from '../../components/List';
import {ACTIONS as APP_ACTIONS} from '../../app/common/actions';
import Listing from '../../components/Listing';
import {Caption, Title} from 'react-native-paper';
import AppButton from '../../components/AppButton';

class RoutesAddScene extends Component {
  static defaultProps = {
    destinationCountry: {
      locations: [],
    },
  };

  state = {
    isOriginModalVisible: false,
    isDestinationModalVisible: false,
    // origin_id:null,
    destination_country_id: null,
    destination_location_ids: [],
    destination_location_any: false,
    selected_all: true,
  };

  static getDerivedStateFromProps(nextProps,nextState) {
    let {route} = nextProps.navigation.state.params;
    if(route) {
      console.log('route');
      return {
        selected_all:false,
        destination_country_id:route.destination.id,
        destination_location_ids:route.locations && route.locations.filter(location => location.has_added).map(location => location.id) || []
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  showOriginModal = () => {
    this.setState({
      isOriginModalVisible: true,
    });
  };

  hideOriginModal = () => {
    this.setState({
      isOriginModalVisible: false,
    });
  };

  showDestinationModal = () => {
    this.setState({
      isDestinationModalVisible: true,
    });
  };

  hideDestinationModal = () => {
    this.setState({
      isDestinationModalVisible: false,
    });
  };

  setOrigin = origin => {};

  setDestination = country => {
    let countryLocations = country.locations || [];
    this.setState({
      destination_country_id: country.id,
      selected_all: true,
      destination_location_ids: countryLocations.map(location => location.id),
    });
  };

  onLocationPress = location => {
    let {destination_location_ids} = this.state;
    let {id} = location;

    this.setState({
      destination_location_ids: destination_location_ids.includes(id)
        ? destination_location_ids.filter(locationID => locationID != id)
        : destination_location_ids.concat(id),
    });
  };

  onSave = () => {};

  toggleSelectAll = () => {
    if (this.state.selected_all) {
      this.unselectAll();
    } else {
      this.selectAll();
    }

    this.setState({
      selected_all: !this.state.selected_all,
    });
  };

  unselectAll = () => {
    this.setState({
      destination_location_ids: [],
    });
  };

  selectAll = () => {
    let destinationCountry = this.getCountry(this.state.destination_country_id);
    let countryLocations = destinationCountry.locations || [];
    this.setState({
      destination_location_ids: countryLocations.map(location => location.id),
    });
  };

  getCountry = destination_country_id => {
    return this.props.destination_countries.find(
      country => country.id === destination_country_id,
    );
  };

  render() {

    let {destination_countries,origin_country} = this.props;

    // if(!origin_country.id) {
    //   origin_country = this.props.navigation.state.params.route.origin;
    // }

    console.log('props',this.props);

    let {
      destination_country_id,
      selected_all,
      destination_location_ids,
    } = this.state;

    let destinationCountry = {};

    if (destination_country_id) {
      destinationCountry = this.getCountry(destination_country_id);
    }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            padding: 10,
            marginVertical: 10,
            flexDirection: 'row',
            backgroundColor: colors.blue,
            alignItems: 'center',
          }}>
          <TextBox onPress={this.showOriginModal} style={{marginRight: 5}}>
            {origin_country.name
              ? origin_country.name.toUpperCase()
              : I18n.t('origin').toUpperCase()}
          </TextBox>
          <Text style={{color: 'white', paddingHorizontal: 2}}>
            {I18n.t('to')}
          </Text>
          <TextBox onPress={this.showDestinationModal} style={{marginLeft: 5}}>
            {destinationCountry.name
              ? destinationCountry.name.toUpperCase()
              : I18n.t('destination').toUpperCase()}
          </TextBox>
        </View>

        <List
          title={I18n.t('origin')}
          activeIDs={[origin_country.id]}
          isVisible={this.state.isOriginModalVisible}
          onConfirm={this.setOrigin}
          onCancel={this.hideOriginModal}
          items={[origin_country]}
        />

        <List
          title={I18n.t('destination')}
          activeIDs={[destination_country_id]}
          isVisible={this.state.isDestinationModalVisible}
          onConfirm={this.setDestination}
          onCancel={this.hideDestinationModal}
          items={destination_countries}
        />

        {destinationCountry.id &&
          destinationCountry.show_route_locations &&
          destinationCountry.locations &&
          destinationCountry.locations.length && (
            <View style={{flex: 1, padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Title style={{flex: 1}}>{I18n.t('select_locations')}</Title>
                <Caption onPress={this.toggleSelectAll}>
                  {selected_all ? I18n.t('deselect_all') : I18n.t('select_all')}
                </Caption>
              </View>
              <Listing
                onItemPress={this.onLocationPress}
                activeIDs={destination_location_ids}
                items={destinationCountry.locations}
              />
            </View>
          )}

        <AppButton onPress={this.onSave} />
      </View>
    );
  }
}

/**
 * @todo:// make use of current country as a real prop by using it as a selector
 */
const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      origin_country: DRIVER_SELECTORS.getTruckRegistrationCountry(state),
      destination_countries: DRIVER_SELECTORS.getRouteDestinationCountries(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoutesAddScene);
