import React, { useState, useMemo, useCallback, useContext } from "react";
import { VStack, HStack, Pressable, Text, Image } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DeviceEventEmitter, ImageBackground } from "react-native";
import AmountStep from "./AmountStep";
import AccountStep from "./AccountStep";
import Spin from "../component/Spin";
import PayStep from "./PayStep";
import PaySuccess from "./PaySuccess";
import global from "../api/util/global";
import { resetGlobalWeb3, getBalance } from "../api/web3/nativeCoin";
import { pxToDp } from "../../utils/stylesKits";
import Button from "../component/Button";
import LinearGradient from "react-native-linear-gradient";
import Icons from "../asset/Icon";
import SelectNetWork from "../component/SelectNetWork";
import netwrap from "@/../../assets/image/UiImg/netwrap.webp";
import netpoint from "@/../../assets/image/UiImg/netPoint.webp";
import { I18n } from "../../language/I18n";
import { useGlobalStore } from "../api/Store/globalHook";
import LoadingContext from "../../providers/LoadContext";
const PostAsset = props => {
  const {
    route: {
      params: { address, sendParams, currentCoin },
    },
  } = props;

  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigate = useNavigation();
  const [step, setStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectNetworkShow, setSelectNetworkShow] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  const [spinText, setSpinText] = useState(I18n.t("global.loadingText"));
  const [nextDisabled, setNextDisabled] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderHash, setOrderHash] = useState(null);
  // const [initCoin, setInitCoin] = useState(null);
  const loading = useContext(LoadingContext);

  const handleSetStep = payload => {
    setStep(payload);
  };
  const handleSetSpin = payload => {
    setIsSpin(payload);
  };
  const fromScan = useMemo(() => {
    if (address) return true;
    return false;
  }, [address]);

  useFocusEffect(
    useCallback(() => {
      loading.hideMenu();
      return () => {};
    }, [currentCoin])
  );
  return (
    <VStack textContent={spinText} isSpin={isSpin}>
      <VStack h="100%" alignItems="center">
        {step == 2 ? (
          <HStack position="absolute" top="0" borderBottomRadius={pxToDp(30)} overflow="hidden">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#1E2C5D", "#213370"]}
              style={{ width: "100%", height: pxToDp(528) }}
            />
          </HStack>
        ) : null}
        <HStack mt={pxToDp(63)}>
          {step < 2 ? (
            <ImageBackground source={netwrap} style={{ width: pxToDp(497), height: pxToDp(91) }}>
              <Pressable
                onPress={() => {
                  setSelectNetworkShow(true);
                }}
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="center"
              >
                <HStack alignItems="center" mb={pxToDp(10)}>
                  <Image mr={pxToDp(22)} w={pxToDp(41)} h={pxToDp(41)} source={netpoint}></Image>
                  <Text fontSize={pxToDp(30)} fontWeight="400">
                    {globalData.defaultNetwork.name}
                  </Text>
                </HStack>
              </Pressable>
            </ImageBackground>
          ) : null}
        </HStack>

        <HStack w="100%" mb={pxToDp(47)} alignItems="center" justifyContent="space-between">
          <Pressable
            w="30%"
            onPress={() => {
              if (step == 0 || step == 3) return;
              setStep(step - 1);
            }}
          >
            {step == 1 ? (
              <Text
                ml={pxToDp(46)}
                color={step == 2 ? "white" : "#5C50D2"}
                fontWeight="bold"
                fontSize={pxToDp(40)}
                textAlign="left"
              >
                {I18n.t("send.return")}
              </Text>
            ) : step == 2 ? (
              <Image ml={pxToDp(41)} w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon}></Image>
            ) : null}
          </Pressable>
          <VStack flex="1" h={pxToDp(88)} alignItems="center" justifyContent="center">
            <Text fontWeight="800" color={step == 2 ? "white" : "#181818"} fontSize={pxToDp(50)}>
              {step == 0 ? I18n.t("send.sendFromTo") : step == 1 ? I18n.t("send.amount") : I18n.t("send.sendOrder")}
            </Text>
          </VStack>
          <Pressable
            w="30%"
            onPress={() => {
              if (step == 2) {
                return;
              }

              navigate.goBack();
            }}
            alignItems="flex-end"
          >
            {step != 3 ? (
              <Text
                mr={pxToDp(46)}
                fontSize={pxToDp(40)}
                fontWeight="bold"
                color={step != 2 ? "#5C50D2" : "transparent"}
              >
                {I18n.t("send.cancel")}
              </Text>
            ) : null}
          </Pressable>
        </HStack>

        {step == 0 ? (
          <AccountStep
            order={order}
            fromScan={fromScan}
            setOrder={setOrder}
            setNextDisabled={setNextDisabled}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            scanAddress={address}
          ></AccountStep>
        ) : step == 1 ? (
          <AmountStep
            order={order}
            sendParams={sendParams}
            setOrder={setOrder}
            setNextDisabled={setNextDisabled}
            initCoin={currentCoin}
          ></AmountStep>
        ) : step == 2 ? (
          <PayStep
            order={order}
            setOrder={setOrder}
            step={step}
            next={handleSetStep}
            handleSetSpin={handleSetSpin}
            setOrderHash={setOrderHash}
            isSpin={isSpin}
          ></PayStep>
        ) : (
          <PaySuccess orderHash={orderHash} order={order}></PaySuccess>
        )}
        {isScanning || step == 2 ? null : (
          <HStack alignItems="center" mb={pxToDp(65)}>
            <Button
              type="lg"
              isDisabled={nextDisabled}
              onPress={() => {
                if (step == 3) {
                  navigate.goBack();
                } else {
                  setStep(step + 1);
                }
              }}
            >
              {step != 3 ? I18n.t("send.nextStep") : I18n.t("send.return")}
            </Button>
          </HStack>
        )}
        <SelectNetWork show={selectNetworkShow} setModalShow={setSelectNetworkShow}></SelectNetWork>
      </VStack>
    </VStack>
  );
};

export default React.memo(PostAsset);
