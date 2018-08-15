import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentAdd from 'components/DocumentAdd';
import {moment} from 'moment';
import PropTypes from 'prop-types';
import SecurityPassAdd from 'driver/routes/components/SecurityPassAdd';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS as APP_SELECTORS} from 'app/selectors/app';
import I18n from 'utils/locale';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';

class SecurityPassAddScene extends Component {
  static propTypes = {
    residencies: PropTypes.array,
  };

  static defaultProps = {
    gate_passes: [],
    security_pass_id: null,
    expiry_date: new Date(),
    country_id: null,
    image: null,
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchSecurityPasses());
  }

  static navigationOptions = ({navigation}) => {
    return {
      title:
        (navigation.state.params &&
          `${navigation.state.params.title} ${navigation.state.params.type}`) ||
        '',
    };
  };

  constructor(props) {
    super(props);
    let {
      number,
      expiry_date,
      country_id,
      image,
      security_pass_id,
    } = this.props.navigation.state.params;
    this.state = {
      number: number,
      expiry_date: expiry_date,
      country_id: country_id,
      image: image,
      security_pass_id: security_pass_id,
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });

    if (field === 'country_id') {
      this.setState({
        security_pass_id: null,
      });
    }
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
    this.props.dispatch(
      DRIVER_ACTIONS.saveSecurityPass({
        ...this.state,
      }),
    );
  };

  render() {
    let {countries, security_passes} = this.props;
    let {country_id, security_pass_id} = this.state;

    let securityPass = {};
    if (security_pass_id) {
      securityPass = security_passes.find(pass => pass.id === security_pass_id);
    }

    if (country_id) {
      security_passes = security_passes.filter(pass => {
        return pass.country.id === country_id;
      });
    }

    return (
      <SecurityPassAdd
        onValueChange={this.onValueChange}
        onSavePress={this.onSave}
        countries={countries}
        security_passes={security_passes}
        countryModalTitle={I18n.t('select')}
        securityPass={securityPass}
        onImageUpload={this.uploadImage}
        {...this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: COUNTRY_SELECTORS.getCountries(state),
    security_passes: APP_SELECTORS.getSecurityPasses(state) || [],
  };
}

export default connect(mapStateToProps)(SecurityPassAddScene);
