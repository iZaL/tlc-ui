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
      case 'profile_update':
        scene = 'ProfileUpdate';
        sceneConfig = {
          title: I18n.t('profile_update'),
        };
        break;
      case 'employee_list':
        scene = 'EmployeeList';
        sceneConfig = {
          title: I18n.t('employee_list'),
        };
        break;
      case 'location_origin_list':
        scene = 'LocationList';
        sceneConfig = {
          title: I18n.t('location_origin_list'),
          type: 'origin',
        };
        break;
      case 'location_destination_list':
        scene = 'LocationList';
        sceneConfig = {
          title: I18n.t('location_destination_list'),
          type: 'destination',
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
          name="profile_update"
        />

        <Separator />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={30}
              name="contacts"
            />
          }
          name="employee_list"
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
          name="location_origin_list"
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
          name="location_destination_list"
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
