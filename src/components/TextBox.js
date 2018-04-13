import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';

export default class TextBox extends Component {
  static propTypes = {
    background: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }

  static defaultProps = {
    background: 'primary',
  };

  render() {
    const {style, children, disabled, onPress, active} = this.props;
    console.log('active', active);

    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.container,
          style,
          disabled && {opacity: 0.4},
          active && styles.active,
        ]}>
        <View>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fadedBlue,
    borderRadius: 2,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '100',
  },
  active: {
    // opacity:.,
    borderBottomWidth: 2,
    borderBottomColor: 'yellow',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // backgroundColor:'yellow'
  },
});
