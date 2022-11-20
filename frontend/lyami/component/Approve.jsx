import React, { useState, useEffect } from "react";
import { VStack, HStack, Text, Image, Pressable, Modal } from "native-base";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
import Button from "./Button";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import global from "../api/util/global";

const formatDefaultAddress = () => {
  return `${global.defaultAddress.call().substring(0, 7)}...${global.defaultAddress
    .call()
    .substring(global.defaultAddress.call().length - 5, global.defaultAddress.call().length)}`;
};

const ApproveComponent = props => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VStack bg="white" alignItems="center" borderRadius={pxToDp(59)} py={pxToDp(19)} w={pxToDp(921)}>
        {/* <HStack
          justifyContent="space-between"
          px={pxToDp(43)}
          w="100%"
          borderBottomColor="#F1F1F1"
          borderBottomWidth={pxToDp(3)}
          pb={pxToDp(19)}
          alignItems="center"
        >
          <HStack alignItems="center">
            <CrystalBallComponent
              width={pxToDp(75)}
              height={pxToDp(75)}
              type="primary"
              gene={global.defaultAddress.call().slice(2, 38)}
            />
            <Text ml={pxToDp(31)} fontSize={pxToDp(35)}>
              {formatDefaultAddress()}
            </Text>
          </HStack>
          <HStack>
            <Text
              borderRadius={pxToDp(31)}
              px={pxToDp(13)}
              h={pxToDp(61)}
              lineHeight={pxToDp(61)}
              bg="#ECEBF7"
              fontSize={pxToDp(29)}
              color="#5C50D2"
              fontWeight="bold"
            >
              {global.defaultNetwork.name}
            </Text>
          </HStack>
        </HStack> */}
        <HStack
          alignItems="center"
          justifyContent="center"
          w={pxToDp(834)}
          h={pxToDp(75)}
          borderRadius={pxToDp(37)}
          bg="#EBEBEB"
          mt={pxToDp(25)}
        >
          <Image mr={pxToDp(39)} source={Icons.approve1Icon} w={pxToDp(44)} h={pxToDp(46)}></Image>
          <Text fontSize={pxToDp(36)} h={pxToDp(75)} lineHeight={pxToDp(75)}>
            https://remix.ethereum.org
          </Text>
        </HStack>
        <Text fontWeight="800" fontSize={pxToDp(51)}>
          Grant access to your CSY?
        </Text>
        <Text px={pxToDp(43)} textAlign="center" w="100%" fontSize={pxToDp(31)}>
          By granting permission, you are allowing the following contracts to access your funds
        </Text>
        <HStack
          borderBottomColor="#F1F1F1"
          borderBottomWidth={pxToDp(3)}
          px={pxToDp(43)}
          justifyContent="space-between"
          w="100%"
          mt={pxToDp(26)}
          pb={pxToDp(25)}
        >
          <HStack
            px={pxToDp(13)}
            alignItems="center"
            bg="#EBEBEB"
            borderRadius={pxToDp(37)}
            height={pxToDp(75)}
            fontSize={pxToDp(31)}
          >
            <CrystalBallComponent
              width={pxToDp(53)}
              height={pxToDp(53)}
              type="primary"
              gene={global.defaultAddress.call().slice(2, 38)}
            />
            <Text ml={pxToDp(19)} fontSize={pxToDp(31)}>
              {formatDefaultAddress()}
            </Text>
          </HStack>
          <Pressable height={pxToDp(75)} justifyContent="center" alignItems="center">
            <Text fontSize={pxToDp(35)} color="#5C50D2" fontWeight="800">
              Edit permission
            </Text>
          </Pressable>
        </HStack>

        <VStack w="100%" borderBottomColor="#F1F1F1" borderBottomWidth={pxToDp(3)} px={pxToDp(43)} py={pxToDp(23)}>
          <HStack w="100%" justifyContent="space-between">
            <VStack>
              <HStack alignItems="flex-start">
                <Image
                  mt={pxToDp(11)}
                  mr={pxToDp(23)}
                  w={pxToDp(39)}
                  h={pxToDp(43)}
                  source={Icons.approve2Icon}
                ></Image>
                <VStack>
                  <Text fontSize={pxToDp(42)} fontWeight="800">
                    Trading fee
                  </Text>
                  <Text mt={pxToDp(22)} fontSize={pxToDp(32)}>
                    There is a fee for this request.
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <VStack alignItems="flex-end">
              <Pressable>
                <Text
                  w={pxToDp(141)}
                  fontWeight="800"
                  color="white"
                  bg="#5C50D2"
                  borderRadius={pxToDp(31)}
                  h={pxToDp(61)}
                  fontSize={pxToDp(31)}
                  textAlign="center"
                  lineHeight={pxToDp(61)}
                >
                  Edit
                </Text>
              </Pressable>
              <Text fontSize={pxToDp(35)} fontWeight="800">
                $0.11
              </Text>
              <Text color="#8D8D8D" fontSize={pxToDp(26)}>
                0.0003MATIC
              </Text>
            </VStack>
          </HStack>
          <Pressable mt={pxToDp(11)} alignItems="center" flexDirection="row" justifyContent="center">
            <Text color="#5C50D2" fontSize={pxToDp(35)}>
              Hide full transaction details
            </Text>
            <Image source={Icons.arrowDownPIcon} h={pxToDp(31)} w={pxToDp(31)}></Image>
          </Pressable>
        </VStack>

        <HStack py={pxToDp(23)} px={pxToDp(43)} w="100%" borderBottomColor="#F1F1F1" borderBottomWidth={pxToDp(3)}>
          <Image mr={pxToDp(19)} source={Icons.approve3Icon} w={pxToDp(41)} h={pxToDp(40)}></Image>
          <VStack flex="1">
            <HStack w="100%" alignItems="center" justifyContent="space-between">
              <Text fontWeight="800" fontSize={pxToDp(41)}>
                Permission request
              </Text>
              <Pressable>
                <Text
                  w={pxToDp(141)}
                  fontWeight="800"
                  color="white"
                  bg="#5C50D2"
                  borderRadius={pxToDp(31)}
                  h={pxToDp(61)}
                  fontSize={pxToDp(31)}
                  textAlign="center"
                  lineHeight={pxToDp(61)}
                >
                  Edit
                </Text>
              </Pressable>
            </HStack>
            <Text fontSize={pxToDp(31)}>
              <Text textDecorationLine="underline">https://remix.ethereum.org</Text> This maximum amount can be accessed
              and used.
            </Text>
            <Text fontSize={pxToDp(26)}>
              <Text fontWeight="800">Approved amount：</Text>
              250CSY
            </Text>
            <HStack alignItems="center">
              <Text fontSize={pxToDp(26)}>
                <Text fontWeight="800"> Award：</Text>
                Contract(0x015010A5...f567)
              </Text>
              <Image ml={pxToDp(13)} w={pxToDp(57)} h={pxToDp(57)} source={Icons.copyIcon}></Image>
            </HStack>
          </VStack>
        </HStack>
        <VStack w="100%" px={pxToDp(43)} py={pxToDp(28)}>
          <HStack w="100%" justifyContent="space-between">
            <Image mt={pxToDp(11)} mr={pxToDp(19)} source={Icons.approve4Icon} w={pxToDp(32)} h={pxToDp(37)}></Image>
            <VStack>
              <Text fontSize={pxToDp(42)} fontWeight="800">
                Data
              </Text>
              <Text fontSize={pxToDp(32)}>
                <Text fontWeight="800">Function</Text>
                ：agree
              </Text>
              <Text fontSize={pxToDp(32)}>
                0x01516523130dfsadf5316548943216546545sdfsd56465465fsd654655fsfsa56465465456sfs56465465sdf654654f567
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <HStack justifyContent="center" w="100%" mb={pxToDp(47)}>
          <Button
            bg="transparent"
            borderColor="#5C50D2"
            borderWidth={pxToDp(3)}
            mr={pxToDp(53)}
            w={pxToDp(387)}
            color="#5C50D2"
            onPress={() => onClose(false)}
            type="sm"
          >
            Reject
          </Button>
          <Button w={pxToDp(387)} type="sm">
            Confirm
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};

export default React.memo(ApproveComponent);
