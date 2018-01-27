import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import LocationListItem from 'shipper/locations/components/LocationListItem';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class LoadWhat extends Component {
  static propTypes = {
    onPickLocationPress: PropTypes.func.isRequired,
    onDropLocationPress: PropTypes.func.isRequired,
    pickLocation: PropTypes.object.isRequired,
    dropLocation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    let {pickLocation, dropLocation, onDropLocationPress, onPickLocationPress} = this.props;

    return (
      <View style={styles.container}>


          {
            pickLocation ?

              <View style={styles.rowContainer}>

                <View style={[styles.leftContainer,{justifyContent:'flex-end'}]}>

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
                    onPress={onPickLocationPress}
                  />
                </View>

              </View>

              :
              <Text
                onPress={onPickLocationPress}
                style={styles.label}>
                Select Pickup Location
              </Text>
          }

          {
            dropLocation ?

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
                    item={pickLocation}
                    onPress={onDropLocationPress}
                  />
                </View>
              </View>
              :
              <Text
                onPress={onDropLocationPress}
                style={styles.label}>
                Select Drop Location
              </Text>

          }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    // backgroundColor:'yellow',
    width:40,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
  },
  label: {
    paddingBottom: 10,
    fontSize: 20,
    color: colors.primary,
  },
  line:{
    width:StyleSheet.hairlineWidth,
    backgroundColor:colors.mediumGrey,
    height:'50%'
  }
});
