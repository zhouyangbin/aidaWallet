import React, { useEffect, useState } from "react";
import { Avatar, HStack, VStack, Image, Text, Pressable } from "native-base";
import Icons from "../asset/Icon";
import AlertDialogComp from "../component/AlertDialogComp";
import { useNavigation } from "@react-navigation/native";
import PriorityEdit from "../component/PriorityEdit";
import global from "../api/util/global";
import { handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import {
  handleTransForm,
  handleERC20TransForm,
  handleERC721TransForm,
  handleGetGas,
  handleFetchTransactionGas,
} from "../api/service/index";
import { pxToDp } from "../../utils/stylesKits";
import { ImageBackground } from "react-native";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import Button from "../component/Button";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { I18n } from "../../language/I18n";
import { debounce } from "lodash";
import { useGlobalStore } from "../api/Store/globalHook";

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

const PayStep = props => {
  const { step, next, handleSetSpin, order, setOrderHash, isSpin } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const [alertShow, setAlertShow] = useState(false);
  const [priorityShow, setPriorityShow] = useState({});
  const [gasLimit, setGasLimit] = useState(0);
  const [priority, setPriority] = useState({});
  const navigate = useNavigation();

  const handleAddLocalAddress = payload => {
    global.localOrderAddress.unshift({
      title: handleFormatAddress(order.to),
      image: Icons.bnbIcon,
      account: { address: order.to },
    });
    SaveGlobalData(global.CreateNewPassword);
  };
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
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    const orderData = {
      order: order,
      time: new Date(),
      type: "Send",
      status: "success",
      info: payload,
      address: global.defaultKey.address,
      priority:priority
    };
    account.Records.unshift(orderData);
    handleSetGlobalData(globalData);
    handleAddLocalAddress();
    handleSetSpin(false);
    next(step + 1);
  };
  const clickTransform = debounce(async payload => {
    const { selectPayload } = order;
    handleSetSpin(true);
    console.log(selectPayload, "--------clickTransform--------");
    if (selectPayload.hasOwnProperty("type")) {
      if (selectPayload.type == "ERC20") {
        const gas = await handleERC20TransForm(selectPayload.token, order.to, order.value);
        console.log(gas, "--------clickTransform-----------");
        const res = await handleERC20TransForm(
          selectPayload.token,
          order.to,
          order.value,
          gas,
          onSignTransactionCallback,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          gas,
          priority.maxFee * 10 ** 9
        );
        console.log(res, "--------clickTransform-----------");
        onPaySuccess(res);
        //ERC20
      } else {
        //ERC721
      }
    } else {
      try {
        const gas = await handleGetGas(order);
        const res = await handleTransForm(
          order.from.account,
          order.to,
          order.value,
          onSignTransactionCallback,
          gas,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          gas,
          priority.maxFee * 10 ** 9
        );
        onPaySuccess(res);
      } catch (error) {
        console.log(error);
        // 支付失败
        const Address = globalData.defaultKey.address;
        const ChainId = globalData.defaultNetwork.ChainId;
        let account = {};
        if (globalData.totalAssets[Address] != undefined) {
          account = globalData.totalAssets[Address][ChainId];
        }
        handleSetSpin(false);
        const orderData = {
          order: order,
          time: new Date(),
          type: "Send",
          status: "fail",
          info: error,
          address: global.defaultKey.address,
          priority:priority
        };
        // 保存记录
        account.Records.unshift(orderData);
        handleSetGlobalData(globalData);
        console.log(222, error);
      }
      // 默认币
    }
  }, 1000);

  const handleGetServerGasFee = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
    } = res;
    setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
    setGasLimit(GasLimit);
  };
  useEffect(() => {
    handleGetServerGasFee();
    return () => {};
  }, [order.value, order.to, order.selectPayload.type]);

  return (
    <VStack height="100%" alignItems="center" flex="1" w="100%">
      <ImageBackground source={shadowCon} style={{ width: pxToDp(998), height: pxToDp(417.8) }} resizeMode="stretch">
        <VStack h="100%" alignItems="center" justifyContent="center">
          <HStack alignItems="center">
            <AccountItem name={order.from.account.address}></AccountItem>
            <Image
              mx={pxToDp(92)}
              alt="img"
              w={pxToDp(149)}
              h={pxToDp(47)}
              resizeMode="stretch"
              source={Icons.postIcon}
            ></Image>
            <AccountItem name={order.to}></AccountItem>
          </HStack>
          <Text mt={pxToDp(19)} fontSize={pxToDp(80)} overflow="hidden" fontWeight="bold">
            {Number(Number(order.value).toFixed(6))} {order.selectPayload.symbol}
          </Text>
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
            <Text fontSize={pxToDp(36)}>
              {/* <Text>Gas Limit: </Text> */}
              {gasLimit}
            </Text>
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
            <Text fontSize={pxToDp(36)}>
              {/* $0.88 */}
              </Text>
            <Text fontSize={pxToDp(36)} fontWeight="800">
              <Text>
                {order.value} {order.selectPayload.symbol} +
              </Text>
              {priority.MaxPriorityFeePerGas}
              <Text> GWei</Text>
            </Text>
            <HStack w="100%" flexWrap="wrap">
              <Text fontSize={pxToDp(36)} fontWeight="800">
                {I18n.t("send.MaximumCost")}: {order.value}
                <Text> {order.selectPayload.symbol} </Text>
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
            clickTransform();
          }}
          type="sm"
          _text={{ fontSize: pxToDp(50) }}
          w={pxToDp(439)}
          h={pxToDp(125)}
          borderRadius={pxToDp(30)}
          fontSize={pxToDp(50)}
          isLoading={isSpin}
        >
          {I18n.t("send.confirm")}
        </Button>
      </HStack>
      <AlertDialogComp
        confirm={() => {
          navigate.goBack();
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
        payload={{ value: order.value, name: order.selectPayload.symbol }}
        show={priorityShow}
        close={setPriorityShow}
      ></PriorityEdit>
    </VStack>
  );
};

export default React.memo(PayStep);
