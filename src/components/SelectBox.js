import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';

export default class SelectBox extends Component {

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.title !== this.props.title
    );
  }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node,
    title:PropTypes.string.isRequired,
    id:PropTypes.number.isRequired
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const {
      style,
      children,
      onPress,
      disabled,
      title,
      id
    } = this.props;

    return (
      <Touchable
        disabled={disabled}
        style={[
          styles.container,
          style
        ]}
        onPress={()=>onPress(id)}
      >
        <Text style={{color: 'white', margin: 10}}> {title} </Text>

      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 5,
    // height: 40,
    // width: 350,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
});
