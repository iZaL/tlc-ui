import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import ListItem from 'components/ListItem';
import Divider from 'components/Divider';
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
        <Divider style={{marginVertical: 10}} />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{
            type: 'MaterialCommunityIcons',
            name: 'truck-delivery',
          }}
          name="load_detail"
        />

        <Divider style={{marginVertical: 10}} />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{
            type: 'MaterialCommunityIcons',
            name: 'pin',
          }}
          name="load_track"
        />

        <Divider style={{marginVertical: 10}} />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{
            type: 'MaterialCommunityIcons',
            name: 'account-location',
          }}
          name="driver_detail"
        />

        <Divider style={{marginVertical: 10}} />

        <ListItem
          onPress={this.onListItemPress}
          iconProps={{
            type: 'MaterialCommunityIcons',
            name: 'truck-delivery',
          }}
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
