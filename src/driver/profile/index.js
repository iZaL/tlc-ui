import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UpdateProfileScene from "driver/profile/scenes/UpdateProfileScene";
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {ACTIONS as PROFILE_ACTIONS} from "driver/common/actions";
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

type State = {
  mobile:string,
  nationality:string,
  residence_country_id:string
};

class Profile extends Component {

  static propTypes = {
    countries:PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state  = {
      mobile:props.user.profile.mobile || props.user.mobile,
      nationality:props.user.profile.nationality.id,
      residence_country_id:props.user.profile.residence_country_id.id
    };
  }

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
    this.props.dispatch(PROFILE_ACTIONS.fetchProfile());

  }

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  saveProfile = () => {
    this.props.dispatch(PROFILE_ACTIONS.saveProfile(this.state));
  };

  render() {
    let {user,countries} = this.props;
    console.log('user',user);
    let {nationality,residence_country_id,mobile} = this.state;
    let {profile} = user;

    return (
      <UpdateProfileScene
        // nationality={nationality || profile.nationality}
        // residence_country_id={residence_country_id || profile.residence_country_id}
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
    countries:COUNTRY_SELECTORS.getCountries(state)
  };
}

export default connect(mapStateToProps)(Profile);
