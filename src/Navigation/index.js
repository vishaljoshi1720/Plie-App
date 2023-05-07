import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './Stacks/RootStack';
import {GlobalContext} from '../Utils/GlobalContext';

export const navigationRef = React.createRef();

const AppNavigation = () => {
  const {authActions, state} = useContext(GlobalContext);

  useEffect(() => {
    authActions.getToken();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack token={state.token} />
    </NavigationContainer>
  );
};

export default AppNavigation;
