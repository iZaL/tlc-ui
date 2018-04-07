import React, {Component} from 'react';
import {connect} from 'react-redux';
import DocumentAdd from 'components/DocumentAdd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

class TruckRegistrationScene extends Component {
  static propTypes = {
    countries: PropTypes.array,
  };

  static defaultProps = {
    countries: [],
  };

  state = {
    number: null,
    expiry_date: new Date(),
    countryID: null,
    image: null,
  };

  static navigationOptions = ({navigation}) => {
    return {
      title:
        (navigation.state.params &&
          `${navigation.state.params.title} ${navigation.state.params.type}`) ||
        '',
    };
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      registration_number,
      registration_expiry_date,
      registration_country,
      registration_image,
    } = nextProps.truck;

    return {
      number: registration_number,
      expiry_date: new Date(registration_expiry_date),
      countryID: registration_country && registration_country.id,
      image: registration_image,
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onSave = () => {
    console.log('save');
  };

  render() {
    let {countries} = this.props;
    console.log('props', this.props);
    return (
      <DocumentAdd
        onValueChange={this.onValueChange}
        onSavePress={this.onSave}
        countries={countries}
        {...this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(TruckRegistrationScene);
