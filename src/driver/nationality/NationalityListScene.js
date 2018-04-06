import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import DocumentList from 'components/DocumentList';
import {FAB} from 'react-native-paper';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

class NationalityListScene extends Component {
  static propTypes = {
    residencies: PropTypes.array,
  };

  static defaultProps = {
    residencies: [],
  };

  // componentDidMount() {
  //   let {status} = this.props.navigation.state.params;
  //   this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  // }

  static navigationOptions = ({navigation}) => {
    return {
      title: (navigation.state.params && navigation.state.params.title) || '',
    };
  };

  onAddPress = () => {
    let {route, title} = this.props.navigation.state.params;

    let sceneConfig = {
      route,
      title,
      type: I18n.t('add'),
    };

    this.props.navigation.navigate('NationalityAdd', sceneConfig);
  };

  onEditPress = (nationality: object) => {
    let {number, expiry_date, image} = nationality;

    let payload = {
      number: number,
      expiry_date: new Date(expiry_date),
      countryID: nationality.country.id,
      image: image,
    };

    let {route, title} = this.props.navigation.state.params;

    let sceneConfig = {
      route,
      title,
      type: I18n.t('edit'),
      ...payload,
    };

    this.props.navigation.navigate('NationalityAdd', sceneConfig);
  };

  onDeletePress = () => {};

  render() {
    let {collection} = this.props;
    return (
      <View style={{flex: 1}}>
        <DocumentList
          items={collection}
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

function mapStateToProps(state, props) {
  let collection = [];

  let {route} = props.navigation.state.params;

  switch (route) {
    case 'nationality':
      collection = DRIVER_SELECTORS.getNationalities(state);
      break;
    case 'visas':
      collection = DRIVER_SELECTORS.getVisas(state);
      break;
    case 'residencies':
      collection = DRIVER_SELECTORS.getResidencies(state);
      break;
    case 'licenses':
      collection = DRIVER_SELECTORS.getLicenses(state);
      break;
  }

  return {
    collection: collection,
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(NationalityListScene);
