/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Caption} from 'react-native-paper';
import Label from 'components/Label';

export default class LoadInfoItem extends Component {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    // caption: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    return nextProps.description !== this.props.description;
  }

  render() {
    let {title, description, caption, children} = this.props;
    return (
      <View style={styles.col}>
        <Label title={title} />
        <Text style={styles.value}>{description}</Text>
        <Caption>{caption}</Caption>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
  },
  col: {
    flex: 1,
  },
});
