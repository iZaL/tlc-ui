import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentAdd from 'components/DocumentAdd';
import {moment} from 'moment';
import PropTypes from 'prop-types';

class NationalityAddScene extends Component {

  static propTypes = {
    residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
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
