import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';
import Button from '../../../components/Button';
export default class LoadWhat extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    receiver_name: PropTypes.string.isRequired,
    receiver_email: PropTypes.string.isRequired,
    receiver_mobile: PropTypes.string.isRequired,
    receiver_phone: PropTypes.string.isRequired,
  };

  render() {
    const {
      onValueChange,
      receiver_name,
      receiver_email,
      receiver_mobile,
      receiver_phone,
      onSaveButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <FormTextInput
            onValueChange={onValueChange}
            value={receiver_name}
            field={receiver_name}
            label={I18n.t('receiver_name')}
            maxLength={40}
          />

          <FormTextInput
            onValueChange={onValueChange}
            value={receiver_email}
            vafieldlue={receiver_email}
            label={I18n.t('receiver_email')}
            maxLength={40}
            keyboardType="email-address"
          />

          <FormTextInput
            onValueChange={onValueChange}
            value={receiver_mobile}
            field={receiver_mobile}
            maxLength={40}
            label={I18n.t('receiver_mobile')}
            keyboardType="phone-pad"
          />

          <FormTextInput
            onValueChange={onValueChange}
            value={receiver_phone}
            field={receiver_phone}
            maxLength={40}
            label={I18n.t('receiver_phone')}
            keyboardType="phone-pad"
          />
        </View>

        <Button
          title={I18n.t('save')}
          onPress={onSaveButtonPress}
          style={{marginVertical: 10}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
