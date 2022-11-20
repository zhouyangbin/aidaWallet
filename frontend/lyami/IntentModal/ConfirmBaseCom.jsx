import { HStack, Pressable, Text, VStack, Box, Center, Image } from "native-base";
import React, { useState } from "react";
import { pxToDp, screenHeight, screenWidth } from "../../utils/stylesKits";
import Button from "../component/Button";
import Icons from "../asset/Icon";
import { handleFetchTransactionGas } from "../api/service/index";
import global from "../api/util/global";
import PriorityEdit from "../component/PriorityEdit";

const ConfirmContent = props => {
  const { render, buttonText, setStep, clickHandler, pageTitle, priority, setPriorityShow, order } = props;

  const clickButtonHandler = () => {
    // setStep(2)
    clickHandler();
  };
  return (
    <Box>
      {pageTitle === "Pay" ? (
        <VStack mt={pxToDp(60)} pt={pxToDp(30)} pl={pxToDp(70)} w={screenWidth} h={pxToDp(264)} bg="#1F2F65">
          <Text color="#fff" fontWeight="800" fontSize={pxToDp(50)}>
            Order name
          </Text>
          <Text color="#fff" fontWeight="500" fontSize={pxToDp(50)}>
            {order?.orderName}
          </Text>
        </VStack>
      ) : null}
      <Box position="relative" top={pageTitle === "Pay" ? -pxToDp(64) : pxToDp(200)}>
        {/* 卡片内容 start  */}
        <Center>
          <VStack w={pxToDp(998)} borderRadius={pxToDp(30)} bg="#fff" position="relative">
            {render()}
            {pageTitle !== "Withdraw" ? (
              <HStack
                pl={pxToDp(41)}
                pr={pxToDp(41)}
                alignItems="center"
                justifyContent="space-between"
                w={pxToDp(998)}
                // position="absolute"
                h={pxToDp(97)}
                // bottom="0"
                borderColor="#F1F1F1"
                borderTopWidth={pxToDp(3)}
              >
                <Text color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
                  Fuel cost
                </Text>
                <HStack alignItems="center">
                  <Text color="#181818" fontWeight="800" fontSize={pxToDp(42)}>
                    {priority.MaxPriorityFeePerGas}
                  </Text>
                  <Text ml={pxToDp(10)} color="#181818" fontWeight="500" fontSize={pxToDp(38)}>
                    GWei
                  </Text>
                </HStack>
                <Pressable
                  w={pxToDp(142)}
                  h={pxToDp(61)}
                  bg="#5C50D2"
                  borderRadius={pxToDp(31)}
                  onPress={() => setPriorityShow(true)}
                >
                  <Text textAlign="center" lineHeight={pxToDp(61)} color="#fff" fontWeight="bold" fontSize={pxToDp(30)}>
                    Edit
                  </Text>
                </Pressable>
              </HStack>
            ) : null}
          </VStack>
        </Center>
        {/* 卡片内容 end  */}
        <Center mt={pxToDp(200)}>
          <Button type="lg" w={pxToDp(858)} h={pxToDp(145)} onPress={() => clickButtonHandler()}>
            {buttonText}
          </Button>
          {/* <HStack w="100%" mt={pxToDp(50)}>
            <Pressable w="50%">
              <Text textAlign="center" color="#5C50D2" fontWeight="800" fontSize={pxToDp(42)}>
                Go to buy
              </Text>
            </Pressable>
            <Pressable w="50%">
              <Text textAlign="center" color="#5C50D2" fontWeight="800" fontSize={pxToDp(42)}>
                Go to redeem
              </Text>
            </Pressable>
          </HStack> */}
        </Center>
      </Box>
    </Box>
  );
};

const ConfirmResult = props => {
  const { setStep, goBack, order, transactionHash, pageTitle } = props;
  const gotoMerchant = () => {
    goBack();
    // setStep(1)
  };
  return (
    <Center>
      <Image mt={pxToDp(159)} w={pxToDp(499)} h={pxToDp(507)} source={Icons.paySuccessIcon} />
      <Text mt={pxToDp(90)} color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
        {pageTitle === "Withdrawal"
          ? "Withdrawal succeeded"
          : pageTitle === "Pay"
          ? "Transaction completed"
          : "META Chain succeeded"}
      </Text>
      {pageTitle === "Pay" ? (
        <Text mt={pxToDp(80)} color="#181818" fontWeight="500" width="80%" fontSize={pxToDp(41)}>
          {transactionHash}
        </Text>
      ) : null}

      {order ? (
        <Text mt={pxToDp(70)} color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
          {order?.value}
        </Text>
      ) : null}

      <Button mt={pxToDp(180)} w={pxToDp(858)} h={pxToDp(145)} type="lg" onPress={() => gotoMerchant()}>
        Return to merchant
      </Button>
    </Center>
  );
};
/**
 *
 * @param {*} pageTitle  页面标题
 * @param {*} buttonText  按钮文字
 * @param {*} pageTitle  页面标题
 * @param {*} pageTitle  页面标题
 * @returns
 */
const ConfirmBaseCom = props => {
  const {
    order,
    currentNet,
    step,
    setStep,
    render,
    pageTitle,
    buttonText,
    goBack,
    clickHandler,
    priority,
    setPriority,
    setGasLimit,
    transactionHash,
  } = props;
  const [priorityShow, setPriorityShow] = useState(false);
  // const [priority, setPriority] = useState({});
  // const [gasLimit, setGasLimit] = useState(0);

  // const handleGetServerGasFee = async () => {
  //   const resp = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
  //   console.log(resp.data.standard);
  //   setPriority(resp.data.standard);
  // };

  // useEffect(() => {
  //   // 获取gas费用
  //   handleGetServerGasFee();
  //   return () => {};
  // }, []);

  return (
    <VStack w={screenWidth} h={screenHeight} bg="#f5f8fa" position="absolute">
      {/* 顶部导航 + 页面标题 start  */}
      <HStack mt={pxToDp(79)} alignItems="center" justifyContent="space-between">
        <Pressable w="25%" onPress={() => goBack()}>
          <Image ml={pxToDp(41)} w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text flex="1" textAlign="center" color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          {pageTitle}
        </Text>
        <Text w="25%"></Text>
      </HStack>
      {/* 顶部导航 + 页面标题 end  */}

      {/* 提现 or 支付 or 上链 确认信息 start  */}
      {step === 1 ? (
        <ConfirmContent
          priority={priority}
          pageTitle={pageTitle}
          clickHandler={clickHandler}
          setStep={setStep}
          render={render}
          buttonText={buttonText}
          setPriorityShow={setPriorityShow}
          order={order}
        />
      ) : null}
      {/* 提现 or 支付 or 上链 确认信息 end  */}

      {/* 确认结果 信息 start  */}
      {step === 2 ? (
        <ConfirmResult
          pageTitle={pageTitle}
          order={order}
          transactionHash={transactionHash}
          goBack={goBack}
          setStep={setStep}
        />
      ) : null}
      {/* 确认结果 信息 end  */}

      {/* gas 费用编辑弹窗 start 提现不用gas费  */}
      {pageTitle !== "Withdraw" ? (
        <PriorityEdit
          priority={priority}
          setPriority={setPriority}
          setGasLimit={setGasLimit}
          payload={{ value: order?.value, name: currentNet?.CoinSymbol }}
          show={priorityShow}
          close={setPriorityShow}
        />
      ) : null}
      {/* gas 费用编辑弹窗 end  */}
    </VStack>
  );
};

export default React.memo(ConfirmBaseCom);
