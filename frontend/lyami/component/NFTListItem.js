import React, { useState, useContext } from "react";
import { HStack, Text, Image, Button, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import UpChainPage from "../NFTAssetsPage/UpChainPage";
import Icons from "./../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
// import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import global from "../api/util/global";
import { useGlobalStore } from "../api/Store/globalHook";
import config from "../api/util/config";
import LoadingContext from "../../providers/LoadContext";

const NFTListItem = props => {
  const { index, payload, spe, useDeleteItem, account } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigation = useNavigation();
  const [upChainShow, setUpChainShow] = useState(false);
  const loading = useContext(LoadingContext);
  const changeNFTType = () => {};
  const seeNftList = (payload, index) => {
    if (payload.isNew) {
      payload.isNew = false;
    }
    handleSetGlobalData(globalData);
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
        if (!spe) {
          return;
        }
        navigation.navigate("NFTAsset", {
          nftType: index,
          payload: payload,
          account: account,
          changeNFTType: changeNFTType,
        });
        loading.hideMenu();
        seeNftList(payload, index);
      }}
    >
      <HStack w={pxToDp(998)} justifyContent="space-between" alignItems="center">
        <HStack w="45%" ml={pxToDp(22)} alignItems="center">
          <Image
            mr={pxToDp(19)}
            w={pxToDp(73)}
            h={pxToDp(73)}
            alt="image"
            key={index}
            source={
              index == config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId] ? Icons.aidaNftIcon : Icons.commonNftIcon
            }
          ></Image>
          <Text fontSize={pxToDp(35)} fontWeight="bold">
            {payload[0]?.symbol || payload.symbol}
          </Text>
        </HStack>
        <HStack flex="1" alignItems="center" justifyContent="space-between">
          <HStack flex="1" color="#2F2F2F" fontSize={pxToDp(38)} h={pxToDp(100)} alignItems="center"  justifyContent="flex-end">
            {payload.isNew ? (
              <Text
                bg="#5C50D2"
                h={pxToDp(50)}
                w={pxToDp(50)}
                lineHeight={pxToDp(50)}
                fontSize={pxToDp(31)}
                mr={pxToDp(22)}
                textAlign="center"
                borderRadius={pxToDp(40)}
                color="#fff"
              >
                {payload.isNew != undefined && payload.isNew ? "新" : ""}
              </Text>
            ) : null}
            <Text fontSize={pxToDp(38)} h={pxToDp(38)} lineHeight={pxToDp(40)}>
              {payload?.balance != undefined ? payload?.balance.toString() : payload?.length}
            </Text>
          </HStack>
          <HStack flex="1" pr={pxToDp(14)} mr={pxToDp(22)} justifyContent="flex-end">
            {false ? (
              <Button
                onPress={() => {
                  setUpChainShow(true);
                }}
                borderRadius="15"
                bg="darkBlue.400"
                w="16"
                h="4"
              >
                <Text color="white" textAlign="center">
                  NFT+
                </Text>
              </Button>
            ) : true ? (
              <Text
                h={pxToDp(57)}
                w={pxToDp(150)}
                fontSize={pxToDp(33)}
                bg="#5C50D2"
                borderRadius={pxToDp(40)}
                lineHeight={pxToDp(57)}
                color="white"
                textAlign="center"
              >
                {payload[0]?.contract_type || payload?.type || payload[0]?.type}
              </Text>
            ) : null}
          </HStack>
        </HStack>
        {/* 第一个默认不能删 */}
        {index != config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId] ? (
          useDeleteItem(payload, index)
        ) : (
          <HStack w={pxToDp(80)}></HStack>
        )}
      </HStack>
      <UpChainPage show={upChainShow} close={setUpChainShow} payload={payload}></UpChainPage>
    </Pressable>
  );
};

export default NFTListItem;
