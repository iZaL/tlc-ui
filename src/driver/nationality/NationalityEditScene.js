import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';

class NationalityEditScene extends Component {
  static propTypes = {
    residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
  };

  // componentDidMount() {
  //   let {status} = this.props.navigation.state.params;
  //   this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  // }

  onLoadsListItemPress = (load: object) => {
    this.props.navigation.navigate('ResidencyDetail', {
      loadID: load.id,
    });
  };

  render() {
    let {residencies} = this.props;
    return <View />;
    // return <CountryList items={loads} onItemPress={this.onLoadsListItemPress} />;
  }
}

function mapStateToProps(state) {
  return {
    residencies: DRIVER_SELECTORS.getResidencies(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(NationalityEditScene);
