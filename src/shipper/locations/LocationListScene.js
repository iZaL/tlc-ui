import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import LocationList from 'shipper/locations/components/LocationList';
import Button from "../../components/Button";
import I18n from 'utils/locale';

type Type = 'pick|drop';

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

  static defaultProps = {
    type: 'pick',
  };

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchLocations());
  }

  onLocationListItemPress = (item: object) => {
    this.props.navigation.goBack(null);
  };

  onLocationCreatePress = () => {
    let {type} = this.props.navigation.state.params;

    this.props.navigation.navigate('LocationAdd',{
      type:type
    })
  };

  render() {
    let {locations} = this.props;
    let {type} = this.props.navigation.state.params;
    return (
      <ScrollView style={{flex: 1}}>

        <Button title={type === 'pick' ? I18n.t('location_pick_add') : I18n.t('location_drop_add') }
                onPress={this.onLocationCreatePress}
                style={{marginVertical:10}}
        />

        <LocationList
          items={locations}
          onItemPress={this.onLocationListItemPress}
        />


      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getLocationsByType = SHIPPER_SELECTORS.getLocationsByType();
  const mapStateToProps = (state, props) => {
    return {
      locations: getLocationsByType(state, props.navigation.state.params.type),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(LocationListScene);
