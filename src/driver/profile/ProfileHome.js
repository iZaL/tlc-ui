import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';

class ProfileHome extends Component {

  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  onListItemPress = route => {
    let scene;
    switch (route) {
      case 'update_profile':
        scene = 'UpdateProfile';
        break;
      case 'update_truck':
        scene = 'UpdateTruck';
        break;
      case 'update_trailer':
        scene = 'UpdateTrailer';
        break;
      case 'update_routes':
        scene = 'UpdateRoutes';
        break;
    }
    return this.props.navigation.navigate(scene);
  };

  render() {

    const {profile} = this.props;

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
          disabled={!profile.truck}
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
          disabled={!profile.truck}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: USER_SELECTORS.getAuthUserProfile(state),
  };
}

export default connect(mapStateToProps)(ProfileHome);
