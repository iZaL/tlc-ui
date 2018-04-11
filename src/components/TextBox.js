import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';

export default class TextBox extends PureComponent {
  static propTypes = {
    background: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    background: 'primary',
  };

  render() {
    const {style, children, disabled, onPress, ...rest} = this.props;

    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[styles.container, style, disabled && {opacity: 0.4}]}>
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
});
