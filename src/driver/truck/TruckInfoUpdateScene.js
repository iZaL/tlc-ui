import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextInput,
} from 'react-native-paper';
import DocumentUpload from '../../components/DocumentUpload';
import {ScrollView, View} from 'react-native';
import {SELECTORS as APP_SELECTORS} from 'app/selectors/app';
import FormTextInput from '../../components/FormTextInput';
import I18n from 'utils/locale';

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

  render() {
    let {plate_number, image, year, max_weight} = this.state;
    console.log('state', this.state);

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

        <DocumentUpload
          onPress={image => this.onValueChange('image', image)}
          image={image}
        />

        <Button
          primary
          raised
          onPress={this.onSave}
          style={{padding: 10, marginVertical: 10}}>
          {I18n.t('save')}
        </Button>
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
