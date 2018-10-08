import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from 'components/ListItem';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import {List as PaperList} from 'react-native-paper';

class ProfileHome extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchProfile());
  }

  onListItemPress = route => {
    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'company_information':
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
      case 'blocked_drivers':
        scene = 'DriversBlockList';
        sceneConfig = {
          title: I18n.t('blocked_drivers'),
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
          iconProps={{type: 'Ionicons', name: 'md-person'}}
          name="company_information"
          title={I18n.t('company_information')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'contacts'}}
          name="employee_list"
          title={I18n.t('employee_list')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'adjust'}}
          name="location_origin_list"
          title={I18n.t('location_origin_list')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'map-marker'}}
          name="location_destination_list"
          title={I18n.t('location_destination_list')}
        />

        <Divider />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{type: 'MaterialCommunityIcons', name: 'truck'}}
          name="blocked_drivers"
          title={I18n.t('blocked_drivers')}
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

export default connect(mapStateToProps)(ProfileHome);
