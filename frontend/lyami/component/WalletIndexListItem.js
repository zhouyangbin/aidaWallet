import React, { useState } from "react";
import { HStack, Text, Button, Pressable, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
// import UpChainPage from "../NFTAssetsPage/UpChainPage";
import { handleMoneyFormatter } from "../api/util/helper";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import global from "../api/util/global";

const WalletIndexListItem = props => {
  const { index, payload, useDeleteItem, handleSetCurrentCoin } = props;
  const navigation = useNavigation();
  const [upChainShow, setUpChainShow] = useState(false);
  const seeNftList = (payload, index) => {
    if (global.defaultNetwork.NFTAssets[index]?.isNew) {
      global.defaultNetwork.NFTAssets[index].isNew = false;
      SaveGlobalData(global.CreateNewPassword);
    }
  };
  return (
    <Pressable
      h={pxToDp(149)}
      w={pxToDp(998)}
      mb={pxToDp(29)}
      borderRadius={pxToDp(30)}
      bg="white"
      alignItems="center"
      justifyContent="center"
      shadow={1}
      onPress={() => {
        handleSetCurrentCoin(payload);
      }}
    >
      <HStack
        w="100%"
        justifyContent="space-between"
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        alignItems="center"
      >
        <HStack ml="1" w="40%" alignItems="center">
          <Image mr={pxToDp(19)} w={pxToDp(107)} h={pxToDp(107)} alt="img" source={Icons.maticIcon}></Image>
          <Text fontSize={pxToDp(38)} fontWeight="bold">
            {payload.symbol}
          </Text>
        </HStack>
        <HStack h="100%" flex="1" alignItems="center" justifyContent="space-between">
          <HStack w="20%" color="#2F2F2F" fontSize={pxToDp(38)} pr={pxToDp(38)}>
            {payload.isNew ? (
              <Text w="100%" textAlign="right" fontSize={pxToDp(31)}>
                {payload.isNew != undefined && payload.isNew ? "新" : ""}
              </Text>
            ) : null}
          </HStack>
          <Text flex="1" color="#2F2F2F" fontSize={pxToDp(38)} textAlign="right" pr={pxToDp(37)}>
            {handleMoneyFormatter(payload?.balance, 9, payload?.decimal)}
          </Text>
        </HStack>
        {/* 第一个默认不能删 */}
        {index !== 0 ? useDeleteItem(payload) : <HStack w={pxToDp(80)}></HStack>}
      </HStack>
      {/* <UpChainPage show={upChainShow} close={setUpChainShow} payload={payload}></UpChainPage> */}
    </Pressable>
  );
};

export default WalletIndexListItem;
