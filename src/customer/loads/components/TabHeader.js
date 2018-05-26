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
    hidden: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isActive !== this.props.isActive;
  }

  componentDidMount() {}

  render() {
    let {title, isActive, onSelect, hidden} = this.props;

    if (hidden) {
      return null;
    }

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
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 0.2,
  },
  containerActive: {
    backgroundColor: colors.primary,
    borderBottomColor: colors.yellow,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 16,
    // color: 'white',
  },
  titleActive: {
    color: 'white',
    // fontSize:18
  },
});
