import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import FormLabel from "components/FormLabel";
import FormTextInput from "components/FormTextInput";
import I18n from 'utils/locale';
export default class LoadWhat extends Component {

  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    receiver_name:PropTypes.string.isRequired,
    receiver_email:PropTypes.string.isRequired,
    receiver_mobile:PropTypes.string.isRequired,
    receiver_phone:PropTypes.string.isRequired
  };

  render() {
    const {onFieldChange,receiver_name,receiver_email,receiver_mobile,receiver_phone} = this.props;

    return (
      <View style={styles.container}>

        <FormLabel title={I18n.t('receiver_name')} />
        <FormTextInput
          onChangeText={value => onFieldChange('receiver_name', value)}
          placeholder={I18n.t('receiver_name')}
          value={receiver_name}
          maxLength={40}
        />

        <FormLabel title={I18n.t('receiver_email')} />
        <FormTextInput
          onChangeText={value => onFieldChange('receiver_email', value)}
          value={receiver_email}
          placeholder={I18n.t('receiver_email')}
          maxLength={40}
          keyboardType="email-address"
        />

        <FormLabel title={I18n.t('receiver_mobile')} />
        <FormTextInput
          onChangeText={value => onFieldChange('receiver_mobile', value)}
          value={receiver_mobile}
          maxLength={40}
          placeholder={I18n.t('receiver_mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('receiver_phone')} />
        <FormTextInput
          onChangeText={value => onFieldChange('receiver_phone', value)}
          value={receiver_phone}
          maxLength={40}
          placeholder={I18n.t('receiver_phone')}
          keyboardType="phone-pad"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    padding:5
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center'
  },
});
