/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import {ListItem as PaperListItem} from 'react-native-paper';
import I18n from 'utils/locale';

const ListItem = ({
  onItemPress,
  name,
  icon,
  description,
}) => {
  return (
    <PaperListItem
      onPress={() => onItemPress(name)}
      icon={icon}
      title={I18n.t(name)}
      description={description}
      inset={true}
    />
  );
};

ListItem.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  // icon: PropTypes.oneOfType(PropTypes.element, PropTypes.string),
  name: PropTypes.string.isRequired,
};

export default ListItem;

const styles = StyleSheet.create({
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
