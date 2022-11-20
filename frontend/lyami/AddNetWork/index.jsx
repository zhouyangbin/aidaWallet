import React, { useState, useMemo } from "react";
import { Image, VStack, HStack, Pressable, StatusBar, Text, Box } from "native-base";
import Custom from "./Custom";
import Popular from "./Popular";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
import Spin from "../component/Spin";
import { useNavigation } from "@react-navigation/native";

const tabArray = ["Popular", "Custom networkes"];
const popularArray = [
  {
    img: Icons.bnbIcon,
    name: "Baobab Testnet",
    RPC: "https://api.baobab.klaytn.net:8651",
    ChainId: 1001,
    CoinSymbol: "KLIY",
  },
  { img: Icons.bnbIcon, name: "Heco", RPC: "https://http-mainnet.hecochain.com", ChainId: 128, CoinSymbol: "HT" },
  { img: Icons.bnbIcon, name: "Fantom Opera", RPC: "https://rpcapi.fantom.network", ChainId: 250, CoinSymbol: "FTM" },
];
const TabItem = props => {
  const { index, children, onClick, border } = props;
  return (
    <Pressable
      onPress={() => {
        onClick(index);
      }}
    >
      <Box
        h="100%"
        w={pxToDp(297)}
        bg={border ? "#5C50D2" : "white"}
        justifyContent="center"
        alignItems="center"
        borderRadius={pxToDp(16)}
      >
        <Text
          fontWeight={border ? "800" : "500"}
          color={border ? "white" : "#181818"}
          fontSize={index == 0 ? pxToDp(36) : pxToDp(30)}
        >
          {children}
        </Text>
      </Box>
    </Pressable>
  );
};
const AddNetWork = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleReturnComponent = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return <Popular setIsLoading={setIsLoading} popularArray={popularArray}></Popular>;
      case 1:
        return <Custom setIsLoading={setIsLoading}></Custom>;
    }
  }, [activeIndex, popularArray]);

  return (
    <Spin textContent={""} w="100%" h="100%" isSpin={isLoading}>
      <VStack h="100%" alignItems="center">
        {/* <StatusBar bg="transparent" translucent></StatusBar> */}
        <HStack w="100%">
          <HStack mt={pxToDp(155)} justifyContent="space-between" alignItems="center">
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              w="30%"
            >
              <Image ml={pxToDp(41)} source={Icons.goBackArrowBIcon} w={pxToDp(70)} h={pxToDp(49)}></Image>
            </Pressable>
            <HStack justifyContent="center" flex="1">
              <Text fontSize={pxToDp(50)} fontWeight="800">
                Network
              </Text>
            </HStack>
            <HStack w="30%"></HStack>
          </HStack>
        </HStack>
        <HStack
          w={pxToDp(594)}
          h={pxToDp(84)}
          bg="white"
          overflow="hidden"
          borderRadius={pxToDp(16)}
          justifyContent="center"
          mt={pxToDp(67)}
        >
          {tabArray.map((item, index) => {
            return (
              <TabItem key={index} index={index} border={activeIndex == index} onClick={setActiveIndex}>
                {item}
              </TabItem>
            );
          })}
        </HStack>
        {handleReturnComponent}
      </VStack>
    </Spin>
  );
};

export default React.memo(AddNetWork);
