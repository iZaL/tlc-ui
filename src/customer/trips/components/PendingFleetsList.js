/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import {ListSection, Title, TouchableRipple} from 'react-native-paper';
import IconFactory from 'components/IconFactory';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;
    return (
      <TouchableRipple onPress={() => onItemPress(item)}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <IconFactory
              type="MaterialCommunityIcons"
              name="truck-delivery"
              style={styles.icon}
            />
          </View>
          <Title style={styles.title}>{I18n.t('driver_select')}</Title>
        </View>
      </TouchableRipple>
    );
  };

  render() {
    let {count} = this.props;
    return (
      <ListSection>
        <FlatList
          data={Array.from(Array(count).keys())}
          style={styles.listContainer}
          renderItem={this.renderRow}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => `${index}`}
        />
      </ListSection>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  status: {},
  rightContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: colors.lightGrey,
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: 20,
  },
});
