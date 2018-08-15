import React, {Component} from 'react';
import {connect} from 'react-redux';
import DocumentAdd from 'components/DocumentAdd';
import PropTypes from 'prop-types';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import I18n from 'utils/locale';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as APP_ACTIONS} from '../../app/common/actions';

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
    country_id: null,
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
      country_id: registration_country && registration_country.id,
      image: registration_image,
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  uploadImage = image => {
    let images = [image];
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        APP_ACTIONS.uploadImages({
          images,
          resolve,
          reject,
        }),
      );
    })
      .then(images => {
        if (images.length) {
          this.setState({
            image: images[0],
          });
        }
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  onSave = () => {
    let {country_id, image, expiry_date, number} = this.state;
    this.props.dispatch(
      DRIVER_ACTIONS.saveTruck({
        registration_country_id: country_id,
        registration_expiry_date: expiry_date,
        registration_image: image,
        registration_number: number,
      }),
    );
  };

  render() {
    let {countries} = this.props;
    return (
      <DocumentAdd
        onValueChange={this.onValueChange}
        onSavePress={this.onSave}
        countries={countries}
        countryModalTitle={I18n.t('truck_registration_country')}
        uploadImage={this.uploadImage}
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
