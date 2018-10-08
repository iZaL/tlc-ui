/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import I18n from 'utils/locale';
import {
  Card,
  Title,
} from 'react-native-paper';
import {View} from 'react-native';
import moment from 'moment';
import DocumentUpload from 'components/DocumentUpload';
import ListModal from 'components/ListModal';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import Button from 'components/Button';

export default class SecurityPassAdd extends PureComponent {
  static propTypes = {
    onSavePress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    expiry_date: PropTypes.any,
    image: PropTypes.string,
    buttonText: PropTypes.string,
    countries: PropTypes.array.isRequired,
    countryModalTitle: PropTypes.string,
    security_pass_id: PropTypes.number,
    securityPass: PropTypes.object,
  };

  state = {
    isDateTimePickerVisible: false,
    isCountryModalVisible: false,
    isSecurityPassModalVisible: false,
  };

  static defaultProps = {
    buttonText: I18n.t('save'),
    countryModalTitle: I18n.t('residency_country_select'),
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
  _showCountryModalPicker = () => this.setState({isCountryModalVisible: true});
  _showSecurityPassModalPicker = () =>
    this.setState({isSecurityPassModalVisible: true});
  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
  _hideCountryModal = () => this.setState({isCountryModalVisible: false});
  _hideSecurityPassModalPicker = () =>
    this.setState({isSecurityPassModalVisible: false});

  _handleDatePicker = date => {
    this.props.onValueChange('expiry_date', date);
    this._hideDateTimePicker();
  };

  _handleCountryPicker = country => {
    this.props.onValueChange('country_id', country.id);
  };

  _handleSecurityPassPicker = pass => {
    this.props.onValueChange('security_pass_id', pass.id);
  };

  render() {
    let {
      onValueChange,
      expiry_date,
      buttonText,
      image,
      countries,
      country_id,
      onSavePress,
      security_pass_id,
      security_passes,
      securityPass,
      onImageUpload,
    } = this.props;

    let country = country_id
      ? countries.find(country => country.id === country_id)
      : {};

    return (
      <View style={{flex: 1}}>
        <Card>
          <Card.Content>
            <Button
              onPress={this._showCountryModalPicker}
              buttonStyle={{
                textAlign: 'left',
              }}>
              {(country && country.name) || I18n.t('select_country')}
            </Button>

            <Touchable onPress={this._showSecurityPassModalPicker}>
              <View>
                <Label title={I18n.t('security_pass')} />
                <Title>
                  {security_pass_id ? securityPass.name : I18n.t('select')}
                </Title>
              </View>
            </Touchable>
          </Card.Content>

          <DocumentUpload
            onPress={onImageUpload}
            image={image}
            style={{marginHorizontal: 16, marginTop: 10}}
          />

          <View style={{flexDirection: 'row'}}>
            <Card.Actions>
              <Button onPress={this._showDateTimePicker}>
                {I18n.t('expiry_date')}
                :{' '}
                {expiry_date
                  ? moment(expiry_date).format('DD-MMM-YYYY')
                  : I18n.t('select_expiry_date')}
              </Button>
            </Card.Actions>
            <Card.Actions
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button primary onPress={onSavePress}>
                {buttonText}
              </Button>
            </Card.Actions>
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
          visible={this.state.isCountryModalVisible}
          onItemPress={this._handleCountryPicker}
          onCancel={this._hideCountryModal}
          onSave={this._hideCountryModal}
          header={I18n.t('select_country')}
          activeIDs={[country_id]}
        />

        <ListModal
          header={I18n.t('security_passes')}
          activeIDs={[security_pass_id]}
          visible={this.state.isSecurityPassModalVisible}
          onItemPress={this._handleSecurityPassPicker}
          onCancel={this._hideSecurityPassModalPicker}
          onSave={this._hideSecurityPassModalPicker}
          items={security_passes}
        />
      </View>
    );
  }
}
