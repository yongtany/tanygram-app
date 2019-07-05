import React from "react";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from "styled-components";
import { Alert } from 'react-native';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  const emailInput = useInput("");
  const handleLogin = () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(value === "") {
      return Alert.alert("이메일을 입력해주세요.");
    } else if(!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 형식으로 입력해주세요.");
    } else if(!emailRegex.test(value)) {
      return Alert.alert("이메일 형식에 맞게 작성해주세요.")
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onEndEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton onPress={handleLogin} text="Log In" />
      </View>
    </TouchableWithoutFeedback>
  );
};
