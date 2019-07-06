import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from "styled-components";
import { Alert } from 'react-native';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({navigation}) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(value === "") {
      return Alert.alert("이메일을 입력해주세요.");
    } else if(!value.includes("@") || !value.includes(".")) {
      return Alert.alert("이메일 형식으로 입력해주세요.");
    } else if(!emailRegex.test(value)) {
      return Alert.alert("이메일 형식에 맞게 작성해주세요.")
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if(requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("Confirm", { email: value });
      } else {
        Alert.alert("Account not found");
        navigation.navigate("Signup", { email: value });
      }
    } catch(e) {
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
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
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
      </View>
    </TouchableWithoutFeedback>
  );
};
