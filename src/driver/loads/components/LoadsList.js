/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import LoadPickDropLocation from 'driver/loads/components/LoadPickDropLocation';
import LoadInfo from 'driver/loads/components/LoadInfo';

export default class LoadsList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  renderRow = ({item}) => {
    const {onItemPress} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)}>
        <View style={[styles.itemContainer]}>
          {item.origin &&
            item.destination && (
              <LoadPickDropLocation
                origin={item.origin}
                destination={item.destination}
              />
            )}
          <LoadInfo load={item} />
          {/*<Divider style={{marginVertical: 10}} />*/}
          {/*<View style={styles.itemRowContainer}>*/}
          {/*<Text style={styles.viewDetails}>{I18n.t('view_details')}</Text>*/}
          {/*<CallButton onPress={() => {}} />*/}
          {/*</View>*/}
        </View>
      </Touchable>
    );
  };

  render() {
    let {items, header} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 10}} />}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={header}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
  },
  itemContainer: {
    marginBottom: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: '500',
  },
});
