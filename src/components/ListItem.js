/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

const ListItem = ({onItemPress, name, icon}) => {
  return (
    <Touchable onPress={() => onItemPress(name)}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{icon}</View>

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{I18n.t([name])}</Text>
        </View>

        <View style={styles.arrowContainer} />
      </View>
    </Touchable>
  );
};

ListItem.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType(PropTypes.element, PropTypes.string),
  name: PropTypes.string.isRequired,
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'yellow',
    padding: 10,
  },
  iconContainer: {
    flex: 1,
    // backgroundColor:'green',
  },
  contentContainer: {
    flex: 5,
    // backgroundColor:'blue',
  },
  arrowContainer: {},
  name: {
    fontSize: 19,
    color: colors.fadedBlack,
    fontWeight: '500',
    textAlign: 'left',
  },
});
