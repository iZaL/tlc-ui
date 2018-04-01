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
import {moment} from 'moment';

class NationalityAddScene extends Component {
  static propTypes = {
    // residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
  };

  state = {
    number: null,
    expiry_date: new Date(),
    countryID: null,
    image: null,
  };

  onFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onSave = () => {
    console.log('save');
  };

  render() {
    let {countries} = this.props;
    console.log('state', this.state);
    return (
      <DocumentAdd
        onFieldChange={this.onFieldChange}
        onSavePress={this.onSave}
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

export default connect(mapStateToProps)(NationalityAddScene);
