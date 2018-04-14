import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n, {isRTL} from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';

export default class ConfirmScene extends Component {
  static propTypes = {
    onValueChange: PropTypes.func.isRequired,
    onRecoverPassword: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    confirmationCode: PropTypes.string.isRequired,
  };

  render() {
    const {
      onValueChange,
      confirmationCode,
      onRecoverPassword,
      onForgotPassword,
      onRightButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('confirmation_code')} />

        <FormTextInput
          onValueChange={onValueChange}
          field="confirmationCode"
          value={confirmationCode}
          maxLength={40}
          label={I18n.t('confirmation_code')}
        />

        <Button
          onPress={() => onRecoverPassword()}
          underlayColor="transparent"
          disabled={!confirmationCode}
          title={I18n.t('confirm')}
          style={{marginTop: 50}}
        />

        <TouchableHighlight
          onPress={() => onForgotPassword()}
          style={[{paddingTop: 100}]}
          underlayColor="transparent">
          <Text style={[styles.link]}>
            {I18n.t('resend_confirmation_code')}
          </Text>
        </TouchableHighlight>
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
  link: {
    marginTop: 20,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
