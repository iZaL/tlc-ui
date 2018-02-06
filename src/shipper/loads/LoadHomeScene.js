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
      case 'load_add':
        scene = 'LoadAdd';
        sceneConfig = {
          title: I18n.t('load_add'),
        };
        break;
      case 'load_working_list':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('load_working_list'),
          status: 'completed',
        };

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
        <Separator />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={30}
              name="rocket"
            />
          }
          name="load_add"
        />

        <Separator />

        <ListItem
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

        <Separator />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="Entypo" size={30} name="back-in-time" />}
          name="load_approved_list"
        />

        <Separator />

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
