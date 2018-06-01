import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Title} from 'react-native-paper';

export default class Heading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
  title: {},
});
