import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import LoadsList from "driver/loads/components/LoadsList";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  onLoadsListItemPress = (load:object) => {
    this.props.navigation.navigate('LoadsDetail',{
      loadID:load.id
    })
  };

  render() {
    return (
      <View
        style={{flex: 1}}>
        <LoadsList items={[]} onItemPress={this.onLoadsListItemPress} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Home);
