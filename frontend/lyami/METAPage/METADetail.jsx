import React from "react";
import { Button, HStack, Text, VStack, Box, Image, Center, Stack, FlatList, ScrollView, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Icons from "../asset/Icon";
import ape from "@/../../assets/image/ape.webp";
import { WebView } from "react-native-webview";
import { View, StatusBar } from "react-native";
import config from "../api/util/config";
import Header from "../component/Header";
import { screenWidth, pxToDp } from "../../utils/stylesKits";
import moment from "moment";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";

/**
 * META 详情页面  非 html 类型的meta详情
 * @param {*} props
 * @returns
 */
const METADetail = props => {
  // const { url } = props.route.params.item;
  const item = { title: "META Title META Title META TitleMETA Title META Title", content: "meta内容  富文本渲染区域" };
  const navigation = useNavigation();
  // 转发
  const forward = () => {
    navigation.navigate("ForwardPage", { item: { id: 2 } });
  };
  return (
    <VStack>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      {/* 手机顶部状态栏 end */}
      <Pressable pb={pxToDp(10)} mt={pxToDp(131)} pl={pxToDp(41)} onPress={() => navigation.goBack()}>
        <Image w={pxToDp(80)} h={pxToDp(65)} alt="img" source={Icons.goBackArrowBIcon} />
      </Pressable>
      <ScrollView>
        <Stack pl={pxToDp(38)} pr={pxToDp(38)}>
          <VStack>
            {/* <Image source={}/> */}
            <HStack justifyContent="center">
              <Center>
                <CrystalBallComponent width={pxToDp(134)} height={pxToDp(140)} type="primary" gene='20AW69LBYOONIWOJ0R4ISBI9RB7F8WS25SSU' />
              </Center>
            </HStack>
              <Box mt={pxToDp(60)} w={pxToDp(794)} >
                <Text color='#181818' fontSize={pxToDp(54)} fontWeight='800' lineHeight={pxToDp(80)}>{item.title}</Text>
              </Box>
            <HStack mt={pxToDp(60)} alignItem='center'>
              <Text color="#41398E" fontSize={pxToDp(36)} fontWeight='bold'>AIDA#{222}</Text>
              <Text ml={pxToDp(58)} color="#9F9F9F" fontSize={pxToDp(32)} fontWeight='500'>
                {moment().format("YYYY-MM-DD HH:MM")}
              </Text>
            </HStack>
            <Stack justifyContent="center" alignItems="center">
              <Center mt={pxToDp(120)} w={screenWidth - 30} borderWidth="1" borderColor="black" h="200px">
                <Text>{item.content}</Text>
              </Center>
            </Stack>
            <HStack justifyContent="center" mt="6">
              <Center w="60px" h="60px" borderRadius="30px" bg="blue.400">
                <Text color="#fff">二维码</Text>
              </Center>
            </HStack>
            {/* <Center mt="1">
              <Text mt="2" color="#999">
                长按,识别二维码,关注
              </Text>
            </Center> */}
            <HStack justifyContent="space-between" mt={pxToDp(76)}>
              <Box></Box>
              <HStack space={4}>
                <HStack alignItems="center">
                  <Center  alignItem="center" justifyContent="center">
                    <Image w={pxToDp(47)} h={pxToDp(49)} alt="img" source={Icons.praisedIcon} />
                  </Center>
                  <Text ml={pxToDp(25)} color="#181818" fontWeight='400' fontSize={pxToDp(42)}>11</Text>
                </HStack>
                <Pressable ml={pxToDp(30)} onPress={() => forward()}>
                  <Center alignItem="center" justifyContent="center">
                    <Image w={pxToDp(47)} h={pxToDp(49)} alt="img" position='relative' top={pxToDp(10)} source={Icons.forwardIcon} />
                  </Center>
                </Pressable>
              </HStack>
            </HStack>
          </VStack>
          
        </Stack>
        <VStack bg='#eee' mt="4" alignItems="center"  pt={pxToDp(60)} pl={pxToDp(40)} pr={pxToDp(40)}>
            <HStack justifyContent="space-around">
              <Text w="50%" color="#646464" fontSize={pxToDp(36)} fontWeight='500'>
                Selected messages
              </Text>
              <Text w="50%" textAlign="right" color="#5C50D2" fontWeight='bold' fontSize={pxToDp(42)}>
               Write a message
              </Text>
            </HStack>
            <VStack w='100%'>
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                return (
                  <HStack key={index} alignItems="center" w='100%' mt={pxToDp(73)}>
                    <Box justifyContent="center" alignItems="center" w="60px" h="60px" borderRadius="30px" bg="blue.400">
                      <Text color="#fff">用户</Text>
                    </Box>
                    <VStack ml={pxToDp(31)}>
                      <HStack>
                        <Text color="#646464" fontWeight='500' fontSize={pxToDp(34)}>账户地址：</Text>
                        <Text>434324300432</Text>
                      </HStack>
                      <HStack mt={pxToDp(10)} w={pxToDp(800)}>
                        <Text color='#181818' fontSize={pxToDp(42)} fontWeight='500'>这是一个 带有魔法 这是一个带有魔法的水晶球,谁拥有他,就拥有了上帝视角</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              })}
              {/* <FlatList
              // style={{flex: 1}}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <HStack alignItems="center" mt='3' mb='2' pb='4' borderBottomWidth='1' borderColor='#999'>
                    <Box justifyContent="center" alignItems="center" w="60px" h="60px" borderRadius="30px" bg="blue.400">
                      <Text color="#fff">AIDA形象</Text>
                    </Box>
                    <VStack ml="4">
                      <HStack>
                        <Text color="#999">账户地址：</Text>
                        <Text>434324300432</Text>
                      </HStack>
                      <HStack mt='2'>
                        <Text color="#999">评论内容：</Text>
                        <Text>这是一个带有魔法的水晶球</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              }}
            /> */}
            </VStack>
          </VStack>
      </ScrollView>
    </VStack>
  );
};

export default React.memo(METADetail);
