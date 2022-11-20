import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";
import { View, Text, Image, HStack, Pressable, VStack, useToast, Box } from "native-base";
import { StyleSheet } from "react-native";
import Icons from "../asset/Icon";
import UserInfoModal from "./UserInfoModal";
import { I18n } from "../../language/I18n";
import { pxToDp } from "../../utils/stylesKits";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import Come from "./Come";
import { useGlobalStore } from "../api/Store/globalHook";
import LoadingContext from "../../providers/LoadContext";
import Button from "../component/Button";
const handleSetClipboard = payload => {
  Clipboard.setString(payload);
};
const formatDefaultAddress = payload => {
  return `${payload.substring(0, 7)}...${payload.substring(payload.length - 5, payload.length)}`;
};

const LyamiWalletPanel = props => {
  const { isScanning, setIsScanning } = props;
  const loading = useContext(LoadingContext);
  const { globalData, handleSetGlobalData, currentAccount } = useGlobalStore();
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [comeVisible, setComeVisible] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const mineList = [
    {
      path: "Contacts",
      text: "setting.contactsInfo",
      textTip: "setting.AddEditDeleteAccount",
      icon: Icons.mine2,
      valid: false,
    },
    { path: "Toolbox", text: "setting.setting", textTip: "", icon: Icons.mine3, valid: true },
    { path: "Introduction", text: "setting.introduction", textTip: "", icon: Icons.mine4, valid: true },
    { path: "lyamiLogin", text: "setting.logout", textTip: "", icon: Icons.mine5, valid: false },
  ];
  return (
    <VStack>
      <UserInfoModal visible={userInfoModal} onCancel={() => setUserInfoModal(false)} />
      <Come visible={comeVisible} close={setComeVisible}></Come>
      <View alignItems="center" justifyContent="center">
        <HStack mt={pxToDp(-26)} h={pxToDp(353)} w="100%" alignItems="center">
          <VStack mt={pxToDp(61)} justifyContent="center" alignItems="center" flex="1">
            <Pressable
              onPress={() => {
                setUserInfoModal(true);
              }}
              bg="#EEEEEF"
              borderRadius={pxToDp(280)}
              borderWidth={pxToDp(6)}
              borderColor="white"
              shadow={9}
              w={pxToDp(187)}
              h={pxToDp(187)}
            >
              <CrystalBallComponent
                type="primary"
                width={pxToDp(175)}
                height={pxToDp(175)}
                gene={globalData.defaultAddress.call().slice(2, 38)}
              ></CrystalBallComponent>
            </Pressable>
            <Pressable
              onPress={() => {
                handleSetClipboard(globalData.defaultAddress.call());
                toast.show({
                  description: "已复制到剪贴板",
                  placement: "top",
                  duration: 1500,
                });
              }}
              mt={pxToDp(0)}
              alignItems="center"
              w="100%"
            >
              <Text alignItems="center" fontWeight="800" fontSize={pxToDp(57)}>
                {formatDefaultAddress(globalData.defaultAddress.call())}
              </Text>
            </Pressable>
          </VStack>
        </HStack>
        <Box>
          <HStack
            shadow={5}
            mb={pxToDp(37)}
            alignItems="center"
            w={pxToDp(998)}
            h={pxToDp(199)}
            bg="white"
            borderRadius={pxToDp(30)}
            mt={pxToDp(13)}
          >
            <HStack ml={pxToDp(45)} w={pxToDp(130)}>
              <Image alt="img" w={pxToDp(106)} h={pxToDp(106)} source={Icons.mine1} />
            </HStack>
            <HStack flex="1">
              <Text ml={pxToDp(47)} style={[styles.boxText]} fontSize={pxToDp(38)} fontWeight="900" color="#181818">
                {I18n.t("setting.Record")}
              </Text>
            </HStack>
            <HStack w={pxToDp(270)}>
              <Button
                fontSize={pxToDp(31)}
                fontWeight="600"
                color="#5C50D2"
                borderRadius={pxToDp(100)}
                w={pxToDp(190)}
                h={pxToDp(70)}
                bg="#ECEBF7"
                onPress={() => {
                  loading.hideMenu();
                  navigation.navigate("HistoryList", {});
                }}
              >
                Details
              </Button>
            </HStack>
          </HStack>
          <VStack
            shadow={5}
            w={pxToDp(998)}
            justifyContent="space-around"
            h={pxToDp(566)}
            bg="white"
            borderRadius={pxToDp(30)}
          >
            {mineList.map((item, index) => {
              return (
                <Pressable
                  w={pxToDp(998)}
                  onPress={() => {
                    if (item.valid) {
                      loading.hideMenu();
                      navigation.navigate(item.path, {});
                    }
                  }}
                >
                  <HStack style={[styles.listLine]}>
                    <HStack style={[styles.listImgBox]}>
                      <Image alt="img" style={[styles.listImg]} source={item.icon} />
                    </HStack>
                    <HStack flex="1" style={[styles.listRight, styles.bottomBorder]}>
                      <VStack flex="1">
                        <Text style={[styles.boxText1]}>{I18n.t(item.text)}</Text>
                        {item.textTip ? <Text style={[styles.tipText]}>{I18n.t(item.textTip)}</Text> : null}
                      </VStack>
                      <VStack>
                        <Image alt="img" w={pxToDp(22)} h={pxToDp(38)} source={Icons.rightArrowIcon} />
                      </VStack>
                    </HStack>
                  </HStack>
                </Pressable>
              );
            })}
          </VStack>
        </Box>
      </View>
    </VStack>
  );
};
const styles = StyleSheet.create({
  listBox: {
    justifyContent: "center",
    paddingLeft: pxToDp(50),
  },
  listLine: {
    height: pxToDp(140),
    alignItems: "center",
    justifyContent: "center",
  },
  listImgBox: {
    width: pxToDp(130),
    paddingLeft: pxToDp(53),
    height: "100%",
    alignItems: "center",
  },

  listImg: {
    width: pxToDp(66),
    height: pxToDp(66),
  },
  listRight: {
    paddingRight: pxToDp(31),
    height: "100%",
    alignItems: "center",
    marginLeft: pxToDp(47),
  },
  bottomBorder: {
    borderBottomWidth: pxToDp(1),
    borderColor: "#ddd",
  },
  boxText: {
    height: pxToDp(129),
    lineHeight: pxToDp(129),
    color: "#181818",
    fontSize: pxToDp(39),
  },
  boxText1: {
    height: pxToDp(49),
    lineHeight: pxToDp(49),
    color: "#181818",
    fontSize: pxToDp(39),
  },
  tipText: {
    color: "#8D8D8D",
    fontWeight: "600",
    fontSize: pxToDp(27),
    height: pxToDp(41),
    lineHeight: pxToDp(41),
  },
});
export default React.memo(LyamiWalletPanel);
