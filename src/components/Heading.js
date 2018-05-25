import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import {Title} from "react-native-paper";

export default class Heading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // style:PropTypes.object
  };

  render() {
    const {title, style} = this.props;
    return (
      <Title {...this.props} style={[styles.title, style]}>
        {title}
      </Title>
    );
  }
}

const styles = StyleSheet.create({
  title: {
  },
});
