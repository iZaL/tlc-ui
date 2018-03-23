/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ListItem = ({onItemPress, name, icon, disabled = false, arrow = false}) => {
  return (
    <Touchable onPress={() => onItemPress(name)} disabled={disabled}>
      <View style={[styles.container, disabled && {opacity: 0.5}]}>
        <View style={styles.iconContainer}>{icon}</View>

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{I18n.t([name])}</Text>
        </View>

        {
          arrow &&
          <MaterialIcons name="arrow-forward" color={colors.lightGrey} size={30}/>
        }
      </View>
    </Touchable>
  );
};

ListItem.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  // icon: PropTypes.oneOfType(PropTypes.element, PropTypes.string),
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    // backgroundColor:'green',
  },
  contentContainer: {
    flex: 7,
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
