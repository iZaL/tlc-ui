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
import Separator from 'components/Separator';
import I18n from 'utils/locale';

export default class DocumentCountriesList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
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
    let {onItemPress} = this.props;
    return (
      <View>
        <View style={[styles.contentContainer]}>
          <Separator style={{marginVertical:10}} />

          <Touchable
            style={styles.itemContainer}
            onPress={() => onItemPress(item, 'license')}>
            <Text style={styles.itemTitle}>{I18n.t('driving_license')}</Text>
          </Touchable>

          <Separator style={{marginVertical:10}} />

          <Touchable
            style={styles.itemContainer}
            onPress={() => onItemPress(item, 'license')}>
            <Text style={styles.itemTitle}>{I18n.t('visa')}</Text>
          </Touchable>
        </View>
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
});
