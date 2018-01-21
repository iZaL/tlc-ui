import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import CreateAddressForm from "./components/CreateAddressForm";

type Type = 'pick|drop';

class LocationAddScene extends Component {
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
    // this.props.dispatch(SHIPPER_ACTIONS.fetchLocations());
  }

  render() {
    let {type} = this.props.navigation.state.params;
    return (
      <ScrollView style={{flex: 1}}>

        <CreateAddressForm
          onPress={this.saveAddress}
        />

      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(LocationAddScene);
