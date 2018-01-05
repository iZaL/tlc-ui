/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'assets/theme/colors';

const CallButton = ({onPress}) => {
  return (
    <Touchable onPress={() => {}} style={[styles.callButtonContainer]}>
      <View style={styles.itemRowContainer}>
        <MaterialCommunityIcons
          name="phone"
          size={25}
          style={styles.phoneIcon}
        />
        <Text style={styles.call}>CALL</Text>
      </View>
    </Touchable>
  );
};

CallButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButtonContainer: {
    backgroundColor: colors.success,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  phoneIcon: {
    color: 'white',
    height: 25,
  },
  call: {
    color: 'white',
    paddingHorizontal: 5,
  },
});

export default CallButton;
