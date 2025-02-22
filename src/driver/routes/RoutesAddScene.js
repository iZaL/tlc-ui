import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import TextBox from 'components/TextBox';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import ListModal from 'components/ListModal';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {Caption, Headline, Title} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Divider from 'components/Divider';
import CheckedListItem from 'components/CheckedListItem';
import ConfirmedButton from 'components/ConfirmedButton';

class RoutesAddScene extends Component {
  state = {
    isOriginLocationsModalVisible: false,
    originAny: true,
    isOriginSelectAllButtonSelected: true,

    isDestinationCountriesModalVisible: false,
    isDestinationLocationsModalVisible: false,
    destinationAny: true,
    isDestinationSelectAllButtonSelected: true,

    activeType: 'origin',
    mode: 'add',

    //DB Values
    origin_location_ids: [],
    destination_country_id: null,
    destination_location_ids: [],
  };

  static defaultProps = {
    destinationCountry: {},
    origin_country: {},
    destination_countries: [],
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    let {route} = nextProps.navigation.state.params;
    if (route) {
      return {
        isOriginSelectAllButtonSelected: false,
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
      activeType: 'origin',
    });
  };

  onOriginCountryPress = () => {
    this.setState({originAny: true});
  };

  onOriginCitiesPress = () => {
    this.setState({
      originAny: false,
    });
    this.showOriginLocationsModal();
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

  onOriginLocationItemPress = location => {
    let {origin_location_ids} = this.state;
    let {id} = location;

    this.setState({
      origin_location_ids: origin_location_ids.includes(id)
        ? origin_location_ids.filter(locationID => locationID != id)
        : origin_location_ids.concat(id),
    });
  };

  // Destination Tab

  onDestinationBoxPress = () => {
    this.setState({
      activeType: 'destination',
    });

    if (!this.state.destination_country_id) {
      this.showDestinationCountriesModal();
    }
    //
    // if (this.state.destination_country_id) {
    //   // this.showDestinationLocationsModal();
    // } else {
    //   if (this.state.mode === 'add') {
    //     this.showDestinationCountriesModal();
    //   }
    // }
  };

  onDestinationCountryItemPress = country => {
    let countryLocations = country.locations || [];
    this.setState({
      destination_country_id: country.id,
      destination_location_ids: countryLocations.map(location => location.id),
    });
  };

  onDestinationCountrySavePress = () => {
    this.hideDestinationCountriesModal();
  };

  onDestinationAnyPress = () => {
    this.setState({destinationAny: true});
  };

  onDestinationCitiesPress = () => {
    this.setState({
      destinationAny: false,
    });
    this.showDestinationLocationsModal();
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

  onDestinationLocationsSavePress = () => {
    this.hideDestinationLocationsModal();
  };

  onOriginLocationsSavePress = () => {
    this.hideOriginLocationsModal();
  };

  showDestinationCountriesModal = () => {
    this.setState({
      isDestinationCountriesModalVisible: true,
    });
  };

  hideDestinationCountriesModal = () => {
    this.setState({
      isDestinationCountriesModalVisible: false,
    });
  };

  showDestinationLocationsModal = () => {
    this.setState({
      isDestinationLocationsModalVisible: true,
    });
  };

  hideDestinationLocationsModal = () => {
    this.setState({
      isDestinationLocationsModalVisible: false,
    });
  };

  toggleOriginSelectAll = () => {
    if (this.state.isOriginSelectAllButtonSelected) {
      this.setState({
        origin_location_ids: [],
      });
    } else {
      let originCountry = this.getCountry(this.props.origin_country.id);
      if (originCountry) {
        let countryLocations = originCountry.locations || [];
        this.setState({
          origin_location_ids: countryLocations.map(location => location.id),
        });
      }
    }

    this.setState({
      isOriginSelectAllButtonSelected: !this.state
        .isOriginSelectAllButtonSelected,
    });
  };

  toggleDestinationSelectAll = () => {
    if (this.state.isDestinationSelectAllButtonSelected) {
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
      isDestinationSelectAllButtonSelected: !this.state
        .isDestinationSelectAllButtonSelected,
    });
  };

  getCountry = destination_country_id => {
    return this.props.destination_countries.find(
      country => country.id === destination_country_id,
    );
  };

  onSave = () => {
    this.props.dispatch(
      APP_ACTIONS.setNotification({
        message: I18n.t('saved'),
      }),
    );
  };

  render() {
    let {
      destination_countries,
      origin_country,
      destinationCountry,
    } = this.props;

    let {
      origin_location_ids,
      destination_country_id,
      destination_location_ids,
      originAny,
      destinationAny,
      isOriginSelectAllButtonSelected,
      isOriginLocationsModalVisible,
      isDestinationSelectAllButtonSelected,
      isDestinationLocationsModalVisible,
      isDestinationCountriesModalVisible,
      activeType,
    } = this.state;

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
            active={activeType === 'origin'}
            onPress={this.onOriginBoxPress}
            style={{marginRight: 5}}
            title={
              origin_country.name
                ? origin_country.name.toUpperCase()
                : I18n.t('origin').toUpperCase()
            }
          />

          <Entypo name="swap" color="white" size={15} />

          <TextBox
            active={activeType === 'destination'}
            onPress={this.onDestinationBoxPress}
            style={{marginLeft: 5}}
            title={
              destinationCountry.name
                ? destinationCountry.name.toUpperCase()
                : I18n.t('destination').toUpperCase()
            }
          />
        </View>

        {activeType === 'origin' && (
          <View style={{flex: 1, padding: 10}}>
            <Title style={{textAlign: 'center', paddingBottom: 20}}>
              {I18n.t('select_pick_locations')}
            </Title>

            <CheckedListItem
              onPress={this.onOriginCountryPress}
              checked={originAny}
              title={`${I18n.t('anywhere_in')} ${origin_country.name}`}
            />

            <Divider style={{marginVertical: 5}} />

            <CheckedListItem
              onPress={this.onOriginCitiesPress}
              checked={!originAny}
              title={I18n.t('multiple_locations')}
            />
          </View>
        )}

        {activeType === 'destination' &&
          destination_country_id && (
            <View style={{flex: 1, padding: 10}}>
              <Title style={{textAlign: 'center', paddingBottom: 20}}>
                {I18n.t('select_drop_locations')}
              </Title>

              <CheckedListItem
                onPress={this.onDestinationAnyPress}
                checked={destinationAny}
                title={`${I18n.t('anywhere_in')} ${origin_country.name}`}
              />

              <Divider style={{marginVertical: 5}} />

              <CheckedListItem
                onPress={this.onDestinationCitiesPress}
                checked={!destinationAny}
                title={I18n.t('multiple_locations')}
              />
            </View>
          )}

        <ConfirmedButton
          onPress={this.onSave}
          disabled={!destination_country_id}
          title={I18n.t('save')}
        />

        <ListModal
          onItemPress={this.onOriginLocationItemPress}
          activeIDs={origin_location_ids}
          items={origin_country.locations || []}
          visible={isOriginLocationsModalVisible}
          onCancel={this.hideOriginLocationsModal}
          onSave={this.onOriginLocationsSavePress}
          header={
            <View style={{paddingHorizontal: 15, paddingTop: 15}}>
              <Headline style={{textAlign: 'center'}}>
                {I18n.t('select_locations')}
              </Headline>
              <Caption onPress={this.toggleOriginSelectAll}>
                {isOriginSelectAllButtonSelected
                  ? I18n.t('deselect_all')
                  : I18n.t('select_all')}
              </Caption>
            </View>
          }
        />

        <ListModal
          header={I18n.t('destination_country')}
          activeIDs={[destination_country_id]}
          visible={isDestinationCountriesModalVisible}
          onSave={this.onDestinationCountrySavePress}
          onItemPress={this.onDestinationCountryItemPress}
          onCancel={this.hideDestinationCountriesModal}
          items={destination_countries || []}
        />

        <ListModal
          onItemPress={this.onDestinationLocationItemPress}
          activeIDs={destination_location_ids}
          items={destinationCountry.locations || []}
          visible={isDestinationLocationsModalVisible}
          onCancel={this.hideDestinationLocationsModal}
          onSave={this.onDestinationLocationsSavePress}
          header={
            <View style={{paddingHorizontal: 15, paddingTop: 15}}>
              <Headline style={{textAlign: 'center'}}>
                {I18n.t('select_locations')}
              </Headline>
              <Caption onPress={this.toggleDestinationSelectAll}>
                {isDestinationSelectAllButtonSelected
                  ? I18n.t('deselect_all')
                  : I18n.t('select_all')}
              </Caption>
            </View>
          }
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    origin_country: DRIVER_SELECTORS.getTruckRegistrationCountry(state),
    destination_countries: DRIVER_SELECTORS.getRouteDestinationCountries(state),
  };
}

export default connect(mapStateToProps)(RoutesAddScene);
