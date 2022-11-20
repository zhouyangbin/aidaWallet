import React, { useState, useRef } from "react";
import { HStack, VStack, Image, Text, Pressable, Input, Modal, ScrollView, View } from "native-base";
import Button from "../Button";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet } from "react-native";
import ReSetPassword from "./ReSetPassword";
import ToolHead from "./ToolHead"
const SecAndPrivacy = props => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [hideNull, setHideNull] = useState(false);
  const [trade, setTrade] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const handleSetInput = text => {
    setSearchValue(text);
  };
  return (
    <View w="100%" h="100%" bg="#fff">
      <ToolHead title={I18n.t("setting.secAndPrivacy")} type="secAndPrivacy"/>
      <HStack px={pxToDp(41)} style={[styles.listBox]} alignItems="center" h={pxToDp(94)} borderRadius={pxToDp(47)}>
        <Input
          variant="outline"
          type="text"
          w="100%"
          h={pxToDp(108)}
          fontSize={pxToDp(38)}
          fontWeight="500"
          color="#9FA1A8"
          borderColor="#bbc0c5"
          borderWidth={0}
          backgroundColor="#EFF2F4"
          borderRadius={pxToDp(21)}
          value={searchValue}
          placeholder="Search in Setting"
          _focus={{ borderColor: "#EDEFF1", backgroundColor: "#EDEFF1" }}
          onChangeText={handleSetInput}
          InputLeftElement={
            <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)} marginLeft="3" />
          }
        />
      </HStack>
      <ScrollView mt={pxToDp(41)} h="82%" bg="#EFF2F4">
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.showMnemonicCode")}
          </Text>
          <VStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)} alignItems="center">
            <Button {...styles.buttonRed} h={pxToDp(109)}>
              {I18n.t("setting.showMnemonicCode")}
            </Button>
          </VStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.loginPaySetting")}
          </Text>
          <VStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)} alignItems="center">
            <Button {...styles.buttonBlue} onPress={() => navigation.navigate("LoginAndPaySetting")}>
              {I18n.t("setting.loginPaySetting")}
            </Button>
          </VStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.code")}
          </Text>
          <VStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)}>
            <Text style={[styles.listText2]} pb={pxToDp(41)}>
              {I18n.t("setting.codeTips")}
            </Text>
            <VStack alignItems="center">
              <Button {...styles.buttonBlue} onPress={() => setModalVisible(true)}>
                {I18n.t("setting.ResetPassword")}
              </Button>
            </VStack>
          </VStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.transactionsReceived")}
          </Text>
          <HStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)} alignItems="center">
            <Text w={pxToDp(825)} style={[styles.listText2]}>
              {I18n.t("setting.transactionsReceivedTips")}
            </Text>
            <Pressable
              w={pxToDp(130)}
              onPress={() => {
                setTrade(!trade);
              }}
              ml={pxToDp(31)}
            >
              <Image
                key={trade}
                w={pxToDp(125)}
                h={pxToDp(59)}
                source={trade ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.usePhishingDetection")}
          </Text>
          <HStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)} alignItems="center">
            <Text w={pxToDp(825)} style={[styles.listText2]}>
              {I18n.t("setting.usePhishingDetectionTips")}
            </Text>
            <Pressable
              w={pxToDp(130)}
              onPress={() => {
                setTrade(!trade);
              }}
              ml={pxToDp(31)}
            >
              <Image
                key={trade}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={trade ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
        </VStack>
        <VStack style={[styles.listBox]}>
          <Text my={pxToDp(22)} px={pxToDp(41)} style={[styles.listText1]}>
            {I18n.t("setting.JoinTheWallet")}
          </Text>
          <HStack bg="#fff" px={pxToDp(41)} py={pxToDp(31)} alignItems="center">
            <Text w={pxToDp(825)} style={[styles.listText2]}>
              {I18n.t("setting.JoinTheWalletTips")}
            </Text>
            <Pressable
              w={pxToDp(130)}
              onPress={() => {
                setTrade(!trade);
              }}
              ml={pxToDp(31)}
            >
              <Image
                key={trade}
                w={pxToDp(135)}
                h={pxToDp(69)}
                source={trade ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
              ></Image>
            </Pressable>
          </HStack>
        </VStack>
      </ScrollView>
      <ReSetPassword modalVisible={modalVisible} setModalVisible={setModalVisible} type="resetPassword" />
    </View>
  );
};
const styles = StyleSheet.create({
  listBox: { width: "100%" },
  listText1: {
    color: "#181818",
    fontWeight: "600",
    fontSize: pxToDp(41),
  },
  listText2: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(31),
    lineHeight: pxToDp(41),
  },
  buttonBlue: {
    width: pxToDp(858),
    borderRadius: pxToDp(30),
    color: "#5C50D2",
    backgroundColor: "#fff",
    borderColor: "#5C50D2",
    borderWidth: pxToDp(2),
  },
  buttonRed: {
    width: pxToDp(858),
    borderRadius: pxToDp(30),
    color: "#ED323F",
    backgroundColor: "#fff",
    borderColor: "#ED323F",
    borderWidth: pxToDp(2),
  },
});
export default React.memo(SecAndPrivacy);
