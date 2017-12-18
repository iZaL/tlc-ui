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
import DatePicker from "components/DatePicker";

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

  shouldComponentUpdate(nextProps,nextState) {
    return nextState !== this.state;
  }

  state: State = {
    make: {},
    model: {},
    plate_number: '',
    registration_number: '',
    registration_expiry: '',
    max_weight: '',
    year: '',
    showDropDown: false,
    dropDownField: null,
  };

  componentDidMount() {
    this.props.dispatch(TRUCK_ACTIONS.fetchTruckMakesModels());
  }

  componentWillReceiveProps(props) {
    let {profile : {truck}} = props.user;
    this.setState({
      ...truck,
    });
  }

  onFieldChange = (field, value) => {
    if (value) {
      let record;
      const {makes, models} = this.props;
      switch (field) {
        case 'make':
          record = makes.find(record => record.id === value);
          break;
        case 'model':
          record = models.find(record => record.id === value);
          break;
        default:
          record = value;
          break;
      }
      this.setState({[field]: record});
    }
  };

  save = () => {
    const {make, model, year, registration_expiry,registration_number,plate_number,max_weight} = this.state;

    let params = {
      make_id:make.id,
      model_id:model.id,
      year,
      registration_expiry,
      registration_number,
      plate_number,
      max_weight
    };

    this.props.dispatch(TRUCK_ACTIONS.saveTruck(params));
  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  render() {
    const {make, model, showDropDown, dropDownField, year, registration_number,registration_expiry,plate_number,max_weight} = this.state;
    const {
      makes,
      models,
    } = this.props;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <FormLabel title={I18n.t('make')} />

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

        <Separator style={{marginVertical: 10}} />

        <FormLabel title={I18n.t('model')} />

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

        <Separator style={{marginVertical: 10}} />

        <FormLabel title={I18n.t('plate_number')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('plate_number', value)}
          value={plate_number}
          maxLength={40}
          placeholder={I18n.t('plate_number')}
        />

        <FormLabel title={I18n.t('registration_number')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('registration_number', value)}
          value={registration_number}
          maxLength={40}
          placeholder={I18n.t('registration_number')}
        />

        <FormLabel title={I18n.t('registration_expiry')} />

        <DatePicker
          date={registration_expiry}
          mode="date"
          placeholder={I18n.t('select')}
          format="YYYY-MM-DD"
          minDate="2015-01-01"
          maxDate="2040-01-01"
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={(date) => this.onFieldChange('registration_expiry', date)}
        />

        <FormLabel title={I18n.t('max_weight')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('max_weight', value)}
          value={max_weight}
          maxLength={40}
          placeholder={I18n.t('max_weight')}
        />

        <FormLabel title={I18n.t('year')} />

        {showDropDown && dropDownField === 'year' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={['2001','2002','2003','2004']}
            selectedValue={year}
            onItemPress={this.onFieldChange}
            field="year"
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
            onPress={() => this.showDropDown(true, 'year')}>
            {year ? year : I18n.t('select')}
          </Text>
        )}

        <FormSubmit
          onPress={this.save}
          disabled={false}
          title={I18n.t('save')}
          style={{marginTop: 50}}
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
