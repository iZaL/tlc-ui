import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from '../../components/LocalizedText';
import Touchable from 'react-native-platform-touchable';

export default class ServicesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemIDs !== this.props.activeItemIDs
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemIDs} = this.props;
    return (
      <Touchable style={styles.itemContainer} onPress={() => onItemPress(item)}>
        <View
          style={
            activeItemIDs.indexOf(item.id) > -1 && {backgroundColor: 'yellow'}
          }>
          <LocalizedText ar={item.name_ar} en={item.name_en} />
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemIDs} = this.props;

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        horizontal={true}
        extraData={activeItemIDs}
      />
    );
  }
}

ServicesList.propTypes = {
  items: PropTypes.array,
  onItemPress: PropTypes.func.isRequired,
  activeItemIDs: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
});
