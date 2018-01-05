/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Separator from "components/Separator";
import colors from "assets/theme/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import CallButton from "components/CallButton";
import Touchable from 'react-native-platform-touchable';
import LoadPickDropLocation from "driver/loads/components/LoadPickDropLocation";
import LoadInfo from "driver/loads/components/LoadInfo";

export default class LoadsList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired
  };


  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={[{id: 1}, {id: 2,}]}
        style={styles.listContainer}
        renderItem={this.renderRow}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator/>}
        keyExtractor={(item, index) => item.id}
      />
    );
  }

  renderRow = ({item}) => {
    const {onItemPress} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)}>
        <View style={[styles.itemContainer,]}>
          <LoadPickDropLocation/>
          <LoadInfo />
          <Separator style={{marginVertical: 10}}/>
          <View style={styles.itemRowContainer}>
            <Text style={styles.viewDetails}>View Details</Text>
            <CallButton onPress={() => {}}/>
          </View>
        </View>
      </Touchable>
    )

  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: 5,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 5
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: '500'
  }
});
