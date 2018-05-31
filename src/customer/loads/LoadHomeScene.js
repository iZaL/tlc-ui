import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from 'components/ListItem';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {ListSection} from 'react-native-paper';

class LoadHomeScene extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchProfile());
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
      <ListSection>
        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'rocket'}}
          name="load_add"
          title={I18n.t('load_add')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'truck-delivery'}}
          name="load_working_list"
          title={I18n.t('load_working_list')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'Entypo', name: 'back-in-time'}}
          name="load_approved_list"
          title={I18n.t('load_approved_list')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialIcons', name: 'timelapse'}}
          name="load_completed_list"
          title={I18n.t('load_completed_list')}
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

export default connect(mapStateToProps)(LoadHomeScene);
