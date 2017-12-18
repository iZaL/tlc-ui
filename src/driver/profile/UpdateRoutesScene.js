import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as COUNTRY_SELECTORS} from 'app/selectors/country';
import {ACTIONS as TRUCK_ACTIONS} from 'trucks/common/actions';
import {SELECTORS as TRUCK_SELECTORS} from 'trucks/common/selectors';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {ScrollView, Text} from 'react-native';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import Dropdown from 'components/Dropdown';
import Separator from 'components/Separator';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import DatePicker from "components/DatePicker";

class UpdateRoutesScene extends Component {

  static propTypes = {
  };

  componentDidMount() {
    // this.props.dispatch(TRUCK_ACTIONS.fetchTrailers());
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 20,
        }}>


      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(UpdateRoutesScene);
