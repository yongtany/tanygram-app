import React, { useState, useEffect } from "react";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [camreaType, setCameraType] = useState(Camera.Constants.Type.front);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  const toggleType = () => {
    if(camreaType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    }
  }
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          type={camreaType}
          style={{
            justifyContent: "flex-end",
            padding: 15,
            width: constants.width,
            height: constants.height / 2,
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-reverse-camera": "md-reverse-camera"}
              size={28}
              color={styles.blackColor}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
