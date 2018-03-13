import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Separator from 'components/Separator';
import I18n from 'utils/locale';
import PropTypes from 'prop-types';

class LoadDetailOptionsListScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          loadID: PropTypes.number.isRequired,
        }),
      }),
    }),
    // load: PropTypes.shape({
    //   origin: PropTypes.object.isRequired,
    //   destination: PropTypes.object.isRequired,
    // }).isRequired,
  };

  onListItemPress = route => {
    const {loadID} = this.props.navigation.state.params;

    let scene;
    let sceneConfig = {};
    switch (route) {
      case 'load_detail':
        scene = 'LoadDetail';
        sceneConfig = {
          loadID: loadID,
        };
        break;
      case 'load_track':
        scene = 'TripTrack';
        sceneConfig = {
          tripID: 1,
        };
        break;
      case 'driver_detail':
        scene = 'LoadList';
        break;
      case 'driver_rate':
        scene = 'LoadList';
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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
          name="load_detail"
        />

        <Separator />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory type="MaterialCommunityIcons" size={30} name="pin" />
          }
          name="load_track"
        />

        <Separator />

        <ListItem
          onItemPress={this.onListItemPress}
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              size={30}
              name="account-location"
            />
          }
          name="driver_detail"
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
          name="driver_rate"
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

export default connect(mapStateToProps)(LoadDetailOptionsListScene);
