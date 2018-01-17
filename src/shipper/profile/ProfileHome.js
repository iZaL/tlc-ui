import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import Separator from 'components/Separator';
import I18n from 'utils/locale';

class ProfileHome extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchProfile());
  }

  onListItemPress = route => {
    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'update_profile':
        scene = 'UpdateProfile';
        sceneConfig = {
          title: I18n.t('update_profile'),
        };
        break;
      case 'list_employees':
        scene = 'ListEmployees';
        sceneConfig = {
          title: I18n.t('list_employees'),
        };
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="Ionicons" size={30} name="md-person" />}
          name="update_profile"
        />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="MaterialCommunityIcons" size={30} name="contacts" />}
          name="list_employees"
        />

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(ProfileHome);
