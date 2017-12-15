//@flow
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, Platform} from 'react-native';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import Dropdown from 'components/Dropdown';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import {isRTL} from 'utils/locale';

type SceneType = 'nationality|residence';

export default class UpdateProfileScene extends Component {
  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    nationality: PropTypes.object.isRequired,
    residence: PropTypes.object.isRequired,
    busy: PropTypes.bool.isRequired,
    countries: PropTypes.array.isRequired,
  };

  state = {
    showDropDown: false,
    dropDownField: null,
  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  render() {
    const {
      residence,
      nationality,
      mobile,
      onFieldChange,
      onButtonPress,
      busy,
      countries,
    } = this.props;

    const {showDropDown, dropDownField} = this.state;

    return (
      <ScrollView style={styles.container}>
        <FormLabel title={I18n.t('mobile')} />

        <FormTextInput
          onChangeText={value => onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('nationality')} />

        {showDropDown && dropDownField === 'nationality' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={countries}
            selectedValue={nationality.id}
            onItemPress={onFieldChange}
            field="nationality"
          />
        ) : (
          <Text
            style={styles.textInput}
            onPress={() => this.showDropDown(true, 'nationality')}>
            {nationality.id ? nationality.name_en : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}} />

        <FormLabel title={I18n.t('residence_country')} />
        {showDropDown && dropDownField === 'residence' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={countries}
            selectedValue={residence.id}
            onItemPress={onFieldChange}
            field="residence"
          />
        ) : (
          <Text
            style={styles.textInput}
            onPress={() => this.showDropDown(true, 'residence')}>
            {residence.id ? residence.name_en : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}} />

        <FormSubmit
          onPress={onButtonPress}
          disabled={busy}
          title={busy ? I18n.t('saving') : I18n.t('update_profile')}
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
  textInput: {
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    paddingTop: 5,
  },
});
