import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentAdd from 'components/DocumentAdd';
import {moment} from 'moment';
import PropTypes from 'prop-types';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

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

  // static defaultProps = {
  //   id:null,
  //   number: null,
  //   expiry_date: new Date(),
  //   countryID: null,
  //   image: null,
  // };

  static navigationOptions = ({navigation}) => {
    return {
      title:
        (navigation.state.params &&
          `${navigation.state.params.title} ${
            navigation.state.params.action
          }`) ||
        '',
    };
  };

  constructor(props) {
    super(props);
    let {
      id,
      number,
      expiry_date,
      country_id,
      image,
      type,
    } = this.props.navigation.state.params;
    this.state = {
      id: id,
      number: number,
      expiry_date: expiry_date,
      country_id: country_id,
      image: image,
      type: type,
      uploaded_image: null,
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
    this.props.dispatch(
      DRIVER_ACTIONS.saveDocument({
        ...this.state,
      }),
    );
  };

  render() {
    let {countries, countryModalTitle} = this.props;
    return (
      <DocumentAdd
        onValueChange={this.onValueChange}
        onSavePress={this.onSave}
        countries={countries}
        countryModalTitle={countryModalTitle}
        uploadImage={this.uploadImage}
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
