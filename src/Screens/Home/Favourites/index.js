import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Favourites = ({}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Text>No Favourites Events</Text>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
