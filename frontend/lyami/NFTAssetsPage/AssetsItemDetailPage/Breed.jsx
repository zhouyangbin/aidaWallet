import React from "react";
import { HStack, VStack, Text, PresenceTransition, FlatList, Image } from "native-base";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../../utils/stylesKits";
import shadowCon from "@/../../assets/image/UiImg//shadowCon.webp";
import Icons from "../../asset/Icon";
import CountDown from "../../component/CountDown";
import {I18n} from '../../../language/I18n'

const parentArray = [
  { name: "父亲", num: 30001 },
  { name: "母亲", num: 40001 },
];
const recordArray = [
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
  { date: "2022.08.14", text: "两个NFT开始搅和在一起" },
  { date: "2022.08.15", text: "等待出生" },
  { date: "2022.08.16", text: "NFT(NO.200037)出生" },
];

const ParentItem = props => {
  const { payload, index } = props;
  const isFather = Boolean(index == 0);
  return (
    <VStack
      borderWidth="1"
      borderRadius="20"
      px="3"
      borderColor={isFather ? "darkBlue.400" : "red.400"}
      bg={isFather ? "darkBlue.300" : "red.300"}
      alignItems="center"
    >
      <Text color="white">{payload.name}</Text>
      <Text color="white">NFT:{payload.num}</Text>
    </VStack>
  );
};

export const RecordItem = props => {
  const { payload } = props;
  return (
    <HStack>
      <Text color="rgb(155,155,155)" fontSize="12">
        {payload.date}
      </Text>
      <Text color="rgb(155,155,155)" fontSize="12" ml="4">
        {payload.text}
      </Text>
    </HStack>
  );
};
export const BasicInformation = props => {
  const { detailsItem } = props;
  return (
    <VStack>
      <Text ml={pxToDp(59)} mb={pxToDp(21)} fontSize={pxToDp(50)} fontWeight="800">
         {I18n.t("aida.basicInfo")}
      </Text>
      <ImageBackground
        source={shadowCon}
        style={{ width: pxToDp(1037), height: pxToDp(628) }}
        resizeMethod="resize"
        resizeMode="stretch"
      >
        <VStack pl={pxToDp(57)} pr={pxToDp(111)} pt={pxToDp(37)}>
          <HStack mb={pxToDp(45)} alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.breedEditIcon}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
              {I18n.t("aida.breedingTimes")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              {detailsItem?.reproductionTimes}
            </Text>
          </HStack>
          <HStack mb={pxToDp(45)} alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.breedLogoIcon}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                {I18n.t("aida.breedTimes")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              {detailsItem?.reproductionTimes}
            </Text>
          </HStack>
          <HStack mb={pxToDp(45)} alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.breedTimeIcon}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                {I18n.t("aida.breedingDuration")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              12:56:12
            </Text>
          </HStack>
          <HStack mb={pxToDp(45)} alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.breedColdIcon}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
              {I18n.t("aida.breedingCoolingTimes")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              {/* <CountDown second={detailsItem?.reproductionInterval}></CountDown> */}
              <CountDown second={1668154936135}></CountDown>
            </Text>
          </HStack>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};

export const BloodInformation = props => {
  const { detailsItem } = props;
  return (
    <VStack>
      <Text ml={pxToDp(59)} mb={pxToDp(21)} fontSize={pxToDp(50)} fontWeight="800">
        {I18n.t("aida.bloodInformation")}
      </Text>
      <ImageBackground
        source={shadowCon}
        style={{ width: pxToDp(1037), height: pxToDp(651) }}
        resizeMethod="resize"
        resizeMode="stretch"
      >
        <VStack h="100%" justifyContent="space-around" pl={pxToDp(57)} pr={pxToDp(111)} pt={pxToDp(37)} pb={pxToDp(70)}>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.blood1}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                 {I18n.t("aida.grandfather")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              11111....1111
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.blood2}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                 {I18n.t("aida.grandmother")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              11111....1111
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.blood3}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                {I18n.t("aida.father")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              {detailsItem?.fatherid}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.blood4}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                {I18n.t("aida.mother")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              {detailsItem?.montherid}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center">
              <Image w={pxToDp(91)} h={pxToDp(91)} source={Icons.blood5}></Image>
              <Text ml={pxToDp(43)} fontSize={pxToDp(40)} fontWeight="bold">
                 {I18n.t("aida.child")}:
              </Text>
            </HStack>
            <Text fontSize={pxToDp(42)} fontWeight="bold">
              11111....1111
            </Text>
          </HStack>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};

export const BreedingRecord = props => {
  const { detailsItem } = props;
  return (
    <VStack>
      <Text ml={pxToDp(59)} mb={pxToDp(21)} fontSize={pxToDp(50)} fontWeight="800">
       {I18n.t("aida.bloodInformation")}
      </Text>
      <ImageBackground
        source={shadowCon}
        style={{ width: pxToDp(1037), height: pxToDp(363) }}
        resizeMethod="resize"
        resizeMode="stretch"
      >
        <FlatList
          pt={pxToDp(38)}
          data={parentArray}
          renderItem={({ item, index }) => {
            return (
              <HStack px={pxToDp(63)} justifyContent="space-between">
                <Text fontSize={pxToDp(36)}>2022.07.15</Text>
                <Text fontSize={pxToDp(30)}>Fall in love with NFTS number (father)</Text>
              </HStack>
            );
          }}
        ></FlatList>
      </ImageBackground>
    </VStack>
  );
};

const Breed = props => {
  const { detailsItem } = props;
  return (
    <ImageBackground
      source={shadowCon}
      style={{ width: pxToDp(420), height: pxToDp(273) }}
      resizeMethod="resize"
      resizeMode="stretch"
    >
      <VStack w="100%" h="100%" px={pxToDp(49)} justifyContent="center" alignItems="center">
        <HStack alignItems="center" w="100%" mb={pxToDp(25)} mt={pxToDp(-30)}>
          <Image source={Icons.breedLogoIcon} h={pxToDp(91)} w={pxToDp(91)} mr={pxToDp(28)}></Image>
          <HStack alignItems="center" flex="1" justifyContent="space-around">
            <Text fontSize={pxToDp(36)}>Times</Text>
            <Text mr={pxToDp(30)} fontSize={pxToDp(44)} color="#5C50D2">
              {detailsItem?.reproductionTimes}
            </Text>
          </HStack>
        </HStack>

        <HStack
          w="100%"
          h={pxToDp(55)}
          bg="#E7F4EB"
          borderRadius={pxToDp(15)}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#10B057" fontSize={pxToDp(36)} fontWeight="bold">
            可繁育
          </Text>
        </HStack>
      </VStack>
    </ImageBackground>
  );
};

export default React.memo(Breed);
