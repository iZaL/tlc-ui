import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Divider as PaperDivider} from 'react-native-paper';

export default class Divider extends Component {
  shouldComponentUpdate() {
    return false;
  }

  static defaultProps = {
    inset: false,
  };

  render() {
    let {style, inset} = this.props;
    return <PaperDivider style={style} inset={inset} />;
  }
}
