import React, { useEffect, useState } from "react";
import { HStack, VStack, Image, Text, Pressable, Modal } from "native-base";
import Icons from "../../asset/Icon";
import AlertDialogComp from "../../component/AlertDialogComp";
import { useNavigation } from "@react-navigation/native";
import PriorityEdit from "../../component/PriorityEdit";
import { handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import { handleFetchTransactionGas } from "../../api/service/index";
import { Crystalball } from "../../api/web3/Crystalball";
import { pxToDp } from "../../../utils/stylesKits";
import { ImageBackground } from "react-native";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import Button from "../../component/Button";
import CrystalBallComponent from "../../NFTAssetsPage/Crystalball";
import { I18n } from "../../../language/I18n";
import global from "../../api/util/global";
import config from "../../api/util/config";
import LinearGradient from "react-native-linear-gradient";
import { useGlobalStore } from "../../api/Store/globalHook";
const AccountItem = props => {
  const { name } = props;
  return (
    <VStack alignItems="center">
      <CrystalBallComponent
        type="primary"
        width={pxToDp(117)}
        height={pxToDp(117)}
        gene={name.slice(2, 38)}
      ></CrystalBallComponent>
      <Text fontWeight="800" fontSize={pxToDp(32)}>
        {handleFormatAddress(name)}
      </Text>
    </VStack>
  );
};
const BreedGas = props => {
  const { setOrderHash, fatherBall, motherBall, gasShow, setGasShow, setBreedResult, setIsBreeded, breedFee } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const [alertShow, setAlertShow] = useState(false);
  const [priorityShow, setPriorityShow] = useState({});
  const [gasLimit, setGasLimit] = useState(0);
  const [priority, setPriority] = useState({});
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);

  //签名
  const onSignTransactionCallback = payload => {
    const translateResult = {
      messageHash: payload.messageHash,
      rawTransaction: payload.rawTransaction,
      transactionHash: payload.transactionHash,
    };

    setOrderHash(translateResult);
    console.log(111, translateResult);
  };
  //支付成功
  const onPaySuccess = payload => {
    console.log("payload777", payload);
    //保存记录
    const orderData = {
      order: {},
      time: new Date().getTime(),
      type: "Send",
      status: "success",
      info: payload,
      address: global.defaultKey.address,
    };
    global.Records.unshift(orderData);
    SaveGlobalData(global.CreateNewPassword);
    handleAddLocalAddress();
    setLoading(false);
    next(step + 1);
  };
  const handleClickBreed = async payload => {
    setLoading(true);
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    try {
      const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
      const gas = await crystalballInstance.reproductionNewBall(fatherBall.ballid, motherBall.ballid);
      const result = await crystalballInstance.reproductionNewBall(
        fatherBall.ballid,
        motherBall.ballid,
        gas,
        priority.MaxPriorityFeePerGas * 10 ** 9,
        breedFee
      );
      //繁育成功 保存记录
      const orderData = {
        order: {
          value: 0,
          selectPayload: {
            symbol: "MITIC",
          },
        },
        time: new Date(),
        type: "breed",
        status: "success",
        info: {
          ...result,
          receipt: {
            from: global.defaultKey.address,
            to: config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId],
          },
        },
        address: global.defaultKey.address,
        priority: priority,
      };
      account.Records.unshift(orderData);
      handleSetGlobalData(globalData);
      setGasShow(false);
      setBreedResult(result);
      setIsBreeded(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      //繁育失败 保存记录
      const orderData = {
        order: {
          value: 0,
          selectPayload: {
            symbol: "MITIC",
          },
        },
        time: new Date(),
        type: "breed",
        status: "fail",
        info: {
          ...result,
          receipt: {
            from: global.defaultKey.address,
            to: config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId],
          },
        },
        address: global.defaultKey.address,
        priority: priority,
      };
      account.Records.unshift(orderData);
      handleSetGlobalData(globalData);
      setLoading(false);
      setGasShow(false);
      // alert(error);
    }
  };

  const handleGetServerGasFee = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    console.log(res);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
    } = res;
    setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
    setGasLimit(GasLimit);
  };
  useEffect(() => {
    handleGetServerGasFee();
    return () => {};
  }, [fatherBall, motherBall]);

  return (
    <Modal isOpen={gasShow} onClose={() => setGasShow(false)}>
      <VStack bg="#E0E2E6" height="100%" alignItems="center" w="100%" position="relative" pt={pxToDp(159)}>
        <HStack position="absolute" top="0" borderBottomRadius={pxToDp(30)} overflow="hidden">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#1E2C5D", "#213370"]}
            style={{ width: "100%", height: pxToDp(528) }}
          />
        </HStack>
        <HStack mb={pxToDp(59)} px={pxToDp(41)} alignItems="center" justifyContent="space-between" w="100%">
          <Pressable onPress={() => setGasShow(false)} w="25%">
            <Image alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon}></Image>
          </Pressable>
          <Text flex="1" textAlign="center" color="white">
            繁育支付确认
          </Text>
          <HStack w="25%"></HStack>
        </HStack>
        <ImageBackground source={shadowCon} style={{ width: pxToDp(998), height: pxToDp(417.8) }} resizeMode="stretch">
          <VStack h="100%" alignItems="center" justifyContent="center">
            <HStack alignItems="center">
              <AccountItem name={global.defaultKey.address}></AccountItem>
              <Image
                mx={pxToDp(92)}
                alt="img"
                w={pxToDp(149)}
                h={pxToDp(47)}
                resizeMode="stretch"
                source={Icons.postIcon}
              ></Image>
              <AccountItem name={config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]}></AccountItem>
            </HStack>
          </VStack>
        </ImageBackground>
        <VStack px={pxToDp(80)} w="100%">
          <Text fontSize={pxToDp(50)} fontWeight="800" mb="1">
            Details
          </Text>
        </VStack>
        <ImageBackground source={shadowCon} style={{ width: pxToDp(998), height: pxToDp(367.5) }} resizeMode="stretch">
          <VStack h="100%" px={pxToDp(61)} pt={pxToDp(29)} pb={pxToDp(59)} w="100%">
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={pxToDp(42)} fontWeight="800">
                {I18n.t("send.FuelCost")}
              </Text>
              <Pressable
                onPress={() => {
                  setPriorityShow(true);
                }}
                w={pxToDp(142)}
                h={pxToDp(61)}
                borderRadius={pxToDp(30.5)}
                bg="#5C50D2"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontSize={pxToDp(30)} fontWeight="bold">
                  {I18n.t("send.edit")}
                </Text>
              </Pressable>
            </HStack>
            <VStack pt={pxToDp(19)} flex="1" w="100%" justifyContent="space-around">
              {/* <Text fontSize={pxToDp(36)}>
                {gasLimit}
              </Text> */}
              <Text>
                <Text fontSize={pxToDp(36)} fontWeight="800">
                  {priority.MaxPriorityFeePerGas} GWei
                </Text>
              </Text>
              <Text>
                <Text fontSize={pxToDp(36)} fontWeight="800">
                  {I18n.t("send.MaximumCost")}: {priority.maxFee} GWei
                </Text>
              </Text>
            </VStack>
          </VStack>
        </ImageBackground>
        <ImageBackground source={shadowCon} style={{ width: pxToDp(998), height: pxToDp(367.5) }} resizeMode="stretch">
          <VStack h="100%" px={pxToDp(61)} pt={pxToDp(29)} pb={pxToDp(57)} w="100%">
            <Text fontSize={pxToDp(50)} fontWeight="800" mb="1">
              {I18n.t("send.totalAmount")}
            </Text>
            <VStack pt={pxToDp(19)} flex="1" w="100%" justifyContent="space-around">
              {/* <Text fontSize={pxToDp(36)}>$0.88</Text> */}
              <Text fontSize={pxToDp(36)} fontWeight="800">
                {/* <Text>
                  {order?.value} {order?.selectPayload.symbol} +
                </Text> */}
                {priority.MaxPriorityFeePerGas}
                <Text> GWei</Text>
              </Text>
              <HStack w="100%" flexWrap="wrap">
                <Text fontSize={pxToDp(36)} fontWeight="800">
                  {I18n.t("send.MaximumCost")}:
                  {/* {order?.value}
                  <Text> {order?.selectPayload.symbol} </Text> */}
                </Text>
                <Text fontSize={pxToDp(36)} fontWeight="800">
                  + {priority.maxFee}
                  <Text> GWei</Text>
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </ImageBackground>
        <HStack w="100%" pt={pxToDp(50)} justifyContent="center">
          <Button
            onPress={() => {
              setAlertShow(true);
            }}
            type="sm"
            bg="transparent"
            color="#5C50D2"
            borderWidth="1"
            borderColor="#5C50D2"
            w={pxToDp(439)}
            h={pxToDp(125)}
            marginRight={pxToDp(44)}
            borderRadius={pxToDp(30)}
            fontSize={pxToDp(50)}
          >
            {I18n.t("send.reject")}
          </Button>
          <Button
            onPress={() => {
              handleClickBreed();
            }}
            type="sm"
            _text={{ fontSize: pxToDp(50) }}
            w={pxToDp(439)}
            h={pxToDp(125)}
            borderRadius={pxToDp(30)}
            fontSize={pxToDp(50)}
            isLoading={loading}
          >
            {I18n.t("send.confirm")}
          </Button>
        </HStack>
        <AlertDialogComp
          confirm={() => {
            setGasShow(false);
          }}
          title="提示"
          context="确定要放弃吗？"
          isOpen={alertShow}
          close={setAlertShow}
        ></AlertDialogComp>
        <PriorityEdit
          priority={priority}
          setPriority={setPriority}
          setGasLimit={setGasLimit}
          // initGasLimit={gasFee.count}
          payload={{ value: "", name: "" }}
          show={priorityShow}
          close={setPriorityShow}
        ></PriorityEdit>
      </VStack>
    </Modal>
  );
};

export default React.memo(BreedGas);
