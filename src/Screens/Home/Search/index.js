import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const Search = ({}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <Text>No Search Events</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
