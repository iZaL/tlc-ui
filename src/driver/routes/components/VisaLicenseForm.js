/**
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import colors from "assets/theme/colors";
import FormLabel from "components/FormLabel";
import FormTextInput from "/components/FormTextInput";
import Touchable from 'react-native-platform-touchable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from 'react-native-image-picker';
import Button from "components/Button";
import Separator from "components/Separator";
import DatePicker from "components/DatePicker";

export default class VisaLicenseForm extends PureComponent {

  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    country: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    country: {},
    type: ''
  };

  state = {
    expiry_date: null,
    image: null,
    uploaded: false,
    upload_source: null,
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  openImagePicker = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.uri) {
        console.log('res', response);
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: response.uri,
          upload_source: 'data:image/jpeg;base64,' + response.data,
          uploaded: true
        });
      }
    });
  };

  render() {

    let {country, type, onButtonPress,onClose} = this.props;
    console.log('c',country);

    let model;
    switch (type) {
      case 'license' : {
        model = country.license;
        break;
      }
      case 'visa' : {
        model = country.visa;
        break;
      }
    }

    let {expiry_date, image, upload_source, uploaded} = this.state;

    if (uploaded) {
      image = upload_source
    } else {
      image = model.image
    }

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer,
        ]}>

          <FormLabel title={I18n.t('expiry_date')} style={{marginBottom:10}}/>

          <DatePicker
            date={expiry_date || model.expiry_date}
            mode="date"
            placeholder={I18n.t('select')}
            format="YYYY-MM-DD"
            minDate="2015-01-01"
            maxDate="2040-01-01"
            onDateChange={date => this.onFieldChange('expiry_date', date)}
          />

          {/*<FormTextInput*/}
            {/*onChangeText={value => this.onFieldChange('expiry_date', value)}*/}
            {/*defaultValue={model.expiry_date}*/}
            {/*value={expiry_date}*/}
            {/*maxLength={40}*/}
            {/*placeholder={I18n.t('expiry_date')}*/}
          {/*/>*/}

          <Separator style={{marginTop:30,marginBottom:10}}/>
          <FormLabel title={I18n.t('image')}/>

          <Touchable style={styles.imageContainer} onPress={() => this.openImagePicker()}>

            {
              image ?
                <Image style={styles.image} source={{uri: image}}/>
                :
                <MaterialCommunityIcons name="image-area" size={75} color="white"/>
            }
          </Touchable>

          <Separator/>

          <View style={styles.buttonContainer}>
            <Button title={I18n.t('close').toUpperCase()} onPress={onClose} style={styles.buttons} titleStyle={styles.buttonText}/>
            <Button title={I18n.t('save').toUpperCase()} onPress={onButtonPress} style={styles.buttons} titleStyle={styles.buttonText}/>
          </View>

        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent:'center',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
    marginBottom: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.mediumGrey,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  buttons:{
    backgroundColor:'transparent',
    width:100,
  },
  buttonText:{
    color:colors.primary,
    fontSize:15,
    fontWeight:'500'
  }

});
