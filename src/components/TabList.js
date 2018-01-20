import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

export default class TabList extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: this.props.activeIndex === index,
        onSelect: () => this.props.onSelect(index),
      });
    });

    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    padding: 10,
  },
});
