import React, { useMemo, useState } from "react";
import Clipboard from "@react-native-community/clipboard";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  Center,
  Flex,
  Pressable,
  useToast,
  Actionsheet,
  Box,
  VStack,
  HStack,
  PresenceTransition,
} from "native-base";
import QR from "react-native-qrcode-svg";
// import global from "../api/util/global";
import ShareComponent from "../component/ShareComponent";
import Icons from "../asset/Icon.js";
import paymentCon from "@/../../assets/image/UiImg/paymentCon.webp";
import { ImageBackground, StatusBar } from "react-native";
import { pxToDp } from "../../utils/stylesKits";
import Button from "../component/Button";
import LinearGradient from "react-native-linear-gradient";
import { I18n } from "../../language/I18n";
import { useGlobalStore } from "../api/Store/globalHook"

const id = "toastId";
function formatAddress(address) {
  return "0x" + address.substring(0, 8) + "..." + address.substring(address.length - 8, address.length);
}

//复制地址到剪贴板
const clipClickHandler = (toast,globalData) => {
  // const { globalData, handleSetGlobalData } = useGlobalStore();
  try {
    Clipboard.setString(globalData.defaultAddress.call());
    if (!toast.isActive(id)) {
      toast.show({
        placement: "top",
        duration: 2000,
        render: () => {
          return (
            <Box bg="#1296db" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
              {/* 链接已复制到剪贴板! */}
              {I18n.t('receive.copySuccessToast')}
            </Box>
          );
        },
      });
    }
  } catch (e) {
    console.log(e, "err");
    toast.show({
      title: "存入剪贴板出错",
      placement: "top",
      duration: 1000,
    });
  }
};

const getString = async () => {
  try {
    const res = await Clipboard.getString();
    console.log(res, "从剪贴板获取数据");
  } catch (err) {
    console.log("从剪贴板获取数据失败，", err);
  }
};
// 分享
const shareAddress = props => {
  const { setShowShareModal } = props;
  setShowShareModal(true);
  getString();
  //TODO 分享
};

// 收款弹窗
function CollectionModal(props) {
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigation = useNavigation();
  const toast = useToast();
  const [showShareModal, setShowShareModal] = useState(false);
  const QRPayload = useMemo(() => {
    return JSON.stringify({
      action: "pay",
      type: 1,
      address: globalData.defaultAddress.call(),
    });
  }, [globalData.defaultAddress.call()]);
  return (
    <VStack h="100%" w="100%" alignItems="center">
      {/* <StatusBar translucent={true} backgroundColor="transparent"></StatusBar> */}
      <HStack h={pxToDp(300)} px={pxToDp(41)} w="100%" alignItems="center" bg="#22267F">
          <Pressable w="33%" onPress={() => {navigation.goBack()}}>
            <Image alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon}></Image>
          </Pressable>
          <Text w="33%" textAlign="center" fontSize={pxToDp(50)} fontWeight="800" color="white">
            {I18n.t('receive.receive')}
          </Text>
          <Text w="33%"></Text>
      </HStack>
      <ShareComponent showModal={showShareModal} setShowModal={setShowShareModal}></ShareComponent>
      <VStack flex="1" w="100%" alignItems="center">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#352FB4", "#222781"]}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <ImageBackground
          source={paymentCon}
          resizeMode="stretch"
          style={{ width: pxToDp(1005), height: pxToDp(1316), marginTop: pxToDp(99) }}
        >
          <VStack alignItems="center" pt={pxToDp(205)}>
            <QR value={QRPayload} size={pxToDp(396)} />
            <Text mt={pxToDp(61)} fontSize={pxToDp(36)} fontWeight="400">
              {/* Scan address to receive payment */}
              {I18n.t('receive.scanAddressToReceiveMoney')}
            </Text>
            <HStack
              w={pxToDp(922)}
              h={pxToDp(113)}
              borderRadius={pxToDp(30)}
              bg="#EBEBEB"
              alignItems="center"
              justifyContent="space-between"
              mt={pxToDp(44)}
            >
              <Text ml={pxToDp(38)} color="#9FA1A8" fontSize={pxToDp(38)}>
                {formatAddress(globalData.defaultAddress.call())}
              </Text>
              <HStack mr={pxToDp(30)}>
                <Pressable onPress={() => clipClickHandler(toast,globalData)}>
                  <Image alt="img" w={pxToDp(64)} h={pxToDp(64)} source={Icons.copyIconB}></Image>
                </Pressable>
                <Pressable ml={pxToDp(49)} onPress={() => shareAddress({ setShowShareModal })}>
                  <Image alt="img" source={Icons.shareIcon} w={pxToDp(59)} h={pxToDp(61)} />
                </Pressable>
              </HStack>
            </HStack>
            <Button
              mt={pxToDp(160)}
              type="lg"
              onPress={() => {
                navigation.navigate("Payment", {});
              }}
            >
              {/* Request Payment  */}
              {I18n.t('receive.requestForPay')}
            </Button>
          </VStack>
        </ImageBackground>
      </VStack>
    </VStack>
  );
}

export default React.memo(CollectionModal);
