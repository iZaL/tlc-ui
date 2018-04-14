import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title} from 'react-native-paper';
import DocumentUpload from 'components/DocumentUpload';
import {View} from 'react-native';
import FormTextInput from '/components/FormTextInput';
import I18n from 'utils/locale';
import Dropdown from 'components/Dropdown';
import FormLabel from 'components/FormLabel';
import ListModal from 'components/ListModal';
import Divider from 'components/Divider';
import AppButton from 'components/AppButton';

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

  onSave = () => {
    console.log('save');
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
    let {
      plate_number,
      image,
      year,
      max_weight,
      isYearModalVisible,
    } = this.state;

    return (
      <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
        <FormTextInput
          label={I18n.t('plate_number')}
          value={plate_number}
          onValueChange={this.onValueChange}
          field="plate_number"
        />

        <FormTextInput
          label={I18n.t('max_weight')}
          value={max_weight}
          onValueChange={this.onValueChange}
          field="plate_number"
        />

        <Title>{I18n.t('truck_image')}</Title>
        <DocumentUpload
          onPress={image => this.onValueChange('image', image)}
          image={image}
        />

        <Divider style={{marginVertical: 20}} />
        <FormLabel title={I18n.t('truck_year')} />
        <Title onPress={this.showYearModal}>{year || I18n.t('select')}</Title>

        <AppButton onPress={this.onSave} />

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
