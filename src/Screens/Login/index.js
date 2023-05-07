import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../Components/TextInput';
import {Divider} from 'react-native-paper';
import {GlobalContext} from '../../Utils/GlobalContext';
import Toast from 'react-native-toast-message';

const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const {authActions} = useContext(GlobalContext);

  const onLogin = async () => {
    setLoading(true);
    const res = await authActions.signIn({email: email, password: password});
    if (res) {
      setLoading(false);
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: 'Successfully Logged In',
        });
      } else {
        Toast.show({
          type: 'info',
          text1: res.message,
        });
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 0}} />
      <View
        style={[styles.upperContainer, {flex: keyboardVisible ? 0.3 : 0.4}]}>
        <Text style={styles.titleText}>Pliē</Text>
        <View style={styles.iconContiner}>
          <Icon name="image" size={50} color={'#1A1A1A'} />
        </View>
      </View>
      <View
        style={[styles.lowerContainer, {flex: keyboardVisible ? 0.7 : 0.6}]}>
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}>
          <KeyboardAvoidingView>
            <CustomTextInput
              label="Email"
              placeholder="email@email.com"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <View style={{marginTop: 15}} />
            <CustomTextInput
              isSecureText={isSecureText}
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={value => {
                setPassword(value);
              }}
              rightIconName={isSecureText ? 'eye-off' : 'eye'}
              rightIcon={true}
              onRightPress={() => {
                setIsSecureText(!isSecureText);
              }}
            />
            <View style={{marginTop: 4}} />
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.buttonStyle} onPress={() => {}}>
                Forgot Password?
              </Text>
              <View
                style={[
                  styles.buttonConttiner,
                  {
                    backgroundColor:
                      email.trim().length === 0 || password.length === 0
                        ? 'gray'
                        : '#21D393',
                  },
                ]}>
                <Button
                  title="Sign In"
                  color={Platform.OS === 'ios' ? 'white' : '#21D393'}
                  disabled={email.trim().length === 0 || password.length === 0}
                  onPress={() => onLogin()}
                />
              </View>
              <View style={{marginTop: 15}}>
                <Text>
                  Not a member?
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => {}}>
                    {' '}
                    Sign Up Here
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 77,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Divider style={{width: 100, color: '#4F4F4F'}} bold />
              <Text> or Sign In with: </Text>
              <Divider style={{width: 100, color: '#4F4F4F'}} bold />
            </View>
            <View
              style={{
                marginTop: 45,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Icon name={'logo-google'} size={50} />
              <Icon name={'logo-apple'} size={50} />
              <Icon name={'logo-facebook'} size={50} />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginTop: 60}}>
              <Text>Enter as Guest</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  upperContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 70,
    textAlign: 'center',
  },
  iconContiner: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  lowerContainer: {
    flex: 0.6,
    backgroundColor: 'white',
    paddingHorizontal: 46,
    paddingTop: 38,
  },
  scrollViewContainer: {
    flex: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    height: 100,
  },
  buttonStyle: {
    color: '#828282',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  buttonConttiner: {
    width: 98,
    borderRadius: 4,
    marginTop: 27,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
});
