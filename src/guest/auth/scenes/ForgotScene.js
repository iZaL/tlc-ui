import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';

export default class ForgotScene extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      email,
      onValueChange,
      onForgotPassword,
      onRightButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('email')} />

        <FormTextInput
          onValueChange={onValueChange}
          field={email}
          value={email}
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormSubmit
          onPress={() => onForgotPassword()}
          title={I18n.t('recover_password')}
          style={{marginTop: 50}}
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
    paddingTop: 20,
  },
});
