import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {ACTIONS as PROFILE_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView, Text, View} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';
import Button from 'components/Button';
import I18n from 'utils/locale';
import AppModal from 'components/AppModal';
import AlertBox from 'components/AlertBox';
import SelectBox from 'components/SelectBox';
import Modal from 'react-native-modal';
import ListItem from 'components/ListItem';
import IconFactory from 'components/IconFactory';

type State = {
  mobile: string,
  nationality: string,
  residence: string,
  showDropDown: boolean,
  dropDownField: 'residence|nationality',
};

type SceneType = 'nationality|residence';

class ProfileUpdateScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    profile: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      nationality: PropTypes.object.isRequired,
      residencies: PropTypes.array.isRequired,
    }),
  };

  static defaultProps = {
    profile: {
      mobile: '',
      nationality: {},
      residencies: [],
    },
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  state: State = {
    mobile: '',
    nationality: {},
    residencies: [],
    showDropDown: false,
    dropDownField: null,
    showModal: false,
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {profile} = nextProps;

    if (nextProps.profile === prevState.profile) {
      return null;
    }

    return {
      mobile: profile.mobile,
      nationality: profile.nationality,
      residencies: profile.residencies,
    };
  }

  //
  // componentWillReceiveProps(props) {
  //   let {profile} = props;
  //
  //   this.setState({
  //     mobile: profile.mobile,
  //     nationality: profile.nationality,
  //     residence: profile.residence,
  //   });
  // }

  onValueChange = (field, value) => {
    if (value) {
      switch (field) {
        case 'nationality':
        case 'residence':
          let country = this.props.countries.find(
            country => country.id === value,
          );
          this.setState({[field]: country});
          break;
        default:
          this.setState({[field]: value});
          break;
      }
    }
  };

  saveProfile = () => {
    const {mobile, nationality, residencies} = this.state;
    return new Promise((resolve, reject) => {
      let params = {
        mobile,
        nationality_country_id: nationality.id,
        // residence_country_id: residence.id,
        resolve,
        reject,
      };
      this.props.dispatch(PROFILE_ACTIONS.saveProfile(params));
    })
      .then(() => {})
      .catch(e => {
        // this.props.dispatch(
        //   APP_ACTIONS.setNotification('Update Failed', 'error'),
        // );
      });
  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  loadNationalityScene = (countryID: number) => {};

  onListItemPress = (route: string) => {
    let scene;
    let sceneConfig = {
      route,
      title: I18n.t(route),
    };

    switch (route) {
      case 'nationality':
      case 'visas':
      case 'residencies':
      case 'licenses':
        scene = 'NationalityList';
        break;
      case 'languages':
        scene = 'LanguageList';
        break;
    }
    return this.props.navigation.navigate(scene, sceneConfig);
  };

  render() {
    const {countries} = this.props;
    const {residencies, nationality, mobile} = this.state;
    const {showDropDown, dropDownField} = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <ListItem onItemPress={this.onListItemPress} name="nationality" />

        <Divider style={{marginVertical: 10}} />

        <ListItem onItemPress={this.onListItemPress} name="residencies" />

        <Divider style={{marginVertical: 10}} />

        <ListItem onItemPress={this.onListItemPress} name="visas" />

        <Divider style={{marginVertical: 10}} />

        <ListItem onItemPress={this.onListItemPress} name="licenses" />

        <Divider style={{marginVertical: 10}} />

        <ListItem onItemPress={this.onListItemPress} name="languages" />

        <Divider style={{marginVertical: 10}} />

        {/*<FormLabel title={I18n.t('residence_country')} />*/}
        {/*{showDropDown && dropDownField === 'residence' ? (*/}
        {/*<Dropdown*/}
        {/*onClose={this.showDropDown}*/}
        {/*items={countries}*/}
        {/*selectedValue={residence.id}*/}
        {/*onItemPress={this.onValueChange}*/}
        {/*field="residence"*/}
        {/*/>*/}
        {/*) : (*/}
        {/*<Text*/}
        {/*style={{*/}
        {/*fontSize: 18,*/}
        {/*color: 'black',*/}
        {/*fontWeight: '300',*/}
        {/*textAlign: 'left',*/}
        {/*paddingTop: 5,*/}
        {/*}}*/}
        {/*onPress={() => this.showDropDown(true, 'residence')}>*/}
        {/*{residence.id ? residence.name : I18n.t('select')}*/}
        {/*</Text>*/}
        {/*)}*/}

        {/*<Divider style={{marginVertical: 10}} />*/}

        <Button
          onPress={this.saveProfile}
          title={I18n.t('profile_update')}
          style={{marginTop: 50}}
        />

        {/*<AppModal*/}
        {/*visible={this.state.showModal}*/}
        {/*closeOnBackdropPress={true}*/}
        {/*render={(closeModal) => {*/}
        {/*return (*/}
        {/*<AlertBox text="Profile Updated" />*/}
        {/*)*/}
        {/*}}*/}
        {/*/>*/}

        {/*<Modal animationType="slide" isVisible={modalVisible} transparent={true}>*/}
        {/*<View style={{flex: 1, backgroundColor: '#00000090'}}>*/}
        {/*<VisaLicenseForm*/}
        {/*onClose={this.hideModal}*/}
        {/*onButtonPress={this.save}*/}
        {/*country={activeCountry}*/}
        {/*type={type}*/}
        {/*/>*/}
        {/*</View>*/}
        {/*</Modal>*/}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: DRIVER_SELECTORS.getProfile(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(ProfileUpdateScene);
