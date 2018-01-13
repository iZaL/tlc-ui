import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';

class Home extends Component {

  static propTypes = {
  };

  static defaultProps = {
  };

  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
