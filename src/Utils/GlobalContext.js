import React, {createContext, useReducer, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GlobalContext = createContext();

export const GlobalContextProvider = props => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
            user: null,
          };
      }
    },
    {
      token: null,
      user: null,
    },
  );

  const authActions = useMemo(
    () => ({
      signIn: async params => {
        const formData = new FormData();
        formData.append('email', params.email.toLowerCase());
        formData.append('password', params.password);
        try {
          const response = await fetch(
            'http://3.7.81.243/projects/plie-api/public/api/login',
            {
              method: 'POST',
              body: formData,
              'Content-Type': 'multipart/form-data',
            },
          );
          const json = await response.json();
          console.log('res', JSON.stringify(json, null, 4));
          if (json.success) {
            dispatch({
              type: 'SIGN_IN',
              user: json.data.user,
              token: json.data.token,
            });
            await AsyncStorage.setItem('user', JSON.stringify(json.data.user));
            await AsyncStorage.setItem('authToken', json.data.token);
          }
          return json;
        } catch (err) {
          console.log('err in login-->', err);
        }
      },

      signOut: async () => {
        await AsyncStorage.multiRemove(['authToken', 'user']);
        dispatch({type: 'SIGN_OUT'});
      },

      getToken: async () => {
        const token = await AsyncStorage.getItem('authToken');
        const user = await AsyncStorage.getItem('user');
        dispatch({type: 'SIGN_IN', user: JSON.parse(user), token: token});
      },
    }),
    [],
  );

  return (
    <GlobalContext.Provider value={{authActions, state, dispatch}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

// consumer as a higher order component
export const withGlobalContext = ChildComponent => props =>
  (
    <GlobalContext.Consumer>
      {context => <ChildComponent {...props} global={context} />}
    </GlobalContext.Consumer>
  );
