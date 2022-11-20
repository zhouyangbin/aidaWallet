import React, { useState, useEffect } from "react";
import { HStack, VStack, Image, Text, Pressable, Box, Select, Actionsheet } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import Button from "../Button";
import { StyleSheet } from "react-native";
import global from "../../api/util/global";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import { useGlobalStore } from "../../api/Store/globalHook";
import ReSetPassword from "./ReSetPassword";
import ToolHead from "./ToolHead";
const LoginAndPaySetting = props => {
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigation = useNavigation();
  const [login, setLogin] = useState(globalData.SystemSetting.passwordFree);
  const [word, setWord] = useState(globalData.SystemSetting.password);
  const [finger, setFinger] = useState(globalData.SystemSetting.fingerprint);
  const [face, setFace] = useState(globalData.SystemSetting.faceId);
  const [firstType, setFirstType] = useState(globalData.SystemSetting.prior);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const setSystemSetting = () => {
    globalData.SystemSetting = {
      ...globalData.SystemSetting,
      passwordFree: login,
      password: word,
      fingerprint: finger,
      faceId: face,
      prior: firstType,
    };
    handleSetGlobalData(globalData);
  };
  useEffect(() => {
    setSystemSetting();
    console.log(globalData.SystemSetting, "firstType");
  }, [login, word, finger, face, firstType]);
  const passwordLoginHandle = () => {
    setWord(!word);
  };
  const selectArr = [
    {
      text: I18n.t("setting.passwordLogin"),
      key: "passwordLogin",
    },
    {
      text: I18n.t("setting.fingerprintLogin"),
      key: "fingerprintLogin",
    },
    {
      text: I18n.t("setting.faceIdLogin"),
      key: "faceIdLogin",
    },
  ];
  return (
    <VStack w={screenWidth} h={screenHeight} bg="#fff" position="absolute">
      {/* 顶部导航栏 start  */}
      <ToolHead title={I18n.t("setting.loginPaySetting")} type="loginPaySetting"/>
      <Box h="100%" bg="#efefef">
        <HStack style={[styles.listBox]} mt={pxToDp(41)}>
          <Text style={[styles.boxText]}>{I18n.t("setting.passwordFree")}</Text>
          <Pressable
            onPress={() => {
              setLogin(!login);
            }}
          >
            <Image
              key={login}
              w={pxToDp(135)}
              h={pxToDp(69)}
              source={login ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
            ></Image>
          </Pressable>
        </HStack>
        <Box mt={pxToDp(41)}>
          <HStack style={[styles.listBox]}>
            <Text style={[styles.boxText]}>{I18n.t("setting.passwordLogin")}</Text>
            <Pressable
              onPress={() => {
                // setWord(!word);
                setModalVisible(true);
              }}
            >
              <Image
                key={word}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={word ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
          <HStack style={[styles.listBox]}>
            <Text style={[styles.boxText]}>{I18n.t("setting.fingerprintLogin")}</Text>
            <Pressable
              onPress={() => {
                setFinger(!finger);
              }}
            >
              <Image
                key={finger}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={finger ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
          <HStack style={[styles.listBox]}>
            <Text style={[styles.boxText]}>{I18n.t("setting.faceIdLogin")}</Text>
            <Pressable
              onPress={() => {
                setFace(!face);
              }}
            >
              <Image
                key={face}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={face ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
        </Box>
        <HStack style={[styles.listBox]} mt={pxToDp(41)}>
          <Text style={[styles.boxText]}>
            {I18n.t("setting.priorSetting")}-
            {firstType != undefined ? I18n.t("setting")[firstType] : ""}
          </Text>
          <Pressable
            onPress={() => {
              setVisible(true);
            }}
            w="20%"
          >
            <HStack w="100%" justifyContent="center" alignItems="center">
              <Text fontSize={pxToDp(27)} h={pxToDp(41)}>{I18n.t("setting.select")} </Text>
              <Image alt="img" w={pxToDp(39)} h={pxToDp(39)} source={Icons.hisNavigateArrowIcon} />
            </HStack>
          </Pressable>
        </HStack>
      </Box>
      <Actionsheet isOpen={visible} size="full" onClose={() => setVisible(false)}>
        <Actionsheet.Content bg="white">
          <VStack>
            <VStack alignItems="center" bg="white" paddingTop={pxToDp(7)} pb={pxToDp(71)}>
              {selectArr.map((item,index)=>{
              return(
                <Button
                w={pxToDp(501)}
                type="sm"
                bg="transparent"
                color={firstType == item.key ?  "#5C50D2" : "#181818"}
                onPress={() => setFirstType(item.key)}
              >
                {item.text}
              </Button>
              )}
              )}
            </VStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
      <ReSetPassword
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type="passwordLogin"
        parentHandle={passwordLoginHandle}
      />
    </VStack>
  );
};
const styles = StyleSheet.create({
  listBox: {
    paddingTop: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingLeft: pxToDp(50),
    paddingBottom: pxToDp(30),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  boxText: {
    height: pxToDp(51),
    lineHeight: pxToDp(51),
    color: "#181818",
    fontWeight: "600",
    fontSize: pxToDp(35),
  },
});
export default React.memo(LoginAndPaySetting);
