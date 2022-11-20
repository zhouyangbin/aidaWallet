import React, { useState } from "react";
import { HStack, Text, VStack, useToast, Image, Box, FlatList, PresenceTransition, Button, ScrollView, Center, Stack } from "native-base";
import Header from "../component/Header";
import ape from "../../../assets/image/ape.webp";
import { useNavigation } from "@react-navigation/native";
import global from "../api/util/global";
import ActionButton from "react-native-action-button";
import Icons from "../asset/Icon.js";
import { Pressable } from "react-native";

const ProductDetail = props => {
  const navigation = useNavigation();
  const { payload } = props.route.params;
  const [productDetail, setProductDetail] = useState(payload);
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);
  const [accordionIndex, setAccordionIndex] = useState(0);
  console.log(props, "props");
  const buyClickHandler = payload => {
    navigation.navigate("PayOrder", { payload: [productDetail] });
    console.log("立即购买", productDetail);
  };

  const handleSetTabIndex = payload => {
    setTabIndex(payload);
  };

  const addToCart = payload => {
    // 商品只能加入一次到购物车
    if (!global.shoppingList.find(item => item.id === productDetail.id)) {
      global.shoppingList.push(productDetail);
      toast.show({
        placement: "top",
        duration: 2000,
        render: () => {
          return (
            <Box bg="#1296db" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
              已添加到购物车!
            </Box>
          );
        },
      });
    } else {
      toast.show({
        placement: "top",
        duration: 2000,
        render: () => {
          return (
            <Box bg="#d81e06" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
              商品已经添加到购物车，请勿重复添加!
            </Box>
          );
        },
      });
      return;
    }
    console.log("add to cart", productDetail);
  };
  return (
    <VStack>
      <Header>商品详情</Header>
      <VStack padding="4" h="95%">
        <HStack h="30%" alignItems="center" justifyContent="space-around" padding="4">
          <VStack alignItems="center">
            <Image alt='img' source={ape} borderRadius="60px" w="120px" h="120px" />
            <Box {...styles.number} mt="4">
              {payload.number}
            </Box>
          </VStack>
          <VStack>
            <HStack alignItems="center" justifyContent="center">
              <Text fontSize="18" mr="5">
                {payload.price}
              </Text>
              <Image alt='img' source={payload.icon} w="20px" h="20px" borderRadius="10px" />
            </HStack>
            <Button {...styles.addBtn} mt="4" onPress={() => addToCart()}>
              加入购物车
            </Button>
            <Button {...styles.buyBtn} mt="4" onPress={() => buyClickHandler()}>
              立即购买
            </Button>
          </VStack>
        </HStack>
        <HStack h="13%" justifyContent="space-between">
          <Box w="48%" {...styles.info}></Box>
          <HStack w="48%" {...styles.info} bg="#dec3ed">
            <VStack w="50%">
              <VStack justifyContent="center" alignItems="center" mt="1">
                <Text>父亲</Text>
                <Text>NFTS编号</Text>
              </VStack>
              <VStack justifyContent="center" alignItems="center" mt="1">
                <Text>母亲</Text>
                <Text>NFTS编号</Text>
              </VStack>
            </VStack>
            <VStack w="50%">
              <VStack justifyContent="center" alignItems="center" bg="#f5f5d2" borderRadius="4">
                <Text>已育次数</Text>
                <Text>1</Text>
              </VStack>
              <VStack alignItems="center" mt="4" pl="2" pr="2" pt="1" pb="1" borderRadius="10" borderColor="#1296db" borderWidth="1">
                <Text color="#1296db">可繁育</Text>
              </VStack>
            </VStack>
          </HStack>
        </HStack>
        <VStack h="60%">
          <Tabs tabIndex={tabIndex} setTabIndex={handleSetTabIndex}></Tabs>
          <ScrollView>
            <METAList/>
          </ScrollView>
        </VStack>
      </VStack>
      <ActionButton h="15%" position="right" offsetY={10} offsetX={10} buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor="#9b59b6" title="上架" onPress={() => navigation.navigate("ShelvesPage", {})}>
          <Image alt='img' size={8} source={Icons.shelvesIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#3498db" title="购物车" onPress={() => navigation.navigate("Cart", {})}>
          <Image alt='img' size={8} source={Icons.shoppingCartIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#1abc9c" title="趋势" onPress={() => navigation.navigate("TrendPage", {})}>
          <Image alt='img' size={8} source={Icons.trendIcon} />
        </ActionButton.Item>
      </ActionButton>
    </VStack>
  );
};

const tabArr = ["繁育META", "游戏1META", "游戏2META", "游戏3META", "游戏4META", "游戏5META", "游戏6META"];

const Tabs = props => {
  const { tabIndex, setTabIndex } = props;
  return (
    <Center>
      <HStack mt="6">
        <FlatList
          horizontal={true}
          data={tabArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setTabIndex(index);
                }}
              >
                <HStack
                  h="10"
                  padding="3"
                  borderBottomWidth="1px"
                  borderColor="#1296db"
                  borderTopRightRadius="4"
                  borderTopLeftRadius="4"
                  style={{ backgroundColor: index === tabIndex ? "#1296db" : "#eaf3e6" }}
                  alignItems="center"
                  justifyContent="center"
                  key={index}
                >
                  <Text style={{ color: index === tabIndex ? "white" : "#515151" }} textAlign="center">
                    {item}
                  </Text>
                </HStack>
              </Pressable>
            );
          }}
        ></FlatList>
      </HStack>
    </Center>
  );
};

const METAList = props => {
  const [accordionIndex, setAccordionIndex] = useState(0);
  return (
    <VStack>
      {[...new Array(10).fill("META名称")].map((item, index) => {
        return (
          <Pressable key={index} onPress={() => setAccordionIndex(index)}>
            <Box mt="4" padding="4" w="100%" bg="#d1a2cd">
              <HStack bg="#d1a2cd">
                <Text color="#fff">{item}</Text>
              </HStack>
              {accordionIndex === index ? (
                <PresenceTransition
                  visible={true}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    // height: 40,
                    // translateY: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    // height: 0,
                    // translateY: 0,
                    transition: {
                      duration: 250,
                    },
                  }}
                >
                  <VStack mt="1" h="40px">
                    <Box>
                      <Text>{item}</Text>
                    </Box>
                    <Box></Box>
                  </VStack>
                </PresenceTransition>
              ) : null}
            </Box>
          </Pressable>
        );
      })}
    </VStack>
  );
};

export default React.memo(ProductDetail);

const styles = {
  number: {
    borderColor: "#515151",
    borderWidth: 1,
    borderRadius: "20px",
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  addBtn: {
    backgroundColor: "rgb(219, 39, 119)",
    borderRadius: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  buyBtn: {
    backgroundColor: "rgb(8, 145, 178)",
    borderRadius: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  info: {
    // width: "200px",
    height: "100px",
    borderRadius: "10px",
    backgroundColor: "#e6eec3",
  },
};
