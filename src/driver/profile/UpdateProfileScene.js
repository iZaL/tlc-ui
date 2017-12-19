import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {ACTIONS as PROFILE_ACTIONS} from 'driver/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ScrollView, Text} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Dropdown from 'components/Dropdown';
import Separator from 'components/Separator';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';

type State = {
  mobile: string,
  nationality: string,
  residence: string,
  showDropDown: boolean,
  dropDownField: 'residence|nationality',
};

type SceneType = 'nationality|residence';

class UpdateProfileScene extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  state: State = {
    mobile: '',
    nationality: {},
    residence: {},
    showDropDown: false,
    dropDownField: null,
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  componentWillReceiveProps(props) {
    let {profile} = props.user;

    this.setState({
      mobile: profile.mobile || props.user.mobile,
      nationality: (profile && profile.nationality) || {},
      residence: (profile && profile.residence) || {},
    });
  }

  onFieldChange = (field, value) => {

    if (value) {
      switch (field) {
        case 'nationality':
        case 'residence':
          let country = this.props.countries.find(country => country.id === value);
          this.setState({[field]: country});
          break;
        default :
          this.setState({[field]: value});
          break;
      }
    }
  };

  saveProfile = () => {
    const {mobile, nationality, residence} = this.state;

    let params = {
      mobile,
      nationality_country_id: nationality.id,
      residence_country_id: residence.id,
    };
    this.props.dispatch(PROFILE_ACTIONS.saveProfile(params));
  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  render() {
    const {busy, countries} = this.props;

    const {residence, nationality, mobile} = this.state;

    const {showDropDown, dropDownField} = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <FormLabel title={I18n.t('mobile')}/>

        <FormTextInput
          onChangeText={value => this.onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('nationality')}/>

        {showDropDown && dropDownField === 'nationality' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={countries}
            selectedValue={nationality.id}
            onItemPress={this.onFieldChange}
            field="nationality"
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '300',
              textAlign: 'left',
              paddingTop: 5,
            }}
            onPress={() => this.showDropDown(true, 'nationality')}>
            {nationality.id ? nationality.name : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}}/>

        <FormLabel title={I18n.t('residence_country')}/>
        {showDropDown && dropDownField === 'residence' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={countries}
            selectedValue={residence.id}
            onItemPress={this.onFieldChange}
            field="residence"
          />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '300',
              textAlign: 'left',
              paddingTop: 5,
            }}
            onPress={() => this.showDropDown(true, 'residence')}>
            {residence.id ? residence.name : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}}/>

        <FormSubmit
          onPress={this.saveProfile}
          disabled={busy}
          title={busy ? I18n.t('saving') : I18n.t('update_profile')}
          style={{marginTop: 50}}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
    busy: false,
  };
}

export default connect(mapStateToProps)(UpdateProfileScene);
