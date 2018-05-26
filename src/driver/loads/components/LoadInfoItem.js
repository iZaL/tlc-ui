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
    load: PropTypes.object.isRequired,
    showDetail: PropTypes.bool,
    // onItemPress: PropTypes.func.isRequired
  };

  static defaultProps = {
    load: {
      trailer: {},
      showDetail: false,
    },
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log('rendering loadinfoitem');
    let {title, description, caption} = this.props;
    return (
      <View style={styles.col}>
        <Label title={title} />
        <Text style={styles.value}>{description}</Text>
        <Caption>{caption}</Caption>
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
