import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';
import colors from 'assets/theme/colors';

export default class RegisterScene extends Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    name_en: PropTypes.string.isRequired,
    name_ar: PropTypes.string,
    name_hi: PropTypes.string,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    isCustomer: PropTypes.bool.isRequired,
  };

  render() {
    const {
      name_en,
      name_ar,
      name_hi,
      email,
      mobile,
      password,
      password_confirmation,
      onValueChange,
      handleRegister,
      busy,
      isCustomer,
    } = this.props;

    return (
      <ScrollView style={styles.container} contentInset={{bottom: 50}}>
        {isCustomer ? (
          <View>
            <FormTextInput
              onValueChange={onValueChange}
              field="name_en"
              value={name_en}
              maxLength={40}
              label={I18n.t('company_name_en')}
            />

            <FormTextInput
              onValueChange={onValueChange}
              field="name_ar"
              value={name_ar}
              maxLength={40}
              label={I18n.t('company_name_ar')}
            />
          </View>
        ) : (
          <View>
            <FormTextInput
              onValueChange={onValueChange}
              field="name_en"
              value={name_en}
              maxLength={40}
              label={I18n.t('name')}
            />
          </View>
        )}

        <FormTextInput
          onValueChange={onValueChange}
          field="name_en"
          value={name_en}
          maxLength={40}
          label={I18n.t('name')}
        />

        <FormTextInput
          onValueChange={onValueChange}
          field="email"
          value={email}
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormTextInput
          onValueChange={onValueChange}
          field="mobile"
          value={mobile}
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={onValueChange}
          field="password"
          value={password}
          maxLength={40}
          label={I18n.t('password')}
          secureTextEntry={true}
        />

        <FormTextInput
          onValueChange={onValueChange}
          field="password_confirmation"
          value={password_confirmation}
          maxLength={40}
          secureTextEntry={true}
          label={I18n.t('confirm_password')}
        />

        <Button
          onPress={() => handleRegister()}
          disabled={busy}
          title={busy ? I18n.t('signing_up') : I18n.t('create_account')}
          style={{marginTop: 50}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  },
  buttonSecondary: {
    backgroundColor: colors.mediumGrey,
  },
});
