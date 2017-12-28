/**
 * @flow
 */
import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, Picker, StyleSheet, Text, View, Modal, ScrollView, Image} from 'react-native';
import I18n from 'utils/locale';
import colors from "assets/theme/colors";
import FormLabel from "components/FormLabel";
import FormTextInput from "/components/FormTextInput";
import FormSubmit from "components/FormSubmit";
import Touchable from 'react-native-platform-touchable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Accordion from 'react-native-collapsible/Accordion';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-picker';

export default class VisaLicenseForm extends PureComponent {

  static propTypes = {
    onButtonPress: PropTypes.func.isRequired,
    country: PropTypes.object.isRequired,
    visa: PropTypes.object.isRequired,
    license: PropTypes.object.isRequired
  };

  static defaultProps = {
    country: {},
    license: {},
    visa: {}
  };

  state = {
    visa_expiry_date: null,
    license_expiry_date: null,
    license_image: null,
    license_uploaded: false,
    license_upload_source: null,
    visa_image: null,
    visa_uploaded: false,
    visa_upload_source: null,
  };

  componentWillReceiveProps(nextProps) {
    let {country, visa, license} = nextProps;
    if (country.id) {
      this.setState({
        license_image: license.image,
        license_uploaded: false,
        license_upload_source: null,
        license_expiry_date: visa.expiry_date,
        visa_image: visa.image,
        visa_uploaded: false,
        visa_upload_source: null,
        visa_expiry_date: visa.expiry_date,
      })
    }

  }

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  openImagePicker = (field) => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log('res', response);

        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        switch (field) {
          case 'license' :
            this.setState({
              license_image: response.uri,
              license_upload_source: 'data:image/jpeg;base64,' + response.data,
              license_uploaded: true
            });
            break;
          case 'visa' :
            this.setState({
              visa_image: response.uri,
              visa_upload_source: 'data:image/jpeg;base64,' + response.data,
              visa_uploaded: true
            });
            break;
        }


      }
    });
  };

  renderSectionHeader = items => {
    return items.map(item => item);
  };

  renderHeader(item, index, isActive) {
    return (
      <View style={[styles.headerContainer,
        !isActive && {borderBottomRightRadius: 3, borderBottomLeftRadius: 3,}
      ]}>
        <Text style={styles.headerTitle}>{item.name}</Text>

        <Feather
          name={isActive ? "chevron-up" : "chevron-down"}
          color={colors.darkGrey}
          size={25}
        />

      </View>
    );
  }

  render(){
    let {onButtonPress, country} = this.props;

    let {visa_expiry_date, visa_image, visa_upload_source, visa_uploaded, license_expiry_date, license_image, license_uploaded, license_upload_source,} = this.state;

    let licenseImage;

    if (license_uploaded) {
      licenseImage = license_upload_source
    } else if (license_image) {
      licenseImage = license_image
    }

    let visaImage;
    if (visa_uploaded) {
      visaImage = visa_upload_source
    } else if (license_image) {
      visaImage = visa_image
    }

    return (
      <View>
        <View style={[styles.contentContainer,
        ]}>

          <FormLabel title={I18n.t('license_expiry_date')}/>
          <FormTextInput
            onChangeText={value => this.onFieldChange('license_expiry_date', value)}
            value={license_expiry_date}
            maxLength={40}
            placeholder={I18n.t('license_expiry_date')}
          />

          <FormLabel title={I18n.t('license_image')}/>

          <Touchable style={styles.imageContainer} onPress={() => this.openImagePicker('license')}>

            {
              licenseImage ?
                <Image style={styles.image} source={{uri: licenseImage}}/>
                :
                <MaterialCommunityIcons name="image-area" size={75} color="white"/>
            }
          </Touchable>
        </View>
        <View style={[styles.contentContainer,
        ]}>


          <FormLabel title={I18n.t('visa_expiry_date')}/>

          <FormTextInput
            onChangeText={value => this.onFieldChange('visa_expiry_date', value)}
            value={visa_expiry_date}
            maxLength={40}
            placeholder={I18n.t('visa_expiry_date')}
          />

          <FormLabel title={I18n.t('visa_image')}/>
          <Touchable style={styles.imageContainer} onPress={() => this.openImagePicker('visa')}>

            {
              visaImage ?
                <Image style={styles.image} source={{uri: visaImage}}/>
                :
                <MaterialCommunityIcons name="image-area" size={75} color="white"/>
            }
          </Touchable>

          <FormSubmit
            onPress={() => {
            }}
            underlayColor="transparent"
            title={I18n.t('save')}
            style={{marginTop: 50}}
          />

        </View>
      </View>
    );
  }

  render() {
    let {items} = this.props;
    console.log('state', this.state);
    return (

      <View style={styles.container}>
        <Accordion
        sections={this.renderSectionHeader(items)}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        underlayColor="transparent"
        expanded={true}
        />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    shadowRadius: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.mediumGrey,
    shadowOpacity: 1,
    marginBottom:10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18
  },
  headerIcon: {},
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.mediumGrey,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 90
  }

});
