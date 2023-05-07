import React from 'react';
import AppNavigation from './src/Navigation';
import {GlobalContextProvider} from './src/Utils/GlobalContext';
import Toast from 'react-native-toast-message';

const App = ({}) => {
  return (
    <GlobalContextProvider>
      <AppNavigation />
      <Toast position="bottom" />
    </GlobalContextProvider>
  );
};

export default App;
