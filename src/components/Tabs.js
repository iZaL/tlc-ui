import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class Tabs extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: this.props.activeIndex || 0,
    };
  }

  onSelect = index => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        onSelect: this.onSelect,
      });
    });

    return <View style={styles.container}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {},
});
