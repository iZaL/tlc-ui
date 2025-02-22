import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Label from 'components/Label';
import TextInput from 'components/TextInput';
import Divider from 'components/Divider';
import Touchable from 'react-native-platform-touchable';
import Button from 'components/Button';

export default class LoginScene extends Component {
  static propTypes = {
    handleForgotPasswordRoute: PropTypes.func.isRequired,
    handleRegisterRoute: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      email,
      password,
      onValueChange,
      handleLogin,
      handleRegisterRoute,
      handleForgotPasswordRoute,
      busy,
    } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          label={I18n.t('email')}
          onValueChange={onValueChange}
          field="email"
          value={email}
          maxLength={40}
          keyboardType="email-address"
        />

        <TextInput
          label={I18n.t('password')}
          onValueChange={onValueChange}
          field="password"
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

        <Divider style={{marginVertical: 30}} />

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
