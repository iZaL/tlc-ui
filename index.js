import {AppRegistry} from 'react-native';
import React from 'react';
import Store from 'utils/store';
import App from 'app/App';
import {Provider} from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import colors from "./src/assets/theme/colors";

console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
  },
};
const Root = () => {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <App/>
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('tlc', () => Root);
