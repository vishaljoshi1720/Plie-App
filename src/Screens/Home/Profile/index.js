import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GlobalContext} from '../../../Utils/GlobalContext';
import Toast from 'react-native-toast-message';

const Profile = ({}) => {
  const {authActions} = useContext(GlobalContext);
  const logoutUser = async () => {
    await authActions.signOut();
    Toast.show({
      type: 'success',
      text1: 'Successfully Logged Out!',
    });
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <View style={styles.container}>
        <Button mode="contained-tonal" onPress={() => logoutUser()}>
          Logout
        </Button>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
