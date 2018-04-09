import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {FAB} from "react-native-paper";
import I18n from 'utils/locale';
import DocumentList from "../../components/DocumentList";
import colors from "../../assets/theme/colors";

class SecurityPassListScene extends Component {
  static propTypes = {
    truck: PropTypes.shape({
      model: PropTypes.object.isRequired,
    }),
  };

  static defaultProps = {
    trailer: {
      make: {},
      type: {}
    },
  };

  onAddPress = () => {
    let sceneConfig = {
      title:I18n.t('gate_passes_add'),
      type: I18n.t('add'),
    };

    this.props.navigation.navigate('SecurityPassAdd', sceneConfig);
  };

  onEditPress = (nationality: object) => {
    let {number, expiry_date, image} = nationality;

    let payload = {
      number: number,
      expiry_date: new Date(expiry_date),
      countryID: nationality.country.id,
      image: image,
    };

    let sceneConfig = {
      title:I18n.t('security_passes_edit'),
      type: I18n.t('edit'),
      ...payload,
    };

    this.props.navigation.navigate('SecurityPassAdd', sceneConfig);
  };

  render() {
    let {gate_passes} = this.props;

    return (
      <View style={{flex: 1}}>
        <DocumentList
          items={gate_passes}
          onEditPress={this.onEditPress}
          onDeletePress={this.onDeletePress}
        />
        <FAB
          icon="add"
          dark
          onPress={this.onAddPress}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    gate_passes:[]
  };
}

export default connect(mapStateToProps)(SecurityPassListScene);
