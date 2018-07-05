import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentAdd from 'components/DocumentAdd';
import {moment} from 'moment';
import PropTypes from 'prop-types';

class NationalityAddScene extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          route: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
  };

  static defaultProps = {
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

  constructor(props) {
    super(props);
    let {
      number,
      expiry_date,
      countryID,
      image,
    } = this.props.navigation.state.params;
    this.state = {
      number: number,
      expiry_date: expiry_date,
      countryID: countryID,
      image: image,
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onSave = () => {
    let documentType = this.props.navigation.getParam('route');
    console.log('documentType',documentType);
  };

  render() {
    let {countries, countryModalTitle} = this.props;
    return (
      <DocumentAdd
        onValueChange={this.onValueChange}
        onSavePress={this.onSave}
        countries={countries}
        countryModalTitle={countryModalTitle}
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
