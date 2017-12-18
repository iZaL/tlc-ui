import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import I18n from 'utils/locale';
import IconFactory from '../../components/IconFactory';
import {SELECTORS as USER_SELECTORS} from "guest/common/selectors";

class ProfileHome extends Component {
  static propTypes = {};

  onListItemPress = route => {
    let component;
    switch (route) {
      case 'update_profile':
        component = 'UpdateProfile';
        break;
      case 'update_truck':
        component = 'UpdateTruck';
        break;
      case 'update_trailer':
        component = 'UpdateTrailer';
        break;
    }
    return this.props.navigation.navigate(component);
  };

  render() {
    let {user} = this.props;
    console.log('props',this.props);
    return (
      <ScrollView style={{flex: 1}}>
        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="Ionicons" size={30} name="md-person" />}
          name="update_profile"
        />
        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="truck" />
          }
          name="update_truck"
        />
        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={30}
              name="truck-trailer"
            />
          }
          name="update_trailer"
          disabled={!user.profile.truck}
        />
        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={35}
              name="road-variant"
            />
          }
          name="update_routes"
          disabled={!user.profile.truck}

        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(ProfileHome);
