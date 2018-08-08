import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from 'components/ListItem';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {ListSection} from 'react-native-paper';

class ProfileHome extends Component {
  static propTypes = {};

  componentDidMount() {
    // this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
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
        case 'bank_details_list':
        scene = 'BankAccountsList';
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
          onPress={this.onListItemPress}
          iconProps={{type: 'Ionicons', name: 'md-person'}}
          name="profile_update"
          title={I18n.t('profile_update')}
        />

        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'truck'}}
          name="truck_update"
          title={I18n.t('truck_update')}
        />

        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'truck-trailer'}}
          name="trailer_update"
          title={I18n.t('trailer_update')}
          disabled={!truck}
        />

        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'road-variant'}}
          name="route_update"
          title={I18n.t('route_update')}
          disabled={!truck}
        />

        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          name="security_passes"
          title={I18n.t('security_passes')}
          iconProps={{type: 'MaterialCommunityIcons', name: 'passport'}}
        />

        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          name="bank_details_list"
          title={I18n.t('bank_details')}
          iconProps={{type: 'MaterialCommunityIcons', name: 'bank'}}
        />


        <Divider />
        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'passport'}}
          name="documents_upload"
          title={I18n.t('documents_upload')}
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
