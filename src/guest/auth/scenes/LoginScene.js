import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Separator from 'components/Separator';
import Touchable from 'react-native-platform-touchable';
import Button from 'components/Button';

export default class LoginScene extends Component {
  static propTypes = {
    handleForgotPasswordRoute: PropTypes.func.isRequired,
    handleRegisterRoute: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      email,
      password,
      onFieldChange,
      handleLogin,
      handleRegisterRoute,
      handleForgotPasswordRoute,
      busy,
    } = this.props;

    return (
      <View style={styles.container}>

        <FormTextInput
          placeholder={I18n.t('email')}
          onChangeText={onFieldChange}
          field={email}
          value={email}
          maxLength={40}
          keyboardType="email-address"
        />

        <FormTextInput
          placeholder={I18n.t('password')}
          onChangeText={onFieldChange}
          field={password}
          value={password}
          maxLength={40}
          secureTextEntry={true}
        />

        <Button
          onPress={() => handleLogin()}
          disabled={busy}
          title={busy ? I18n.t('logging_in') : I18n.t('login').toUpperCase()}
          style={{marginTop: 25}}
        />

        <Separator style={{marginVertical: 30}} />

        <Button
          onPress={() => handleRegisterRoute()}
          style={styles.buttonSecondary}
          disabled={busy}
          title={I18n.t('create_account').toUpperCase()}
        />

        <Button
          onPress={() => handleForgotPasswordRoute()}
          style={styles.buttonSecondary}
          disabled={busy}
          background="transparent"
          title={I18n.t('forgot_password').toUpperCase()}
          titleStyle={styles.link}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 64,
  },
  link: {
    marginTop: 20,
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
});
