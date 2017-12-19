import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {View} from 'react-native';
import RoutesList from "routes/components/RoutesList";
import {ACTIONS as TRUCK_ACTIONS} from "driver/common/actions";

class UpdateRoutesScene extends Component {

  static propTypes = {
  };

  componentDidMount() {
    this.props.dispatch(TRUCK_ACTIONS.fetchRoutes());
  }

  render() {
    return (
      <View style={{flex:1}}>
      </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(UpdateRoutesScene);
