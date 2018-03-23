import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import Separator from 'components/Separator';
import I18n from 'utils/locale';

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
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <ListItem
          style={{marginTop: 10}}
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={30}
              name="truck-delivery"
            />
          }
          name="load_working_list"
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="Entypo" size={30} name="back-in-time" />}
          name="load_approved_list"
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="MaterialIcons" size={30} name="timelapse" />}
          name="load_completed_list"
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(ProfileHome);
