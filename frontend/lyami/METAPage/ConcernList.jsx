import React, { useState } from "react";
import { Text, VStack, Image, HStack, Pressable, useToast, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { screenWidth, pxToDp } from "../../utils/stylesKits";
import global from "../api/util/global";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import { StatusBar } from "react-native";
import Icons from "../asset/Icon";

const ConcernList = () => {
  const navigation = useNavigation();
  const [concernList, setConcernList] = useState(global.concernCrystalballList);
  const [cancelConcernItem, setCancelConcernItem] = useState();
  const [isShow, setIsShow] = useState(false);
  const toast = useToast();
  console.log(concernList, "111");
  //取消关注
  const showConfrimDialog = item => {
    setCancelConcernItem(item);
    setIsShow(true);
  };

  const goToMETAListPage = item => {
    navigation.navigate("AIDAPage", { item });
  };

  const cancelConcern = async () => {
    const concernCrystalballList = global.concernCrystalballList;
    const findIndex = concernCrystalballList.findIndex(item => item.ballid === cancelConcernItem.ballid);
    if (findIndex !== -1) {
      concernCrystalballList.splice(findIndex, 1);
      setConcernList([...concernCrystalballList]);
    }
    console.log(global.concernCrystalballList, "global");
    await SaveGlobalData(global.CreateNewPassword);
  };
  const confirm = async () => {
    await cancelConcern();
    toast.show({ description: "取消关注成功", placement: "top", duration: 2000 });
    setIsShow(false);
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
        bg="#E9ECEE"
        // bg="#1afa29"
        justifyContent="space-between"
      >
        {/* 顶部导航 start  */}
        <VStack position="absolute" top={pxToDp(130)} w={screenWidth} pl={pxToDp(41)} pr={pxToDp(41)}>
          <HStack justifyContent="space-between" alignItems="center">
            <Pressable onPress={() => navigation.goBack()}>
              <Image alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowBIcon} />
            </Pressable>

            <Text fontSize={pxToDp(50)} color="#181818" fontWeight="800">
              Follow
            </Text>
            <Text></Text>
          </HStack>
        </VStack>
        {/* 顶部导航 end */}

        {/* 关注列表区域 start  */}
        <VStack bg="#fff" h={pxToDp(1515)} pt={pxToDp(50)} pl={pxToDp(38)} pr={pxToDp(38)} borderTopRadius={pxToDp(60)} justifyContent="space-between">
          <FlatList
            data={concernList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={() => goToMETAListPage(item)}>
                  <HStack alignItems="center">
                    <CrystalBallComponent width={pxToDp(140)} height={pxToDp(143)} type="primary" gene={item.gene} />
                    <VStack justifyContent="center" pl={pxToDp(36)} ml={pxToDp(19)} h={pxToDp(186)} borderColor="#E9ECEE" borderBottomWidth="1" w={pxToDp(861)}>
                      <Text color="#181818" fontSize={pxToDp(46)} fontWeight="500">
                        AIDA#{item.ballid}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              );
            }}
          />
        </VStack>
        {/* 关注列表区域 end  */}
      </VStack>
      {/* 页面内容区域 end */}
    </>
  );
};

export default React.memo(ConcernList);
