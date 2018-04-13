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
import {Caption, DialogTitle, RadioButton, RadioButtonGroup, Switch, Title} from 'react-native-paper';
import AppButton from '../../components/AppButton';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from "../../components/Separator";
import Touchable from 'react-native-platform-touchable';

class RoutesAddScene extends Component {
  state = {
    isDestinationCountriesModalVisible: false,
    destination_country_id: null,
    isOriginLocationsModalVisible: false,
    isDestinationLocationsModalVisible: false,
    origin_location_ids: [],
    destination_location_ids: [],
    origin_location_all: true,
    destination_location_all: true,
    origin_select_all: true,
    destination_select_all: true,
    active_type: 'origin',
    mode: 'add',
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    let {route} = nextProps.navigation.state.params;
    if (route) {
      return {
        origin_select_all: false,
        destination_country_id: route.destination.id,
        destination_location_ids:
        (route.destination.locations &&
          route.destination.locations
            .filter(location => location.has_added)
            .map(location => location.id)) ||
        [],
        origin_location_ids:
        (nextProps.origin_country &&
          nextProps.origin_country.locations
            .filter(location => location.has_added)
            .map(location => location.id)) ||
        [],
      };
    } else {
      return {
        origin_location_ids:
        (nextProps.origin_country &&
          nextProps.origin_country.locations
            .filter(location => location.has_added)
            .map(location => location.id)) ||
        [],
      };
    }
  }

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  onOriginBoxPress = () => {
    this.setState({
      active_type: 'origin',
    });
  };

  hideOriginLocationsModal = () => {
    this.setState({
      isOriginLocationsModalVisible: false,
    });
  };

  showOriginLocationsModal = () => {
    this.setState({
      isOriginLocationsModalVisible: true,
    });
  };

  onDestinationCountrySavePress = () => {
    console.log('onDestinationCountrySavePress');
    this.hideDestinationCountriesModal();
  };

  onDestinationBoxPress = () => {
    // this.setState({
    //   active_type: 'destination',
    // });

    this.showDestinationCountriesModal();
    //
    // if (this.state.destination_country_id) {
    //   // this.showDestinationLocationsModal();
    // } else {
    //   if (this.state.mode === 'add') {
    //     this.showDestinationCountriesModal();
    //   }
    // }
  };

  hideDestinationCountriesModal = () => {
    console.log('hideDestinationCountriesModal');
    this.setState({
      isDestinationCountriesModalVisible: false
    });
  };

  showDestinationCountriesModal = () => {
    this.setState({
      isDestinationCountriesModalVisible: true
    });
  };

  showDestinationLocationsModal = () => {
    this.setState({
      isDestinationLocationsModalVisible: true
    });
    // if (this.state.destination_country_id) {
    //   this.setState({
    //     active_type: 'drop',
    //   });
    // } else {
    //   if (this.state.mode === 'add') {
    //     this.setState({
    //       isDestinationLocationsModalVisible: true,
    //     });
    //   }
    // }
  };

  hideDestinationLocationsModal = () => {
    this.setState({
      isDestinationLocationsModalVisible: false,
    });
  };

  onDestinationCountryItemPress = country => {
    let countryLocations = country.locations || [];
    this.setState({
      destination_country_id: country.id,
      destination_location_ids: countryLocations.map(location => location.id),
      active_type: 'destination',
    });
  };

  onDestinationLocationItemPress = location => {
    let {destination_location_ids} = this.state;
    let {id} = location;

    this.setState({
      destination_location_ids: destination_location_ids.includes(id)
        ? destination_location_ids.filter(locationID => locationID != id)
        : destination_location_ids.concat(id),
    });
  };

  onOriginLocationItemPress = location => {
    let {origin_location_ids} = this.state;
    let {id} = location;

    this.setState({
      origin_location_ids: origin_location_ids.includes(id)
        ? origin_location_ids.filter(locationID => locationID != id)
        : origin_location_ids.concat(id),
    });

  };

  onSave = () => {
  };

  toggleOriginSelectAll = () => {
    if (this.state.origin_select_all) {
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
      origin_select_all: !this.state.origin_select_all,
    });
  };

  toggleDestinationSelectAll = () => {
    if (this.state.destination_select_all) {
      this.setState({
        destination_location_ids: [],
      });
    } else {
      let destinationCountry = this.getCountry(
        this.state.destination_country_id,
      );
      let countryLocations = destinationCountry.locations || [];
      this.setState({
        destination_location_ids: countryLocations.map(location => location.id),
      });
    }

    this.setState({
      destination_select_all: !this.state.destination_select_all,
    });
  };

  getCountry = destination_country_id => {
    return this.props.destination_countries.find(
      country => country.id === destination_country_id,
    );
  };

  onDestinationLocationsSavePress = () => {
    this.hideDestinationLocationsModal();
  };

  onOriginCountryPress = () => {
    this.setState({origin_location_all: true});
  };

  onOriginCitiesPress = () => {
    this.setState({
      origin_location_all: false,
      isOriginLocationsModalVisible: true
    });
  };

  onDestinationCitiesPress = () => {
    this.setState({
      destination_location_all: false,
      isDestinationLocationsModalVisible: true
    });
  };

  render() {
    let {destination_countries, origin_country} = this.props;

    let {
      destination_country_id,
      origin_select_all,
      destination_select_all,
      destination_location_ids,
      origin_location_ids,
      active_type,
      destination_location_all,
      origin_location_all,
      isDestinationLocationsModalVisible,
      isDestinationCountriesModalVisible,
      isOriginLocationsModalVisible,
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
          <TextBox
            active={active_type === 'origin'}
            onPress={this.onOriginBoxPress}
            style={{marginRight: 5}}>
            {origin_country.name
              ? origin_country.name.toUpperCase()
              : I18n.t('origin').toUpperCase()}
          </TextBox>

          <Entypo name="swap" color="white" size={15}/>

          <TextBox
            active={active_type === 'destination'}
            onPress={this.onDestinationBoxPress}
            style={{marginLeft: 5}}>
            {destinationCountry.name
              ? destinationCountry.name.toUpperCase()
              : I18n.t('destination').toUpperCase()}
          </TextBox>
        </View>

        {active_type === 'origin' &&
        // origin_country.locations &&
        // origin_country.locations.length && (
          <View style={{flex: 1, padding: 10}}>

            <DialogTitle>
              {I18n.t('select_pick_locations')}
            </DialogTitle>

            <Touchable
              onPress={this.onOriginCountryPress}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}
                >
                  <RadioButton
                    disabled={false}
                    checked={origin_location_all}
                    onPress={this.onOriginCountryPress}
                  />
                </View>
                <Title style={{flex: 8, paddingHorizontal: 10}}>
                  {I18n.t('anywhere_in')} {origin_country.name}
                </Title>
              </View>
            </Touchable>

            <Separator style={{marginVertical: 5}}/>

            <Touchable
              onPress={this.onOriginCitiesPress}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}
                >
                  <RadioButton
                    disabled={false}
                    checked={!origin_location_all}
                    onPress={this.onOriginCitiesPress}
                    style={{flex: 1}}
                  />
                </View>
                <Title style={{flex: 8, paddingHorizontal: 10}}>
                  {I18n.t('select_cities')}
                </Title>
              </View>
            </Touchable>

            {/*</RadioButtonGroup>*/}

            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*/!*<Title style={{flex: 1}}>*!/*/}
            {/*/!*{I18n.t('select_pick_locations')}*!/*/}
            {/*/!*</Title>*!/*/}
            {/*<Caption onPress={this.toggleOriginSelectAll}>*/}
            {/*{origin_select_all*/}
            {/*? I18n.t('deselect_all')*/}
            {/*: I18n.t('select_all')}*/}
            {/*</Caption>*/}
            {/*</View>*/}
            {/*<Listing*/}
            {/*onItemPress={this.onOriginLocationItemPress}*/}
            {/*activeIDs={origin_location_ids}*/}
            {/*items={origin_country.locations}*/}
            {/*/>*/}
          </View>
        }

        {active_type === 'destination' &&
        // destinationCountry.id &&
        // destinationCountry.locations &&
        // destinationCountry.locations.length && (
          <View style={{flex: 1, padding: 10}}>

            <DialogTitle>
              {I18n.t('select_drop_locations')}
            </DialogTitle>

            <Touchable
              onPress={this.onDestinationCountryPress}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}
                >
                  <RadioButton
                    disabled={false}
                    checked={destination_location_all}
                    onPress={this.onDestinationCountryPress}
                  />
                </View>
                <Title style={{flex: 8, paddingHorizontal: 10}}>
                  {I18n.t('anywhere_in')} {destinationCountry.name}
                </Title>
              </View>
            </Touchable>

            <Separator style={{marginVertical: 5}}/>

            <Touchable
              onPress={this.onDestinationCitiesPress}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}
                >
                  <RadioButton
                    disabled={false}
                    checked={!destination_location_all}
                    onPress={this.onDestinationCitiesPress}
                    style={{flex: 1}}
                  />
                </View>
                <Title style={{flex: 8, paddingHorizontal: 10}}>
                  {I18n.t('select_cities')}
                </Title>
              </View>
            </Touchable>

            {/*</RadioButtonGroup>*/}

            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*/!*<Title style={{flex: 1}}>*!/*/}
            {/*/!*{I18n.t('select_pick_locations')}*!/*/}
            {/*/!*</Title>*!/*/}
            {/*<Caption onPress={this.toggleOriginSelectAll}>*/}
            {/*{origin_select_all*/}
            {/*? I18n.t('deselect_all')*/}
            {/*: I18n.t('select_all')}*/}
            {/*</Caption>*/}
            {/*</View>*/}
            {/*<Listing*/}
            {/*onItemPress={this.onOriginLocationItemPress}*/}
            {/*activeIDs={origin_location_ids}*/}
            {/*items={origin_country.locations}*/}
            {/*/>*/}
          </View>
        }
{/*{active_type === 'destination' &&*/}
        {/*destinationCountry.id &&*/}
        {/*destinationCountry.locations &&*/}
        {/*destinationCountry.locations.length && (*/}
          {/*<View style={{flex: 1, padding: 10}}>*/}
            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
              {/*<Title style={{flex: 1}}>*/}
                {/*{I18n.t('select_drop_locations')}*/}
              {/*</Title>*/}
              {/*<Caption onPress={this.toggleDestinationSelectAll}>*/}
                {/*{destination_select_all*/}
                  {/*? I18n.t('deselect_all')*/}
                  {/*: I18n.t('select_all')}*/}
              {/*</Caption>*/}
            {/*</View>*/}
            {/*<Listing*/}
              {/*onItemPress={this.onDestinationLocationItemPress}*/}
              {/*activeIDs={destination_location_ids}*/}
              {/*items={destinationCountry.locations}*/}
            {/*/>*/}
          {/*</View>*/}
        {/*)}*/}

        <AppButton onPress={this.onSave}/>

        <List
          title={I18n.t('select_locations')}
          onItemPress={this.onOriginLocationItemPress}
          activeIDs={origin_location_ids}
          items={origin_country.locations}
          isVisible={isOriginLocationsModalVisible}
          onCancel={this.hideOriginLocationsModal}
          onSave={this.onDestinationLocationsSavePress}
        />

        <List
          title={I18n.t('destination_country')}
          activeIDs={[destination_country_id]}
          isVisible={isDestinationCountriesModalVisible}
          onSave={this.onDestinationCountrySavePress}
          onItemPress={this.onDestinationCountryItemPress}
          onCancel={this.hideDestinationCountriesModal}
          items={destination_countries}
        />

        <List
          title={I18n.t('select_locations')}
          onItemPress={this.onDestinationLocationItemPress}
          activeIDs={destination_location_ids}
          items={destinationCountry.locations}
          isVisible={isDestinationLocationsModalVisible}
          onCancel={this.hideDestinationLocationsModal}
          onSave={this.onDestinationLocationsSavePress}
        />

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
      destination_countries: DRIVER_SELECTORS.getRouteDestinationCountries(
        state,
      ),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(RoutesAddScene);
