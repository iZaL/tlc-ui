import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import Divider from 'components/Divider';
import Touchable from 'react-native-platform-touchable';
import Label from 'components/Label';
import {Title} from 'react-native-paper';
import I18n from 'utils/locale';
import Button from 'components/Button';
import ListModal from 'components/ListModal';
import Modal from 'components/Modal';
import Dropdown from 'components/Dropdown';
import DocumentUpload from 'components/DocumentUpload';
import TextInput from 'components/TextInput';
import {ACTIONS as APP_ACTIONS} from "../../app/common/actions";

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

  saveTrailerType = () => {
    this.hideTypeModal();
    this.onSave();
  };

  saveTrailerMake = () => {
    this.hideMakeModal();
    this.onSave();
  };

  uploadImage = image => {
    let images = [image];
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        APP_ACTIONS.uploadImages({
          images,
          resolve,
          reject,
        }),
      );
    })
      .then(images => {
        if(images.length) {
          this.setState({
            image:images[0]
          });
        }
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  onSave = () => {
    this.props.dispatch(DRIVER_ACTIONS.saveTrailer({
      ...this.state,
      truck_id:this.props.truck.id,
    }));
  };

  render() {
    const {trailer, trailer_types, trailer_makes} = this.props;
    console.log('trailer',trailer);
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
          paddingTop: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>

        <View style={{padding: 10}}>
          <Touchable onPress={this.showMakeModal}>
            <View>
              <Label title={I18n.t('trailer_make')} />
              <Title>
                {trailer.make.id ? trailer.make.name : I18n.t('select')}
              </Title>
            </View>
          </Touchable>

          <Divider style={{marginVertical: 15}} />

          <Touchable onPress={this.showTypeModal}>
            <View>
              <Label title={I18n.t('trailer_type')} />
              <Title>
                {trailer.type.id ? trailer.type.name : I18n.t('select')}
              </Title>
            </View>
          </Touchable>

          <Divider style={{marginTop: 15}} />

          <View style={{flexDirection: 'row'}}>
            <TextInput
              label={I18n.t('length')}
              value={length}
              field="length"
              onValueChange={this.onValueChange}
              style={{flex: 1, marginRight: 5}}
            />

            <TextInput
              label={I18n.t('width')}
              value={width}
              field="width"
              onValueChange={this.onValueChange}
              style={{flex: 1}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              label={I18n.t('height')}
              value={height}
              field="height"
              onValueChange={this.onValueChange}
              style={{flex: 1, marginRight: 5}}
            />

            <TextInput
              label={I18n.t('max_weight')}
              value={max_weight}
              onValueChange={this.onValueChange}
              field="plate_number"
              style={{flex: 1}}
            />
          </View>

          <Label title={I18n.t('truck_year')} />
          <Title onPress={this.showYearModal}>{year || I18n.t('select')}</Title>

          <Divider style={{marginVertical: 10}} />

          <Title>{I18n.t('trailer_image')}</Title>
          <DocumentUpload
            onPress={this.uploadImage}
            image={image}
          />
        </View>

        <Button onPress={this.onSave} title={I18n.t('save')} />

        <ListModal
          header={I18n.t('trailer_type')}
          activeIDs={[type_id]}
          visible={showTypeModal}
          onItemPress={this.setType}
          onCancel={this.hideTypeModal}
          onSave={this.saveTrailerType}
          items={trailer_types}
        />

        <ListModal
          header={I18n.t('trailer_make')}
          activeIDs={[make_id]}
          visible={showMakeModal}
          onItemPress={this.setMake}
          onCancel={this.hideMakeModal}
          onSave={this.saveTrailerMake}
          items={trailer_makes}
        />

        <Modal
          visible={isYearModalVisible}
          onCancel={this.hideYearModal}
          header={I18n.t('trailer_year')}
          onSave={this.hideYearModal}
        >
          <Dropdown
            items={['1905', '1906', '2001', '2002', '2003', '2004']}
            selectedValue={year}
            onItemPress={this.onValueChange}
            field="year"
          />
        </Modal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    truck: DRIVER_SELECTORS.getTruck(state),
    trailer: DRIVER_SELECTORS.getTrailer(state),
    trailer_makes: TRUCK_SELECTORS.getTrailerMakes(state),
    trailer_types: TRUCK_SELECTORS.getTrailerTypes(state),
  };
}

export default connect(mapStateToProps)(TrailerUpdateScene);
