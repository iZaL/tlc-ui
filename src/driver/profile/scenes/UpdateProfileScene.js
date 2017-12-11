//@flow
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Platform} from 'react-native';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import colors from 'assets/theme/colors';
import Dropdown from "components/Dropdown";
import LocalizedText from "components/LocalizedText";
import {isRTL} from "utils/locale";

type SceneType = 'nationality|residence';

export default class UpdateProfileScene extends Component {

  static defaultProps = {
    // nationality:0,
    // residence_country_id: 0,
  };

  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    // nationality: PropTypes.number.isRequired,
    // residence_country_id: PropTypes.number.isRequired,
    busy: PropTypes.bool.isRequired,
    countries: PropTypes.array.isRequired,
  };

  state = {
    showDropDown: false,
    dropDownScene: null
  };

  setDropDownScene = (showDropDown: boolean, dropDownScene: SceneType) => {
    this.setState({
      showDropDown,
      dropDownScene
    })
  };

  render() {
    const {
      residence_country_id,
      nationality,
      mobile,
      onFieldChange,
      onButtonPress,
      busy,
      countries,
    } = this.props;

    const {showDropDown, dropDownScene} = this.state;

    let selectedNationality, selectedResidenceCountry;

    selectedNationality = nationality ? countries.find(country => country.id === nationality) : '';
    selectedResidenceCountry = residence_country_id ? countries.find(country => country.id === residence_country_id) : '';

    console.log('selectedNationality',selectedNationality);


    return (
      <View style={styles.container}>

        <FormLabel title={I18n.t('mobile')}/>

        <FormTextInput
          onChangeText={value => onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('nationality')}/>

        {
          showDropDown && dropDownScene === 'nationality' ?
            <Dropdown
              onClose={() => this.setDropDownScene(false, 'nationality')}
              items={countries}
              selectedValue={selectedNationality.id}
              onItemPress={onFieldChange}
              field="nationality"
            />
            :
            nationality ?
              <Text
                style={styles.textInput}
                onPress={() => this.setDropDownScene(true, 'nationality')}
              >{selectedNationality.name_en}</Text>
              :
              <Text style={styles.textInput}
                    onPress={() => this.setDropDownScene(true, 'nationality')}>{I18n.t('select')}</Text>
        }

        <FormLabel title={I18n.t('residence_country')}/>
        {
          showDropDown && dropDownScene === 'residence' ?
            <Dropdown
              onClose={() => this.setDropDownScene(false, 'residence')}
              items={countries}
              selectedValue={selectedResidenceCountry.id}
              onItemPress={onFieldChange}
              field="residence_country_id"
            />
            :
            residence_country_id ?
              <Text
                style={styles.textInput}
                onPress={() => this.setDropDownScene(true, 'residence')}
              >{selectedResidenceCountry.name_en}</Text>
              :
              <Text style={styles.textInput}
                    onPress={() => this.setDropDownScene(true, 'residence')}>{I18n.t('select')}</Text>
        }

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
  textInput: {
    height: 40,
    fontSize: 18,
    color: 'black',
    fontWeight: '300',
    textAlign: 'left',
    marginBottom: 25,
  }
});
