/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'components/Modal';
import I18n from 'utils/locale';
import {
  Card,
  TextInput,
  Title,
} from 'react-native-paper';
import {View} from 'react-native';
import Button from 'components/Button';

export default class DocumentEdit extends Component {
  static propTypes = {
    onEditPress: PropTypes.func,
    onDeletePress: PropTypes.func,
    onCountryPress: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired,
    expiry_date: PropTypes.string.isRequired,
    country: PropTypes.object.isRequired,
    image: PropTypes.string,
    buttonText: PropTypes.string,
    countries: PropTypes.array.isRequired,
  };

  state = {
    isDateTimePickerVisible: false,
    isCountryModalVisible: false,
  };

  static defaultProps = {
    onEditPress: () => {},
    onDeletePress: () => {},
    buttonText: I18n.t('save'),
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
  _showCountryModalPicker = () => this.setState({isCountryModalVisible: true});
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
  _hideCountryModal = () => this.setState({isCountryModalVisible: false});

  _handleDatePicker = date => {
    this._hideDateTimePicker();
  };

  _handleCountryPicker = countryID => {
    this._hideCountryModal();
  };

  render() {
    let {
      number,
      onValueChange,
      country,
      expiry_date,
      buttonText,
      image,
      countries,
    } = this.props;

    return (
      <View style={{flex: 1}}>
        <Card>
          <Card.Content>
            <Title onPress={this._showCountryModalPicker}>
              {(country && country.name) || I18n.t('select_country')}
            </Title>
            <TextInput
              label={I18n.t('registration_number')}
              value={number}
              onValueChange={onValueChange}
              field="registration_number"
            />
          </Card.Content>

          {image ? <Card.Cover source={{uri: image}} /> : <View />}

          <View style={{flexDirection: 'row'}}>
            <Card.Actions>
              <Button onPress={this._showDateTimePicker}>
                {I18n.t('expiry_date')} : {expiry_date}
              </Button>
            </Card.Actions>
            <Card.Actions
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button primary onPress={() => alert('wa')}>
                {buttonText}
              </Button>
            </Card.Actions>
          </View>
        </Card>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicker}
          onCancel={this._hideDateTimePicker}
        />

        <Modal
          items={countries}
          visible={this.state.isCountryModalVisible}
          onItemPress={this._handleCountryPicker}
        />
      </View>
    );
  }
}
