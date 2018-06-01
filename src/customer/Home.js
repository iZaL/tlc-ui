import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  render() {
    return <View style={{flex: 1}} />;
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Home);
