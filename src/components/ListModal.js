/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import {Checkbox, Headline} from 'react-native-paper';
import I18n from 'utils/locale';

export default class CountryListModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
    activeID: PropTypes.number,
  };

  static defaultProps = {
    title: I18n.t('select_country'),
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isVisible !== nextProps.isVisible ||
      this.props.activeID !== nextProps.activeID
    );
  }

  renderItem = ({item}) => {
    let {onConfirm, activeID} = this.props;
    return (
      <Touchable onPress={() => onConfirm(item.id)}>
        <View style={styles.itemRowContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Checkbox checked={activeID === item.id} />
        </View>
      </Touchable>
    );
  };

  render() {
    let {isVisible, onCancel, items, title} = this.props;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          transparent={false}
          style={{
            backgroundColor: 'white',
            // margin: 0,
            paddingTop: 64,
            paddingHorizontal: 20,
          }}
          onBackdropPress={onCancel}>
          <Headline style={styles.headline}>{title}</Headline>
          <FlatList
            data={items}
            style={styles.listContainer}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <Separator style={{marginVertical: 10}} />
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // margin: 0,
    // padding: 0
  },
  listContainer: {
    margin: 5,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: '500',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
