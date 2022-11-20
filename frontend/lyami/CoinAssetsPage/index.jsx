import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Image,
  Pressable,
  FlatList,
  useToast,
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import { ImageBackground } from "react-native";
import shadowCon from "../../../assets/image/UiImg/shadowCon.webp";
import { useNavigation } from "@react-navigation/native";
import global from "../api/util/global";
import { handleMoneyFormatter } from "../api/util/helper";
import { I18n } from "../../language/I18n";
import Clipboard from "@react-native-community/clipboard";
const CoinAssetsPage = (props) => {
  const {
    route: {
      params: { payload },
    },
  } = props;
  const [currentCoin, setCurrentCoin] = useState({});
  const navigation = useNavigation();
  const [coinList, setCoinList] = useState([]);
  const toast = useToast();
  useEffect(() => {
    setCurrentCoin(payload);
    setCoinList(global.defaultNetwork.assets);
  }, [global.defaultNetwork.ChainId]);
  const formatDefaultAddress = (test) => {
    return `${test.substring(0, 7)}...${test.substring(
      test.length - 5,
      test.length
    )}`;
  };
  const copyHandle = (test) => {
    Clipboard.setString(test);
  };
  return (
    <VStack position="relative" alignItems="center" w="100%" h="100%">
      <HStack position="absolute">
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["#191D52", "#222781"]}
          style={{ width: "100%", height: pxToDp(701) }}
        />
      </HStack>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        w="100%"
        mt={pxToDp(161)}
      >
        <Image
          ml={pxToDp(41)}
          zIndex="99"
          alt="img"
          w={pxToDp(70)}
          h={pxToDp(49)}
          source={Icons.goBackArrowWIcon}
        ></Image>
      </Pressable>
      <VStack
        mt={pxToDp(33)}
        borderRadius={pxToDp(30)}
        w={pxToDp(846.4)}
        position="relative"
      >
        <HStack
          position="absolute"
          h={pxToDp(379)}
          borderRadius={pxToDp(30)}
          overflow="hidden"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["rgba(60,87,200,0.9)", "rgba(34,45,119,0.9)"]}
            style={{ width: "100%", height: pxToDp(379) }}
          />
        </HStack>
        <VStack alignItems="center" w="100%">
          <HStack
            mt={pxToDp(33)}
            justifyContent="center"
            alignItems="center"
            w={pxToDp(152)}
            h={pxToDp(152)}
            borderRadius={pxToDp(152)}
            bg="rgba(232,239,249,0.2)"
          >
            <Image
              alt="img"
              e
              w={pxToDp(83)}
              h={pxToDp(83)}
              source={Icons.coinLogoIcon}
            ></Image>
          </HStack>
          <Pressable
            onPress={() => {
              copyHandle(
                global.defaultAddress.call(
                  currentCoin?.token || global.defaultAddress.call()
                )
              );
              toast.show({
                description: "已复制到剪贴板",
                placement: "top",
                duration: 1500,
              });
            }}
          >
            <Text
              mt={pxToDp(29)}
              fontSize={pxToDp(29)}
              fontWeight="800"
              color="#FFFFFF"
              w="100%"
              h={pxToDp(49)}
              textAlign="center"
            >
              {formatDefaultAddress(
                currentCoin?.token || global.defaultAddress.call()
              )}
            </Text>
          </Pressable>

          <HStack>
            <Text
              fontSize={pxToDp(59)}
              fontWeight="800"
              color="#FFFFFF"
              w="50%"
              textAlign="center"
            >
              {currentCoin.symbol}
            </Text>
            <Text
              fontSize={pxToDp(59)}
              fontWeight="800"
              color="#FFFFFF"
              w="50%"
              textAlign="center"
            >
              {handleMoneyFormatter(currentCoin.balance, 8)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <ImageBackground
        source={shadowCon}
        resizeMode="stretch"
        style={{
          width: pxToDp(1030),
          height: pxToDp(320),
          marginTop: pxToDp(11),
        }}
      >
        <HStack alignItems="center" h="100%" justifyContent="center">
          <Pressable
            alignItems="center"
            onPress={() =>
              navigation.navigate("Payment", { currentCoin: currentCoin })
            }
          >
            <Image
              alt="img"
              w={pxToDp(117)}
              h={pxToDp(117)}
              source={Icons.receiveBtnIcon}
            ></Image>
            <Text
              mt={pxToDp(7)}
              fontSize={pxToDp(31)}
              fontWeight="bold"
              color="#2F2F2F"
            >
              {I18n.t("wallet.receive")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("PostAsset", { currentCoin: currentCoin })
            }
            mx={pxToDp(211)}
            alignItems="center"
          >
            <Image
              alt="img"
              w={pxToDp(117)}
              h={pxToDp(117)}
              source={Icons.sendBtnIcon}
            ></Image>
            <Text
              mt={pxToDp(7)}
              fontSize={pxToDp(31)}
              fontWeight="bold"
              color="#2F2F2F"
            >
              {I18n.t("wallet.send")}
            </Text>
          </Pressable>
          <Pressable alignItems="center">
            <Image
              alt="img"
              w={pxToDp(117)}
              h={pxToDp(117)}
              source={Icons.redeemBtnIcon}
            ></Image>
            <Text
              mt={pxToDp(7)}
              fontSize={pxToDp(31)}
              fontWeight="bold"
              color="#2F2F2F"
            >
              {I18n.t("wallet.redeem")}
            </Text>
          </Pressable>
        </HStack>
      </ImageBackground>
      <Text
        pl={pxToDp(77)}
        mb={pxToDp(31)}
        w="100%"
        color="#5C50D2"
        fontSize={pxToDp(49)}
        fontWeight="800"
      >
        {I18n.t("receive.changeAssets")}
      </Text>
      <VStack w="100%" flex="1" alignItems="center">
        <FlatList
          data={coinList}
          renderItem={({ item, index }) => {
            return (
              <Pressable onPress={() => setCurrentCoin(item)}>
                <ImageBackground
                  source={shadowCon}
                  style={{
                    height: pxToDp(181),
                    width: pxToDp(1030),
                    marginBottom: pxToDp(0),
                  }}
                  resizeMode="stretch"
                  key={index}
                >
                  <HStack w="100%" h="100%" pb={pxToDp(5)} alignItems="center">
                    <Image
                      alt="img"
                      ml={pxToDp(85)}
                      w={pxToDp(83)}
                      h={pxToDp(83)}
                      source={Icons.coinLogoIcon}
                    ></Image>
                    <Text
                      ml={pxToDp(37)}
                      fontSize={pxToDp(39)}
                      fontWeight="bold"
                      color="#2f2f2f"
                    >
                      {item.symbol}
                    </Text>
                  </HStack>
                </ImageBackground>
              </Pressable>
            );
          }}
        ></FlatList>
      </VStack>
    </VStack>
  );
};

export default React.memo(CoinAssetsPage);
