/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import images from 'assets/theme/images';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CountryListModal from 'components/ListModal';

import I18n from 'utils/locale';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import {View} from 'react-native';

export default class DocumentEdit extends Component {
  static propTypes = {
    onEditPress: PropTypes.func,
    onDeletePress: PropTypes.func,
    // item: PropTypes.object.isRequired,
    onCountryPress: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired,
    expiry_date: PropTypes.string.isRequired,
    country: PropTypes.object.isRequired,
    image: PropTypes.string,
    buttonText: PropTypes.string,
    countries: PropTypes.array.isRequired,
    // country: PropTypes.object.isRequired,
    // expiry_date: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // number: PropTypes.string.isRequired,
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  state = {
    isDateTimePickerVisible: false,
    isCountryModalVisible: false,
  };

  static defaultProps = {
    onEditPress: () => {},
    onDeletePress: () => {},
    buttonText: I18n.t('save'),
    // image:images.document_image
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
  _showCountryModalPicker = () => this.setState({isCountryModalVisible: true});
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
  _hideCountryModal = () => this.setState({isCountryModalVisible: false});

  _handleDatePicker = date => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  _handleCountryPicker = countryID => {
    console.log('country', countryID);
    this._hideCountryModal();
  };

  render() {
    let {
      onEditPress,
      onDeletePress,
      onCountryPress,
      number,
      onFieldChange,
      country,
      expiry_date,
      buttonText,
      image,
      countries,
    } = this.props;

    // let {
    //   country,
    //   image,
    //   expiry_date,
    //   title,
    //   number,
    // } = item;

    return (
      <View style={{flex: 1}}>
        <Card>
          <CardContent>
            <Title onPress={this._showCountryModalPicker}>
              {(country && country.name) || I18n.t('select_country')}
            </Title>
            <TextInput
              label={I18n.t('registration_number')}
              value={number}
              onChangeText={text => onFieldChange('registration_number', text)}
            />
          </CardContent>

          {image ? <CardCover source={{uri: image}} /> : <View />}

          <View style={{flexDirection: 'row'}}>
            <CardActions>
              <Button onPress={this._showDateTimePicker}>
                {I18n.t('expiry_date')} : {expiry_date}
              </Button>
            </CardActions>
            <CardActions
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button primary onPress={() => alert('wa')}>
                {buttonText}
              </Button>
            </CardActions>
          </View>
        </Card>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicker}
          onCancel={this._hideDateTimePicker}
        />

        <CountryListModal
          items={countries}
          isVisible={this.state.isCountryModalVisible}
          onConfirm={this._handleCountryPicker}
        />
      </View>
    );
  }
}
