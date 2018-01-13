import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as PROFILE_ACTIONS} from 'shipper/common/actions';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import {ScrollView} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Separator from 'components/Separator';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';

type State = {
  mobile: string,
};

class UpdateProfileScene extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    profile: {
      mobile: '',
    },
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  state: State = {
    mobile: '',
  };

  componentWillReceiveProps(props) {
    let {profile} = props;

    this.setState({
      mobile: profile.mobile,
    });
  }

  onFieldChange = (field, value) => {
    if (value) {
      switch (field) {
        default:
          this.setState({[field]: value});
          break;
      }
    }
  };

  saveProfile = () => {
    const {mobile} = this.state;

    let params = {
      mobile,
    };
    this.props.dispatch(PROFILE_ACTIONS.saveProfile(params));
  };


  render() {
    const {mobile} = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>
        <FormLabel title={I18n.t('mobile')} />

        <FormTextInput
          onChangeText={value => this.onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormSubmit
          onPress={this.saveProfile}
          title={I18n.t('update_profile')}
          style={{marginTop: 50}}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: SHIPPER_SELECTORS.getProfile(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(UpdateProfileScene);
