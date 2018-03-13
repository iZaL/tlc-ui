import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';

export default class TabHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isActive: false,
    onSelect: () => {},
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isActive !== this.props.isActive;
  }

  componentDidMount() {}

  render() {
    let {title, isActive, onSelect} = this.props;
    return (
      <Touchable onPress={onSelect}>
        <View style={[styles.container, isActive && styles.containerActive]}>
          <Text style={[styles.title, isActive && styles.titleActive]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mediumGrey,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  titleActive: {
    fontWeight: '700',
    // fontSize:18
  },
});
