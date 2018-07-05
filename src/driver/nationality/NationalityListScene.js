import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';
import DocumentList from 'components/DocumentList';
import FAB from 'components/FAB';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

class NationalityListScene extends Component {
  static propTypes = {
    collection: PropTypes.array,
  };

  static defaultProps = {
    collection: [],
  };

  // componentDidMount() {
  //   let {status} = this.props.navigation.state.params;
  //   this.props.dispatch(DRIVER_ACTIONS.fetchLoadsByStatus({status: status}));
  // }

  // static navigationOptions = ({navigation}) => {
  //   return {
  //     title: (navigation.state.params && navigation.state.params.title) || '',
  //   };
  // };

  onAddPress = () => {
    let documentType = this.props.navigation.getParam('route');

    let type = '';

    switch (documentType) {
      case 'nationalities':
        type = 'nationality';
        break;
      case 'visas':
        type = 'visa';
        break;
      case 'residencies':
        type = 'residence';
        break;
      case 'licenses':
        type = 'license';
        break;
    }

    let sceneConfig = {
      route: this.props.navigation.getParam('route'),
      title:this.props.navigation.getParam('title'),
      action: I18n.t('add'),
      type:type
    };
    this.props.navigation.navigate('NationalityAdd', sceneConfig);
  };

  onEditPress = (document: object) => {
    let {number, expiry_date, image} = document;

    let payload = {
      id:document.id,
      number: number,
      expiry_date: new Date(expiry_date),
      country_id: document.country.id,
      image: image,
      type:document.type
    };

    let sceneConfig = {
      route:this.props.navigation.getParam('route'),
      title:this.props.navigation.getParam('title'),
      action: I18n.t('edit'),
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

const makeMapStateToProps = () => {
  let getDocuments = DRIVER_SELECTORS.getDocumentsByType();
  const mapStateToProps = (state, props) => {
    return {
      collection: getDocuments(state, props.navigation.getParam('route')),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(NationalityListScene);
