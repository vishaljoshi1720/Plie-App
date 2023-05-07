import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Auth Screens
import LoginScreen from '../../Screens/Login';

const Stack = createNativeStackNavigator();

export default ({state}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
);
