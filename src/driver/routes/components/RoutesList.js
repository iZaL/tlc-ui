/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';

export default class RoutesList extends Component {


  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  static propTypes = {
    activeItemIDs: PropTypes.array.isRequired,
    onItemAddPress: PropTypes.func.isRequired,
    onItemRemovePress: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  renderRow = ({item}) => {
    const {onItemAddPress, onItemRemovePress, activeItemIDs} = this.props;
    return (
      <TouchableHighlight
        onPress={() => activeItemIDs.includes(item.id) ? onItemRemovePress(item) : onItemAddPress(item) }
        underlayColor="transparent"
      >
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.origin.name}</Text>
          <Text style={styles.title}>{item.destination.name}</Text>
          <View style={styles.checkbox}>
            {activeItemIDs &&
            activeItemIDs.includes(item.id) && (
              <FontAwesome
                key={item.id}
                name="check"
                size={16}
                color="green"
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {items,activeItemIDs} = this.props;

    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        enableEmptySections={true}
        renderItem={this.renderRow}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 100}}
        ItemSeparatorComponent={() => (
          <Separator/>
        )}
        keyExtractor={(item, index) => index}
        extraData={activeItemIDs}
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
    backgroundColor:'white',
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
