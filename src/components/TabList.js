import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import colors from 'assets/theme/colors';

export default class TabList extends Component {
  static propTypes = {};

  static defaultProps = {};

  scrollView;

  componentDidMount() {}

  onSelect = index => {
    this.props.onSelect(index);
  };

  render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: this.props.activeIndex === index,
        onSelect: () => this.onSelect(index),
      });
    });

    return (
      <ScrollView
        ref={c => {
          this.scrollView = c;
        }}
        horizontal={true}
        style={styles.container}>
        {children}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // padding:10,
    backgroundColor: colors.white,
    // justifyContent: 'space-around',
    // padding: 10,
  },
});
