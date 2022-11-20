import React from "react";
import { VStack, Text, HStack, Center, Box, Pressable } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";

// 渲染列表项
const RenderListItem = ({ item, index, isActive, setActive, setIsApproveShow }) => {
  return (
    <Pressable
      onPress={() => setActive(index)}
      flexDirection="column"
      position="relative"
      w={pxToDp(478)}
      h={pxToDp(625)}
      borderRadius={pxToDp(30)}
      bg="#fff"
      mr={pxToDp(43)}
      alignItems="center"
      borderColor={isActive ? "#938CF5" : "#fff"}
      borderWidth={isActive ? pxToDp(5) : 0}
      borderBottomWidth="0"
      mb={pxToDp(38)}
    >
      <Text
        position="absolute"
        top={pxToDp(15)}
        right={pxToDp(15)}
        color="#fff"
        fontWeight="bold"
        fontSize={pxToDp(42)}
        w={pxToDp(54)}
        lineHeight={pxToDp(54)}
        h={pxToDp(54)}
        bg="#938CF5"
        borderRadius={pxToDp(27)}
        textAlign="center"
      >
        1
      </Text>
      <CrystalBallComponent width={pxToDp(376)} height={pxToDp(388)} type="primary" gene={item.gene} />
      <HStack mt={pxToDp(19)} justifyContent="space-around" w={pxToDp(358)}>
        <VStack>
          <Text color="#181818" fontWeight="800" fontSize={pxToDp(32)}>
            123
          </Text>
          <Text mt={pxToDp(10)} color="#181818" fontWeight="500" fontSize={pxToDp(26)}>
            MATIC
          </Text>
        </VStack>
        <VStack>
          <HStack alignItems="center">
            <Text color="#181818" fontWeight="800" fontSize={pxToDp(32)}>
              123
            </Text>
            <Text color="#181818" fontWeight="500" fontSize={pxToDp(26)}>
              days
            </Text>
          </HStack>
          <Text mt={pxToDp(10)} color="#181818" fontWeight="500" fontSize={pxToDp(26)}>
            End time
          </Text>
        </VStack>
      </HStack>
      <Center mt={pxToDp(28)} w={pxToDp(370)} h={pxToDp(53)} bg="#938CF5" borderRadius={pxToDp(28)}>
        <Text color="#fff" fontWeight="bold" fontSize={pxToDp(34)}>
          AIDA#1221110
        </Text>
      </Center>
      {isActive ? (
        <Pressable
          position="absolute"
          bottom="0"
          w={pxToDp(478)}
          h={pxToDp(92)}
          bg="#5C50D2"
          borderBottomRadius={pxToDp(30)}
          onPress={() => setIsApproveShow(true)}
        >
          <Text textAlign="center" lineHeight={pxToDp(92)} color="#fff" fontWeight="bold" fontSize={pxToDp(50)}>
            Downlist
          </Text>
        </Pressable>
      ) : null}
    </Pressable>
  );
};

export default React.memo(RenderListItem);
