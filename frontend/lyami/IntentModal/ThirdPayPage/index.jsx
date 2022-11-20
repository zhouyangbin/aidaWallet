import React, { useState, useEffect } from "react";
import { HStack, VStack, Image, Text, Center, Divider, Pressable, Button, useToast } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import Spin from "../../component/Spin";
import PriorityEdit from "../../component/PriorityEdit";
import global from "../../api/util/global";
import {
  handleTransForm,
  handleERC20TransForm,
  handleGetGas,
  handleFetchTransactionGas,
} from "../../api/service/index";
import { resetGlobalWeb3 } from "../../api/web3/nativeCoin";
import { pxToDp } from "../../../utils/stylesKits";
import ConfirmBaseCom from "../ConfirmBaseCom";
import { NativeModules } from "react-native";

const PAGE_TITLE = "Pay";
const BUTTON_TEXT = "Immediate payment";
const ThirdPayPage = props => {
  const [order, setOrder] = useState({});
  const [priorityShow, setPriorityShow] = useState(false);
  const [gasLimit, setGasLimit] = useState(0);
  const [priority, setPriority] = useState({});
  const [isSpin, setSpin] = useState(false);
  const [currentNet, setCurrentNet] = useState({});
  const [currentERC20Network, setCurrentERC20Network] = useState({});
  const navigation = useNavigation();
  const toast = useToast();
  const [step, setStep] = useState(1); //1: 提现 or 支付 or 上链 页面   2：成功页面
  const [transactionHash, setTransactionHash] = useState("");

  const onSignTransactionCallback = payload => {
    const translateResult = {
      messageHash: payload.messageHash,
      rawTransaction: payload.rawTransaction,
      transactionHash: payload.transactionHash,
    };

    console.log(translateResult);
  };

  const findERC20Token = (network, address) => {
    for (let token of network.assets) if (token.token == address) return token;
  };

  const handleClickTransform = async payload => {
    setSpin(true);
    if (order.contractAddress) {
      try {
        const gas = await handleERC20TransForm(order.contractAddress, order.targetAddress, order.value);

        const res = await handleERC20TransForm(
          order.contractAddress,
          order.targetAddress,
          order.value,
          gas,
          onSignTransactionCallback,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          gas,
          priority.maxFee * 10 ** 9
        );
        setSpin(false);
        if (res) {
          //显示支付成功页面
          setTransactionHash(res.transactionHash);
          setStep(2);
        }
      } catch (error) {
        setSpin(false);
        // alert(error);
        console.log(error);
      }
    } else {
      try {
        const gas = await handleGetGas({
          from: { account: global.defaultKey },
          to: order.targetAddress,
          value: order.value,
        });

        const res = await handleTransForm(
          global.defaultKey,
          order.targetAddress,
          order.value,
          onSignTransactionCallback,
          gas,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          priority.MaxPriorityFeePerGas * 10 ** 9,
          gas,
          priority.maxFee * 10 ** 9
        );

        setSpin(false);
        if (res) {
          // navigation.navigate("ThirdPaySuccessPage", {
          //   transactionHash: res.transactionHash,
          //   value: order.value,
          //   CoinSymbol: currentNet.CoinSymbol,
          // });
          setStep(2);
        }
      } catch (error) {
        setSpin(false);
        alert(error);
        console.log(error);
      }
      // 默认币
    }
  };

  const handleGetServerGasFee = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
    } = res;
    setGasLimit(GasLimit);
    setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
  };
  const getData = async () => {
    const intentData = global.intentData;
    if (intentData) {
      const { action, data } = intentData;
      if (action != "pay") return;
      setOrder(data);
      const [net] = global.nativeCoinNetwork.filter(item => item.ChainId == data.chainId);
      const [currentAccount] = global.keys.filter(item => item.address == data.address);
      console.log(currentAccount);
      // console.log(currentAccount);
      if (currentAccount) {
        global.defaultKey = currentAccount;
      } else {
        return alert("账号不存在,请确认钱包内有当前地址");
      }

      setCurrentNet(net);
      try {
        const erc20NetWork = findERC20Token(net, data.contractAddress);
        setCurrentERC20Network(erc20NetWork);
      } catch (error) {
        console.log(error);
      }
      resetGlobalWeb3(net.RPC, global.defaultKey.privateKey);
      await handleGetServerGasFee();
    }
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const goBack = async () => {
    const data = {
      result: transactionHash ? true : false,
      transactionHash: transactionHash,
      orderNonce: global.intentData.data.orderNonce,
    };

    await NativeModules.NativeIntent.SetIntentResult(JSON.stringify(data));
  };

  const UseThirdPayCom = props => {
    return (
      <Center mt={pxToDp(80)} pb={pxToDp(50)}>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
          {order.value}
        </Text>
        <Text mt={pxToDp(30)} color="#181818" fontWeight="800" fontSize={pxToDp(42)}>
          {currentERC20Network ? currentERC20Network.CoinSymbol : currentNet.CoinSymbol}
        </Text>
      </Center>
    );
  };
  return (
    <Spin isSpin={isSpin}>
      <ConfirmBaseCom
        order={order}
        currentNet={currentNet}
        buttonText={BUTTON_TEXT}
        pageTitle={PAGE_TITLE}
        render={() => <UseThirdPayCom />}
        setStep={setStep}
        step={step}
        goBack={() => goBack()}
        clickHandler={handleClickTransform}
        priority={priority}
        setPriority={setPriority}
        setGasLimit={setGasLimit}
        gasLimit={gasLimit}
        transactionHash={transactionHash}
      />
    </Spin>
  );
};

export default React.memo(ThirdPayPage);
