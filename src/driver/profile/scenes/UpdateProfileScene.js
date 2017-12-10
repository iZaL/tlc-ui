import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import colors from 'assets/theme/colors';

export default class UpdateProfileScene extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    residence_country_id: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      residence_country_id,
      nationality,
      mobile,
      onFieldChange,
      onButtonPress,
      busy,
    } = this.props;

    return (
      <View style={styles.container}>

        <FormLabel title={I18n.t('mobile')} />

        <FormTextInput
          onChangeText={value => onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('nationality')} />
        <FormTextInput
          onChangeText={value => onFieldChange('nationality', value)}
          value={nationality}
          maxLength={40}
          placeholder={I18n.t('nationality')}
          secureTextEntry={true}
        />

        <FormLabel title={I18n.t('residence_country')} />
        <FormTextInput
          onChangeText={value => onFieldChange('residence_country_id', value)}
          value={residence_country_id}
          maxLength={40}
          secureTextEntry={true}
          placeholder={I18n.t('residence_country')}
        />

        <FormSubmit
          onPress={() => onButtonPress()}
          disabled={busy}
          title={busy ? I18n.t('saving') : I18n.t('update_profile')}
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
  buttonSecondary: {
    backgroundColor: colors.mediumGrey,
  },
});
