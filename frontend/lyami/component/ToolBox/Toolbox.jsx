import React, { useState } from "react";
import { HStack, VStack, Image, Text, Pressable, Box, Select, View } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import AsyncStorage from "@react-native-community/async-storage";
import ToolHead from "./ToolHead";
import { StyleSheet } from "react-native";
const LanguageCom = props => {
  const { setLanguage, service } = props;
  return (
    <VStack w="100%">
      <View px={pxToDp(50)} w="100%">
        <Text mt={pxToDp(39)} color="#181818" fontWeight="600" fontSize={pxToDp(50)}>
          {I18n.t("setting.TheCurrentLanguage")} {service == "zhcn" ? "Chinese" : "English"}
        </Text>
        <Text mt={pxToDp(39)} color="#181818" fontWeight="600" fontSize={pxToDp(41)}>
          {I18n.t("setting.PleaseSelectLanguage")}
        </Text>
      </View>
      <Select
        mt={pxToDp(31)}
        px={pxToDp(50)}
        selectedValue={service}
        minWidth="200"
        w="100%"
        bg="#fff"
        borderWidth={0}
        h={pxToDp(101)}
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          endIcon: (
            <Image
              w={pxToDp(49)}
              h={pxToDp(41)}
              alt="img"
              mt={pxToDp(17)}
              position="absolute"
              right={0}
              source={Icons.currentIcon}
            />
          ),
        }}
        dropdownIcon={<Image alt="img" mr={pxToDp(47)} size="2" source={Icons.rightArrowIcon} />}
        // mt={1}
        onValueChange={itemValue => setLanguage(itemValue)}
      >
        <Select.Item label="Chinese" value="zhcn" />
        <Select.Item label="English" value="en" />
      </Select>
    </VStack>
  );
};
const Toolbox = props => {
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [step, setStep] = useState(1); //1: 显示工具栏，2： 显示工具栏具体的功能页面
  const [service, setService] = React.useState(I18n.defaultLocale);
  const setLanguage = async value => {
    I18n.defaultLocale = value;
    await AsyncStorage.setItem("language", value);
    setService(value);
  };
  const settingList = [
    { path: "General", text: "setting.general", icon: Icons.setGeneralIcon },
    { path: "Advanced", text: "setting.advanced", icon: Icons.setSeniorIcon },
    // { path: "Contacts", text: "setting.contacts", icon: Icon.setLanguageIcon },
    { path: "SecAndPrivacy", text: "setting.secAndPrivacy", icon: Icons.setSecAndPriIcon },
    { path: "Notice", text: "setting.remind", icon: Icons.setRemindIcon },
    { path: "Network", text: "setting.network", icon: Icons.setNetworkIcon },
    // { path: "Introduction", text: "setting.introduction", icon: Icon.setLanguageIcon },
  ];
  const headBackPress = () => {
    step === 2 ? setStep(1) : navigation.goBack();
  };
  return (
    <VStack w={screenWidth} h={screenHeight} bg="#fff">
      {/* 顶部导航栏 start  */}
      <ToolHead
        title={step === 1 ? I18n.t("setting.setting") : I18n.t("setting.language")}
        type="setting"
        headBackPress={headBackPress}
      />
      {/* 顶部导航栏 end  */}

      {/* 工具栏 start  */}
      <Box bg="#EFF2F4" h="100%">
        {step === 2 ? <LanguageCom setLanguage={setLanguage} service={service} /> : null}
        {step === 1 ? (
          <VStack mt={pxToDp(41)} w="100%">
            <View bg="#fff" w="100%">
              <Pressable w="100%" onPress={() => setStep(2)}>
                <HStack style={[styles.listBox]}>
                  <HStack>
                    <Image alt="img" w={pxToDp(67)} h={pxToDp(67)} mr={pxToDp(49)} source={Icons.setLanguageIcon} />
                    <Text style={[styles.boxText]}>{I18n.t("setting.language")}</Text>
                  </HStack>
                  <Image alt="img" w={pxToDp(22)} h={pxToDp(38)} source={Icons.rightArrowIcon} />
                </HStack>
              </Pressable>
            </View>
            <View w="100%">
              {settingList.map((item, index) => {
                return (
                  <Pressable
                    bg="#fff"
                    w="100%"
                    key={index}
                    onPress={() => navigation.navigate(item.path)}
                    mt={index == 2 ? pxToDp(41) : 0}
                  >
                    <HStack style={[styles.listBox]}>
                      <HStack>
                        <Image alt="img" w={pxToDp(67)} h={pxToDp(67)} mr={pxToDp(49)} source={item.icon} />
                        <Text style={[styles.boxText]}>{I18n.t(item.text)}</Text>
                      </HStack>
                      <Image alt="img" w={pxToDp(22)} h={pxToDp(38)} source={Icons.rightArrowIcon} />
                    </HStack>
                  </Pressable>
                );
              })}
            </View>
          </VStack>
        ) : null}
      </Box>

      {/* 工具栏 end  */}
    </VStack>
  );
};
const styles = StyleSheet.create({
  listBox: {
    height: pxToDp(140),
    paddingRight: pxToDp(39),
    paddingLeft: pxToDp(59),
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: pxToDp(1),
    borderBottomWidth: pxToDp(1),
    borderColor: "#ddd",
  },
  boxText: {
    height: pxToDp(51),
    lineHeight: pxToDp(51),
    color: "#181818",
    fontSize: pxToDp(39),
  },
});
export default React.memo(Toolbox);
