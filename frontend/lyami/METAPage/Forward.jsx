import React from "react";
import { Text, VStack, Center, Box, HStack, Button, Checkbox,Image } from "native-base";
import Header from "../component/Header";
import { screenWidth } from "../../utils/stylesKits";
import { CANCELLED } from "dns";
import Icons from '../asset/Icon.js'
import {StatusBar} from 'react-native'

const SHARE_TYPE = [
  { type: "weixin", url: Icons.weixinIcon, title: "发送给朋友" },
  { type: "twitter", url: Icons.twitterIcon, title: "发送给朋友" },
  { type: "qq", url: Icons.qqIcon, title: "发送给朋友" },
  { type: "taobao", url: Icons.taobaoIcon, title: "去淘宝搜索" },
  { type: "alipay", url: Icons.alipayIcon, title: "支付宝" },
  { type: "facebook", url: Icons.facebookIcon, title: "Facebook" },
];


const ForwardPage = () => {

  const select = type => {
    
  }

  const share = () => {
    
  }

  return (
    <VStack pt='4'>
      <StatusBar backgroundColor='transparent' translucent={true} />
      <Header>转发</Header>
      <Box pl="4" pr="4">
        <Center mt="4" w="100%">
          <Box h="200px" w="100%" borderColor="#999" borderWidth="1">
            <Text fontSize="24px">文本内容</Text>
          </Box>
        </Center>
        <Center mt="2">
          <HStack padding="4" alignItems="center" w={screenWidth - 30} borderColor="#999" borderWidth="1">
            <Center w="60px" h="60px" borderRadius="30px" bg="blue.400">
              <Text color="#fff">AIDA形象</Text>
            </Center>
            <VStack ml="3" space="2" w={screenWidth - 50}>
              <Text>@水晶人编号:43434343ffdafdr</Text>
              <Text fontSize="18px" w="80%" padding="2" borderColor="#999" borderWidth="1">
                文本内容文本内容文本内容文本内容文本内容文本本内容文本内容本文本内容
              </Text>
            </VStack>
          </HStack>
        </Center>
        <VStack mt="4">
          <HStack>
            <Checkbox shadow={2} value="test">
              同时分享
            </Checkbox>
          </HStack>
          <HStack mt="3" mb="4" pl='5' pr='5' flexWrap='wrap'>
            {SHARE_TYPE.map((item, index) => {
              return (
                <Button w="20%" key={`${item.url}${index}`} onPress={() => select(item.type)} variant="Unstyled">
                  <Center>
                    <Image alt="image bad" source={item.url} size="10" />
                  </Center>
                  {/* <Text color="#707070">{item.title}</Text> */}
                </Button>
              );
            })}
          </HStack>
          <Button onPress={()=> share()}>发送</Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default React.memo(ForwardPage);
