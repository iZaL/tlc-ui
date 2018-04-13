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
    origin_location_ids: [],
    destination_country_id: null,
    destination_location_ids: [],
    selected_pick_all: true,
    selected_drop_all: true,
    listType:'pick',
    mode:'add'
  };

  static getDerivedStateFromProps(nextProps,nextState) {
    let {route} = nextProps.navigation.state.params;
    if(route) {
      console.log('route',route);
      return {
        selected_pick_all:false,
        destination_country_id:route.destination.id,
        destination_location_ids:route.destination.locations && route.destination.locations.filter(location => location.has_added).map(location => location.id) || [],
        origin_location_ids:nextProps.origin_country && nextProps.origin_country.locations.filter(location => location.has_added).map(location => location.id) || []
      }
    } else {
      return {
        origin_location_ids:nextProps.origin_country && nextProps.origin_country.locations.filter(location => location.has_added).map(location => location.id) || []
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  showOriginModal = () => {
    // this.setState({
    //   isOriginModalVisible: true,
    // });
    this.setState({
      listType:'pick',
    })
  };

  hideOriginModal = () => {
    this.setState({
      isOriginModalVisible: false,
    });
  };

  showDestinationModal = () => {
    if(this.state.destination_country_id) {
      this.setState({
        listType:'drop',
      })
    } else {
      if(this.state.mode === 'add') {
        this.setState({
          isDestinationModalVisible: true,
        });
      }
    }
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
      selected_drop_all: true,
      destination_location_ids: countryLocations.map(location => location.id),
      listType:'drop',
    });
  };

  onDestinationLocationPress = location => {
    console.log('loca',location);
    let {destination_location_ids} = this.state;
    let {id} = location;

    this.setState({
      destination_location_ids: destination_location_ids.includes(id)
        ? destination_location_ids.filter(locationID => locationID != id)
        : destination_location_ids.concat(id),
    });
  };

  onOriginLocationPress = location => {
    let {origin_location_ids} = this.state;
    let {id} = location;

    this.setState({
      origin_location_ids: origin_location_ids.includes(id)
        ? origin_location_ids.filter(locationID => locationID != id)
        : origin_location_ids.concat(id),
    });
  };

  onSave = () => {};

  togglePickSelectAll = () => {
    if (this.state.selected_pick_all) {
      this.setState({
        origin_location_ids: [],
      });
    } else {
      let originCountry = this.getCountry(this.props.origin_country.id);
      let countryLocations = originCountry.locations || [];
      this.setState({
        origin_location_ids: countryLocations.map(location => location.id),
      });
    }

    this.setState({
      selected_pick_all: !this.state.selected_pick_all,
    });
  };

  toggleDropSelectAll = () => {
    if (this.state.selected_drop_all) {
      this.setState({
        destination_location_ids: [],
      });
    } else {
      let destinationCountry = this.getCountry(this.state.destination_country_id);
      let countryLocations = destinationCountry.locations || [];
      this.setState({
        destination_location_ids: countryLocations.map(location => location.id),
      });
    }

    this.setState({
      selected_drop_all: !this.state.selected_drop_all,
      listType:'drop',
    });
  };

  getCountry = destination_country_id => {
    return this.props.destination_countries.find(
      country => country.id === destination_country_id,
    );
  };

  render() {

    let {destination_countries,origin_country} = this.props;

    let {
      destination_country_id,
      selected_pick_all,
      selected_drop_all,
      destination_location_ids,
      origin_location_ids,
      listType
    } = this.state;

    console.log('lis',listType);

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
          <TextBox active={listType ==='pick'} onPress={this.showOriginModal} style={{marginRight: 5}}>
            {origin_country.name
              ? origin_country.name.toUpperCase()
              : I18n.t('origin').toUpperCase()}
          </TextBox>
          <Text style={{color: 'white', paddingHorizontal: 2}}>
            {I18n.t('to')}
          </Text>
          <TextBox active={listType==='drop'} onPress={this.showDestinationModal} style={{marginLeft: 5}}>
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

        {
          listType === 'pick' &&
          origin_country.locations &&
          origin_country.locations.length && (
            <View style={{flex: 1, padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Title style={{flex: 1}}>{I18n.t('select_pick_locations')}</Title>
                <Caption onPress={this.togglePickSelectAll}>
                  {selected_pick_all ? I18n.t('deselect_all') : I18n.t('select_all')}
                </Caption>
              </View>
              <Listing
                onItemPress={this.onOriginLocationPress}
                activeIDs={origin_location_ids}
                items={origin_country.locations}
              />
            </View>
          )}

        {
          listType === 'drop' &&
          destinationCountry.id &&
          destinationCountry.locations &&
          destinationCountry.locations.length && (
            <View style={{flex: 1, padding: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Title style={{flex: 1}}>{I18n.t('select_drop_locations')}</Title>
                <Caption onPress={this.toggleDropSelectAll}>
                  {selected_drop_all ? I18n.t('deselect_all') : I18n.t('select_all')}
                </Caption>
              </View>
              <Listing
                onItemPress={this.onDestinationLocationPress}
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
