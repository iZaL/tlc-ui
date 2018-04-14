import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {ListSection} from 'react-native-paper';

class ProfileHome extends Component {
  static propTypes = {};

  onListItemPress = route => {
    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'load_working_list':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('load_working_list'),
          status: 'working',
        };
        break;
      case 'load_completed_list':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('load_completed_list'),
          status: 'completed',
        };
        break;
      case 'load_approved_list':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('load_approved_list'),
          status: 'approved',
        };
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    return (
      <ListSection>
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{ type:"MaterialCommunityIcons", name:"truck-delivery"}}
          name="load_working_list"
        />

        <Divider />

        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{type:"Entypo", name:"back-in-time" }}
          name="load_approved_list"
        />

        <Divider />

        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{type:"MaterialIcons", name:"timelapse" }}
          name="load_completed_list"
        />
      </ListSection>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(ProfileHome);
