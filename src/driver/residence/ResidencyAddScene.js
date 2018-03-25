import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import LoadsList from 'driver/loads/components/LoadsList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import I18n from 'utils/locale';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentAdd from 'components/DocumentAdd';

class ResidencyAddScene extends Component {
  static propTypes = {
    // residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
  };

  state = {
    number: 22222,
    expiry_date: '18-02-2010',
    country: {
      id: 1,
      name: 'Kuwait',
    },
    image: 'http://justsmile.test/img/stock/18.jpg',
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

  onCountryPress = countryID => {
    console.log('country', countryID);
  };

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  render() {
    let {countries} = this.props;
    console.log('countries', countries);

    return (
      <DocumentAdd
        onCountryPress={this.onCountryPress}
        onFieldChange={this.onFieldChange}
        countries={countries}
        {...this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(ResidencyAddScene);
