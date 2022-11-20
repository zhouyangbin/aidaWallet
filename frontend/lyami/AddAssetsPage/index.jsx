import React, { useState, useEffect, useMemo } from "react";
import { HStack, Box, Image, Pressable, VStack, Text, Actionsheet, ScrollView, StatusBar } from "native-base";
import { coinListData } from "../api/util/helper";
import Icons from "@/../../frontend/lyami/asset/Icon";
import AddAssetCoinListModal from "./AddAssetCoinListModal";
import AddAssetCoinListCustomModal from "./AddAssetCoinListCustomModal";
import { useNavigation } from "@react-navigation/native";
import { pxToDp } from "../../utils/stylesKits";
import { I18n } from "../../language/I18n";

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
        _text={{
          color: border ? "white" : "#181818",
          fontSize: pxToDp(36),
          lineHeight: pxToDp(47),
          fontWeight: border ? "800" : "500",
        }}
        bg={border ? "#5C50D2" : null}
        justifyContent="center"
        alignItems="center"
        borderRadius={pxToDp(15)}
      >
        {children}
      </Box>
    </Pressable>
  );
};

const AddAssets = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [coinList, setCoinList] = useState([]);
  const tabArray = [I18n.t("wallet.search"), I18n.t("wallet.customize")];
  const [addressValue, setAddressValue] = useState(null);
  const navigation = useNavigation();

  const handleGetCoinRequest = payload => {
    const { data, code } = coinListData;
    if (code == 200) {
      setCoinList(data);
    }
  };
  useEffect(() => {
    handleGetCoinRequest();
    return () => {};
  }, []);
  return (
    <VStack>
      <VStack h="100%" bg="white">
        <HStack pt={pxToDp(149)} w="100%" h={pxToDp(200)} alignItems="center" justifyContent="space-between">
          <Pressable
            w="30%"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image ml={pxToDp(41)} alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowBIcon}></Image>
          </Pressable>
          <VStack flex="1" alignItems="center" h="16" justifyContent="center">
            <Text fontSize={pxToDp(50)} fontWeight="800">
              {I18n.t("wallet.addAssets")}
            </Text>
          </VStack>
          <Pressable
            w="30%"
            onPress={() => {
              // navigation.goBack();
            }}
            alignItems="flex-end"
            justifyContent="center"
          >
            <Image mr={pxToDp(41)} alt="img" size="2xs" source={Icons.editIconBIcon}></Image>
          </Pressable>
        </HStack>
        <VStack w="100%" flex="1" mt={pxToDp(67)} alignItems="center">
          <HStack
            overflow="hidden"
            w={pxToDp(594)}
            h={pxToDp(84)}
            bg="#ECEFF5"
            borderRadius={pxToDp(16)}
            justifyContent="center"
          >
            {tabArray.map((item, index) => {
              return (
                <TabItem key={index} index={index} border={tabIndex == index} tabIndex={tabIndex} onClick={setTabIndex}>
                  {item}
                </TabItem>
              );
            })}
          </HStack>
          {tabIndex == 0 ? (
            <AddAssetCoinListModal listData={coinList}></AddAssetCoinListModal>
          ) : (
            <AddAssetCoinListCustomModal
              navigation={navigation}
              setAddressValue={setAddressValue}
              addressValue={addressValue}
            ></AddAssetCoinListCustomModal>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default React.memo(AddAssets);
