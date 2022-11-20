import React, { useEffect, useState,useContext } from "react";
import { Text, Pressable, HStack, Actionsheet, VStack, Checkbox, Image, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import Button from "../component/Button";
import { getKeyFromMnemonic, createRandomMnemonic } from "@/../../api/web3/privateKey";
import { useGlobalStore } from "../api/Store/globalHook";
import LoadingContext from "../../providers/LoadContext" 
import {I18n} from "./../../language/I18n"

const formatDefaultAddress = payload => {
  if (payload.substring(0, 2) == "0x") {
    return `${payload.substring(0, 7)}...${payload.substring(payload.length - 5, payload.length)}`;
  } else {
    return `0x${payload.substring(0, 7)}...${payload.substring(payload.length - 5, payload.length)}`;
  }
};
// 用户信息弹框

const createNewAccount = async (globalData, handleSetGlobalData) => {
  const mnenonic = await createRandomMnemonic();
  const keyData = await getKeyFromMnemonic(mnenonic);
  const account = {
    address: "0x" + keyData.address,
    isSet: false,
    privateKey: keyData.privateKey,
    publicKey: keyData.publicKey,
  };
  handleSetGlobalData({ ...globalData, keys: [...globalData.keys, account] });
};

export default UserInfoModal = props => {
  const loading = useContext(LoadingContext);
  const { visible, onCancel } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const navigation = useNavigation();
  const changeChecked = item => {
    handleSetGlobalData({ ...globalData, defaultKey: item, assetsLoaded: false });
    onCancel();
  };

  return (
    <>
      <Actionsheet isOpen={visible} size="full" onClose={onCancel}>
        <Actionsheet.Content bg="white">
          <VStack>
            <FlatList
              data={globalData.keys}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    key={item.privateKey}
                    px={pxToDp(47)}
                    onPress={() => {
                      changeChecked(item);
                    }}
                    mb={pxToDp(71)}
                  >
                    <HStack w="100%" justifyContent="space-between" alignItems="center">
                      <HStack w="60%" alignItems="center">
                        <CrystalBallComponent
                          type="primary"
                          width={pxToDp(141)}
                          height={pxToDp(141)}
                          gene={
                            item.address.substring(0, 2) == "0x" ? item.address.slice(2, 38) : item.address.slice(0, 38)
                          }
                        ></CrystalBallComponent>
                        <VStack ml={pxToDp(21)}>
                          <Text fontSize={pxToDp(45)} fontWeight="bold">
                            Account{index + 1}
                          </Text>
                          <Text color="#515151" fontSize={pxToDp(35)}>
                            {formatDefaultAddress(item.address)}
                          </Text>
                        </VStack>
                      </HStack>
                      <HStack flex="1" alignItems="center" justifyContent="flex-end">
                        {item.isImport ? (
                          <Text
                            color="#9F9F9F"
                            h={pxToDp(61)}
                            borderRadius={pxToDp(31)}
                            borderWidth={pxToDp(2)}
                            borderColor="#B9B9B9"
                            lineHeight={pxToDp(55)}
                            px={pxToDp(29)}
                            mr={pxToDp(77)}
                          >
                            Imported
                          </Text>
                        ) : null}
                        <HStack position="relative">
                          {globalData.defaultKey.address === item.address ? (
                            <Image
                              key={index}
                              w={pxToDp(47)}
                              h={pxToDp(47)}
                              position="absolute"
                              source={Icons.selectPIcon}
                            ></Image>
                          ) : null}
                          <Checkbox
                            opacity="0"
                            value={item.checked}
                            key={item.privateKey}
                            isChecked={globalData.defaultKey.address === item.address}
                            onChange={() => changeChecked(item)}
                            borderRadius="100"
                          ></Checkbox>
                        </HStack>
                      </HStack>
                    </HStack>
                  </Pressable>
                );
              }}
            ></FlatList>
            <VStack alignItems="center" bg="white" paddingTop={pxToDp(7)} pb={pxToDp(71)}>
              {/* 暂时去掉 */}
              <Button
                type="lg"
                bg="transparent"
                onPress={() => {
                  onCancel();
                  loading.hideMenu();
                  navigation.navigate("ImportAccount", {});
                }}
                color="#5C50D2"
              >
                {I18n.t("userInfoPage.importAccount")}
              </Button>
              <Button
                type="lg"
                onPress={() => {
                  // onCancel();
                  // navigation.navigate("CreatePersonAccount", {});
                  createNewAccount(globalData, handleSetGlobalData);
                }}
              >
               {I18n.t("userInfoPage.createNewAccount")}
              </Button>
                {/* 暂时去掉 */}
              <Button
                type="lg"
                bg="transparent"
                onPress={() => {
                  onCancel();
                  loading.hideMenu();
                  navigation.navigate("ExportAccount", {});
                }}
                color="#5C50D2"
              >
                {I18n.t("userInfoPage.exportAccount")}
              </Button>
            </VStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
