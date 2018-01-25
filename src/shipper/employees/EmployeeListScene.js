import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as SHIPPER_ACTIONS} from 'shipper/common/actions';
import {SELECTORS as SHIPPER_SELECTORS} from 'shipper/common/selectors';
import {ScrollView} from 'react-native';
import EmployeeList from 'shipper/employees/components/EmployeeList';
import Button from 'components/Button';
import I18n from 'utils/locale';

class EmployeeListScene extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    employees: [],
  };

  componentDidMount() {
    this.props.dispatch(SHIPPER_ACTIONS.fetchEmployees());
  }

  onEmployeeListItemPress = (employee: object) => {};

  onEmployeeListItemEditPress = (employee: object) => {
    this.props.navigation.navigate('EditEmployee', {
      employee: employee,
    });
  };

  onAddEmployeePress = () => {
    this.props.navigation.navigate('AddEmployee');
  };

  render() {
    const {employees} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <EmployeeList
          items={employees}
          onItemPress={this.onEmployeeListItemPress}
          onItemEditPress={this.onEmployeeListItemEditPress}
        />

        <Button
          title={I18n.t('employee_add')}
          onPress={this.onAddEmployeePress}
          style={{marginTop: 30}}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: SHIPPER_SELECTORS.getEmployees(state),
  };
}

export default connect(mapStateToProps)(EmployeeListScene);
