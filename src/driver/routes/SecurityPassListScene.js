import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {FAB} from 'react-native-paper';
import I18n from 'utils/locale';
import DocumentList from 'components/DocumentList';
import colors from 'assets/theme/colors';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';

class SecurityPassListScene extends Component {
  static propTypes = {
    gate_passes: PropTypes.array,
  };

  static defaultProps = {
    gate_passes: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchSecurityPasses());
    // this.props.dispatch(APP_ACTIONS.fetchSecurityPasses());
  }

  onAddPress = () => {
    let sceneConfig = {
      title: I18n.t('security_passes_add'),
      type: I18n.t('add'),
    };

    this.props.navigation.navigate('SecurityPassAdd', sceneConfig);
  };

  onEditPress = (pass: object) => {
    let {number, expiry_date, image} = pass;

    let payload = {
      number: number,
      expiry_date: new Date(expiry_date),
      countryID: pass.country.id,
      image: image,
      security_pass_id: pass.security_pass,
    };

    let sceneConfig = {
      title: I18n.t('security_passes_edit'),
      type: I18n.t('edit'),
      ...payload,
    };

    this.props.navigation.navigate('SecurityPassAdd', sceneConfig);
  };

  render() {
    let {driver_security_passes} = this.props;

    return (
      <View style={{flex: 1}}>
        <DocumentList
          items={driver_security_passes}
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
    driver_security_passes: DRIVER_SELECTORS.getSecurityPasses(state),
    // security_passes: APP_SELECTORS.getSecurityPasses(state),
  };
}

export default connect(mapStateToProps)(SecurityPassListScene);
