import React, { useEffect, useState } from "react";
import { View, Text, Image, HStack, Input, Button, Flex, ScrollView, FlatList, VStack, Pressable } from "native-base";
import Icons from "../asset/Icon.js";
import { handleFuzzyQuery } from "../api/util/helper.js";
import { useMemo } from "react";
import { pxToDp } from "../../utils/stylesKits.js";
import { ImageBackground } from "react-native";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import {useGlobalStore} from "../api/Store/globalHook";
import {I18n} from "../../language/I18n"

function PaymentForCoinComponent(props) {
  const { globalData } = useGlobalStore();
  const { setSelectCoinIndex, setStep } = props;
  const [inputValue, setInputValue] = useState();
  // const [coinListData, setCoinListData] = useState(coinListData);
  const coinListData = useMemo(() => {
    //默认显示
    console.log(globalData, "usememo globalData");
    return handleFuzzyQuery(globalData.nativeCoinNetwork, inputValue);
  }, [inputValue]);
  const handleSetInput = (payload) => {
    setInputValue(payload);
  };
  return (
    <View alignItems="center" flex="1" w="100%">
      <HStack w="100%" mb={pxToDp(41)}>
        <Text ml={pxToDp(78)} fontWeight="800" fontSize={pxToDp(50)}>
          {I18n.t('receive.selectRequestAssets')}
        </Text>
      </HStack>
      <Input
        variant="outline"
        type="text"
        w={pxToDp(998)}
        h={pxToDp(108)}
        bg="#EDEFF1"
        borderRadius={pxToDp(30)}
        borderWidth={0}
        value={inputValue}
        placeholder={I18n.t('receive.assetsSearch')}
        fontSize={pxToDp(40)}
        _focus={{ borderColor: "darkBlue.400", backgroundColor: "#EDEFF1" }}
        onChangeText={handleSetInput}
        InputLeftElement={
          <Image alt="img" source={Icons.inputSearchIcon} w={pxToDp(41)} h={pxToDp(41)} ml={pxToDp(46)} />
        }
      />
      <VStack
        w="100%"
        bg="#E9ECEE"
        flex="1"
        mt={pxToDp(47)}
        borderTopLeftRadius={pxToDp(80)}
        borderTopRightRadius={pxToDp(80)}
        px={pxToDp(41)}
        pt={pxToDp(64)}
      >
        <Text  ml={pxToDp(37)} mb={pxToDp(40)} fontWeight="800" fontSize={pxToDp(50)}>
        {I18n.t('receive.bestSelect')}
        </Text>
        <FlatList
          data={coinListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ImageBackground
                resizeMode="stretch"
                source={shadowCon}
                style={{ width: pxToDp(998.4), height: pxToDp(164.6), marginBottom: pxToDp(10) }}
              >
                <Pressable
                  key={item.name}
                  w="100%"
                  h="100%"
                  _text={{ color: "blue.500" }}
                  variant="Unstyled"
                  onPress={() => {
                    setSelectCoinIndex(index);
                    setStep(0);
                  }}
                  pl={pxToDp(60)}
                  pb={pxToDp(10)}
                  // alignItems="center"
                  justifyContent="center"
                >
                  {/* <Image alt="image bad" marginLeft="2" marginRight="4" source={Icons.usdtIcon} size="6" /> */}
                  <Text
                    fontSize={pxToDp(38)}
                    fontWeight="bold"
                    color="#2F2F2F"
                  >{item.CoinSymbol}</Text>
                </Pressable>
              </ImageBackground>
            );
          }}
        ></FlatList>
      </VStack>
    </View>
  );
}

export default PaymentForCoinComponent;
