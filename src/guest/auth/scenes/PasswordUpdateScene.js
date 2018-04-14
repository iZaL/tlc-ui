import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';

export default class PasswordUpdateScene extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    confirmedPassword: PropTypes.string.isRequired,
  };

  render() {
    const {
      onValueChange,
      password,
      confirmedPassword,
      onUpdatePassword,
      onRightButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('new_password')} />

        <FormTextInput
          onValueChange={onValueChange}
          field="password"
          value={password}
          maxLength={40}
          label={I18n.t('new_password')}
          secureTextEntry={true}
        />

        <FormLabel title={I18n.t('confirm_new_password')} />
        <FormTextInput
          onValueChange={onValueChange}
          field="password_confirmation"
          value={confirmedPassword}
          maxLength={40}
          label={I18n.t('confirm_new_password')}
          secureTextEntry={true}
        />

        <Button
          onPress={() => onUpdatePassword()}
          underlayColor="transparent"
          disabled={!password || !confirmedPassword}
          title={I18n.t('confirm')}
          style={{marginTop: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    padding: 20,
  },
});
