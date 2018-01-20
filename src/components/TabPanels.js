import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

export default class Tabs extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const children = React.cloneElement(
      this.props.children[this.props.activeIndex],
      {
        onSelect: this.props.onSelect,
      },
    );
    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
  },
});
