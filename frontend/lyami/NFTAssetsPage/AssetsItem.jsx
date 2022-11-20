import React from "react";
import { HStack, Avatar, VStack, Button, Text, Pressable, Box, Image, Center } from "native-base";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { screenWidth } from "../../utils/stylesKits";
import { handleFormatAddress } from "../api/util/helper";
import { pxToDp } from "../../utils/stylesKits";
import config from "../api/util/config";
import {I18n} from "../../language/I18n"
import global from "../api/util/global";
const AssetsItem = props => {
 console.log(global.defaultAddress.call());
 
  const { payload, onClick, isR, breedPress, renderImage, contractAddress, hasButtons = true } = props;
  console.log(payload.owner);
  const handleFormatAddress = address => {
    let len = address.length;
    let res = address.substring(0, 5) + "....." + address.substring(len - 10, len);
    return res;
  };
  const handleReturnText = payload => {
    if (contractAddress != config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) return null;
    if (payload.reproductionTimes >= config.maxProductionTime) {
      return (
        <Text fontWeight="bold" color="red.500" fontsize={pxToDp(34)}>
          {I18n.t("aida.limitReached")}
        </Text>
      );
    }
    if (payload.reproductionInterval > 0) {
      return (
        <Text fontWeight="bold" color="red.500" fontsize={pxToDp(34)}>
          {payload.reproductionInterval}
        </Text>
      );
    }
    if (payload.dynasty < config.maxDynasty && payload.reproductionTimes < config.maxProductionTime) {
      return (
        <Text fontWeight="bold" color="#14CA54" fontsize={pxToDp(34)}>
          {
            payload.owner == global.defaultAddress.call() ?  I18n.t("aida.canBreed") : null
          }
        </Text>
      );
    }
  };
  return (
    <Pressable
      onPress={() => {
        onClick(payload);
      }}
    >
      <VStack
        position="relative"
        alignItems="center"
        pt={pxToDp(28.5)}
        pb={pxToDp(30)}
        pl={pxToDp(34)}
        pr={pxToDp(34)}
        w={pxToDp(478)}
        h={pxToDp(626)}
        mb={pxToDp(41)}
        mr={pxToDp(41)}
        bg="#fff"
        borderRadius={pxToDp(30)}
      >
        {contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId] && payload.owner == global.defaultAddress.call() ? (
          <Center
            position="absolute"
            right={pxToDp(14)}
            top={pxToDp(14)}
            bg="#938CF5"
            borderRadius={pxToDp(27)}
            w={pxToDp(54)}
            h={pxToDp(54)}
          >
            <Text lineHeight={pxToDp(54)} color="#FFF" fontSize={pxToDp(42)} fontWeight="bold">
              {payload.reproductionTimes}
            </Text>
          </Center>
        ) : null}
        {renderImage(payload)}
        {/* </Pressable> */}
        {/* <Image w={pxToDp(410)} h={pxToDp(424)} source={{ uri: payload.image }}/> */}
        {/* {contractAddress === config.CONTRACT_ADDRESS ? (
          <Text fontWeight="bold" color="#09BF52" fontsize={pxToDp(34)}> */}
        {handleReturnText(payload)}
        {/* Breeding... */}
        {/* </Text>
        ) : (
          <Text fontsize={pxToDp(34)} />
        )} */}
        <HStack
          justifyContent="center"
          mt={pxToDp(26)}
          bg="#6F67E1"
          w={pxToDp(370)}
          h={pxToDp(53)}
          borderRadius={pxToDp(27)}
        >
          <Text fontSize={pxToDp(34)} fontWeight="bold" color="#fff">
            {payload.ballid
              ? `AIDA#${payload.ballid}`
              : payload.name
              ? `${payload.name}`
              : payload.id
              ? `NFT#${payload.id}`
              : `NFT${payload.tokenId}`}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default React.memo(AssetsItem);
