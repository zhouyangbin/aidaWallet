import React, { useState } from "react";
import { Stack, Text, VStack, Input, Box, PresenceTransition, ScrollView, Divider, HStack, Image, FlatList, Center } from "native-base";
import { Pressable, StatusBar } from "react-native";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
import LinearGradient from "react-native-linear-gradient";
import Icons from "../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const keys = [...new Array(30).keys()];
const historylist = keys.map((item, index) => {
  return {
    icon: Icons.usdtIcon,
    name: `${index} 服务费支付`,
    type: "Purchase success",
    address: 'Market Orders',
    time: "13:32",
    amount: 1344455,
    state: index % 2 === 0 ? Icons.failureIcon : Icons.successIcon,
  };
});


const AllHistoryOrder = props => {
  const { payload } = props;
  const navigation = useNavigation();
  const itemClick = props => {
    const { item } = props;
    console.log(item, "item");
    navigation.navigate("HistoryItemRecord", { item });
  };
  const [show, setShow] = useState(true);
  return (
    <Stack>
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          translateX: 20,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 250,
          },
        }}
      >
        <FlatList
          data={historylist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <Pressable key={item.name} onPress={() => itemClick({ item })}>
            <HStack pt={pxToDp(43)} pb={pxToDp(35)} alignItems="center" borderBottomWidth='1' borderColor='#EAEAEA' justifyContent="space-between">
              <HStack alignItems="center">
                <Image w={pxToDp(118)} h={pxToDp(118)} alt="img" source={Icons.usdtIcon} />
                <VStack ml={pxToDp(43)}>
                  <HStack alignItems='center'>
                    <Text color="#2F2F2F" fontSize={pxToDp(42)} fontWeight='bold'>
                      {item.type}
                    </Text>
                    {/* <Image ml='1' alt='img' h='23px' w='23px' source={item.state} /> */}
                  </HStack>

                  <Text mt={pxToDp(23)} color="#2F2F2F" fontSize={pxToDp(34)} fontWeight='400'>
                    {item.address}
                  </Text>
                  <Text mt={pxToDp(23)} color=" #2F2F2F" fontSize={pxToDp(34)} fontWeight='400'>
                    {moment().format(" HH:mm")}
                  </Text>
                </VStack>
              </HStack>
              <VStack alignItems='flex-end'>
                <Text fontSize={pxToDp(50)} fontWeight="800" color='#2F2F2F'>
                  + {item.amount}
                </Text>
                <Text fontSize={pxToDp(42)} fontWeight='500' color='#2F2F2F'>Crystal Coins</Text>
              </VStack>
            </HStack>
          </Pressable>
          }}
        />
      </PresenceTransition>
    </Stack>
  );
};

const Test = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const handleSetInput = text => {
    setSearchValue(text);
  };
  return (
    <>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      {/* 手机顶部状态栏 end */}

      {/* 页面内容区域 start */}
      <VStack
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        top="0"
        // bg="#1afa29"
        justifyContent="space-between"
      >
        <VStack h={pxToDp(532)} bg="#fff" borderRadius={pxToDp(30)} position="absolute" pt={pxToDp(126)} w={screenWidth} pl={pxToDp(41)} pr={pxToDp(41)}>
          {/* 返回按钮，搜索 start  */}
          <HStack alignItems="center">
            <Pressable onPress={() => navigation.goBack()}>
              <Image alt="img" w={pxToDp(50)} h={pxToDp(35)} source={Icons.goBackArrowBIcon} />
            </Pressable>
            <HStack ml={pxToDp(43)} alignItems="center" h={pxToDp(94)} borderRadius={pxToDp(47)}>
              <Input
                variant="outline"
                type="text"
                w={pxToDp(811)}
                h={pxToDp(108)}
                fontSize={pxToDp(38)}
                fontWeight="500"
                color="#9FA1A8"
                // borderColor="#5C50D2"
                backgroundColor="#EDEFF1"
                borderRadius={pxToDp(30)}
                value={searchValue}
                placeholder="Search"
                _focus={{ borderColor: "#EDEFF1", backgroundColor: "#EDEFF1" }}
                onChangeText={handleSetInput}
                InputLeftElement={<Image alt="image" source={Icons.inputSearchIcon} size="5" marginLeft="3" />}
              />
            </HStack>
          </HStack>
          {/* 返回按钮，搜索 end  */}
          {/* tab页签 start */}
          <Center>
            <HStack mt={pxToDp(43)} alignItems="center" justifyContent="space-between" bg="#ECEFF5" w={pxToDp(594)} borderRadius={pxToDp(16)}>
              <Text w="50%" h={pxToDp(84)} lineHeight={pxToDp(84)} borderRadius={pxToDp(16)} textAlign="center" bg="#5C50D2" color="#fff" fontSize={pxToDp(36)} fontWeight="800">
                All
              </Text>
              <Text w="50%" h={pxToDp(84)} lineHeight={pxToDp(84)} borderRadius={pxToDp(16)} textAlign="center" color="#181818" fontSize={pxToDp(36)} fontWeight="500">
                Refunds
              </Text>
            </HStack>
          </Center>
          {/* tab页签 end */}

          {/* 收入数量 start  */}
          <VStack mt={pxToDp(43)} pl={pxToDp(50)} pt={pxToDp(30)} pr={pxToDp(50)} borderRadius={pxToDp(30)} w={pxToDp(998)} h={pxToDp(270)} bg="blue.300">
            <HStack justifyContent='space-between'>
              <VStack>
                <Text color='#ECEFF5' fontWeight='800' fontSize={pxToDp(60)}>$345.22</Text>
                <Text color='#AFB2F8' fontSize={pxToDp(32)} fontWeight='bold'>Expenses</Text>
              </VStack>
              <VStack>
                <Text color='#ECEFF5' fontWeight='800' fontSize={pxToDp(60)}>$345.22</Text>
                <Text color='#AFB2F8' textAlign='right' fontSize={pxToDp(32)} fontWeight='bold'>Income</Text>
              </VStack>
            </HStack>
            <Center>
              <Pressable>
                <HStack alignItems='center' justifyContent='space-between' pl={pxToDp(30)} pr={pxToDp(30)} w={pxToDp(400)} h={pxToDp(72)} borderRadius={pxToDp(36)} bg='#4E55CA'>
                  <Text color='#fff' fontSize={pxToDp(34)} fontWeight='bold'>Eight month</Text>
                  <Image w={pxToDp(27)} h={pxToDp(18)} source={Icons.arrowDownIcon}/>
                </HStack>
              </Pressable>
            </Center>
          </VStack>
          {/* 收入数量 start  */}
        </VStack>

        {/* NFT 列表区域 start  */}
        <VStack
          bg="#fff"
          h={pxToDp(1181)}
          pt={pxToDp(34)}
          pl={pxToDp(49)}
          pr={pxToDp(42)}
          // pb='2'
          borderTopRadius={pxToDp(60)}
          justifyContent="space-between"
        >
          <AllHistoryOrder/>
        </VStack>
        {/* NFT 列表区域 end  */}
      </VStack>
      {/* 页面内容区域 end */}
    </>
  );
};

export default React.memo(Test);
