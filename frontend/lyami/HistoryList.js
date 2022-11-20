import React, { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Text,
  VStack,
  Input,
  Box,
  PresenceTransition,
  ScrollView,
  HStack,
  Image,
  FlatList,
  Center,
  Pressable,
} from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { pxToDp, screenWidth } from "../utils/stylesKits";
import Icons from "./asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { I18n } from "@/../../language/I18n";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useGlobalStore } from "./api/Store/globalHook";

const tabs = [
  {
    text: "Recevie",
  },
  {
    text: "Pay",
  },
  {
    text: "Send",
  },
  {
    text: "Market",
  },
  {
    text: "Redeem",
  },
  {
    text: "Trading",
  },
  {
    text: "contract",
  },
];
const AllHistoryOrder = props => {
  const { recordData, refreshData } = props;
  // console.log(999, recordData);
  const navigation = useNavigation();
  const itemClick = payload => {
    const { item } = payload;
    navigation.navigate("HistoryItemRecord", { item });
  };
  const [show, setShow] = useState(true);
  const imgIcon = {
    Send: Icons.hisTradingIcon,
    ProductBall: Icons.hisTradingIcon,
    breed: Icons.hisCollectIcon,
    Receive: Icons.hisReceiveIcon,
    Pay: Icons.hisItemOrangeIcon,
    Collect: Icons.hisCollectIcon,
  };
  const formatDefaultHash = hash => {
    if (hash) {
      const subText = `${hash.substring(0, 7)}...${hash.substring(hash.length - 5, hash.length)}`;
      return subText;
    } else {
      return "...";
    }
  };
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
          data={recordData}
          keyExtractor={(item, index) => index.toString()}
          refreshing={false}
          onRefresh={() => refreshData()}
          renderItem={({ item, index }) => {
            return (
              <Pressable key={index} onPress={() => itemClick({ item })}>
                <HStack
                  w="100%"
                  h={pxToDp(249)}
                  alignItems="center"
                  borderBottomWidth="1"
                  borderColor="#EAEAEA"
                  justifyContent="space-between"
                >
                  <HStack w="100%">
                    <HStack w={pxToDp(118)} h={pxToDp(118)}>
                      <Image w={pxToDp(118)} h={pxToDp(118)} alt="img" source={imgIcon[item.type]} />
                    </HStack>
                    <VStack style={[styles.orderRightBox]}>
                      <HStack style={[styles.RightBoxLine]}>
                        <HStack flex="1" justifyItems="center" alignItems="center">
                          <Text
                            fontSize={pxToDp(39)}
                            color="#2F2F2F"
                            h={pxToDp(55)}
                            lineHeight={pxToDp(55)}
                            fontWeight="bold"
                          >
                            {item?.type}
                            <Text> </Text>
                            {item.status == "success" ? "Success" : "Fail"}
                          </Text>
                          <Image
                            alt="img"
                            ml={pxToDp(19)}
                            h={pxToDp(41)}
                            w={pxToDp(41)}
                            source={item.status == "success" ? Icons.hisResolvedIcon : Icons.hisRejectIcon}
                          />
                        </HStack>
                        <HStack flex="1">
                          <Text
                            w="100%"
                            h={pxToDp(55)}
                            lineHeight={pxToDp(55)}
                            textAlign="right"
                            fontSize={pxToDp(41)}
                            fontWeight="800"
                          >
                            -{item?.order?.value}
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack style={[styles.RightBoxLine]} h={pxToDp(65)}>
                        <HStack flex="1" justifyItems="center" alignItems="center">
                          <Text fontSize={pxToDp(31)} h={pxToDp(55)} lineHeight={pxToDp(55)} color="#2F2F2F">
                            {formatDefaultHash(item?.address)}
                          </Text>
                        </HStack>
                        <HStack w={pxToDp(155)}>
                          <Text
                            w="100%"
                            h={pxToDp(55)}
                            lineHeight={pxToDp(55)}
                            textAlign="right"
                            fontSize={pxToDp(41)}
                            color="#2F2F2F"
                          >
                            -{item?.order?.selectPayload?.symbol || item?.order?.from?.name}
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack style={[styles.RightBoxLine]}>
                        <HStack flex="1" justifyItems="center" alignItems="center">
                          <Text fontSize={pxToDp(34)} color="#2F2F2F" h={pxToDp(55)} lineHeight={pxToDp(55)}>
                            {moment(item?.time).format("YYYY:MM:DD:HH:mm:ss")}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </HStack>
              </Pressable>
            );
          }}
        />
      </PresenceTransition>
    </Stack>
  );
};
const HistoryList = () => {
  const { globalData, currentAccount } = useGlobalStore();
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [recordData, setRecordData] = useState([]);
  const handleSetInput = text => {
    setSearchValue(text);
  };
  useFocusEffect(
    useCallback(() => {
      refreshData();
      return () => {
        () => {};
      };
    }, [])
  );
  const refreshData = () => {
    const defaultDta = currentAccount.Records.filter(item => item.address == globalData.defaultKey.address);
    console.log(defaultDta, "defaultDta");
    setRecordData(defaultDta);
  };
  return (
    <>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
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
        <VStack h={pxToDp(532)} bg="#fff" borderRadius={pxToDp(30)} pt={pxToDp(126)} w={screenWidth}>
          <HStack alignItems="center" px={pxToDp(41)}>
            <Pressable onPressOut={() => navigation.goBack()}>
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
                color="#9fa1a8"
                borderColor="#EDEFF1"
                backgroundColor="#EDEFF1"
                borderRadius={pxToDp(30)}
                value={searchValue}
                placeholder={I18n.t("records.search")}
                _focus={{ borderColor: "#EDEFF1", backgroundColor: "#EDEFF1" }}
                onChangeText={handleSetInput}
                InputLeftElement={
                  <Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)} marginLeft="3" />
                }
              />
            </HStack>
          </HStack>
        </VStack>
        {/* <Center w="100%" position="absolute" top={pxToDp(388)}>
          <ImageBackground
            style={{
              width: pxToDp(1060),
              height: pxToDp(340),
              paddingLeft: pxToDp(90),
              paddingRight: pxToDp(90),
              paddingTop: pxToDp(40),
            }}
            source={Icons.hisBackImageIcon}
            resizeMode="contain"
          >
            <HStack justifyContent="space-between">
              <VStack>
                <Text color="#ECEFF5" fontWeight="800" fontSize={pxToDp(60)}>
                  $345.22
                </Text>
                <Text color="#AFB2F8" fontSize={pxToDp(32)} fontWeight="bold">
                  {I18n.t("records.expenses")}
                </Text>
              </VStack>
              <VStack>
                <Text color="#ECEFF5" fontWeight="800" fontSize={pxToDp(60)}>
                  $345.22
                </Text>
                <Text color="#AFB2F8" textAlign="right" fontSize={pxToDp(32)} fontWeight="bold">
                  {I18n.t("records.income")}
                </Text>
              </VStack>
            </HStack>
            <Center>
              <Pressable>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  pl={pxToDp(30)}
                  pr={pxToDp(30)}
                  w={pxToDp(440)}
                  h={pxToDp(73)}
                  borderRadius={pxToDp(36)}
                  bg="#4E55CA"
                >
                  <Text color="#fff" fontSize={pxToDp(34)} fontWeight="bold">
                    Eight month
                  </Text>
                  <Image w={pxToDp(39)} h={pxToDp(26)} source={Icons.hisArrowDownWIcon} />
                </HStack>
              </Pressable>
            </Center>
          </ImageBackground>
        </Center> */}
        {/* 列表区域  */}
        <VStack
          bg="#fff"
          pt={pxToDp(34)}
          pl={pxToDp(49)}
          pr={pxToDp(42)}
          position="absolute"
          top={pxToDp(251)}
          // top={pxToDp(750)}
          left="0"
          right="0"
          bottom="0"
          // pb='2'
          borderTopRadius={pxToDp(60)}
          justifyContent="space-between"
        >
          <AllHistoryOrder recordData={recordData} refreshData={refreshData} />
        </VStack>
      </VStack>
    </>
  );
};
const styles = StyleSheet.create({
  orderRightBox: {
    height: "100%",
    width: pxToDp(870),
    paddingLeft: pxToDp(31),
  },
  RightBoxLine: {
    height: pxToDp(55),
    weight: "100%",
    justifyItems: "center",
    alignItems: "center",
  },
  leftText: {
    height: pxToDp(130),
    lineHeight: pxToDp(130),
    color: "#181818",
    fontWeight: "400",
    fontSize: pxToDp(38),
  },
  rightText: {
    height: pxToDp(130),
    lineHeight: pxToDp(130),
    color: "#181818",
    fontWeight: "500",
    fontSize: pxToDp(38),
  },
});
export default React.memo(HistoryList);
