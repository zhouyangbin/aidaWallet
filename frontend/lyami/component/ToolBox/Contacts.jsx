import React, { useState, useEffect, useCallback } from "react";
import {
  HStack,
  VStack,
  Image,
  Text,
  Pressable,
  Box,
  Input,
  View,
  useToast
} from "native-base";
import Button from "../Button";
import { pxToDp} from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet, ImageBackground } from "react-native";
import { useGlobalStore } from "../../api/Store/globalHook";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
const Contacts = props => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const [add, setAdd] = useState(null);
  const toast = useToast();
  const handleSetInput = text => {
    setSearchValue(text);
  };
  const handleSetAdd = text => {
    setAdd(text);
  };
  const saveContact = () => {
    toast.show({
      description: "功能开发中，敬请期待。",
      placement: "top",
      duration: 2000,
    });
    // const obj = {
    //   account: {
    //     address: "0x96B2b6BC4C8aE2752EaA6F66770087104aF41c0D",
    //   },
    //   image: 10,
    //   title: "0x76B2b...41c0D",
    // };
    // globalData.localOrderAddress.push(obj);
    // handleSetGlobalData(globalData);
  };
  return (
    <View w="100%" h="100%" bg="#fff">
      <HStack mt={pxToDp(141)} px={pxToDp(40)} pr={pxToDp(40)} alignItems="center" justifyContent="space-between">
        <Pressable w="33%" onPress={() => navigation.goBack()}>
          <Image alt="img" w={pxToDp(50)} h={pxToDp(50)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          {I18n.t("setting.contacts")}
        </Text>
        <Text w="33%"></Text>
      </HStack>
      <View mt={pxToDp(61)} h="100%" bg="#EFF2F4">
        {step == 1 ? (
          <Box h="100%" w="100%">
            <VStack alignItems="center" mt={pxToDp(367,"h")} style={[styles.listBox]} mb={pxToDp(41)}>
              <VStack w="100%" h={pxToDp(384)} mb={pxToDp(83)} alignItems="center">
                <Image alt="img" w={pxToDp(384)} h={pxToDp(384)} source={Icons.contactIcon} />
              </VStack>
              <Text color="#000" h={pxToDp(79)} mb={pxToDp(83)}>
                {I18n.t("setting.createContacts")}
              </Text>
              <Text h={pxToDp(49)} style={[styles.listText2]}>
              {I18n.t("setting.createContacts")}
              </Text>
              <Pressable onPress={() => setStep(2)}>
                <Text color="#5C50D2" fontSize={pxToDp(25)}>
                  + {I18n.t("setting.contacts")}
                </Text>
              </Pressable>
            </VStack>
            <VStack>
              {globalData.localOrderAddress.map((item, index) => {
                if (index < 10) {
                  return (
                    <ImageBackground
                      key={index}
                      source={shadowCon}
                      style={{ height: pxToDp(165) }}
                      resizeMode="stretch"
                    >
                      <HStack h="100%" alignItems="center" pb={pxToDp(10)} w="100%">
                        <HStack ml={pxToDp(50)} alt="img" mr={pxToDp(40)}>
                          {/* <CrystalBallComponent
                            type="primary"
                            width={pxToDp(85.1)}
                            height={pxToDp(85.1)}
                            gene={item.account?.address.slice(2, 38)}
                          ></CrystalBallComponent> */}
                        </HStack>
                        <VStack flex="1">
                          <Text fontSize={pxToDp(39)} fontWeight="bold">
                            {item.title}
                          </Text>
                          {/* <Text fontSize={pxToDp(30)}>
                            Balance:{item?.count} <Text>{globalData?.defaultNetwork?.CoinSymbol}</Text>
                          </Text> */}
                        </VStack>
                      </HStack>
                    </ImageBackground>
                  );
                }
              })}
            </VStack>
          </Box>
        ) : (
          <Box h="100%">
            <VStack style={[styles.listBox]} mt={pxToDp(41)}>
              <Text style={[styles.listText2]}>{I18n.t("setting.PleaseFillInTheAccount")} address</Text>
              <HStack w="100%" h={pxToDp(140)} alignItems="center">
                <Input
                  variant="outline"
                  type="text"
                  w="100%"
                  h={pxToDp(108)}
                  fontSize={pxToDp(38)}
                  fontWeight="500"
                  color="#9FA1A8"
                  borderColor="#bbc0c5"
                  borderWidth={pxToDp(2)}
                  backgroundColor="#EDEFF1"
                  borderRadius={pxToDp(21)}
                  value={add}
                  placeholder=""
                  _focus={{
                    borderColor: "#bbc0c5",
                    backgroundColor: "#efefef",
                  }}
                  onChangeText={handleSetAdd}
                  InputLeftElement={
                    <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(39)} h={pxToDp(32)} marginLeft="3" />
                  }
                />
              </HStack>
            </VStack>
          </Box>
        )}
      </View>
      {step == 2 ? (
        <HStack
          w="100%"
          h={pxToDp(201)}
          borderTopWidth={pxToDp(2)}
          borderColor="#bbc0c5"
          position="absolute"
          bottom={pxToDp(0)}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            w={pxToDp(377)}
            mr={pxToDp(53)}
            color="#5C50D2"
            bg="transparent"
            type="sm"
            borderRadius={pxToDp(121)}
            borderWidth={pxToDp(3)}
            borderColor="#5C50D2"
            onPress={() => setStep(1)}
          >
            {I18n.t("wallet.cancel")}
          </Button>
          <Button onPress={() => saveContact()} w={pxToDp(377)} borderRadius={pxToDp(121)} type="sm">
          {I18n.t("setting.Save")}
          </Button>
        </HStack>
      ) : null}
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
export default React.memo(Contacts);
