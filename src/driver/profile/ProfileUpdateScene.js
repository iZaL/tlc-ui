import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView} from 'react-native';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import ListItem from 'components/ListItem';
import List from 'components/List';
import ListModal from 'components/ListModal';
import FormTextInput from 'components/FormTextInput';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ListSection} from 'react-native-paper';

class ProfileUpdateScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
  };

  state = {
    languageModalVisible: false,
    personalInformationModalVisible: true,
    activeLanguages: ['english', 'arabic'],
    mobile: '',
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  onProfileInfoPress = () => {
    return this.props.navigation.navigate('ProfileInfoUpdate');
  };

  onListItemPress = (route: string) => {
    let scene = 'NationalityList';
    let sceneConfig = {
      route,
      title: I18n.t(route),
    };
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  showModal = () => {
    this.setState({
      languageModalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      languageModalVisible: false,
    });
  };

  handleLanguagePress = (language: string) => {
    this.setState({
      activeLanguages: this.state.activeLanguages.includes(language.id)
        ? this.state.activeLanguages.filter(lang => lang != language.id)
        : this.state.activeLanguages.concat(language.id),
    });
  };

  onValueChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    let {languageModalVisible, activeLanguages} = this.state;

    return (
      <ListSection>
        <ListItem
          onItemPress={this.onProfileInfoPress}
          name="personal_information"
          title={I18n.t('personal_information')}
        />

        <Divider />

        <ListItem onItemPress={this.onListItemPress} name="nationalities" title={I18n.t('nationalities')} />

        <Divider />

        <ListItem onItemPress={this.onListItemPress} name="residencies" title={I18n.t('residencies')} />

        <Divider />

        <ListItem onItemPress={this.onListItemPress} name="visas" title={I18n.t('visas')} />

        <Divider />

        <ListItem onItemPress={this.onListItemPress} name="licenses" title={I18n.t('licenses')} />

        <Divider />

        <ListItem onItemPress={this.showModal} name="languages" title={I18n.t('languages')} />

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
          onItemPress={this.handleLanguagePress}
          onCancel={this.hideModal}
          title={I18n.t('select_languages')}
          activeIDs={activeLanguages}
        />
      </ListSection>
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
