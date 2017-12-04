import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from 'theme/colors';
import I18n, {isRTL} from 'common/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
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
      onSkip,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('email').toUpperCase()} />
        <FormTextInput
          onChangeText={value => onFieldChange('email', value)}
          value={email}
          maxLength={40}
          keyboardType="email-address"
          autoFocus={true}
        />

        <FormLabel title={I18n.t('password').toUpperCase()} />
        <FormTextInput
          onChangeText={value => onFieldChange('password', value)}
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

        <Touchable
          onPress={() => handleForgotPasswordRoute()}
          style={{paddingTop: 50}}
          underlayColor="transparent"
          disabled={busy}>
          <Text style={[styles.link]}>
            {I18n.t('forgot_password').toUpperCase()}
          </Text>
        </Touchable>

        <Touchable
          onPress={() => onSkip()}
          underlayColor="transparent"
          disabled={busy}>
          <Text style={[styles.link, {marginVertical: 50}]}>
            {I18n.t('skip')}
          </Text>
        </Touchable>
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
