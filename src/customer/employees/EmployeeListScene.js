import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ScrollView} from 'react-native';
import EmployeeList from 'customer/employees/components/EmployeeList';
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
    this.props.dispatch(CUSTOMER_ACTIONS.fetchEmployees());
  }

  // onEmployeeListItemPress = (employee: object) => {};

  onEmployeeListItemPress = (employee: object) => {
    let sceneConfig = {
      ...employee,
    };

    this.props.navigation.navigate('EmployeeAdd', sceneConfig);
  };

  onAddEmployeePress = () => {
    this.props.navigation.navigate('EmployeeAdd');
  };

  render() {
    const {employees} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <EmployeeList
          items={employees}
          onItemPress={this.onEmployeeListItemPress}
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
    employees: CUSTOMER_SELECTORS.getEmployees(state),
  };
}

export default connect(mapStateToProps)(EmployeeListScene);
