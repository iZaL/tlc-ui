import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import LocationList from 'shipper/locations/components/LocationList';

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

  render() {
    let {locations} = this.props;
    return (
      <ScrollView style={{flex: 1}}>
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
