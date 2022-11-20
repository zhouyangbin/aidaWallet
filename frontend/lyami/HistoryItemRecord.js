import React, { useState, useCallback } from "react";
import { Text, VStack, Center, Image, HStack, Pressable, useToast, ScrollView } from "native-base";
import Icons from "./asset/Icon.js";
import { pxToDp, screenWidth } from "../utils/stylesKits";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { NativeModule, StyleSheet } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { useGlobalStore } from "./api/Store/globalHook";
import CrystalBallComponent from "./NFTAssetsPage/Crystalball";
const HistoryItemRecord = props => {
  const { globalData, currentAccount } = useGlobalStore();
  const navigation = useNavigation();
  const [detail, setDetail] = useState(null);
  const transactionHash = props.route.params.transactionHash;
  const imgIcon = {
    Send: Icons.hisTradingIcon,
    ProductBall: Icons.hisTradingIcon,
    breed: Icons.hisCollectIcon,
    Recelve: Icons.hisReceiveIcon,
    Pay: Icons.hisItemOrangeIcon,
    Collent: Icons.hisCollectIcon,
  };
  useFocusEffect(
    useCallback(() => {
      //详情
      let itemDetail;
      //交易的hash
      if (transactionHash) {
        itemDetail = currentAccount.Records.filter(item => item.info.transactionHash == transactionHash)[0];
      } else {
        itemDetail = props.route.params.item;
      }
      console.log(itemDetail, "itemDetail");
      setDetail(itemDetail);
      return () => {
        () => {};
      };
    }, [])
  );
  const handleSetClipboard = text => {
    Clipboard.setString(text);
      toast.show({
        description: "已复制到剪贴板",
        placement: "top",
        duration: 1500,
      });
  };
  const toast = useToast();
  const formatDefaultHash = hash => {
    if (hash) {
      const subText = `${hash.substring(0, 7)}...${hash.substring(hash.length - 5, hash.length)}`;
      return subText;
    } else {
      return "...";
    }
  };
  return (
    <>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <VStack
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        top="0"
        bg="#"
        pl={pxToDp(41)}
        pr={pxToDp(41)}
        justifyContent="space-between"
      >
        {/* 返回按钮 start  */}
        <HStack alignItems="center" mt={pxToDp(130)}>
          <Pressable onPress={() => (transactionHash ? navigation.navigate("Intent", {}) : navigation.goBack())}>
            <Image alt="img" w={pxToDp(50)} h={pxToDp(35)} source={Icons.goBackArrowBIcon} />
          </Pressable>
          <Text ml={pxToDp(67)} color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
            Details
          </Text>
        </HStack>
        <VStack
          mt={pxToDp(140)}
          h={pxToDp(527)}
          bg="#fff"
          w={pxToDp(998)}
          borderRadius={pxToDp(30)}
          pt={pxToDp(26)}
          pl={pxToDp(41)}
          pr={pxToDp(41)}
        >
          <HStack alignItems="center" h={pxToDp(121)} justifyContent="center">
            <Center
              w={pxToDp(198)}
              h={pxToDp(198)}
              bg="#fff"
              borderRadius={pxToDp(100)}
              position="absolute"
              top={pxToDp(-70)}
            >
              {/* <Text>{detail?.type}</Text> */}
              {detail?.type ? <Image alt="img" w={pxToDp(118)} h={pxToDp(118)} source={imgIcon[detail.type]} /> : null}
            </Center>
          </HStack>
          <HStack alignItems="center" h={pxToDp(121)} justifyContent="center">
            {/* left头像 */}
            {detail?.type ? (
              <HStack bg="#EEEEEF" borderRadius={pxToDp(280)} borderWidth={pxToDp(6)} borderColor="white" shadow={9}>
                {detail?.order?.from?.account?.address ? (
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(118)}
                    height={pxToDp(118)}
                    gene={detail?.order?.from?.account?.address.slice(2, 38)}
                  ></CrystalBallComponent>
                ) : null}
                {detail?.info?.receipt?.from ? (
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(118)}
                    height={pxToDp(118)}
                    gene={detail?.info?.receipt?.from.slice(2, 38)}
                  ></CrystalBallComponent>
                ) : null}
              </HStack>
            ) : !detail?.order?.from?.account?.address || !detail?.info?.receipt?.from ? (
              <Image alt="img" w={pxToDp(118)} h={pxToDp(118)} source={Icons.contractIcon} />
            ) : null}
            <Image
              alt="img"
              ml={pxToDp(21)}
              mr={pxToDp(21)}
              w={pxToDp(149)}
              h={pxToDp(49)}
              source={Icons.recordDeC1Icon}
            />
            {/* right头像 */}
            {detail?.type ? (
              <HStack bg="#EEEEEF" borderRadius={pxToDp(280)} borderWidth={pxToDp(6)} borderColor="white" shadow={9}>
                {detail?.order?.to ? (
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(118)}
                    height={pxToDp(118)}
                    gene={detail?.order?.to.slice(2, 38)}
                  ></CrystalBallComponent>
                ) : null}
                {detail?.info?.receipt?.to ? (
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(118)}
                    height={pxToDp(118)}
                    gene={detail?.info?.receipt?.to.slice(2, 38)}
                  ></CrystalBallComponent>
                ) : null}
              </HStack>
            ) : !detail?.order?.to || !detail?.info?.receipt?.to ? (
              <Image alt="img" w={pxToDp(118)} h={pxToDp(118)} source={Icons.contractIcon} />
            ) : null}
          </HStack>
          <HStack>
            <Pressable
              onPress={() => {
                handleSetClipboard(detail?.order?.from?.account?.address);
              }}
              alignItems="center"
            >
              <HStack alignItems="center" justifyContent="center">
                <Text fontSize={pxToDp(31)} h={pxToDp(51)} w="50%">
                  {formatDefaultHash(detail?.order?.from?.account?.address || detail?.info?.receipt?.from)}
                </Text>
                {detail?.order?.from?.account?.address || detail?.info?.receipt?.from ? (
                  <Image alt="img" w={pxToDp(31)} h={pxToDp(31)} source={Icons.copyIcon} />
                ) : null}
              </HStack>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSetClipboard(detail?.order?.to || detail?.info?.receipt?.to);
              }}
              alignItems="center"
            >
              <HStack alignItems="center" justifyContent="center">
                <Text fontSize={pxToDp(31)} h={pxToDp(51)} w="50%">
                  {formatDefaultHash(detail?.order?.to || detail?.info?.receipt?.to)}
                </Text>
                {detail?.order?.to || detail?.info?.receipt?.to ? (
                  <Image alt="img" w={pxToDp(31)} h={pxToDp(31)} source={Icons.copyIcon} />
                ) : null}
              </HStack>
            </Pressable>
          </HStack>
          <Center>
            {/* <Text mt={pxToDp(10)} color="#F52626" fontWeight="bold" fontSize={pxToDp(42)}>
              Transaction {detail?.type}
            </Text> */}
            <Text mt={pxToDp(10)} color="#181818" fontWeight="800" fontSize={pxToDp(61)}>
              {detail?.order?.value} {detail?.order?.selectPayload?.symbol  || detail?.order?.from?.name}
            </Text>
            <HStack>
              {/* <Text mt={pxToDp(10)} color="#7F7F7F" fontWeight="500" fontSize={pxToDp(32)}>
                Transaction {detail?.status}
              </Text> */}
              <Text mt={pxToDp(10)} ml={pxToDp(19)} color="#7F7F7F" fontWeight="500" fontSize={pxToDp(33)}>
                Gas{detail?.priority ? detail?.priority?.maxFee : 0}
              </Text>
            </HStack>
          </Center>
        </VStack>
        <ScrollView mt={pxToDp(40)} borderTopRadius={pxToDp(60)} bg="#fff">
          <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>Transaction address</Text>
            <Pressable
              onPress={() => {
                handleSetClipboard(detail?.info?.receipt?.transactionHash || detail?.info?.transactionHash);
              }}
              alignItems="center"
            >
              <HStack alignItems="center" justifyContent="center">
                <Text style={[styles.rightText]}>
                {formatDefaultHash(detail?.info?.receipt?.transactionHash || detail?.info?.transactionHash)}
                </Text>
                {detail?.info?.receipt?.transactionHash || detail?.info?.transactionHash ? (
                  <Image alt="img" w={pxToDp(31)} h={pxToDp(31)} source={Icons.copyIcon} />
                ) : null}
              </HStack>
            </Pressable>
          </HStack>
          {/* <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>Type</Text>
            <Text style={[styles.rightText]}>{detail?.type}</Text>
          </HStack> */}
          <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>State</Text>
            {detail?.status ? (
              <HStack alignItems="center">
                <Image
                  alt="img"
                  mr={pxToDp(19)}
                  h={pxToDp(41)}
                  w={pxToDp(41)}
                  source={detail.status == "success" ? Icons.hisResolvedIcon : Icons.hisRejectIcon}
                />
                <Text style={[styles.rightText]}>
                  {detail?.status}
                </Text>
              </HStack>
            ) : null}
          </HStack>
          <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>Time</Text>
            <Text style={[styles.rightText]}>{moment(detail?.time).format("YYYY:MM:DD:HH:mm:ss")}</Text>
          </HStack>
          {/* <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>Trader address</Text>
            <Text style={[styles.rightText]}>{formatDefaultHash(detail?.order?.to)}</Text>
          </HStack> */}
          {/* <HStack style={[styles.lineBox]}>
            <Text style={[styles.leftText]}>Value</Text>
            <Text style={[styles.rightText]}>
              {detail?.order?.value} {detail?.order?.selectPayload?.symbol}
            </Text>
          </HStack> */}
        </ScrollView>
      </VStack>
    </>
  );
};
const styles = StyleSheet.create({
  lineBox: {
    paddingLeft: pxToDp(49),
    paddingRight: pxToDp(42),
    alignItems: "center",
    height: pxToDp(130),
    // borderBottomWidth: pxToDp(1),
    // borderBottomColor: "#EAEAEA",
    justifyContent: "space-between",
  },
  leftText: {
    height: pxToDp(130),
    lineHeight: pxToDp(130),
    color: "#181818",
    fontWeight: "400",
    fontSize: pxToDp(38),
  },
  rightText: {
    height: pxToDp(130),
    lineHeight: pxToDp(130),
    color: "#181818",
    fontWeight: "500",
    fontSize: pxToDp(38),
  },
});
export default React.memo(HistoryItemRecord);
