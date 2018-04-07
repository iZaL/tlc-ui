import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {ScrollView, Text, View} from 'react-native';
import I18n from 'utils/locale';
import Touchable from 'react-native-platform-touchable';
import FormLabel from '../../components/FormLabel';
import List from '../../components/List';
import Separator from '../../components/Separator';

class TruckModelScene extends Component {
  static propTypes = {
    countries: PropTypes.array,
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          truck: PropTypes.object.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    countries: [],
  };

  state = {
    make_id: null,
    model_id: null,
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(TRUCK_ACTIONS.fetchTruckMakesModels());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {model} = nextProps.navigation.state.params.truck;
    return {
      model_id: model.id,
      make_id: model.make_id,
      showMakeModal: false,
      showModelModal: false,
    };
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onSave = () => {
    console.log('save');
  };

  showModelModal = () => {
    this.setState({
      showModelModal: true,
    });
  };

  hideModelModal = () => {
    this.setState({
      showModelModal: false,
    });
  };

  showMakeModal = () => {
    this.setState({
      showMakeModal: true,
    });
  };

  hideMakeModal = () => {
    this.setState({
      showMakeModal: false,
    });
  };

  setMake = id => {
    this.setState({
      make_id: id,
      model_id: null,
    });
  };

  setModel = id => {
    this.setState({
      model_id: id,
    });
  };

  render() {
    let {make_id, model_id} = this.state;
    let {truck, makes} = this.props;

    let models = [];
    if (make_id) {
      let make = makes.find(make => make.id == make_id);
      if (make) {
        models = make.models || [];
      }
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 20,
          padding: 10,
        }}>
        <Touchable onPress={this.showMakeModal}>
          <View>
            <FormLabel title={I18n.t('truck_make')} />
            <Text style={{paddingTop: 10, fontSize: 18}}>
              {make_id ? truck.model.make.name : I18n.t('select')}
            </Text>
          </View>
        </Touchable>

        <Separator style={{marginVertical: 20}} />

        <Touchable onPress={this.showModelModal} disabled={!make_id}>
          <View>
            <FormLabel title={I18n.t('truck_model')} />
            <Text style={{paddingTop: 10, fontSize: 18}}>
              {model_id ? truck.model.name : I18n.t('select')}
            </Text>
          </View>
        </Touchable>

        <List
          title={I18n.t('truck_make')}
          activeIDs={[make_id]}
          isVisible={this.state.showMakeModal}
          onConfirm={this.setMake}
          onCancel={this.hideMakeModal}
          items={makes}
        />

        <List
          title={I18n.t('truck_model')}
          activeIDs={[model_id]}
          isVisible={this.state.showModelModal}
          onConfirm={this.setModel}
          onCancel={this.hideModelModal}
          items={models}
        />
      </View>
    );
  }
}

function makeMapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
    makes: TRUCK_SELECTORS.getTruckMakes(state),
  };
}

export default connect(makeMapStateToProps)(TruckModelScene);
