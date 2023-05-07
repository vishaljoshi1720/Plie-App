import React from 'react';

//All Stcack
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default RootStack = state => {
  if (state.token === null) return <AuthStack />;
  else return <MainStack />;
};
