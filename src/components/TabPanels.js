import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

export default class Tabs extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    let {style} = this.props;
    const children = React.cloneElement(
      this.props.children[this.props.activeIndex],
      {
        onSelect: this.props.onSelect,
        activeIndex: this.props.activeIndex,
      },
    );
    return <View style={[styles.container,style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
