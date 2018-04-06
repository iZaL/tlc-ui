import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView} from 'react-native';
import Separator from 'components/Separator';
import I18n from 'utils/locale';
import ListItem from 'components/ListItem';
import List from 'components/List';
import ListModal from 'components/ListModal';
import FormTextInput from '../../components/FormTextInput';

class ProfileUpdateScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
  };

  state = {
    languageModalVisible: false,
    personalInformationModalVisible: false,
    activeLanguages: ['english', 'arabic'],
    mobile: '',
  };

  componentDidMount() {}

  onListItemPress = (route: string) => {
    let scene = 'NationalityList';
    let sceneConfig = {
      route,
      title: I18n.t(route),
    };

    // switch (route) {
    //   case 'nationality':
    //   case 'visas':
    //   case 'residencies':
    //   case 'licenses':
    //     scene = 'NationalityList';
    //     break;
    //   case 'languages':
    //     scene = 'LanguageList';
    //     break;
    // }

    return this.props.navigation.navigate(scene, sceneConfig);
  };

  showModal = name => {
    this.setState({
      [name]: true,
    });
  };

  hideModal = name => {
    this.setState({
      [name]: false,
    });
  };

  handleLanguagePress = (language: string) => {
    this.setState({
      activeLanguages: this.state.activeLanguages.includes(language)
        ? this.state.activeLanguages.filter(lang => lang != language)
        : this.state.activeLanguages.concat(language),
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    let {
      mobile,
      personalInformationModalVisible,
      languageModalVisible,
      activeLanguages,
    } = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <ListItem
          onItemPress={() => this.showModal('personalInformationModalVisible')}
          name="personal_information"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          name="nationalities"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          name="residencies"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          name="visas"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          name="licenses"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={() => this.showModal('languageModalVisible')}
          name="languages"
          arrow={true}
        />

        <List
          items={[
            {id: 'english', name: I18n.t('english')},
            {id: 'arabic', name: I18n.t('arabic')},
            {
              id: 'hindi',
              name: I18n.t('hindi'),
            },
          ]}
          isVisible={languageModalVisible}
          onConfirm={this.handleLanguagePress}
          onCancel={() => this.hideModal('languageModalVisible')}
          title={I18n.t('select_languages')}
          activeIDs={activeLanguages}
        />

        <ListModal
          isVisible={personalInformationModalVisible}
          transparent={false}
          onBackdropPress={() =>
            this.hideModal('personalInformationModalVisible')
          }
          title={I18n.t('personal_information')}
          onCancel={() => this.hideModal('personalInformationModalVisible')}>
          <FormTextInput
            onChangeText={value => this.onFieldChange('mobile', value)}
            value={mobile}
            maxLength={40}
            placeholder={I18n.t('mobile')}
            keyboardType="phone-pad"
          />
          <FormTextInput
            onChangeText={value => this.onFieldChange('mobile', value)}
            value={mobile}
            maxLength={40}
            placeholder={I18n.t('phone')}
            keyboardType="phone-pad"
          />
        </ListModal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: DRIVER_SELECTORS.getProfile(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(ProfileUpdateScene);
