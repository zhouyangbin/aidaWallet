import React, { useState, useCallback } from "react";
import { HStack, VStack, Image, Text, Pressable, FlatList, Input, ScrollView, View, Box } from "native-base";
import Button from "../Button";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet } from "react-native";
import global from "../../api/util/global";
import ToolHead from "./ToolHead";
const Network = props => {
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
    <View w="100%" h="100%" bg="#fff">
      <ToolHead title={I18n.t("setting.network")} type="netWork"/>
      <HStack
        px={pxToDp(41)}
        style={[styles.listBox]}
        alignItems="center"
        h={pxToDp(94)}
        borderRadius={pxToDp(47)}
      >
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
          placeholder="Search in Settings"
          _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
          onChangeText={handleSetInput}
          InputLeftElement={
            <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)} marginLeft="3" />
          }
        />
      </HStack>
      <ScrollView mt={pxToDp(41)} h={pxToDp(1141)} bg="#EFF2F4">
        <VStack bg="#fff" mt={pxToDp(41)}>
          {/* <HStack w="100%" px={pxToDp(41)} pt={pxToDp(41)} alignItems="center">
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
              placeholder="Search for a previously"
              _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
              onChangeText={handleSetInput}
              InputLeftElement={
                <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(39)} h={pxToDp(32)} marginLeft="3" />
              }
            />
          </HStack> */}
          <VStack style={[styles.listBox]}>
            {netArray.map((item, index) => (
              <HStack h={pxToDp(127)} borderBottomWidth={pxToDp(2)} borderBottomColor="#F1F1F1" pl={pxToDp(50)} alignItems="center">
                {index == netWorkIndex ? (
                  <Image
                    ml={pxToDp(25)}
                    mr={pxToDp(75)}
                    w={pxToDp(31)}
                    h={pxToDp(31)}
                    key={netWorkIndex}
                    source={Icons.currentIcon}
                  ></Image>
                ) : (
                  <Image
                    ml={pxToDp(25)}
                    mr={pxToDp(45)}
                    w={pxToDp(51)}
                    h={pxToDp(51)}
                    key={netWorkIndex}
                    source={Icons.bnbIcon}
                  ></Image>
                )}
                <Text fontSize={pxToDp(41)} color="#181818">{item.name}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        {/* <VStack mt={pxToDp(41)} pl={pxToDp(50)}>
                  <Text>
                  Test networks
                  </Text>
                  {netArray.map((item, index) => (
                      <HStack h={pxToDp(100)} alignItems="center">
                        {index == netWorkIndex ? (
                          <Image
                            ml={pxToDp(25)}
                            mr={pxToDp(75)}
                            w={pxToDp(31)}
                            h={pxToDp(31)}
                            key={netWorkIndex}
                            source={Icons.currentIcon}
                          ></Image>
                        ) : (
                          <Image
                            ml={pxToDp(25)}
                            mr={pxToDp(45)}
                            w={pxToDp(51)}
                            h={pxToDp(51)}
                            key={netWorkIndex}
                            source={Icons.bnbIcon}
                          ></Image>
                        )}
                        <Text fontSize={pxToDp(31)}>{item.name}</Text>
                      </HStack>
                    ))}
            </VStack> */}
      </ScrollView>
      <HStack w="100%" h={pxToDp(201)} justifyContent="center" alignItems="center" bg="#EFF2F4">
        <Button w={pxToDp(858)} borderRadius={pxToDp(30)} type="sm">
          {I18n.t("setting.Save")}
        </Button>
      </HStack>
    </View>
  );
};
const styles = StyleSheet.create({
  listBox: {
    width: "100%",
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
export default React.memo(Network);
