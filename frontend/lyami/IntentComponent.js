import React, { useState, useCallback } from "react";
import { NativeModules, BackHandler, DeviceEventEmitter, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { debounce } from "lodash";
import { View } from "native-base";
import global from "./api/util/global";
import ConnectAuthModal from "./IntentModal/ConnectAuthModal";
import ThirdPayPage from "./IntentModal/ThirdPayPage";
import ApproveModal from "./IntentModal/ApproveModal";
import ContractCallModal from "./IntentModal/ContractCall";
import WithdrawPage from "./IntentModal/WithdrawPage";
import ComePage from "./IntentModal/ComePage";
import IntentMetaPage from "./IntentModal/IntentMetaPage";
import WalletMainNew from "./WalletMainNew";
import GameLogin from "./IntentModal/GameLogin";

async function InitIntentData(
  setInit,
  setLoginAuth,
  setIsPay,
  setApprove,
  setContractCall,
  setExchange,
  setCome,
  setMeta,
  setIsGameLogin
) {
  //获取跳转参数
  const intentData = await NativeModules.NativeIntent.GetIntent();
  if (intentData != null && intentData != "") {
    global.intentMsg = intentData;

    try {
      global.intentData = JSON.parse(global.intentMsg);
      if (global.intentData.action == "loginAuth") {
        setLoginAuth(true);
      }
      if (global.intentData.action == "pay") {
        setIsPay(true);
      }
      if (global.intentData.action == "approve") {
        setApprove(true);
      }
      if (global.intentData.action == "contractcall") {
        setContractCall(true);
      }
      if (global.intentData.action == "exchange") {
        setExchange(true);
      }
      if (global.intentData.action == "come") {
        setCome(true);
      }
      if (global.intentData.action == "meta") {
        setMeta(true);
      }
      if (global.intentData.action == "gameLogin") {
        setIsGameLogin(true);
      }
    } catch (e) {
      global.intentData = null;
      console.log("Invalid intent msg");
    }
    // 清空Intent数据
    await NativeModules.NativeIntent.ResetIntent("");
  }
  setInit(true);
}

function IntentComponent(props) {
  const navigation = useNavigation();
  const [isInit, setInit] = useState(false);
  const [isLoginAuth, setLoginAuth] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isApprove, setApprove] = useState(false);
  const [isContractCall, setContractCall] = useState(false);
  const [isExchange, setExchange] = useState(false);
  const [isCome, setCome] = useState(false);
  const [isMeta, setMeta] = useState(false);
  const [isGameLogin, setIsGameLogin] = useState(false);
  const [isFromLogin, setIsFromLogin] = useState(false);
  const [loginAccount, setLoginAccount] = useState(null);
  useFocusEffect(
    useCallback(() => {
      navigation.addListener("beforeRemove", e => {
        if (props.route.name.indexOf("Intent")) {
          return true;
        } else {
          e.preventDefault();
        }
      });
      return () => {
        navigation.removeListener("beforeRemove");
        DeviceEventEmitter.removeListener("beforeRemove");
      };
    }, [navigation])
  );
  let currentCount = 0;
  // useFocusEffect(
  //   useCallback(() => {
  //     BackHandler.addEventListener("hardwareBackPress", () => {
  //       onBackPress2s();
  //     });
  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress");
  //     };
  //   }, [])
  // );
  const onBackPress2s = debounce(() => {
    // console.log(999,props.route.name=="Intent");
    console.log(props);
    if (currentCount < 1) {
      currentCount += 1;
      console.log("再次点击退出App");
    } else {
      console.log(222, currentCount);
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 1500);
  }, 500);
  const handleGoCome = () => {
    setIsFromLogin(true);
    setIsGameLogin(false);
    setCome(true);
  };
  const handleGoLogin = () => {
    setCome(false);
    setIsGameLogin(true);
  };
  InitIntentData(
    setInit,
    setLoginAuth,
    setIsPay,
    setApprove,
    setContractCall,
    setExchange,
    setCome,
    setMeta,
    setIsGameLogin
  );
  return (
    <View>
      {/* <StatusBar backgroundColor='transparent' translucent={true} /> */}
      {isInit ? (
        <View>
          {isLoginAuth ? <ConnectAuthModal></ConnectAuthModal> : null}
          {isPay ? <ThirdPayPage></ThirdPayPage> : null}
          {isApprove ? <ApproveModal></ApproveModal> : null}
          {isContractCall ? <ContractCallModal></ContractCallModal> : null}
          {isExchange ? <WithdrawPage></WithdrawPage> : null}
          {isCome ? (
            <ComePage loginAccount={loginAccount} goLogin={handleGoLogin} isFromLogin={isFromLogin}></ComePage>
          ) : null}
          {isMeta ? <IntentMetaPage></IntentMetaPage> : null}
          {isGameLogin ? <GameLogin setLoginAccount={setLoginAccount} goCome={handleGoCome}></GameLogin> : null}
          {!(isLoginAuth || isPay || isApprove || isContractCall || isExchange || isCome || isMeta || isGameLogin) ? (
            <WalletMainNew></WalletMainNew>
          ) : null}
        </View>
      ) : (
        <ActivityIndicator style={{ width: "100%", height: "100%" }} size="large" color="#0000ff" />
      )}
    </View>
  );
}

export default IntentComponent;
