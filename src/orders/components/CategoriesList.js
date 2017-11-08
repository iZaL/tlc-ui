import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from '../../components/LocalizedText';
import Touchable from 'react-native-platform-touchable';

export default class CategoriesList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.activeItemID !== this.props.activeItemID;
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable
        style={styles.itemContainer}
        onPress={() => onItemPress(item)}
        key={item.id}>
        <View style={item.id === activeItemID && {backgroundColor: 'yellow'}}>
          <LocalizedText ar={item.name_ar} en={item.name_en} />
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
        keyExtractor={item => item.id}
        horizontal={true}
        extraData={activeItemID}
      />
    );
  }
}

CategoriesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
});
