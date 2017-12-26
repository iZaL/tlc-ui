/**
 * @flow
 */
import React, {PureComponent, Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, Picker, StyleSheet, Text, View, Modal, ScrollView} from 'react-native';
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

const SECTIONS = [
  {
    title: 'Visa',
    content: 'Wa'
  },
  {
    title: 'License',
    content: 'Wa'
  }
];

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
    visa_image: null,
    license_expiry_date: null,
    license_image: null
  };

  componentWillReceiveProps(props) {
    let {country, visa, license} = props;
    if (props.country.id) {
      this.setState({
        visa_expiry_date: visa.expiry_date,
        license_expiry_date: visa.expiry_date,
      })
    }
  }

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  renderSectionHeader = items => {
    return [];
  };

  _renderHeader(item, index, isActive) {
    return (
      <View style={[styles.headerContainer,
        !isActive && { borderBottomRightRadius:3, borderBottomLeftRadius:3,}
      ]}>
        <Text style={styles.headerTitle}>{item.title}</Text>

        <Feather
          name={isActive ? "chevron-up" : "chevron-down"}
          color={colors.darkGrey}
          size={25}
        />

      </View>
    );
  }

  _renderContent = (section,index,isActive) => {
    // let {onButtonPress, country} = this.props;

    let {visa_expiry_date, visa_image, license_expiry_date, license_image} = this.state;

    return (
      <View style={[styles.contentContainer,
      ]}>

        <FormLabel title={I18n.t('expiry_date')}/>
        <FormTextInput
          onChangeText={value => this.onFieldChange('license_expiry_date', value)}
          value={license_expiry_date}
          maxLength={40}
          placeholder={I18n.t('expiry_date')}
        />

        <FormLabel title={I18n.t('image')}/>

      </View>
    );
  }

  render() {
    let {onButtonPress, country} = this.props;
    console.log('props', this.props);

    let {visa_expiry_date, visa_image, license_expiry_date, license_image} = this.state;

    return (

      <View style={styles.container}>
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          underlayColor="transparent"
          expanded={true}
        />
        <FormSubmit
          onPress={onButtonPress}
          underlayColor="transparent"
          title={I18n.t('save')}
          style={{marginTop: 50}}
        />
      </View>
    );
    // return (
    //   <View style={styles.container} >
    //     <FormLabel title={I18n.t('license_expiry_date')}/>
    //     <FormTextInput
    //       onChangeText={value => this.onFieldChange('license_expiry_date', value)}
    //       value={license_expiry_date}
    //       maxLength={40}
    //       placeholder={I18n.t('license_expiry_date')}
    //     />
    //
    //     <FormLabel title={I18n.t('license_image')}/>
    //
    //
    //     <FormLabel title={I18n.t('visa_expiry_date')}/>
    //     <FormTextInput
    //       onChangeText={value => this.onFieldChange('visa_expiry_date', value)}
    //       value={visa_expiry_date}
    //       maxLength={40}
    //       placeholder={I18n.t('visa_expiry_date')}
    //     />
    //
    //     <FormLabel title={I18n.t('visa_image')}/>
    //
    //     <FormSubmit
    //       onPress={onButtonPress}
    //       underlayColor="transparent"
    //       title={I18n.t('save')}
    //       style={{marginTop: 50}}
    //     />
    //
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    paddingVertical:15,
    backgroundColor:'white',
    marginTop:10,
    borderTopRightRadius:3,
    borderTopLeftRadius:3,
    shadowRadius:3,
    shadowOffset:{width:1,height:1},
    shadowColor:colors.mediumGrey,
    shadowOpacity:1
  },
  contentContainer:{
    flex:1,
    backgroundColor:'white',
    padding:10,
    borderBottomRightRadius:3,
    borderBottomLeftRadius:3,
    shadowRadius:3,
    shadowOffset:{width:1,height:1},
    shadowColor:colors.mediumGrey,
    shadowOpacity:1
  },
  headerTitle:{
    flex:1,
    fontSize:18
  },
  headerIcon:{

  }

});
