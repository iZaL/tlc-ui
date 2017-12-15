import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
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

class UpdateTruckScene extends Component {
  static propTypes = {
    makes: PropTypes.array.isRequired,
    models: PropTypes.array.isRequired,
  };

  state: State = {
    make: '',
    model: '',
    plate_number:'',
    registration_number:'',
    registration_expiry:'',
    max_weight:'',
    year:'',
    showDropDown: false,
    dropDownField: null,
  };

  componentDidMount() {
    this.props.dispatch(TRUCK_ACTIONS.fetchTruckMakesModels());
  }

  // componentWillReceiveProps(props) {
  //   let {profile} = props.user;
  //   this.setState({
  //     mobile: profile.mobile || props.user.mobile,
  //     nationality: (profile && profile.nationality) || {},
  //     residence: (profile && profile.residence) || {},
  //   });
  // }

  onFieldChange = (field, value) => {
    if (value) {
      const {makes, models} = this.props;
      let model;
      switch (field) {
        case 'make':
          model = makes.find(record => record.id === value);
          break;
        case 'model':
          model = models.find(record => record.id === value);
          break;
        default:
          break;
      }
      this.setState({[field]: model});
    }
  };

  save = () => {

  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  render() {
    const {make, model, showDropDown, dropDownField} = this.state;
    const {makes, models, plate} = this.props;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>

        <FormLabel title={I18n.t('make')}/>

        {showDropDown && dropDownField === 'make' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={makes}
            selectedValue={make.id}
            onItemPress={this.onFieldChange}
            field="make"
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
            onPress={() => this.showDropDown(true, 'make')}>
            {make.id ? make.name_en : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}}/>

        <FormLabel title={I18n.t('model')}/>

        {showDropDown && dropDownField === 'model' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={models}
            selectedValue={model.id}
            onItemPress={this.onFieldChange}
            field="model"
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
            onPress={() => this.showDropDown(true, 'model')}>
            {model.id ? model.name_en : I18n.t('select')}
          </Text>
        )}

        <Separator style={{marginVertical: 10}}/>

        <FormLabel title={I18n.t('plate_number')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('plate_number', value)}
          value={plate}
          maxLength={40}
          placeholder={I18n.t('plate_number')}
        />

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
    makes: TRUCK_SELECTORS.getTruckMakes(state),
    models: TRUCK_SELECTORS.getTruckModels(state),
  };
}

export default connect(mapStateToProps)(UpdateTruckScene);
