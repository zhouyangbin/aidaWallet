import React, { Component, useState, useCallback } from "react";
import { Alert, View, ViewPropTypes, Platform, StyleSheet } from "react-native";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { useFocusEffect } from "@react-navigation/native";
import fingerprintIcon from "@/../../assets/image/UiImg/fingerprint.webp";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";

const FingerPrintPopup = props => {
  let { fingerPrint, setFingerPrint, success } = props;

  const [LegacyInfo, setLegacyInfo] = useState({
    errorMessageLegacy: undefined,
    biometricLegacy: undefined,
  });
  useFocusEffect(
    useCallback(() => {
      //判断设备是否支持指纹识别
      detectFingerprintAvailable();
      //判断Android API是不是<23，高于此版本使用标准指纹解锁api;低于此版本使用兼容适配版本
      if (requiresLegacyAuthentication()) {
        authLegacy();
      } else {
        authCurrent();
      }
      return () => {
        //组件卸载，停止指纹监听指纹扫描器并释放内部缓存
        FingerprintScanner.release();
      };
    }, [])
  );

  //判断安卓版本
  function requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }

  //控制指纹组件消失
  const handleFingerprintDismissed = () => {
    setFingerPrint({
      ...fingerPrint,
      popupShowed: false,
    });
  };
  //检测手机是否支持指纹识别
  const detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable().catch(error => {
      // Alert.alert("您的设备不支持指纹识别，请选择其他方式登录");
      setFingerPrint({
        ...fingerPrint,
        errorMessage: error.message,
        biometric: error.biometric,
        popupShowed: false,
      });
    });
  };
  //android API>23时，调用authCurrent
  const authCurrent = () => {
    FingerprintScanner.authenticate({
      title: "",
      cancelButton: "Cancel",
    })
      .then(() => {
        //离开页面时将popupShowed置为false
        handleFingerprintDismissed();
        //指纹验证成功后的事件，比如登录
        successVerify();
      })
      .catch(error => {
        console.log("---------指纹对比结果报错-----------");
        console.log(error);
        //点击取消或上方空白区隐藏组件后，将popupShowed置为false
        //这里是控制指纹组件切换显示/隐藏的关键！
        handleFingerprintDismissed();
      });
  };

  //指纹验证成功后的事件，比如登录
  const successVerify = payload => {
    console.log("指纹对比成功");
    success();
  };
  //android API<23时调用指纹组件的兼容写法
  const authLegacy = () => {
    FingerprintScanner.authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
      .then(() => {
        //指纹验证成功
        handleFingerprintDismissed();
        Alert.alert("指纹身份验证", "身份验证成功");
        successVerify();
      })
      .catch(error => {
        console.log("---------指纹对比结果报错-----------");
        console.log(error);
        //指纹验证失败
        setLegacyInfo({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
        handleFingerprintDismissed();
      });
  };

  //当用户尝试扫描指纹但失败时的回调函数
  const handleAuthenticationAttemptedLegacy = error => {
    setLegacyInfo({
      ...LegacyInfo,
      errorMessageLegacy: error.message,
    });
  };

  //手动写一个指纹验证的组件
  const renderLegacy = (
    <View style={styles.container}>
      <VStack bg="white" h={pxToDp(721)} borderRadius={pxToDp(29)} w={pxToDp(922)} alignItems="center">
        <Pressable alignItems="flex-end" w="100%" onPress={handleFingerprintDismissed}>
          <Image mt={pxToDp(55)} mr={pxToDp(53)} source={Icons.closeIcon} w={pxToDp(39)} h={pxToDp(39)}></Image>
        </Pressable>

        <Text fontSize={pxToDp(53)} fontWeight="800" w={pxToDp(721)}>
          Please perform fingerprint verification in order to use the wallet.
        </Text>
        <Image mt={pxToDp(63)} w={pxToDp(243)} h={pxToDp(243)} source={fingerprintIcon} />
      </VStack>
    </View>
  );

  return requiresLegacyAuthentication() ? renderLegacy : null;
};

export default React.memo(FingerPrintPopup);
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
