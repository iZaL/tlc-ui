/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Separator from 'components/Separator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';

export default class RoutesList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  static propTypes = {
    onIconPress: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    const {onIconPress, onItemPress} = this.props;
    return (
      <View style={styles.itemContainer}>
        <Touchable
          onPress={() => onItemPress(item)}
          underlayColor="transparent"
          style={{flex: 1}}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.origin.name}</Text>
            <MaterialCommunityIcons
              key={item.id}
              name="ray-start-arrow"
              size={30}
              color="green"
              style={styles.arrow}
            />
            <Text style={styles.title}>{item.destination.name}</Text>
          </View>
        </Touchable>
        <Touchable
          onPress={() => onIconPress(item)}
          underlayColor="transparent"
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
          <View style={styles.checkbox}>
            {item.has_added ? (
              <MaterialCommunityIcons
                key={item.id}
                name="checkbox-marked-circle"
                size={30}
                color="green"
              />
            ) : (
              <MaterialCommunityIcons
                key={item.id}
                name="checkbox-blank-circle-outline"
                size={30}
                color="green"
              />
            )}
          </View>
        </Touchable>
      </View>
    );
  };

  render() {
    const {items} = this.props;

    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        enableEmptySections={true}
        renderItem={this.renderRow}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 100}}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
  },
  checkbox: {
    paddingLeft: 10,
  },
  arrow: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});
