import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import LocationList from 'customer/locations/components/LocationList';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {FAB} from "react-native-paper";
import colors from "../../assets/theme/colors";

type Type = 'origin|destination';

class LocationListScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          type: PropTypes.string,
        }),
      }),
    }),
  };

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    const type = (params && params.type) || null;
    let title = type ? `location_${type}_select` : 'location_list';
    return {
      title: I18n.t(title),
    };
  };

  static defaultProps = {
    type: 'origin',
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchLocations());
  }

  onLocationListItemPress = (item: object) => {
    this.props.navigation.goBack(null);
  };

  onLocationCreatePress = () => {
    let {type} = this.props.navigation.state.params;

    this.props.navigation.navigate('LocationAdd', {
      type: type,
    });
  };

  render() {
    let {locations} = this.props;
    let {type} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>

        {/*<Button*/}
          {/*title={*/}
            {/*type === 'origin'*/}
              {/*? I18n.t('location_origin_add')*/}
              {/*: I18n.t('location_destination_add')*/}
          {/*}*/}
          {/*onPress={this.onLocationCreatePress}*/}
          {/*style={{marginVertical: 10}}*/}
        {/*/>*/}

        <LocationList
          items={locations}
          onItemPress={this.onLocationListItemPress}
        />

        <FAB
          icon="add"
          dark
          onPress={this.onLocationCreatePress}
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

const makeMapStateToProps = () => {
  const getLocationsByType = CUSTOMER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(state, props.navigation.state.params.type),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LocationListScene);
