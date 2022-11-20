/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-22 20:05:11
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-10-11 16:09:48
 * @FilePath: \project\frontend\lyami\IntentModal\ConnectAuthModal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useEffect, useState } from "react";
import { NativeModules } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleGetUserCrystalBalls, handleGetCrystalBallState } from "../api/service";
import { View, Text, HStack, Stack, Center, Box, Button, Spacer, Divider } from "native-base";
import global from "../api/util/global";
import { debounce } from "lodash";

//
function onCancelButtonClick(navigation) {
  navigation.navigate("WalletMainNew", {});
}

const onConnectButtonClick = debounce(async navigation => {
  //请求球的list
  console.log(global.intentData.data.address);
  //请求水晶球
  const userBallData = await handleGetUserCrystalBalls(global.intentData.data.address);
  const {
    data: { Balls },
  } = userBallData;
  const comeballArr = [];
  //循环请求水晶球是否降临
  for (i = 0; i < Balls.length; i++) {
    const item = Balls[i];
    const ballState = await handleGetCrystalBallState(item.Ballid);
    //如果降临
    if (ballState.data[0] && ballState.data[0].Value) {
      comeballArr.push(item.Ballid);
    }
  }
  //   const ballState = await handleGetCrystalBallState(Balls[0])
  // 生成返回数据
  const returnData = {
    address: global.defaultAddress.call(),
    comeballs: comeballArr,
  };
  if (comeballArr.length) {
    const msg = JSON.stringify(returnData);
    await NativeModules.NativeIntent.SetIntentResult(msg);
  } else {
    await NativeModules.NativeIntent.SetIntentResult("没有降临的水晶球");
  }
}, 1000);

export default function ConnectAuthModal() {
  const navigation = useNavigation();
  return (
    <View>
      <Stack mt="4" alignItems="center">
        <Spacer></Spacer>
        <Box>
          <Text>乐亚米钱包</Text>
        </Box>
      </Stack>
      <Divider mt="2"></Divider>
      <Stack mt="4" alignItems="center">
        <HStack>
          <Center>
            <Text>连接请求</Text>
          </Center>
        </HStack>
        <HStack mt="4">
          <Center>
            <Text>{`${global.intentData.name}将要连接到您的钱包`}</Text>
          </Center>
        </HStack>
      </Stack>
      <Divider mt="2"></Divider>
      <Stack mt="4" alignItems="center">
        <HStack>
          <Center>
            <Text>你的钱包地址是</Text>
          </Center>
        </HStack>
        <HStack mt="2">
          <Center>
            <Text>{global.defaultAddress.call()}</Text>
          </Center>
        </HStack>
      </Stack>
      <Divider mt="2"></Divider>
      <Stack mt={4} alignItems="center">
        <HStack>
          <Box w="4%"></Box>
          <Box w="40%">
            <Button color="primary.400" onPress={() => onCancelButtonClick(navigation)}>
              取消
            </Button>
          </Box>
          <Box w="4%"></Box>
          <Box w="40%">
            <Button color="primary.400" onPress={() => onConnectButtonClick(navigation)}>
              连接
            </Button>
          </Box>
          <Box w="4%"></Box>
        </HStack>
      </Stack>
    </View>
  );
}
