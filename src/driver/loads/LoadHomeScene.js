import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {ListSection} from 'react-native-paper';

class LoadHomeScene extends Component {
  static propTypes = {};

  onListItemPress = route => {
    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'trip_requests':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('trip_requests'),
          status: 'pending',
        };
        break;
      case 'trip_upcoming':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('trip_upcoming'),
          status: 'confirmed',
        };
        break;
      case 'trip_history':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('trip_history'),
          status: 'completed',
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
          iconProps={{type: 'MaterialCommunityIcons', name: 'truck-delivery'}}
          name="trip_requests"
          title={I18n.t('trip_requests')}
        />

        <Divider />

        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{type: 'Entypo', name: 'back-in-time'}}
          name="trip_upcoming"
          title={I18n.t('trip_upcoming')}
        />

        <Divider />

        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{type: 'MaterialIcons', name: 'timelapse'}}
          name="trip_history"
          title={I18n.t('trip_history')}
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
