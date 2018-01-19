import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';

class LoadAddScene extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  render() {
    return <ScrollView style={{flex: 1}} />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoadAddScene);
