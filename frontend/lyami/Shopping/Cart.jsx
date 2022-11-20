/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Pressable } from "react-native";
import { Center, HStack, Text, VStack, Stack, Box, Image, Checkbox, ScrollView, Button } from "native-base";
import Header from "../component/Header";
import Icons from "../asset/Icon.js";
import ape from "../../../assets/image/ape.webp";
import global from "../api/util/global";
import { useNavigation } from "@react-navigation/native";
import SwipeRow from "./SwipeRow";

// const { width } = Dimensions.get("window");
const tabs = ["购物车", "降价"];

const getTotalPrice = props => {
  const { list } = props;
  return list.reduce((pre, cur, i) => {
    if (cur.checked) {
      return pre + parseInt(cur.price);
    }
    return pre;
  }, 0);
};

const Cart = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [list, setList] = useState([...global.shoppingList]);
  //初始化的时候，要判断选中的产品，并标识为选中状态
  const [settleBtnState, setSettleBtnState] = useState(false);
  const [groupValues, setGroupValues] = useState([]);
  const [allChecked, setAllChecked] = useState([false]);
  const handleSetTabIndex = payload => {
    setTabIndex(payload);
  };

  useEffect(() => {
    //初始化的时候计算选中商品的价格
    console.log("初始化的时候计算价格");
    const totalPrice = getTotalPrice({ list });
    setTotal(totalPrice);
  });
  // 详情页面
  const itemClickHandler = payload => {
    console.log(payload, "payload");
    navigation.navigate("ProductDetail", { payload });
  };
  const checkClickHandler = props => {
    const { item, state, index } = props;
    console.log(item, "item1-----", state);
    for (let i = 0; i < list.length; i++) {
      if (list[i]["id"] === item.id) {
        list[i]["checked"] = state;
        break;
      }
    }
    if (state) {
      setGroupValues(preValues => {
        preValues[index] = item.id;
        return [...preValues];
      });
    } else {
      setGroupValues(preValues => {
        preValues[index] = "";
        return [...preValues];
      });
    }

    const totalPrice = getTotalPrice({ list });
    setTotal(totalPrice);
    console.log(totalPrice, "totalPrice");
  };

  useEffect(() => {
    console.log("groupvalue change2");
    if (list.every(item => item.checked === true)) {
      setAllChecked([true]);
    } else {
      setAllChecked([false]);
    }
  }, [groupValues]);

  useEffect(() => {
    // 结算按钮的状态取决于是否有选择商品
    if (list.some(item => item.checked === true)) {
      setSettleBtnState(true);
    } else {
      setSettleBtnState(false);
    }
    console.log(list, "list");
  }, [groupValues]);

  const checkAllClickHandler = props => {
    // console.log(global.shoppingList, "global shopoing");
    // const { state } = props;
    // const newList = global.shoppingList.map(item => {
    //   return { ...item, checked: state };
    // });
    // console.log(list, state, "list");
    // console.log(newList, "newList");
    // setList([...newList]);
    const { state } = props;
    console.log(state, "state");
    setList(prevList => {
      prevList.forEach(item => (item.checked = state));
      return [...prevList];
    });
    if (state) {
      // setGroupValues([...new Array(list.length).fill(state)])
      setGroupValues(preValues => {
        list.forEach((item, index) => {
          preValues[index] = item.id;
        });
        return [...preValues];
      });
    } else {
      setGroupValues([...new Array(list.length).fill("")]);
    }
  };
  const deleteClickHandler = payload => {
    // const res = list.filter(item => item.id !== payload.id)
    console.log(payload, "payload");
    let deleteItem = global.shoppingList.findIndex(item => item.id === payload.id);
    global.shoppingList.splice(deleteItem, 1);

    setList([...global.shoppingList]);

    setTimeout(() => console.log(list, "删除后"), 1000);
    console.log(global.shoppingList, "删除");
  };

  const settlementClickHandler = () => {
    // 过滤掉没有选中的商品
    const selectList = list.filter(item => item.checked);
    navigation.navigate("PayOrder", { payload: selectList });
  };

  return (
    <VStack>
      <Stack h="15%" {...styles.wrap}>
        <Header>
          <HStack alignItems="center" bg="#1296db" borderRadius="20" pl="6" pt="1" pb="1" pr="6">
            <Image alt="img" source={Icons.qqIcon} size="6" />
            <Text ml="1" color="white">
              9999999
            </Text>
          </HStack>
        </Header>
        <VStack pt="4">
          <Tabs tabIndex={tabIndex} setTabIndex={handleSetTabIndex}></Tabs>
        </VStack>
      </Stack>
      <Stack h="74%" {...styles.wrap} padding="4">
        <ScrollView>
          {list.length === 0 ? (
            <VStack alignItems="center" mt="200px">
              <Image alt="img" source={Icons.marketIcon} size="lg" />
              <Text mt="4" color="#8a8a8a">
                购物车还没有产品哦！请前去购买
              </Text>
            </VStack>
          ) : (
            <Checkbox.Group value={groupValues}>
              {list.map((item, index) => {
                return (
                  <VStack mb="3" key={item.id}>
                    <SwipeRow>
                      {/*绝对在底部的view*/}
                      <Box style={styles.delTextContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            deleteClickHandler(item);
                          }}
                        >
                          <Text style={styles.deleteTextStyle}>删除</Text>
                        </TouchableOpacity>
                      </Box>

                      {/*内容content*/}
                      <TouchableWithoutFeedback onPress={() => itemClickHandler(item)}>
                        <Box style={[styles.content]}>
                          <HStack pt="3" pb="3" pl="1px" borderRadius="10" borderColor="#1296db" alignItems="center">
                            <Checkbox value={item.id} w="1/6" onChange={state => checkClickHandler({ item, state, index })} />
                            <Box w="1/3">
                              <Image size="20" ml="10" alt="image" source={ape} />
                            </Box>
                            <VStack alignItems="flex-end" ml="8" w="1/2">
                              <Box borderColor="#1296db" borderWidth="1" pl="5" pr="5" pt="1" pb="1" borderRadius="20">
                                <Text>{item.number}</Text>
                              </Box>
                              <HStack mt="2">
                                <Text>{item.price}</Text>
                                <Image ml="4" size="6" alt="img" source={item.icon} />
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      </TouchableWithoutFeedback>
                    </SwipeRow>
                  </VStack>
                );
              })}
            </Checkbox.Group>
          )}
        </ScrollView>
      </Stack>
      <Stack alignItems="center" padding="4px" mt="3">
        {list.length > 0 ? (
          <HStack h="12%" {...styles.wrap} alignItems="center">
            <Box w="1/4">
              <Checkbox.Group value={allChecked}>
                <Checkbox value={true} onChange={state => checkAllClickHandler({ state })}>
                  全选
                </Checkbox>
              </Checkbox.Group>
            </Box>
            <Box w="1/4">
              <Text>合计{total}</Text>
            </Box>
            <Box w="1/4">
              {settleBtnState ? (
                <Button
                  w="24"
                  bg="#1296db"
                  borderRadius="20"
                  height="40px"
                  _text={{
                    fontSize: "xl",
                    color: "warmGray.50",
                    textAlign: "center",
                  }}
                  onPress={() => settlementClickHandler()}
                >
                  结算
                </Button>
              ) : (
                <Button
                  w="24"
                  bg="#1296db"
                  borderRadius="20"
                  height="40px"
                  _text={{
                    fontSize: "xl",
                    color: "warmGray.50",
                    textAlign: "center",
                  }}
                  isDisabled
                >
                  结算
                </Button>
              )}
            </Box>
          </HStack>
        ) : null}
      </Stack>
    </VStack>
  );
};

const Tabs = props => {
  const { tabIndex, setTabIndex } = props;
  return (
    <Center>
      <HStack justifyContent="center">
        {tabs.map((item, index) => {
          return (
            <Pressable key={item} onPress={() => setTabIndex(index)}>
              <Center
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
                <Text style={{ color: index === tabIndex ? "white" : "#515151" }}>{item}</Text>
              </Center>
            </Pressable>
          );
        })}
      </HStack>
    </Center>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  delTextContainer: {
    width: 100,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteTextStyle: {
    color: "#fff",
  },
  content: {
    width: "100%",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
  },
  wrap: {
    // borderColor: "#1296db",
    // borderWidth: 1,
  },
});
