import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {Modal, ScrollView, View} from 'react-native';
import DocumentCountriesList from 'driver/routes/components/DocumentCountriesList';
import VisaLicenseForm from 'driver/routes/components/VisaLicenseForm';

type State = {
  countries: Array,
  activeCountry: object,
  type: 'license|visa',
};

class DocumentsUpload extends Component {
  static propTypes = {
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    countries: [],
  };

  state: State = {
    modalVisible: false,
    activeCountry: {},
    type: 'license',
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchRoutes());
  }

  toggleItem = (item: object) => {
    this.props.dispatch(
      DRIVER_ACTIONS.saveRoute({
        route_id: item.id,
      }),
    );
  };

  onItemIconPress = item => {
    this.toggleItem(item);
  };

  onCardListItemPress = item => {
    this.props.navigation.navigate('DocumentsUpload', {
      countryID: item.id,
    });
  };

  onDocumentCountriesListItemPress = (country: object, type: string) => {
    this.setState({
      modalVisible: true,
      activeCountry: country,
      type: type,
    });
  };

  save = payload => {
    //@todo:save
    console.log('saving', payload);
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {modalVisible, activeCountry, type} = this.state;
    const {countries} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <DocumentCountriesList
          items={countries}
          onItemPress={this.onDocumentCountriesListItemPress}
        />

        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <View style={{flex: 1, backgroundColor: '#00000090'}}>
            <VisaLicenseForm
              onClose={this.hideModal}
              onButtonPress={this.save}
              country={activeCountry}
              type={type}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    countries: DRIVER_SELECTORS.getProfileCountries(state),
  };
}

export default connect(mapStateToProps)(DocumentsUpload);
