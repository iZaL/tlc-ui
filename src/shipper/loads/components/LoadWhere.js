import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, StyleSheet, Text, View} from 'react-native';
import LocationListItem from 'shipper/locations/components/LocationListItem';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationList from 'shipper/locations/components/LocationList';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';

export default class LoadWhat extends Component {

  shouldComponentUpdate(nextProps,nextState) {
    return nextProps.pickLocation !== this.props.pickLocation || nextProps.dropLocation !== this.props.dropLocation || this.state !== nextState
  }

  static propTypes = {
    pickLocation: PropTypes.object,
    dropLocation: PropTypes.object,
  };

  static defaultProps = {
    pickLocation: {},
    dropLocation: {},
  };

  state = {
    locationListModalVisible: false,
    locationType: 'pick',
  };

  onDropLocationPress = () => {
    this.setState({
      locationListModalVisible: true,
      locationType: 'drop',
    });
  };

  onPickLocationPress = () => {
    this.setState({
      locationListModalVisible: true,
      locationType: 'pick',
    });
  };

  onLocationListItemPress = item => {
    let field =
      this.state.locationType === 'pick'
        ? 'pick_location_id'
        : 'drop_location_id';
    this.props.onFieldChange(field, item.id);
    this.setState({
      locationListModalVisible: false,
    });
  };

  closeModal = () => {
    this.setState({
      locationListModalVisible: false,
    });
  };

  render() {
    let {pickLocation, dropLocation, locations} = this.props;
    let {locationType, locationListModalVisible} = this.state;

    return (
      <View style={styles.container}>
        {pickLocation.id ? (
          <View style={styles.rowContainer}>
            <View style={[styles.leftContainer, {justifyContent: 'flex-end'}]}>
              <MaterialCommunityIcons
                name="adjust"
                size={25}
                color={colors.warning}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.line}/>
            </View>

            <View style={styles.rightContainer}>
              <LocationListItem
                item={pickLocation}
                onPress={this.onPickLocationPress}
              />
            </View>
          </View>
        ) : (
          <Text onPress={this.onPickLocationPress} style={styles.label}>
            {I18n.t('location_pick_select')}
          </Text>
        )}

        {dropLocation.id ? (
          <View style={styles.rowContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.line}/>

              <MaterialCommunityIcons
                name="map-marker"
                size={33}
                style={{alignSelf: 'center'}}
                color={colors.primary}
              />
            </View>
            <View style={styles.rightContainer}>
              <LocationListItem
                item={dropLocation}
                onPress={this.onDropLocationPress}
              />
            </View>
          </View>
        ) : (
          <Text onPress={this.onDropLocationPress} style={styles.label}>
            {I18n.t('location_pick_select')}
          </Text>
        )}

        <Modal visible={locationListModalVisible} onRequestClose={this.closeModal}>
          <Touchable style={styles.modalContainer} onPress={this.closeModal}>
            <LocationList
              items={locations.filter(
                location => location.type === locationType,
              )}
              onItemPress={this.onLocationListItemPress}
            />
          </Touchable>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 40,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  label: {
    paddingBottom: 10,
    fontSize: 20,
    color: colors.primary,
  },
  line: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.mediumGrey,
    height: '50%',
  },
  modalContainer:{
    flex: 1,
    backgroundColor: '#00000090',
    paddingTop: 64
  },

});
