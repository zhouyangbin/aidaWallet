import React, { useMemo, useState } from "react";
import {
  HStack,
  Image,
  Pressable,
  StatusBar,
  Text,
  VStack,
  FlatList,
  Actionsheet,
  Modal,
  useToast,
} from "native-base";
import Icons from "../asset/Icon";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../utils/stylesKits";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { Crystalball } from "../api/web3/Crystalball";
import { useNavigation } from "@react-navigation/native";
import config from "../api/util/config";
import global from "../api/util/global";
import rentBg from "@/../../assets/image/UiImg/rentBg.webp";
import rentBtn from "@/../../assets/image/UiImg/rentBtn.webp";
import Button from "../component/Button";
import ReletModal from "./ReletModal";
const titleOneArray = ["Hall", "Game1"];
const titleTwoArray = ["My", "Rental mall"];
const rentDayArray = [1, 2, 3, 4, 5, 6, 7];

const handleGetMyBalls = async (crystalballInstance, setCrystalballList) => {
  try {
    const crystalball = await crystalballInstance.getUserLeaseHoldBall(
      global.defaultAddress.call()
    );

    return setCrystalballList(crystalball.ballList || []);
  } catch (error) {
    console.log(error);
  }
};
const handleGetRandomBalls = async (
  crystalballInstance,
  setCrystalballList
) => {
  const crystalball = await crystalballInstance.getRandomLeaseHoldBallId(
    global.defaultAddress.call(),
    0,
    20
  );
  try {
    const ballProperty = await crystalballInstance.getCrystalballProperty(
      crystalball
    );
    return setCrystalballList([ballProperty] || []);
  } catch (error) {
    console.log(error);
  }
};
const handleLeaseHoldBall = async (
  crystalballInstance,
  ballid,
  setIsLoading,
  toast
) => {
  try {
    const res = await crystalballInstance.LeaseHoldBall(
      global.defaultAddress.call(),
      ballid
    );
  } catch (error) {
    console.log(error);
    toast.show({
      duration: 3500,
      placement: "top",
      description: JSON.stringify(error),
    });
  }
  setIsLoading(false);
};
const Tab = (payload) => {
  const { tabTwoActiveIndex, setTabTwoActiveIndex, setDetailsItem } = payload;
  return (
    <HStack
      justifyContent="center"
      w="100%"
      mt={pxToDp(28)}
      mb={pxToDp(26)}
      borderRadius={pxToDp(16)}
    >
      <HStack
        w={pxToDp(594)}
        h={pxToDp(84)}
        bg="white"
        borderRadius={pxToDp(16)}
        overflow="hidden"
      >
        {titleTwoArray.map((item, index) => {
          return (
            <Pressable
              w={pxToDp(297)}
              h={pxToDp(84)}
              key={index}
              onPress={() => {
                setTabTwoActiveIndex(index);
                setDetailsItem(null);
              }}
              bg={index == tabTwoActiveIndex ? "#5C50D2" : "white"}
              borderRadius={pxToDp(16)}
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize={pxToDp(36)}
                fontWeight={index == tabTwoActiveIndex ? "800" : "500"}
                color={index == tabTwoActiveIndex ? "white" : null}
                textAlign="center"
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </HStack>
  );
};
const Rent = (props) => {
  const [detailsItem, setDetailsItem] = useState(null);
  const [tabOneActiveIndex, setTabOneActiveIndex] = useState(0);
  const [tabTwoActiveIndex, setTabTwoActiveIndex] = useState(0);
  const [crystalballList, setCrystalballList] = useState([]);
  const [selectDayShow, setSelectDayShow] = useState(false);
  const [rentDayIndex, setRentDayIndex] = useState(0);
  const [tipsShow, setTipsShow] = useState(false);
  const [reletShow, setReletShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const crystalballInstance = new Crystalball(
    global.web3,
    config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]
  );
  const navigation = useNavigation();
  const toast = useToast();
  const propertyArray = useMemo(() => {
    return [...new Array(6).keys()];
  }, []);

  const handleCheck = useMemo(() => {
    tabTwoActiveIndex == 0
      ? handleGetMyBalls(crystalballInstance, setCrystalballList)
      : handleGetRandomBalls(crystalballInstance, setCrystalballList);
  }, [tabTwoActiveIndex]);

  return (
    <VStack alignItems="center" w="100%" h="100%">
      {/* <StatusBar hidden={selectDayShow} backgroundColor="transparent" translucent></StatusBar> */}
      <HStack
        mt={pxToDp(141)}
        px={pxToDp(41)}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            w={pxToDp(70)}
            h={pxToDp(49)}
            source={Icons.goBackArrowBIcon}
          ></Image>
        </Pressable>
        <Pressable onPress={() => setTipsShow(true)}>
          <Image
            w={pxToDp(63)}
            h={pxToDp(63)}
            source={Icons.noticeIconB}
          ></Image>
        </Pressable>
      </HStack>
      <ImageBackground
        source={shadowCon}
        style={{
          width: pxToDp(1037),
          height: pxToDp(367),
          marginTop: pxToDp(43),
        }}
      >
        <HStack w="100%" h="100%" alignItems="center" pb={pxToDp(15)}>
          <HStack ml={pxToDp(41)}>
            {detailsItem ? (
              <CrystalBallComponent
                type="primary"
                width={pxToDp(279)}
                height={pxToDp(279)}
                gene={detailsItem.gene}
              ></CrystalBallComponent>
            ) : null}
          </HStack>
          <VStack ml={pxToDp(31)} h="100%">
            <Text mt={pxToDp(71)} fontSize={pxToDp(43)} fontWeight="bold">
              {detailsItem?.ballid}
            </Text>
            {tabTwoActiveIndex == 1 && detailsItem ? (
              <ImageBackground
                source={rentBg}
                style={{
                  width: pxToDp(219),
                  height: pxToDp(76),
                  marginTop: pxToDp(37),
                }}
                resizeMode="stretch"
              >
                <Pressable
                  onPress={() => setSelectDayShow(true)}
                  w="100%"
                  h="100%"
                  alignItems="center"
                  flexDirection="row"
                  pb={pxToDp(3.5)}
                >
                  <Text
                    textAlign="center"
                    fontSize={pxToDp(30)}
                    color="#5C50D2"
                    flex="1"
                  >
                    {rentDayArray[rentDayIndex]} days
                  </Text>
                  <Image source={rentBtn} w={pxToDp(83)} h={pxToDp(69)}></Image>
                </Pressable>
              </ImageBackground>
            ) : null}
          </VStack>
          {tabTwoActiveIndex == 1 && detailsItem ? (
            <VStack
              mb={pxToDp(15)}
              justifyContent="center"
              h="100%"
              flex="1"
              alignItems="flex-end"
              pr={pxToDp(57)}
            >
              <HStack justifyContent="center" alignItems="center">
                <Text
                  mr={pxToDp(13)}
                  fontSize={pxToDp(43)}
                  fontWeight="800"
                  color="#F64949"
                >
                  123111
                </Text>
                <Text fontSize={pxToDp(35)} fontWeight="bold" color="#F64949">
                  LEQ
                </Text>
              </HStack>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  setIsLoading(true);
                  handleLeaseHoldBall(
                    crystalballInstance,
                    detailsItem.ballid,
                    setIsLoading,
                    toast
                  );
                }}
                mt={pxToDp(23)}
                type="sm"
              >
                Rent
              </Button>
            </VStack>
          ) : null}
          {!detailsItem ? (
            <VStack
              w={pxToDp(900)}
              h={pxToDp(300)}
              alignItems="center"
              justifyContent="center"
            >
              <Text>暂无数据</Text>
            </VStack>
          ) : null}
        </HStack>
      </ImageBackground>
      <ImageBackground
        resizeMode="stretch"
        source={shadowCon}
        style={{ width: pxToDp(1037), height: pxToDp(367) }}
      >
        {detailsItem ? (
          <VStack px={pxToDp(19)} justifyContent="center" h="100%">
            <HStack ml={pxToDp(37)} mb={pxToDp(33)}>
              {titleOneArray.map((item, index) => {
                return (
                  <Pressable
                    mr={pxToDp(21)}
                    bg={tabOneActiveIndex == index ? "#5C50D2" : "white"}
                    borderRadius={pxToDp(15.9)}
                    h={pxToDp(79)}
                    w={pxToDp(165)}
                    alignItems="center"
                    key={index}
                    justifyContent="center"
                    borderWidth={pxToDp(2)}
                    borderColor={
                      tabOneActiveIndex == index ? "#5C50D2" : "#636363"
                    }
                    onPress={() => setTabOneActiveIndex(index)}
                  >
                    <Text
                      color={tabOneActiveIndex == index ? "white" : "#181818"}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </HStack>
            <HStack w="100%" px={pxToDp(31)} justifyContent="space-around">
              {propertyArray.map((item, index) => {
                return (
                  <VStack key={index} alignItems="center">
                    <Image
                      resizeMode="stretch"
                      w={pxToDp(87)}
                      h={pxToDp(87)}
                      source={Icons.aidaIcon}
                    ></Image>
                    <Text fontSize={pxToDp(36)}>12{index}</Text>
                  </VStack>
                );
              })}
            </HStack>
          </VStack>
        ) : null}
        {!detailsItem ? (
          <VStack
            w="100%"
            h={pxToDp(367)}
            alignItems="center"
            justifyContent="center"
          >
            <Text>暂无数据</Text>
          </VStack>
        ) : null}
      </ImageBackground>
      <Tab
        setDetailsItem={setDetailsItem}
        tabTwoActiveIndex={tabTwoActiveIndex}
        setTabTwoActiveIndex={setTabTwoActiveIndex}
      ></Tab>
      <VStack flex="1" w="100%">
        <FlatList
          data={crystalballList}
          horizontal={false}
          numColumns={4}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                w="25%"
                alignItems="center"
                justifyContent="center"
                mb={pxToDp(10)}
                onPress={() => setDetailsItem(item)}
              >
                <VStack
                  w={pxToDp(221)}
                  h={pxToDp(271)}
                  borderRadius={pxToDp(31)}
                  alignItems="center"
                  key={index}
                  index={index}
                  borderWidth={pxToDp(5)}
                  borderColor={
                    item.ballid == detailsItem?.ballid
                      ? "#938CF5"
                      : "transparent"
                  }
                  justifyContent="space-between"
                  pt={pxToDp(11)}
                >
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(201)}
                    height={pxToDp(201)}
                    gene={item.gene}
                  ></CrystalBallComponent>
                  <Text
                    w={pxToDp(183)}
                    h={pxToDp(37)}
                    borderRadius={pxToDp(23)}
                    borderColor="#9F99F6"
                    borderWidth={pxToDp(2)}
                    fontSize={pxToDp(22)}
                    color="#5C50D2"
                    fontWeight="bold"
                    textAlign="center"
                    mb={pxToDp(11)}
                  >
                    {item.ballid}
                  </Text>
                </VStack>
              </Pressable>
            );
          }}
        ></FlatList>
      </VStack>
      <Actionsheet
        isOpen={selectDayShow}
        onClose={() => setSelectDayShow(false)}
      >
        <Actionsheet.Content>
          {rentDayArray.map((item, index) => {
            return (
              <Actionsheet.Item
                onPress={() => {
                  setRentDayIndex(index);
                  setSelectDayShow(false);
                }}
                key={index}
              >
                <HStack>
                  <Text fontSize={pxToDp(43)}> {item} days</Text>
                </HStack>
              </Actionsheet.Item>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
      <Modal isOpen={tipsShow} onClose={() => setTipsShow(false)}>
        <Modal.Content w={pxToDp(923)} px={pxToDp(55)} py={pxToDp(53)}>
          <HStack mb={pxToDp(31)}>
            <Text fontSize={pxToDp(37)}>1.</Text>
            <Text fontSize={pxToDp(37)}>
              After the user pays the rental fee, the lottery tickets earned in
              a short period of time belong to the user.
            </Text>
          </HStack>
          <HStack>
            <Text fontSize={pxToDp(37)}>2.</Text>
            <Text fontSize={pxToDp(37)}>
              The leased AIDA cannot be bred or put on the shelves.
            </Text>
          </HStack>
        </Modal.Content>
      </Modal>
      <ReletModal isOpen={reletShow} onClose={setReletShow}></ReletModal>
    </VStack>
  );
};

export default React.memo(Rent);
