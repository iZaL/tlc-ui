/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import Accordion from 'react-native-collapsible/Accordion';
import Feather from 'react-native-vector-icons/Feather';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from 'components/Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class EmployeeList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemEditPress: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  renderSectionHeader = (items: Array) => {
    return items.map(item => item);
  };

  renderHeader(item, index, isActive) {
    return (
      <View
        style={[
          styles.headerContainer,
          !isActive && {borderBottomRightRadius: 3, borderBottomLeftRadius: 3},
        ]}>
        <Text style={styles.headerTitle}>{item.name}</Text>

        <Feather
          name={isActive ? 'chevron-up' : 'chevron-down'}
          color={colors.darkGrey}
          size={25}
        />
      </View>
    );
  }

  renderContent = item => {
    let {onItemPress, onItemEditPress} = this.props;
    return (
      <View style={[styles.contentContainer]}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" size={30} style={styles.icon} />
          <Text style={styles.email}>{item.email}</Text>
        </View>

        <Divider style={{marginVertical: 10}} />

        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" size={30} style={styles.icon} />
          <View>
            <Text style={styles.email}>{item.mobile}</Text>
            <Text style={styles.email}>{item.phone}</Text>
          </View>
        </View>

        <Divider style={{marginVertical: 10}} />

        <View style={styles.row}>
          <Entypo
            name={item.driver_interaction ? 'check' : 'cross'}
            size={30}
            style={styles.icon}
            color={item.driver_interaction ? colors.primary : colors.error}
          />
          <Text style={styles.email}>
            {' '}
            {I18n.t('can_communicate_with_driver')}
          </Text>
        </View>

        <Divider style={{marginVertical: 10}} />

        <Touchable onPress={() => onItemEditPress(item)}>
          <View style={styles.row}>
            <MaterialIcons name="find-in-page" size={30} style={styles.icon} />
            <Text style={styles.email}> {I18n.t('details')}</Text>
          </View>
        </Touchable>

        <Divider style={{marginVertical: 10}} />

        <Touchable onPress={() => onItemEditPress(item)}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              style={styles.icon}
            />
            <Text style={styles.email}> {I18n.t('edit')}</Text>
          </View>
        </Touchable>

        <Divider style={{marginVertical: 10}} />

        <Touchable onPress={() => onItemEditPress(item)}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="delete"
              size={30}
              style={styles.icon}
              color={colors.error}
            />
            <Text style={styles.email}> {I18n.t('delete')}</Text>
          </View>
        </Touchable>
      </View>
    );
  };

  render() {
    let {items} = this.props;
    return (
      <View style={styles.container}>
        <Accordion
          sections={this.renderSectionHeader(items)}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          underlayColor="transparent"
          expanded={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
  },
  headerIcon: {},
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.mediumGrey,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
  },
  itemContainer: {
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    color: colors.darkGrey,
  },
  email: {
    paddingHorizontal: 10,
    fontSize: 18,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
