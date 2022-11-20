import React from "react";
import { Button, HStack, Text,Pressable, VStack, Box, Image } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Icons from "../asset/Icon";
import ape from "@/../../assets/image/ape.webp";
import { WebView } from "react-native-webview";
import { View, StatusBar } from "react-native";
import config from "../api/util/config";
import { pxToDp, screenWidth } from "../../utils/stylesKits";

/**
 * META 详情页面
 * @param {*} props
 * @returns
 */
const METAItemDetail = props => {
  const { url } = props.route.params.item;
  console.log(props, "---");
  const link = url.replace("ipfs://", config.IPFS_ROOT);
  const navigation = useNavigation();
  return (
    <View style={{ overflow: "hidden", with: "100%", height: "100%", backgroundColor: '#fff' }}>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      {/* 手机顶部状态栏 end */}
      <Pressable pb={pxToDp(10)}  mt={StatusBar.currentHeight + 'px'} pl={pxToDp(41)} onPress={() => navigation.goBack()}>
        <Image w={pxToDp(70)} h={pxToDp(49)} alt="img" source={Icons.goBackArrowBIcon} />
      </Pressable>
      {/* <Button onPress={()=>navigation.goBack() }>返回</Button> */}
      <WebView originWhitelist={["*"]} source={{ uri: link }} scalesPageToFit={true}></WebView>
    </View>
    // <VStack>
    //   <Button onPress={() => navigation.goBack()}>返回</Button>
    //   <VStack>
    //     {/* <Image source={}/> */}
    //     <Box background='blue.100'><Text  >{item.title}</Text></Box>
    //     <HStack background='blue.400' >
    //       <Text>AiDa 编号</Text>
    //       <Text>2022-09-08 18:23</Text>
    //     </HStack>
    //     <Box>
    //       <Text>{item.content}</Text>
    //     </Box>
    //     <VStack>
    //       <Image w='100' h='100' borderRadius='50' source={ape}/>
    //       <Text>长按,识别二维码,关注</Text>
    //     </VStack>
    //   </VStack>
    //   <VStack>
    //     <HStack>
    //       <Text>精选留言</Text>
    //       <Text>写留言</Text>
    //     </HStack>
    //     <Box>

    //     </Box>
    //   </VStack>
    // </VStack>
  );
};

export default React.memo(METAItemDetail);
