import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';
import ListItem from 'components/ListItem';
import ListModal from 'components/ListModal';
import {Title} from 'react-native-paper';
import FAB from 'components/FAB';

export default class LoadWhat extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.origin !== this.props.origin ||
      nextProps.destination !== this.props.destination ||
      this.state !== nextState
    );
  }

  static propTypes = {
    origin: PropTypes.object,
    destination: PropTypes.object,
    onLocationCreatePress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    origin: {},
    destination: {},
  };

  state = {
    locationListModalVisible: false,
    locationType: 'origin',
  };

  onDropLocationPress = () => {
    this.setState({
      locationListModalVisible: true,
      locationType: 'destination',
    });
  };

  onPickLocationPress = () => {
    this.setState({
      locationListModalVisible: true,
      locationType: 'origin',
    });
  };

  onLocationListItemPress = item => {
    let field =
      this.state.locationType === 'origin'
        ? 'origin_location_id'
        : 'destination_location_id';
    this.props.onValueChange(field, item.id);
    this.setState({
      locationListModalVisible: false,
    });
  };

  closeModal = () => {
    this.setState({
      locationListModalVisible: false,
    });
  };

  onLocationCreatePress = () => {
    this.props.onLocationCreatePress(this.state.locationType);
  };

  onSave = () => {};

  render() {
    let {origin, destination, locations} = this.props;
    let {locationType, locationListModalVisible} = this.state;

    return (
      <View style={styles.container}>
        {origin.id ? (
          <View style={styles.rowContainer}>
            <View style={[styles.leftContainer, {justifyContent: 'flex-end'}]}>
              <MaterialCommunityIcons
                name="adjust"
                size={25}
                color={colors.warning}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.line} />
            </View>

            <View style={styles.rightContainer}>
              <ListItem
                onPress={this.onPickLocationPress}
                title={origin.address}
                description={`${origin.city},${origin.state},${
                  origin.country.name
                }`}
              />
            </View>
          </View>
        ) : (
          <Title onPress={this.onPickLocationPress} style={styles.label}>
            {I18n.t('location_origin_select')}
          </Title>
        )}

        {destination.id ? (
          <View style={styles.rowContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.line} />

              <MaterialCommunityIcons
                name="map-marker"
                size={33}
                style={{alignSelf: 'center'}}
                color={colors.primary}
              />
            </View>
            <View style={styles.rightContainer}>
              <ListItem
                onPress={this.onPickLocationPress}
                title={destination.address}
                description={`${destination.city},${destination.state},${
                  destination.country.name
                }`}
              />
            </View>
          </View>
        ) : (
          <Title onPress={this.onDropLocationPress} style={styles.label}>
            {I18n.t('location_destination_select')}
          </Title>
        )}

        <ListModal
          header={I18n.t('location_select')}
          onItemPress={this.onLocationListItemPress}
          activeIDs={[]}
          title={item => item.address}
          description={item =>
            `${item.city},${item.state},${item.country.name}`
          }
          items={locations.filter(location => location.type === locationType)}
          visible={locationListModalVisible}
          onCancel={this.closeModal}
          onSave={this.closeModal}>
          <View style={{alignItems: 'flex-end', paddingBottom: 20}}>
            <FAB
              icon="add"
              dark
              onPress={this.onLocationCreatePress}
              medium
              style={{
                backgroundColor: colors.primary,
              }}
            />
          </View>
        </ListModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    backgroundColor: 'white',
    marginBottom: 2,
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    paddingTop: 64,
  },
});
