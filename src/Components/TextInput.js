import React from 'react';
import {TextInput, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const CustomTextInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  rightIcon,
  rightIconName,
  isSecureText = false,
  onRightPress,
}) => {
  return (
    <>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={styles.textInputStyle}
        secureTextEntry={isSecureText}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        mode="outlined"
        outlineColor="black"
        activeOutlineColor="black"
        right={
          rightIcon && (
            <TextInput.Icon
              icon={rightIconName}
              style={styles.rightIcon}
              onPress={onRightPress}
            />
          )
        }
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  textInputStyle: {
    height: 40,
    borderRadius: 4,
  },
  rightIcon: {
    height: 20,
    marginTop: 13,
  },
});
