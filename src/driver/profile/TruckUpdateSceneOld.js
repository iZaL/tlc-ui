import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView, Text} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import DateTimePicker from 'components/DateTimePicker';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';

type State = {
  mobile: string,
  nationality: string,
  residence: string,
  showDropDown: boolean,
  dropDownField: 'registration_country|nationality',
};

type SceneType = 'registration_country|residence';

class TruckUpdateScene extends Component {
  static propTypes = {
    makes: PropTypes.array.isRequired,
    models: PropTypes.array.isRequired,
    truck: PropTypes.shape({
      make: PropTypes.object.isRequired,
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    makes: [],
    models: [],
    truck: {
      make: {},
      model: {},
    },
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState !== this.state;
  // }

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
    registration_country: '',
  };

  componentDidMount() {
    this.props.dispatch(TRUCK_ACTIONS.fetchTruckMakesModels());
  }

  static getDerivedStateFromProps(nextProps) {
    let {truck} = nextProps;
    return {
      ...truck,
    };
  }

  // componentWillReceiveProps(props) {
  //   let {truck} = props;
  //   this.setState({
  //     ...truck,
  //   });
  // }

  onValueChange = (field, value) => {
    if (value) {
      let record;
      const {makes, models, countries} = this.props;
      switch (field) {
        case 'make':
          record = makes.find(record => record.id === value);
          break;
        case 'model':
          record = models.find(record => record.id === value);
          break;
        case 'registration_country':
          record = countries.find(record => record.id === value);
          break;
        default:
          record = value;
          break;
      }
      this.setState({[field]: record});
    }
  };

  save = () => {
    const {
      make,
      model,
      year,
      registration_expiry,
      registration_number,
      plate_number,
      max_weight,
      registration_country,
    } = this.state;

    let params = {
      // make_id: make.id,
      model_id: model.id,
      year,
      registration_expiry,
      registration_number,
      plate_number,
      max_weight,
      registration_country_id: registration_country.id,
    };

    this.props.dispatch(DRIVER_ACTIONS.saveTruck(params));
  };

  showDropDown = (showDropDown: boolean, dropDownField: SceneType) => {
    this.setState({
      showDropDown,
      dropDownField,
    });
  };

  render() {
    const {
      make,
      model,
      showDropDown,
      dropDownField,
      year,
      registration_number,
      registration_expiry,
      plate_number,
      max_weight,
      registration_country,
    } = this.state;

    const {makes, models, countries} = this.props;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        {/*<FormLabel title={I18n.t('make')} />*/}

        {/*{showDropDown && dropDownField === 'make' ? (*/}
        {/*<Dropdown*/}
        {/*onClose={this.showDropDown}*/}
        {/*items={makes}*/}
        {/*selectedValue={make.id}*/}
        {/*onItemPress={this.onValueChange}*/}
        {/*field="make"*/}
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
        {/*onPress={() => this.showDropDown(true, 'make')}>*/}
        {/*{make.id ? make.name : I18n.t('select')}*/}
        {/*</Text>*/}
        {/*)}*/}

        {/*<Divider style={{marginVertical: 10}} />*/}

        <FormLabel title={I18n.t('model')} />

        {showDropDown && dropDownField === 'model' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={models}
            selectedValue={model.id}
            onItemPress={this.onValueChange}
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
            {model.id ? model.name : I18n.t('select')}
          </Text>
        )}

        <Divider style={{marginVertical: 10}} />

        {/*<FormLabel title={I18n.t('plate_number')} />*/}

        <FormTextInput
          onValueChange={this.onValueChange}
          field="plate_number"
          value={plate_number}
          maxLength={40}
          label={I18n.t('plate_number')}
        />

        <FormLabel title={I18n.t('registration_country')} />

        {showDropDown && dropDownField === 'registration_country' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={countries}
            selectedValue={registration_country.id}
            onItemPress={this.onValueChange}
            field="registration_country"
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
            onPress={() => this.showDropDown(true, 'registration_country')}>
            {registration_country.id
              ? registration_country.name
              : I18n.t('select')}
          </Text>
        )}

        <Divider style={{marginVertical: 10}} />

        {/*<FormLabel title={I18n.t('registration_number')} />*/}

        <FormTextInput
          onValueChange={this.onValueChange}
          field="registration_number"
          value={registration_number}
          maxLength={40}
          label={I18n.t('registration_number')}
        />

        <FormLabel title={I18n.t('registration_expiry')} />

        <DateTimePicker
          date={registration_expiry}
          mode="date"
          label={I18n.t('select')}
          format="YYYY-MM-DD"
          minDate="2015-01-01"
          maxDate="2040-01-01"
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={date => this.onValueChange('registration_expiry', date)}
        />

        {/*<FormLabel title={I18n.t('max_weight')} />*/}

        <FormTextInput
          onValueChange={this.onValueChange}
          field="max_weight"
          value={max_weight}
          maxLength={40}
          label={I18n.t('max_weight')}
        />

        <FormLabel title={I18n.t('year')} />

        {showDropDown && dropDownField === 'year' ? (
          <Dropdown
            onClose={this.showDropDown}
            items={['2001', '2002', '2003', '2004']}
            selectedValue={year}
            onItemPress={this.onValueChange}
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
    truck: DRIVER_SELECTORS.getTruck(state),
    // makes: TRUCK_SELECTORS.getTruckMakes(state),
    models: TRUCK_SELECTORS.getTruckModels(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(TruckUpdateScene);
