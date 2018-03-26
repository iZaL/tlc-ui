/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ListModal from 'components/ListModal';
import I18n from 'utils/locale';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  TextInput,
  Title,
  Headline
} from 'react-native-paper';
import {View} from 'react-native';
import moment from 'moment';
import DocumentUpload from 'components/DocumentUpload';

export default class DocumentAdd extends PureComponent {

  static propTypes = {
    onSavePress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func,
    onFieldChange: PropTypes.func.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    expiry_date: PropTypes.any,
    image: PropTypes.string,
    buttonText: PropTypes.string,
    countries: PropTypes.array.isRequired,
  };

  state = {
    isDateTimePickerVisible: false,
    isCountryModalVisible: false,
  };

  static defaultProps = {
    buttonText: I18n.t('save'),
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
  _showCountryModalPicker = () => this.setState({isCountryModalVisible: true});
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
  _hideCountryModal = () => this.setState({isCountryModalVisible: false});

  _handleDatePicker = date => {
    this.props.onFieldChange('expiry_date', date);
    this._hideDateTimePicker();
  };

  _handleCountryPicker = countryID => {
    this.props.onFieldChange('countryID', countryID);
    this._hideCountryModal();
  };

  render() {
    let {
      number,
      onFieldChange,
      expiry_date,
      buttonText,
      image,
      countries,
      countryID,
      onSavePress,
    } = this.props;

    let country = countryID
      ? countries.find(country => country.id === countryID)
      : {};

    return (
      <View style={{flex: 1}}>
        <Card>
          <CardContent>

            <Button
              onPress={this._showCountryModalPicker}
              buttonStyle={{
                textAlign: 'left'
              }}
            >
              {(country && country.name) || I18n.t('select_country')}
            </Button>

            <TextInput
              label={I18n.t('registration_number')}
              value={number}
              onChangeText={text => onFieldChange('number', text)}
            />

          </CardContent>

          <DocumentUpload
            onPress={image => onFieldChange('image', image)}
            image={image}
            style={{marginHorizontal: 15}}
          />

          <View style={{flexDirection: 'row'}}>
            <CardActions>
              <Button onPress={this._showDateTimePicker}>
                {I18n.t('expiry_date')}
                :{' '}
                {expiry_date
                  ? moment(expiry_date).format('DD-MMM-YYYY')
                  : I18n.t('select_expiry_date')}
              </Button>
            </CardActions>
            <CardActions
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button primary onPress={onSavePress}>
                {buttonText}
              </Button>
            </CardActions>
          </View>
        </Card>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicker}
          onCancel={this._hideDateTimePicker}
          date={expiry_date}
        />

        <ListModal
          items={countries}
          isVisible={this.state.isCountryModalVisible}
          onConfirm={this._handleCountryPicker}
          onCancel={this._hideCountryModal}
          title={I18n.t('residency_country_select')}
          activeID={countryID}
        />
      </View>
    );
  }
}
