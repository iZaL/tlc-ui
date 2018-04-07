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
import Separator from 'components/Separator';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import DateTimePicker from 'components/DateTimePicker';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import ListItem from '../../components/ListItem';

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
    // makes: PropTypes.array.isRequired,
    // models: PropTypes.array.isRequired,
    // truck: PropTypes.shape({
    //   make: PropTypes.object.isRequired,
    //   model: PropTypes.object.isRequired,
    // }),
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
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
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

  loadTruckRegistrationScene = () => {
    this.props.navigation.navigate('TruckRegistration');
  };

  loadTruckModelScene = () => {
    this.props.navigation.navigate('TruckModel', {
      truck: this.props.truck,
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
        <ListItem
          onItemPress={this.loadTruckModelScene}
          name="truck_model"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        <ListItem
          onItemPress={this.loadTruckRegistrationScene}
          name="truck_registration"
          arrow={true}
        />

        <Separator style={{marginVertical: 10}} />

        {/*<ListItem*/}
        {/*onItemPress={this.loadRegistrationScene}*/}
        {/*name="truck_details"*/}
        {/*arrow={true}*/}
        {/*/>*/}

        {/*<Separator style={{marginVertical: 10}} />*/}

        {/*<ListItem*/}
        {/*onItemPress={this.onProfileInfoPress}*/}
        {/*name="truck_images"*/}
        {/*arrow={true}*/}
        {/*/>*/}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
    // makes: TRUCK_SELECTORS.getTruckMakes(state),
    // models: TRUCK_SELECTORS.getTruckModels(state),
    // countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(TruckUpdateScene);
