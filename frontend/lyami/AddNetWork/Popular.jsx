import React, { useState, useEffect } from "react";
import { VStack, FlatList, HStack, Image, Text, Pressable } from "native-base";
import shadowF from "@/../../assets/image/UiImg/shadowCon.webp";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import global from "../api/util/global";
import Web3 from "web3";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";

const Popular = props => {
  const { popularArray, setIsLoading } = props;

  return (
    <VStack flex="1" w="100%" pt={pxToDp(49)} alignItems="center">
      <FlatList
        data={popularArray}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground
              key={index}
              resizeMode="stretch"
              source={shadowF}
              style={{ width: pxToDp(1061), height: pxToDp(165), marginBottom: pxToDp(27) }}
            >
              <HStack w="100%" h="100%" justifyContent="space-between" alignItems="center">
                <HStack ml={pxToDp(53)} alignItems="center">
                  <Image w={pxToDp(71)} h={pxToDp(71)} source={item.img}></Image>
                  <Text fontSize={pxToDp(41)} ml={pxToDp(33)}>
                    {item.name}
                  </Text>
                </HStack>
                <HStack alignItems="center" mr={pxToDp(49)}>
                  <Image w={pxToDp(37)} h={pxToDp(33)} mr={pxToDp(31)} source={Icons.warningIcon}></Image>
                  <Pressable
                    w={pxToDp(143)}
                    h={pxToDp(61)}
                    bg="#ECEBF7"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={pxToDp(30.5)}
                    onPress={() => {
                      let address = global.defaultAddress.call();
                      try {
                        setIsLoading(true);
                        const web3 = new Web3(item.RPC);
                        web3.eth
                          .getBalance(address)
                          .then(e => {
                            global.nativeCoinNetwork.push({
                              name: item.name.trim(),
                              RPC: item.RPC.trim(),
                              ChainId: item.ChainId.trim(),
                              CoinSymbol: item.CoinSymbol.trim(),
                              BlockScan: item.BlockScan ? item.BlockScan.trim() : null,
                              isTestNetwork: false,
                              isCustom: false,
                            });
                            SaveGlobalData(global.CreateNewPassword);
                            // toast.show({ description: "添加成功", placement: "top", duration: 2000 });
                            setModalShow(false);
                          })
                          .catch(error => {
                            console.log(error);
                            setIsLoading(false);
                            // toast.show({ description: "请输入正确的RPC", placement: "top", duration: 2000 });
                          })
                          .finally(e => {
                            setIsLoading(false);
                          });
                      } catch (error) {
                        console.log(error);
                        // toast.show({ description: "请输入正确的RPC", placement: "top", duration: 2000 });
                        setIsLoading(false);
                      }
                    }}
                  >
                    <Text fontSize={pxToDp(31)} color="#5C50D2">
                      Add
                    </Text>
                  </Pressable>
                </HStack>
              </HStack>
            </ImageBackground>
          );
        }}
      ></FlatList>
    </VStack>
  );
};

export default React.memo(Popular);
