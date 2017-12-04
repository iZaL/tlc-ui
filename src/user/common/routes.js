import Login from 'user/Login';
import Register from 'user/Register';
import Forgot from 'user/Forgot';
import OTP from 'user/OTP';
import {StackNavigator} from 'react-navigation';

export const AuthRoutes = StackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
    },
    ForgotScreen: {
      screen: Forgot,
    },
    OTPScreen: {
      screen: OTP,
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
