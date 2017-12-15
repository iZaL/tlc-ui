import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ACTIONS as PROFILE_ACTIONS} from "driver/common/actions";
import {connect} from "react-redux";

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(PROFILE_ACTIONS.fetchProfile());
  }

  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text
          style={{textAlign: 'center', fontSize: 40}}
          onPress={() => this.props.navigation.navigate('Settings')}>
          Home
        </Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(Home);
