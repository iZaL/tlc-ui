import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UpdateProfileScene from 'driver/profile/scenes/UpdateProfileScene';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {ACTIONS as PROFILE_ACTIONS} from 'driver/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

type State = {
  mobile: string,
  nationality: string,
  residence_country_id: string,
};

class Profile extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
  };

  state: State = {
    mobile: '',
    nationality: {},
    residence: {},
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(PROFILE_ACTIONS.fetchProfile());
  }

  componentWillReceiveProps(props) {
    console.log('props', props);
    let {profile} = props.user;
    this.setState({
      mobile: profile.mobile || props.user.mobile,
      nationality: (profile && profile.nationality) || {},
      residence: (profile && profile.residence) || {},
    });
  }

  onFieldChange = (field, value) => {
    if (value) {
      let country = this.props.countries.find(country => country.id === value);
      this.setState({[field]: country});
    }
  };

  saveProfile = () => {
    const {mobile, nationality, residence} = this.state;

    this.setState({
      mobile,
      nationality,
      residence,
    });

    let params = {
      mobile,
      nationality_country_id: nationality.id,
      residence_country_id: residence.id,
    };
    this.props.dispatch(PROFILE_ACTIONS.saveProfile(params));
  };

  render() {
    let {user, countries} = this.props;
    let {profile} = user;
    return (
      <UpdateProfileScene
        {...this.state}
        onFieldChange={this.onFieldChange}
        onButtonPress={this.saveProfile}
        busy={false}
        countries={countries}
        profile={profile}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
    countries: COUNTRY_SELECTORS.getCountries(state),
  };
}

export default connect(mapStateToProps)(Profile);
