import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title} from 'react-native-paper';
import DocumentUpload from 'components/DocumentUpload';
import {View} from 'react-native';
import TextInput from '/components/TextInput';
import I18n from 'utils/locale';
import Dropdown from 'components/Dropdown';
import Label from 'components/Label';
import Modal from 'components/Modal';
import Divider from 'components/Divider';
import Button from 'components/Button';
import {ACTIONS as APP_ACTIONS} from '../../app/common/actions';
import {ACTIONS as DRIVER_ACTIONS} from '../common/actions';

class TruckInfoUpdateScene extends Component {
  constructor(props) {
    super(props);

    let {
      plate_number,
      image,
      year,
      max_weight,
    } = props.navigation.state.params.truck;

    this.state = {
      isYearModalVisible: false,
      plate_number: plate_number,
      image: image,
      year: year,
      max_weight: max_weight,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title:
        (navigation.state.params &&
          `${navigation.state.params.title} ${navigation.state.params.type}`) ||
        '',
    };
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
        if (images.length) {
          this.setState({
            image: images[0],
          });
        }
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  saveYear = () => {
    this.hideYearModal();
    this.onSave();
  };

  onSave = () => {
    let {plate_number, image, year, max_weight} = this.state;
    this.props.dispatch(
      DRIVER_ACTIONS.saveTruck({
        plate_number: plate_number,
        image: image,
        year: year,
        max_weight: max_weight,
      }),
    );
  };

  render() {
    let {
      plate_number,
      image,
      year,
      max_weight,
      isYearModalVisible,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: 10}}>
          <TextInput
            label={I18n.t('plate_number')}
            value={plate_number}
            onValueChange={this.onValueChange}
            field="plate_number"
          />

          <TextInput
            label={I18n.t('max_weight')}
            value={max_weight}
            onValueChange={this.onValueChange}
            field="max_weight"
          />

          <Title>{I18n.t('truck_image')}</Title>
          <DocumentUpload onPress={this.uploadImage} image={image} />

          <Divider style={{marginVertical: 20}} />
          <Label title={I18n.t('truck_year')} />
          <Title onPress={this.showYearModal}>{year || I18n.t('select')}</Title>
        </View>

        <Button onPress={this.onSave} title={I18n.t('save')} />

        <Modal
          visible={isYearModalVisible}
          onCancel={this.hideYearModal}
          onSave={this.saveYear}
          header={I18n.t('truck_year')}>
          <Dropdown
            items={['1905', '1906', '2001', '2002', '2003', '2004']}
            selectedValue={year}
            onItemPress={this.onValueChange}
            field="year"
          />
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(TruckInfoUpdateScene);
