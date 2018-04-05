import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView} from 'react-native';
import Separator from 'components/Separator';
import I18n from 'utils/locale';
import ListItem from 'components/ListItem';
import List from "components/List";

class ProfileUpdateScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
  };

  state = {
    isLanguageModalVisible:false,
    activeLanguages:['english','arabic']
  };

  componentDidMount() {
  }

  onListItemPress = (route: string) => {
    let scene = 'NationalityList';
    let sceneConfig = {
      route,
      title:I18n.t(route)
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

  _showLanguageModal = () => {
    this.setState({
      isLanguageModalVisible:true
    })
  };

  _hideLanguageModal = () => {
    this.setState({
      isLanguageModalVisible:false
    })
  };

  _handleLanguagePress = (language:string) => {
    this.setState({
      activeLanguages:this.state.activeLanguages.includes(language) ? this.state.activeLanguages.filter(lang => lang != language) : this.state.activeLanguages.concat(language)
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>

        <ListItem
          onItemPress={this.onListItemPress}
          name="nationality"
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
          onItemPress={this._showLanguageModal}
          name="languages"
          arrow={true}
        />

        <List
          items={[{id:'english',name:I18n.t('english')},{id:'arabic',name:I18n.t('arabic')},{id:'hindi',name:I18n.t('hindi')}]}
          isVisible={this.state.isLanguageModalVisible}
          onConfirm={this._handleLanguagePress}
          onCancel={this._hideLanguageModal}
          title={I18n.t('select_languages')}
          activeIDs={this.state.activeLanguages}
        />

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
