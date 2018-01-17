import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import {ScrollView} from 'react-native';
import EmployeesList from "shipper/employees/components/EmployeesList";
import Button from "../../components/Button";
import I18n from 'utils/locale';

class ContactsListScene extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    employees: [],
  };

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchEmployees());
  }

  onEmployeeListItemPress = (employee: object) => {
  };

  onAddEmployeePress = () => {
    this.props.navigation.navigate('AddEmployee');
  };

  render() {
    const {employees} = this.props;

    return (
      <ScrollView style={{flex: 1}}>

        <EmployeesList
          items={employees}
          onItemPress={this.onEmployeeListItemPress}
        />

        <Button title={I18n.t('add_employee')} onPress={this.onAddEmployeePress} style={{ marginTop:30}} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: SHIPPER_SELECTORS.getEmployees(state),
  };
}

export default connect(mapStateToProps)(ContactsListScene);
