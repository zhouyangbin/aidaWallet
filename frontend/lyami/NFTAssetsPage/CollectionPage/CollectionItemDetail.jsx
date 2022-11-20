import React from "react";
import { VStack, Center, Text, HStack, Box, Image, PresenceTransition, ScrollView, Pressable } from "native-base";
import Button from "../../component/Button";
import { pxToDp, screenWidth } from "../../../utils/stylesKits";
import { useNavigation } from "@react-navigation/native";
// import {  } from "react-native";
import Icons from "../../asset/Icon";
import { I18n } from "../../../language/I18n";

const CollectionItemDetail = props => {
  const { isShow, item, style, hasBtn = false, setIsShow, deleteOtherNFT, tabIndex } = props;
  const navigation = useNavigation();
  // console.log(999,item)
  // 跳转到meta列表页面
  const goToMETAList = () => {
    // navigation.navigate('AIDAPage', {item})
  };
  return (
    <Box>
      {isShow ? (
        <PresenceTransition
          visible={isShow}
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
          <VStack {...style} w={screenWidth} bg="#fff" pb={pxToDp(19)} borderTopRadius={pxToDp(60)}>
            <HStack w="100%" alignItems="center" justifyContent="space-between">
              {/* <HStack w="33%" bg="blue.100"></HStack> */}
              <Text w="55%" fontSize={pxToDp(53)} textAlign="right">
                {I18n.t("NFTAssets.attribute")}
              </Text>
              {tabIndex != "my" ? (
                <Pressable onPress={() => deleteOtherNFT(item)} alignItems="flex-end" w="33%">
                  <Image mr={pxToDp(63)} w={pxToDp(42)} h={pxToDp(47)} source={Icons.deleteIcon}></Image>
                </Pressable>
              ) : null}
            </HStack>
            <Center>
              <HStack
                flexWrap="wrap"
                padding={pxToDp(19)}
                w={pxToDp(998)}
                // h={hasBtn ? pxToDp(255) : pxToDp(420)}
                minH={pxToDp(200)}
                justifyContent="center"
                alignItems="center"
                bg="#ECF0F3"
                borderRadius={pxToDp(30)}
              >
                {/* <Text color="#282828" fontWeight="800" fontSize={pxToDp(40)}>
               {item.description}--{item.name}
              </Text> */}
                {/* <ScrollView> */}
                {item?.attributes && item?.attributes.length ? (
                  item?.attributes?.map((cur, index) => {
                    return (
                      <HStack key={index} mr={pxToDp(19)} mb={pxToDp(19)} padding={pxToDp(19)}>
                        <Text color="#5C50D2" fontSize={pxToDp(42)} h={pxToDp(61)} lineHeight={pxToDp(61)}>{cur.trait_type}</Text>
                        <Text color="#282828" fontSize={pxToDp(42)} h={pxToDp(61)} lineHeight={pxToDp(61)} mL={pxToDp(19)}>{cur.value}</Text>
                      </HStack>
                    );
                  })
                ) : (
                  <Text>暂无数据</Text>
                )}
                {/* </ScrollView> */}
              </HStack>
            </Center>
            {hasBtn ? (
              <Center mt={pxToDp(50)}>
                <HStack w={pxToDp(949)} alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center">
                    <Text fontSize={pxToDp(36)} color="#181818" fontWeight="500">
                      Total:
                    </Text>
                    <Text ml={pxToDp(26)} fontSize={pxToDp(52)} color="#5C50D2" fontWeight="800">
                      888344
                    </Text>
                    <Image ml={pxToDp(25)} alt="img" w={pxToDp(49)} h={pxToDp(49)} source={Icons.coinLogoIcon} />
                  </HStack>

                  <Pressable onPress={() => goToMETAList()}>
                    <Center w={pxToDp(340)} h={pxToDp(125)} background="#5C50D2" borderRadius={pxToDp(30)}>
                      <Text color="#fff" fontSize={pxToDp(50)} fontWeight="bold">
                        Go to
                      </Text>
                    </Center>
                  </Pressable>
                </HStack>
              </Center>
            ) : null}
          </VStack>
        </PresenceTransition>
      ) : null}
    </Box>
  );
};

export default React.memo(CollectionItemDetail);
