import React, { useState, useCallback } from "react";
import { HStack, VStack, Image, Text, Center, Pressable, FlatList, Input, ScrollView, View, Box } from "native-base";
import Button from "../Button";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet } from "react-native";
import global from "../../api/util/global";
import TextModal from "../../component/TextModal";
import {version} from "@/../../app.json";

const PrivacyPolicy = props => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [netArray, setNetArray] = useState(global.nativeCoinNetwork);
  const [netWorkIndex, setNetWorkIndex] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const currentNetIndex = global.nativeCoinNetwork.findIndex(item => item.ChainId == global.defaultNetwork.ChainId);
      setNetWorkIndex(currentNetIndex);
      return () => {
        () => {};
      };
    }, [])
  );

  const handleSetInput = text => {
    setSearchValue(text);
  };
  return (
    <View w="100%" h="100%">
      <HStack mt={pxToDp(141)} px={pxToDp(40)} pr={pxToDp(40)} alignItems="center" justifyContent="space-between">
        <Pressable w="33%" onPress={() => navigation.goBack()}>
          <Image alt="img" w={pxToDp(50)} h={pxToDp(50)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          {I18n.t("setting.introduction")}
        </Text>
        <Text w="33%"></Text>
      </HStack>
      
      <Center>
        <Image mt={pxToDp(200)}  w={pxToDp(190)}  h={pxToDp(190)} source={Icons.logo}/>
      </Center>
      <Center><Text fontSize={pxToDp(70)} fontWeight='bold' color='#4D4D4D' mt={pxToDp(22)}>Home of AIDA </Text></Center>
      <Center><Text fontSize={pxToDp(35)} fontWeight='bold' color='#4D4D4D' mt={pxToDp(22)}>v{version} beta</Text></Center>
      <VStack padding={pxToDp(70)} mt={pxToDp(100)}>
        <Text mb={pxToDp(22)}>{I18n.t("register.link")}</Text>
        <Pressable onPress={() => {
          navigation.navigate("TermsAndConditions", {})
        }}>
          <Text mt={pxToDp(19)} mb={pxToDp(19)} fontWeight='bold' color="#5C50D2">{I18n.t("register.privacyPolice")}</Text>
        </Pressable>
        <Pressable onPress={() => {
          navigation.navigate("PrivacyPolicy", {})
        }}>
          <Text color="#5C50D2" fontWeight='bold'>{I18n.t("register.service")}</Text>
        </Pressable>
      </VStack>
    </View>
  );
};
const styles = StyleSheet.create({
  listBox: {
    width: "90%",
    marginLeft: "5%",
  },
  listText1: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(41),
  },
  listText2: {
    color: "#746969",
    fontWeight: "600",
    fontSize: pxToDp(31),
    lineHeight: pxToDp(41),
  },
});
export default React.memo(PrivacyPolicy);
