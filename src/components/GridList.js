import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';

export default class GridList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    console.log('item', item);

    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            item.id === activeItemID && styles.itemContainerActive,
          ]}>
          <Text
            style={[
              styles.title,
              item.id === activeItemID && styles.titleActive,
            ]}>
            {item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        horizontal={true}
        extraData={activeItemID}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: colors.lightGrey,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  titleActive: {
    color: 'white',
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
});
