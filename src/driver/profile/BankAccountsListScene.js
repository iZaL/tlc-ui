import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import FAB from 'components/FAB';
import colors from 'assets/theme/colors';
import {SELECTORS as DRIVER_SELECTORS} from 'guest/common/selectors';
import BankAccountList from 'components/BankAccountList';

class BankAccountsListScene extends Component {
  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchBankAccounts());
  }

  onBankAccountListPress = item => {};

  onAddPress = () => {
    this.props.navigation.navigate('BankAccountsUpdate');
  };

  render() {
    let {user} = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <BankAccountList
          items={user.bank_accounts || []}
          onItemPress={this.onBankAccountListPress}
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
    user: DRIVER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(BankAccountsListScene);
