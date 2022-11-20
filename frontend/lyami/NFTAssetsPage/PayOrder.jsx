import React, { useState, useCallback } from "react";
import { Box, PresenceTransition, Text, VStack, HStack, Image, Center, Pressable, Avatar } from "native-base";
import { screenWidth, screenHeight, pxToDp } from "../../utils/stylesKits";
import { ImageBackground } from "react-native";
import Button from "../component/Button";
import Icons from "../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
import AlertDialogComp from "../component/AlertDialogComp";
import PriorityEdit from "../component/PriorityEdit";
import config from "../api/util/config";
import global from "../api/util/global";
import Spin from "../component/Spin";
import CrystalBallComponent from "./Crystalball";

const AccountItem = props => {
  const { payload } = props;
  return (
    <VStack alignItems="center">
      <CrystalBallComponent
        type="primary"
        width={pxToDp(117)}
        height={pxToDp(117)}
        gene={payload.slice(2, 38)}
      ></CrystalBallComponent>
      <Text fontWeight="800" fontSize={pxToDp(32)}>
        {handleFormatAddress(payload)}
      </Text>
    </VStack>
  );
};

const PayOrder = props => {
  const navigation = useNavigation();
  const { payStep, setPayStep, fuelCost, setFuelCost, payGas, setPriority, priority, loading } = props;
  const [isConfirm, setIsConfirm] = useState(false);
  const [gasLimit, setGasLimit] = useState(0);
  // const [priority, setPriority] = useState(null);// 燃油费编辑后返回的数据
  const [priorityShow, setPriorityShow] = useState({});

  //二次确认弹窗 确认
  const confirm = props => {
    setIsConfirm(false);
    setPayStep(0);
  };

  // 编辑弹窗 编辑gasfee
  const changeFuel = gasFee => {
    // alert(JSON.stringify(gasFee))
    setPriority(gasFee);
    setFuelCost(gasFee.maxPriorityFee);
  };

  const clickTransform = () => {
    // 支付订单
    payGas();
    // setPayStep(2)
  };

  return (
    <Box position="absolute" w={screenWidth} h={screenHeight} flex="1" bg="#E9ECEE" zIndex="1000">
      <Spin isSpin={loading} textContent="waiting...">
        <PresenceTransition
          visible={payStep === 1}
          initial={{
            opacity: 0,
            translateY: 20,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              duration: 250,
            },
          }}
        >
          <VStack position="relative">
            {/* 顶部导航 页面标题 start  */}
            <Box h={pxToDp(409)} bg="#3A4B86" borderBottomRadius={pxToDp(30)}>
              <HStack
                mt={pxToDp(130)}
                pl={pxToDp(30)}
                pr={pxToDp(30)}
                alignItems="center"
                justifyContent="space-between"
              >
                <Pressable onPress={() => setPayStep(0)}>
                  <Image w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon} />
                </Pressable>
                <Text color="#fff" fontWeight="800" fontSize={pxToDp(50)}>
                  Pay Orders
                </Text>
                <Text />
              </HStack>
            </Box>
            {/* 顶部导航 页面标题 end  */}

            <VStack position="absolute" top={pxToDp(27)}>
              {/* 用户信息  start  */}
              <Box w={screenWidth}>
                <Center>
                  <HStack
                    bg="#fff"
                    alignItems="center"
                    justifyContent="space-around"
                    pl={pxToDp(121)}
                    pr={pxToDp(121)}
                    w={pxToDp(998)}
                    h={pxToDp(321)}
                    borderRadius={pxToDp(30)}
                  >
                    {/* <CrystalBallComponent
                      type="primary"
                      width={pxToDp(119)}
                      height={pxToDp(119)}
                      gene={global.defaultAddress.call().slice(2, 38)}
                    /> */}
                    <AccountItem payload={global.defaultAddress.call()}></AccountItem>
                    <Image
                      mx={pxToDp(92)}
                      alt="img"
                      w={pxToDp(149)}
                      h={pxToDp(47)}
                      resizeMode="stretch"
                      source={Icons.postIcon}
                    />
                    <AccountItem payload={config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]}></AccountItem>
                    {/* <CrystalBallComponent
                      type="primary"
                      width={pxToDp(119)}
                      height={pxToDp(119)}
                      gene={config.CONTRACT_ADDRESS.slice(2, 38)}
                    /> */}
                  </HStack>
                </Center>
              </Box>
              {/* 用户信息  end  */}

              {/* 支付详情 start  */}
              <VStack>
                <Text mt={pxToDp(30)} ml={pxToDp(70)} color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
                  Details
                </Text>
                <Box w={screenWidth} mt={pxToDp(30)}>
                  <Center>
                    <VStack
                      bg="#fff"
                      alignItems="center"
                      justifyContent="space-around"
                      pl={pxToDp(120)}
                      pr={pxToDp(120)}
                      w={pxToDp(998)}
                      h={pxToDp(320)}
                      borderRadius={pxToDp(30)}
                    >
                      <HStack
                        h={pxToDp(156)}
                        borderColor="#F1F1F1"
                        borderBottomWidth={pxToDp(2)}
                        w={pxToDp(998)}
                        pl={pxToDp(40)}
                        pr={pxToDp(40)}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text color="#181818" fontWeight="800" fontSize={pxToDp(42)}>
                          GAS cost
                        </Text>
                        <Text color="#181818" fontWeight="800" fontSize={pxToDp(36)}>
                          {fuelCost} GWei
                        </Text>
                        <Pressable
                          onPress={() => {
                            setPriorityShow(true);
                          }}
                        >
                          <Text
                            w={pxToDp(142)}
                            h={pxToDp(61)}
                            lineHeight={pxToDp(61)}
                            bg="#5C50D2"
                            borderRadius={pxToDp(31)}
                            color="#fff"
                            fontWeight="bold"
                            fontSize={pxToDp(30)}
                            textAlign="center"
                          >
                            Edit
                          </Text>
                        </Pressable>
                      </HStack>
                      <HStack
                        h={pxToDp(156)}
                        borderColor="#F1F1F1"
                        borderBottomWidth={pxToDp(2)}
                        w={pxToDp(998)}
                        pl={pxToDp(40)}
                        pr={pxToDp(40)}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text color="#181818" fontWeight="800" fontSize={pxToDp(42)}>
                          Total amount
                        </Text>
                        <Text color="#181818" fontWeight="800" fontSize={pxToDp(36)}>
                          {fuelCost} GWei
                        </Text>
                        <Text />
                      </HStack>
                    </VStack>
                  </Center>
                </Box>
              </VStack>
              {/* 支付详情 end  */}
              {/* 按钮区域 start  */}
              <HStack justifyContent="space-between" pl={pxToDp(80)} pr={pxToDp(80)} mt={pxToDp(187)}>
                <Pressable onPress={() => setIsConfirm(true)}>
                  <Box
                    w={pxToDp(440)}
                    h={pxToDp(125)}
                    borderRadius={pxToDp(30)}
                    borderWidth={pxToDp(3)}
                    borderColor="#5C50D2"
                  >
                    <Text
                      h={pxToDp(125)}
                      color="#5C50D2"
                      fontWeight="bold"
                      fontSize={pxToDp(50)}
                      textAlign="center"
                      lineHeight={pxToDp(110)}
                    >
                      Recject
                    </Text>
                  </Box>
                </Pressable>
                <Button type="lg" width={pxToDp(440)} height={pxToDp(125)} onPress={() => clickTransform()}>
                  Confirm
                </Button>
              </HStack>
              {/* 按钮区域 end  */}
            </VStack>
          </VStack>

          {/* 二次确认弹窗 start  */}
          <AlertDialogComp
            isOpen={isConfirm}
            close={setIsConfirm}
            title="提示"
            context="确定要放弃吗？"
            confirm={confirm}
          />
          {/* 二次确认弹窗 end  */}

          {/* 燃油费编辑弹窗 start  */}
          <PriorityEdit
            priority={priority}
            setPriority={changeFuel}
            setGasLimit={setGasLimit}
            // initGasLimit={gasFee.count}
            // payload={{ value: order.value, name: order.from.symbol }}
            show={priorityShow}
            close={setPriorityShow}
          />
          {/* 燃油费编辑弹窗 end  */}
        </PresenceTransition>
      </Spin>
    </Box>
  );
};

export default React.memo(PayOrder);
