import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//All Screens
import Search from '../../Screens/Home/Search';
import Favourites from '../../Screens/Home/Favourites';
import Events from '../../Screens/Home/Events';
import Profile from '../../Screens/Home/Profile';

const Tab = createMaterialBottomTabNavigator();

export default ({state}) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={'Events'}
    tabBar={({navigation, state, insets}) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({route, preventDefault}) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
      />
    )}>
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: () => {
          return <Icon name="search" size={18} color={'#1A1A1A'} />;
        },
      }}
    />
    <Tab.Screen
      name="Events"
      component={Events}
      options={{
        tabBarLabel: 'Events',
        tabBarIcon: () => {
          return <Icon name="calendar" size={18} color={'#1A1A1A'} />;
        },
      }}
    />
    <Tab.Screen
      name="Favourites"
      component={Favourites}
      options={{
        tabBarLabel: 'Favourites',
        tabBarIcon: () => {
          return <Icon name="heart" size={18} color={'#1A1A1A'} />;
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: () => {
          return <Icon name="user" size={18} color={'#1A1A1A'} />;
        },
      }}
    />
  </Tab.Navigator>
);
