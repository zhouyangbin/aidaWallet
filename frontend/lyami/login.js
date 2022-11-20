import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Image, HStack, Input, Switch, Link, VStack, Pressable, View } from "native-base";
import Button from "./component/Button";
import { Alert, ImageBackground } from "react-native";
import global from "./api/util/global";
import { GetLocalPassword, LoadGlobalData, SetLocalPassword } from "./api/localStorge/LocalStroge";
import config from "./api/util/const";
import logoImg from "../../assets/image/UiImg/logo.webp";
import { pxToDp } from "../utils/stylesKits";
import LinearGradient from "react-native-linear-gradient";
import createCon1 from "@/../../assets/image/UiImg/createCon1.webp";
import Icons from "./asset/Icon";
import { useGlobalStore } from "./api/Store/globalHook";
import { I18n } from "../language/I18n";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { handleGetNFTJson } from "./api/service/index";
import appConfig from "../../app.json";
import { handleCompareVersion } from "./api/util/helper";
function onLoginClick(navigation, password, isSavePassword, handleSetGlobalData, handleLoadCurrentAddressAssets) {
  LoadGlobalData(password)
    .then(g => {
      if (global.defaultKey == null || global.keys == null || global.keys.length == null || global.keys.length <= 0) {
        Alert.alert("提示", "你输入的密码无效");
        return;
      }

      SetLocalPassword(isSavePassword ? password : null);

      // 更新用户账号
      global.CreateNewPassword = password;
      // 更新Web3
      if (global.nativeCoinNetwork.length <= 0) {
        handleSetGlobalData({
          nativeCoinNetwork: config.nativeCoinNetwork,
          defaultNetwork: config.nativeCoinNetwork[0],
        });
      } else {
        // // return
        const configArray = [...config.nativeCoinNetwork];
        global.nativeCoinNetwork.map(item => {
          configArray.map((itemIn, indexIn) => {
            if (item.ChainId == itemIn.ChainId) {
              item.initAIDAMetaList = itemIn.initAIDAMetaList;
              if (global.defaultNetwork.ChainId == itemIn.ChainId) {
                global.defaultNetwork.initAIDAMetaList = itemIn.initAIDAMetaList;
              }
            }
            configArray.splice(indexIn, 1);
          });
        });
  
        handleSetGlobalData({
          nativeCoinNetwork: global.nativeCoinNetwork,
          defaultNetwork: global.defaultNetwork,
        });
      }
      // handleLoadCurrentAddressAssets();

      navigation.navigate("Intent", {});
    })
    .catch(err => {
      console.log(err);
      Alert.alert(I18n.t("login.title"), I18n.t("login.tipsContent"));
    });
}

function getString(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) == 12288)
      //全角空格
      result += String.fromCharCode(32);
    //半角空格
    else if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375)
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    //其他全角字符
    else result += String.fromCharCode(str.charCodeAt(i));
  }
  return result;
}
function init(setInit, setSaveSwitch, setPassword, navigation, handleSetGlobalData) {
  GetLocalPassword().then(localPassword => {
    setSaveSwitch(localPassword != null && localPassword != "");
    setPassword(localPassword);
    // navigation.navigate("Intent", {});
    if (localPassword != null && localPassword != "") {
      onLoginClick(navigation, localPassword, true, handleSetGlobalData, handleLoadCurrentAddressAssets);
    }
  });
  setInit(true);
}

function Login(props) {
  const navigation = useNavigation();
  const [isToggleSwitch, onToggleSwitch] = useState(false);
  const [password, setPassword] = useState("");
  const [isInit, setInit] = useState(false);
  const [showWeb, setShowWeb] = useState(false);
  const [minversion, setMinversion] = useState(null);
  const { handleSetGlobalData, handleLoadCurrentAddressAssets } = useGlobalStore();
  if (!isInit) {
    init(setInit, onToggleSwitch, setPassword, navigation, handleSetGlobalData, handleLoadCurrentAddressAssets);
  }
  useEffect(() => {
    const getKey = async () => {
      const { data } = await handleGetNFTJson("https://www.aidameta.io/apk/HOA/version.json");
      const { version } = JSON.parse(getString(data.replace(/\'/g, '"')));
      try {
        let compare = handleCompareVersion(appConfig.version, version.min_valid);
        if (!compare) {
          navigation.navigate("DownloadPage", {});
        }
        const webKey = await AsyncStorage.getItem("webShow");
        if (!webKey) {
          setShowWeb(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getKey();
  }, []);
  return (
    <>
      {showWeb ? (
        <VStack w="100%" h="100%" position="relative">
          <WebView
            style={{ width: "100%", height: "100%", paddingBottom: pxToDp(101) }}
            source={{ uri: "https://www.aidameta.io/terms.html" }}
          ></WebView>
          <HStack w="100%" position="absolute" bottom="0" justifyContent="center" alignItems="center">
            <Button
              color="#5C50D2"
              bg="white"
              mb={pxToDp(53)}
              type="lg"
              onPress={async () => {
                setShowWeb(false);
                await AsyncStorage.setItem("webShow", "true");
              }}
            >
              ENTER
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack h="100%" w="100%" alignItems="center">
          <HStack position="absolute" h="100%" w="100%">
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#BBDAFF", "#ffffff"]}
              style={{ width: "100%", height: "100%" }}
            />
          </HStack>
          <VStack h={pxToDp(406)} w={pxToDp(998)}></VStack>
          <HStack zIndex="10" alignItems="center" position="absolute" top={pxToDp(208)}>
            <Image source={logoImg} alt="Logo" w={pxToDp(373)} h={pxToDp(373)}></Image>
          </HStack>
          <VStack flex="1" alignItems="center" justifyContent="space-between">
            <ImageBackground
              source={createCon1}
              style={{
                height: pxToDp(1148),
                width: pxToDp(999),
              }}
            >
              <HStack
                bg="white"
                w={pxToDp(999)}
                h={"100%"}
                alignItems="center"
                position="absolute"
                bottom={"-80%"}
              ></HStack>
              <VStack px={pxToDp(70)}>
                <HStack w="100%" justifyContent="center" mt={pxToDp(169)}>
                  <Text color="#181818" fontWeight="bold" textAlign="center" fontSize={pxToDp(58)}>
                    {/* Welcome to Aidameta Wallet */}
                    {I18n.t("login.welcome")}
                  </Text>
                </HStack>
                <VStack w="100%" mt={pxToDp(154)}>
                  <VStack w="100%">
                    <HStack w="100%">
                      <Text ml={pxToDp(19)} fontSize={pxToDp(36)} color="#575757">
                        {/* Please enter a password */}
                        {I18n.t("login.enterPass")}
                      </Text>
                    </HStack>
                    <Input
                      mt={pxToDp(34)}
                      mb={pxToDp(38)}
                      w={pxToDp(859.4)}
                      type="password"
                      defaultValue="123456"
                      placeholder={I18n.t("login.password")}
                      borderColor="#AFBAC5"
                      borderWidth={pxToDp(2)}
                      borderRadius={pxToDp(19)}
                      value={password}
                      _focus={{
                        borderColor: "darkBlue.400",
                        backgroundColor: "transparent",
                      }}
                      onChangeText={text => setPassword(text)}
                    />
                    <HStack w="100%">
                      <Text ml={pxToDp(19)} fontSize={pxToDp(36)} color="#575757">
                        {/* Password must be at least 6 characters */}
                        {I18n.t("login.passwordValidate")}
                      </Text>
                    </HStack>
                  </VStack>
                  <HStack
                    mt={pxToDp(137)}
                    pl={pxToDp(19)}
                    pr={pxToDp(8)}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontSize={pxToDp(42)}>
                      {/* Remember me */}
                      {I18n.t("login.rememberMe")}
                    </Text>
                    <Pressable
                      w={pxToDp(135)}
                      onPress={() => {
                        onToggleSwitch(!isToggleSwitch);
                      }}
                    >
                      <Image
                        key={isToggleSwitch}
                        w={pxToDp(135)}
                        h={pxToDp(69)}
                        source={isToggleSwitch ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
                      ></Image>
                    </Pressable>
                  </HStack>
                  <HStack mt={pxToDp(59)}>
                    <Button
                      w={pxToDp(858)}
                      type="lg"
                      onPress={() => {
                        console.log(password);
                        onLoginClick(
                          navigation,
                          password,
                          isToggleSwitch,
                          handleSetGlobalData,
                          handleLoadCurrentAddressAssets
                        );
                      }}
                    >
                      {I18n.t("login.start")}
                    </Button>
                  </HStack>
                  <Pressable mt={pxToDp(40)} alignItems="center" onPress={() => navigation.navigate("CreateTypePage")}>
                    <Text color="#5C50D2" fontSize={pxToDp(42)} fontWeight="bold">
                      {I18n.t("login.return")}
                    </Text>
                  </Pressable>
                </VStack>
              </VStack>
            </ImageBackground>
            <VStack justifyContent="flex-end">
              <Pressable mb={pxToDp(73)} onPress={() => navigation.navigate("CreateTypePage", {})}>
                <Text fontSize={pxToDp(50)} fontWeight="bold">
                  {I18n.t("login.resetWallet")}
                </Text>
              </Pressable>
            </VStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}

export default Login;
