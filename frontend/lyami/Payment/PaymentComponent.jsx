import React, { useEffect, useState } from "react";
import { View, Text, Image, HStack, Center, Input, useToast, VStack } from "native-base";
import { Pressable } from "react-native";
import Icons from "../asset/Icon.js";
import { I18n } from "../../language/I18n";
import Button from "../component/Button.jsx";
import { pxToDp } from "../../utils/stylesKits.js";
import {useGlobalStore} from "../api/Store/globalHook"
const PaymentComponent = props => {
  const { globalData } = useGlobalStore();
  const {
    inputValue,
    resetInputValue,
    validateInputValue,
    setStep,
    selectCoin,
    selectCoinIndex,
    setSelectCoinIndex,
  } = props;

  return (
    <>
      <View
        justifyContent="space-between"
        flex="1"
        px={pxToDp(41)}
        bg={"white"}
        pb={pxToDp(80)}
        borderTopLeftRadius={pxToDp(80)}
        borderTopRightRadius={pxToDp(80)}
      >
        <VStack>
          <Text mb={pxToDp(41)} mt={pxToDp(100)} fontSize={pxToDp(50)} lineHeight={pxToDp(58)} fontWeight="800">
            {/* Enter Amount */}
            {I18n.t('receive.inputNum')}
          </Text>
          <HStack
            borderRadius={pxToDp(30)}
            w={pxToDp(998)}
            h={pxToDp(136)}
            bg="#F7F7F9"
            borderWidth={pxToDp(3)}
            borderColor="#5c50d2"
          >
            <Input
              type="number"
              flex="1"
              borderWidth={0}
              InputRightElement={
                <Text textAlign="right" mr={pxToDp(30)}>
                  {selectCoin.CoinSymbol}
                </Text>
              }
              fontSize={pxToDp(40)}
              value={inputValue}
              _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
              onChangeText={validateInputValue}
            />
            <HStack alignItems="center" mr={pxToDp(19)}>
              <Pressable
                onPress={() => {
                  let count = selectCoinIndex + 1;
                  if (count == globalData.nativeCoinNetwork.length) {
                    return setSelectCoinIndex(0);
                  }
                  setSelectCoinIndex(count);
                }}
              >
                <Image key={selectCoinIndex} alt="img" source={Icons.toggleIcon} w={pxToDp(59)} h={pxToDp(59)} />
              </Pressable>
            </HStack>
          </HStack>

          <Pressable
            onPress={() => {
              setStep(1);
            }}
          >
            <Text color="#5C50D2" mt={pxToDp(40)} fontSize={pxToDp(50)} fontWeight="800">
              {/* Replace Assets */}
              {I18n.t('receive.changeAssets')}
            </Text>
          </Pressable>
        </VStack>

        <View alignItems="center">
          <Button
            type="lg"
            bg={"transparent"}
            borderWidth={pxToDp(3)}
            borderColor="#5C50D2"
            onPress={() => resetInputValue()}
            color="#5C50D2"
          >
            {/* Reset */}
            {I18n.t('receive.reset')}
          </Button>
          <Button
            mb={pxToDp(133)}
            mt={pxToDp(53)}
            type="lg"
            isDisabled={inputValue && inputValue != 0 ? false : true}
            onPress={() => setStep(2)}
          >
            {/* Next step */}
            {I18n.t('receive.nextStep')}
          </Button>
        </View>
      </View>
    </>
  );
};

export default PaymentComponent;
