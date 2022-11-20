import React, { useMemo, useState, useCallback, useEffect, useContext } from "react";
import { Text, HStack, VStack, Pressable, Image, useToast } from "native-base";
import { FlatList, ImageBackground, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LyamiMinePanel from "./Modal/LyamiMinePanel ";
import Spin from "./component/Spin";
import ScanQrcode from "./component/ScanQrcode";
import { scanHandler } from "./api/util/scanConfig";
import { pxToDp } from "../utils/stylesKits";
import LinearGradient from "react-native-linear-gradient";
import netShadowCon from "@/../../assets/image/UiImg/netShadowCon.webp";
import netPoint from "@/../../assets/image/UiImg/netPoint.webp";
import SelectNetWork from "./component/SelectNetWork";
import { useGlobalStore } from "./api/Store/globalHook";
import LoadingContext from "../providers/LoadContext";

// import

const MineSpace = props => {
  const { globalData } = useGlobalStore();
  const loading = useContext(LoadingContext);
  const [isSpin, setIsSpin] = useState(false);
  const [spinText, setSpinText] = useState("wait...");
  const [isScanning, setIsScanning] = useState(false);
  const [selectNetworkShow, setSelectNetworkShow] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  /* 进入就显示底部导航 */
  useFocusEffect(
    useCallback(() => {
      loading.showMenu(4);
      return () => {
        () => {};
      };
    }, [])
  );
  const handleReceiveData = payload => {
    console.log(123);
    setIsScanning(false);
    scanHandler(payload, toast, navigation);
  };
  return isScanning ? (
    <VStack h={"100%"}>
      <ScanQrcode
        back={() => {
          setIsScanning(false);
          loading.showMenu(4);
        }}
        callback={handleReceiveData}
      ></ScanQrcode>
    </VStack>
  ) : (
    <View flex="1" w="100%" h={"100%"} style={{ flex: 1, backgroundColor: "#E9ECEE" }}>
      <VStack h="100%">
        <HStack position="absolute" top="0" borderBottomRadius={pxToDp(80)} overflow="hidden" zIndex="3">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#1E2C5D", "#213370"]}
            style={{ width: "100%", height: pxToDp(319) }}
          />
        </HStack>
        <Pressable
          zIndex="4"
          onPress={() => {
            setSelectNetworkShow(true);
          }}
          w="100%"
          alignItems="center"
          mt={pxToDp(63)}
          mb={pxToDp(13)}
        >
          <ImageBackground
            source={netShadowCon}
            style={{
              minWidth: pxToDp(369),
              height: pxToDp(91),
            }}
            resizeMode="stretch"
          >
            <HStack justifyContent="center" px={pxToDp(50)} pb={pxToDp(10)} h="100%" alignItems="center">
              <Image mt={pxToDp(5)} mr={pxToDp(41)} source={netPoint} w={pxToDp(41)} h={pxToDp(41)}></Image>
              <Text fontSize={pxToDp(41)} fontWeight="bold" color="white">
                {globalData.defaultNetwork.name}
              </Text>
            </HStack>
          </ImageBackground>
        </Pressable>
        <VStack zIndex="4" flex="1">
          <LyamiMinePanel isScanning={isScanning} setIsScanning={setIsScanning}></LyamiMinePanel>
        </VStack>
        <SelectNetWork show={selectNetworkShow} setModalShow={setSelectNetworkShow}></SelectNetWork>
      </VStack>
    </View>
  );
};

export default React.memo(MineSpace);
