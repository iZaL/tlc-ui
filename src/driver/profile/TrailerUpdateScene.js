import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import Divider from 'components/Divider';
import ListItem from 'components/ListItem';
import Touchable from 'react-native-platform-touchable';
import FormLabel from 'components/FormLabel';
import {Title} from 'react-native-paper';
import I18n from 'utils/locale';
import Button from 'components/Button';
import List from 'components/List';
import ListModal from 'components/ListModal';
import Dropdown from 'components/Dropdown';
import DocumentUpload from 'components/DocumentUpload';
import FormTextInput from 'components/FormTextInput';

class TrailerUpdateScene extends Component {
  static propTypes = {
    truck: PropTypes.shape({
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    trailer: {
      make: {},
      type: {},
    },
  };

  state = {
    make_id: null,
    type_id: null,
    showMakeModal: false,
    showTypeModal: false,
    isYearModalVisible: false,
    image: null,
    year: null,
    max_weight: null,
    length: null,
    width: null,
    height: null,
    axles: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      type,
      make,
      image,
      year,
      max_weight,
      length,
      width,
      height,
      axles,
    } = nextProps.trailer;
    return {
      make_id: make.id,
      type_id: type.id,
      image: image,
      year: year,
      max_weight: max_weight,
      length: length,
      width: width,
      height: height,
      axles: axles,
    };
  }

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailerMakes());
    this.props.dispatch(TRUCK_ACTIONS.fetchTrailerTypes());
  }

  showTypeModal = () => {
    this.setState({
      showTypeModal: true,
    });
  };

  hideTypeModal = () => {
    this.setState({
      showTypeModal: false,
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

  setType = type => {
    this.setState({
      type_id: type.id,
    });
  };

  setMake = make => {
    this.setState({
      make_id: make.id,
    });
  };

  onSave = () => {
    console.log('save');
  };

  onValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  hideYearModal = () => {
    this.setState({
      isYearModalVisible: false,
    });
  };

  showYearModal = () => {
    this.setState({
      isYearModalVisible: true,
    });
  };

  render() {
    const {trailer, trailer_types, trailer_makes} = this.props;
    const {
      type_id,
      make_id,
      image,
      year,
      max_weight,
      length,
      width,
      height,
      axles,
      showMakeModal,
      showTypeModal,
      isYearModalVisible,
    } = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>
        <Touchable onPress={this.showMakeModal}>
          <View>
            <FormLabel title={I18n.t('trailer_make')} />
            <Title>
              {trailer.make.id ? trailer.make.name : I18n.t('select')}
            </Title>
          </View>
        </Touchable>

        <Divider style={{marginVertical: 15}} />

        <Touchable onPress={this.showTypeModal}>
          <View>
            <FormLabel title={I18n.t('trailer_type')} />
            <Title>
              {trailer.type.id ? trailer.type.name : I18n.t('select')}
            </Title>
          </View>
        </Touchable>

        <Divider style={{marginTop: 15}} />

        <View style={{flexDirection: 'row'}}>
          <FormTextInput
            label={I18n.t('length')}
            value={length}
            field="length"
            onValueChange={this.onValueChange}
            style={{flex: 1, marginRight: 5}}
          />

          <FormTextInput
            label={I18n.t('width')}
            value={width}
            field="width"
            onValueChange={this.onValueChange}
            style={{flex: 1}}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <FormTextInput
            label={I18n.t('height')}
            value={height}
            field="height"
            onValueChange={this.onValueChange}
            style={{flex: 1, marginRight: 5}}
          />

          <FormTextInput
            label={I18n.t('max_weight')}
            value={max_weight}
            onValueChange={this.onValueChange}
            field="plate_number"
            style={{flex: 1}}
          />
        </View>

        <FormLabel title={I18n.t('truck_year')} />
        <Title onPress={this.showYearModal}>{year || I18n.t('select')}</Title>

        <Divider style={{marginVertical: 10}} />

        <Title>{I18n.t('truck_image')}</Title>
        <DocumentUpload
          onPress={image => this.onValueChange('image', image)}
          image={image}
        />

        <Button onPress={this.onSave} />

        <List
          title={I18n.t('trailer_type')}
          activeIDs={[type_id]}
          isVisible={showTypeModal}
          onItemPress={this.setType}
          onCancel={this.hideTypeModal}
          items={trailer_types}
        />

        <List
          title={I18n.t('trailer_make')}
          activeIDs={[make_id]}
          isVisible={showMakeModal}
          onItemPress={this.setMake}
          onCancel={this.hideMakeModal}
          items={trailer_makes}
        />

        <ListModal
          isVisible={isYearModalVisible}
          onCancel={this.hideYearModal}
          title={I18n.t('truck_year')}>
          <Dropdown
            items={['1905', '1906', '2001', '2002', '2003', '2004']}
            selectedValue={year}
            onItemPress={this.onValueChange}
            field="year"
          />
        </ListModal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    trailer: DRIVER_SELECTORS.getTrailer(state),
    trailer_makes: TRUCK_SELECTORS.getTrailerMakes(state),
    trailer_types: TRUCK_SELECTORS.getTrailerTypes(state),
  };
}

export default connect(mapStateToProps)(TrailerUpdateScene);
