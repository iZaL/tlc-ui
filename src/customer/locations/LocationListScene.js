import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, View} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import LocationList from 'customer/locations/components/LocationList';
import I18n from 'utils/locale';
import FAB from 'components/FAB';
import colors from 'assets/theme/colors';

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
    const type = navigation.getParam('type');
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
    console.log('item', item);
    this.props.navigation.navigate('LocationEdit', {
      address: item,
    });
  };
  // onLocationListItemPress = (item: object) => {
  //   Alert.alert(
  //     I18n.t('location_delete'),
  //     null,
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'Yes', onPress: () => console.log('@todo')},
  //     ],
  //     {cancelable: false},
  //   );
  // };

  onLocationCreatePress = () => {
    this.props.navigation.navigate('LocationAdd', {
      type: this.props.navigation.getParam('type'),
    });
  };

  render() {
    let {locations} = this.props;
    return (
      <View style={{flex: 1}}>
        <LocationList
          items={locations}
          onItemPress={this.onLocationListItemPress}
        />

        <View style={{alignItems: 'flex-end', paddingBottom: 20}}>
          <FAB
            icon="add"
            dark
            onPress={this.onLocationCreatePress}
            medium
            style={{
              backgroundColor: colors.primary,
            }}
          />
        </View>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getLocationsByType = CUSTOMER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(
        state,
        props.navigation.getParam('type', 'origin'),
      ),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LocationListScene);
