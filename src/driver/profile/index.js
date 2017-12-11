import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UpdateProfileScene from "driver/profile/scenes/UpdateProfileScene";
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';

type State = {
  mobile:string,
  nationality:string,
  residence_country_id:string
};

class Profile extends Component {

  state :State  = {
    mobile:'',
    nationality:'',
    residence_country_id:''
  };

  static propTypes = {
    countries:PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.dispatch(APP_ACTIONS.fetchCountries());
  }

  onFieldChange = (field, value) => {
    console.log('field',field);
    console.log('value',value);
    this.setState({[field]: value});
  };

  saveProfile = () => {

  };

  render() {
    let {user,countries} = this.props;
    console.log('countries',countries);

    console.log('state',this.state);

    return (
      <UpdateProfileScene
        {...this.state}
        user={user}
        onFieldChange={this.onFieldChange}
        onButtonPress={this.saveProfile}
        busy={false}
        countries={countries}
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
