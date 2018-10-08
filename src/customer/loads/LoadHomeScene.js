import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from 'components/ListItem';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {List as PaperList} from 'react-native-paper';

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
      case 'loads_dispatched':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('loads_dispatched'),
          status: 'dispatched',
        };
        break;
      case 'loads_completed':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('loads_completed'),
          status: 'completed',
        };
        break;
      case 'loads_confirmed':
        scene = 'LoadList';
        sceneConfig = {
          title: I18n.t('loads_confirmed'),
          status: 'confirmed',
        };
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    return (
      <PaperList.Section>
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
          name="loads_dispatched"
          title={I18n.t('loads_dispatched')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'Entypo', name: 'back-in-time'}}
          name="loads_confirmed"
          title={I18n.t('loads_confirmed')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialIcons', name: 'timelapse'}}
          name="loads_completed"
          title={I18n.t('loads_completed')}
        />
      </PaperList.Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(LoadHomeScene);
