import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import Separator from '../../components/Separator';

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
    const {truck} = this.props;

    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <ListItem
          onItemPress={this.onListItemPress}
          icon={<IconFactory type="Ionicons" size={30} name="md-person" />}
          name="update_profile"
        />
        <Separator />
        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="truck" />
          }
          name="update_truck"
        />
        <Separator />
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
          disabled={!truck}
        />
        <Separator />
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
          disabled={!truck}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
  };
}

export default connect(mapStateToProps)(ProfileHome);
