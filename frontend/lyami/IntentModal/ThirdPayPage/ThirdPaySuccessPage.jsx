import React, { useState, useEffect } from "react";
import { HStack, VStack, Image, Text, Center, Divider, Pressable, Button, useToast } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import global from "../../api/util/global";
import { NativeModules } from "react-native";

const ThirdPaySuccessPage = props => {
  const {
    route: {
      params: { transactionHash, value, CoinSymbol },
    },
  } = props;
  const navigation = useNavigation();
  const handleOnClickBack = async navigation => {
    const returnData = {
      result: true,
      orderNonce: global.intentData.data.orderNonce,
      transactionHash: transactionHash,
    };
    const msg = JSON.stringify(returnData);
    await NativeModules.NativeIntent.SetIntentResult(msg);
  };
  const handleFormatAddress = address => {
    return `${address.substring(0, 5)}...${address.substring(address.length - 5, address.length)}`;
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <VStack h="100%">
      <HStack w="100%" mt="2" px="2%" alignItems="center" justifyContent="space-between">
        <Pressable
          w="15%"
          onPress={() => {
            return navigation.navigate("WalletMainNew", {});
          }}
        >
          <Image alt="img" size="2xs" source={Icons.backIcon}></Image>
        </Pressable>
        <Text flex="1" textAlign="center" fontSize="lg">
          支付
        </Text>
        <HStack w="15%"></HStack>
      </HStack>
      <VStack height="100%" alignItems="center" flex="1" mt="6" w="100%">
        <VStack alignItems="center">
          <Text>交易完成</Text>
          <Text>{handleFormatAddress(transactionHash)}</Text>
        </VStack>
        <Center mt="6">
          <Text fontSize="30">
            {value} {CoinSymbol}
          </Text>
        </Center>
        <HStack mt="10">
          <Button
            onPress={() => {
              handleOnClickBack();
            }}
            bg="darkBlue.400"
            borderWidth="1"
            borderColor="darkBlue.400"
            w="80%"
          >
            返回商家
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default React.memo(ThirdPaySuccessPage);
