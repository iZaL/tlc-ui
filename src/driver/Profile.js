import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from "react-redux";
import {SELECTORS as USER_SELECTORS} from "../user/common/selectors";

class Profile extends Component {
  render() {
    let {authUser} = this.props;
    console.log('authUser',authUser);
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={{textAlign: 'center', fontSize: 40}}>Driver Profile</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(Profile);
