import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {ListSection} from 'react-native-paper';

class ProfileHome extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  onListItemPress = route => {
    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'profile_update':
        scene = 'ProfileUpdate';
        sceneConfig = {
          title: I18n.t('profile_update'),
        };
        break;
      case 'truck_update':
        scene = 'TruckUpdate';
        break;
      case 'trailer_update':
        scene = 'TrailerUpdate';
        break;
      case 'route_update':
        scene = 'RoutesUpdate';
        break;
      case 'documents_upload':
        scene = 'DocumentsUpload';
        break;
      case 'security_passes':
        sceneConfig = {
          title: I18n.t('security_passes'),
        };
        scene = 'SecurityPassList';
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    const {truck} = this.props;

    return (
      <ListSection style={{flex: 1}}>
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{type:"Ionicons" ,name:"md-person" }}
          name="profile_update"
        />
        <Divider />
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{ type:"MaterialCommunityIcons", name:"truck" }}
          name="truck_update"
        />
        <Divider />
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{ type:"MaterialCommunityIcons", name:"truck-trailer" }}
          name="trailer_update"
          disabled={!truck}
        />
        <Divider />
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{ type:"MaterialCommunityIcons", name:"road-variant" }}
          name="route_update"
          disabled={!truck}
        />
        <Divider />

        <ListItem
          onItemPress={this.onListItemPress}
          name="security_passes"
          iconProps={{ type:"MaterialCommunityIcons", name:"passport" }}
        />

        <Divider />
        <ListItem
          onItemPress={this.onListItemPress}
          iconProps={{ type:"MaterialCommunityIcons", name:"passport" }}
          name="documents_upload"
          disabled={!truck}
        />
      </ListSection>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
  };
}

export default connect(mapStateToProps)(ProfileHome);
