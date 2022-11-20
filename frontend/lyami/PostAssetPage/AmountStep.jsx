import React, { useMemo, useState, useEffect } from "react";
import { VStack, Input, Image, Pressable, HStack, Text } from "native-base";
import Icons from "../asset/Icon";
import { assign, isNumber } from "lodash";
import global from "../api/util/global";
import { pxToDp } from "../../utils/stylesKits";
import { ImageBackground } from "react-native";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import AssetsActionSheet from "../component/AssetsActionSheet";
import { I18n } from "../../language/I18n";
import { useGlobalStore } from "../api/Store/globalHook";

const AccountStep = props => {
  const { setNextDisabled, order, setOrder, refresh, sendParams, initCoin } = props;
  const { globalData, currentAccount } = useGlobalStore();

  const [selectedItem, setSelectedItem] = useState(null);
  const [inputCount, setInputCount] = useState(null);
  const [showType, setShowType] = useState(true);
  const [borderColor, setBorderColor] = useState("rgba(212,212,212,1.0)");
  const [isOpen, setIsOpen] = useState(false);

  const accountArray = useMemo(() => {
    console.log(currentAccount);
    let coinArray = currentAccount?.coinAssets || [];
    coinArray?.map((item, index) => {
      (item.title = item.name),
        (item.count = item.balance / 10 ** item.decimal),
        item.token ? null : (item.token = null);
    });
    // console.log();
    // let nftArray = global.defaultNetwork.NFTAssets;
    // nftArray?.map((item, index) => {
    //   (item.title = item.name), (item.count = item.balance), item.token ? null : (item.token = null);
    // });
    return [currentAccount?.coinAssets, currentAccount?.coinAssets];
  }, [order, refresh]);
  const handleSelect = payload => {
    const { item } = payload;
    setBorderColor("rgba(212,212,212,1.0)");
    setSelectedItem(item);
    setOrder(assign(order, { selectPayload: item }));
  };
  const handleSetTransValue = payload => {
    setInputCount(payload);
    setOrder(assign(order, { value: payload }));
  };
  const handleButtonState = useMemo(() => {
    if (selectedItem && inputCount) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [selectedItem, inputCount]);

  useEffect(() => {
    if (initCoin) {
      let item = accountArray[0].find(item => item.token === initCoin.token);
      if (item) {
        handleSelect({ item });
      } else {
        item = accountArray[0][0];
        handleSelect({ item });
      }
    } else {
      let item = accountArray[0].find(item => item.token === null);
      handleSelect({ item });
    }
  }, []);
  return (
    <VStack alignItems="center" flex="1" mt="6" w="100%">
      <VStack w="100%" px={pxToDp(41)}>
        <ImageBackground style={{ width: pxToDp(998), height: pxToDp(165) }} source={shadowCon} resizeMode="stretch">
          <HStack w="100%" h="100%" alignItems="center" pb={pxToDp(10)} pt={pxToDp(5)} pr={pxToDp(50)}>
            <Input
              flex="1"
              h="100%"
              px={pxToDp(50)}
              borderWidth={0}
              fontSize={pxToDp(40)}
              InputRightElement={
                inputCount?.length > 0 ? (
                  <Pressable
                    onPress={() => {
                      handleSetTransValue(null);
                    }}
                  >
                    <VStack alignItems="center" justifyContent="center" h="10" w="10">
                      <Image alt="img" size="3" source={Icons.closeIcon}></Image>
                    </VStack>
                  </Pressable>
                ) : null
              }
              _focus={{
                borderColor: "darkBlue.400",
                backgroundColor: "transparent",
              }}
              type="text"
              placeholder={I18n.t("send.enter")}
              onChangeText={payload => {
                handleSetTransValue(payload);
              }}
              value={inputCount}
            />
            <Pressable
              onPress={() => {
                sendParams?.type !== "alone" && setIsOpen(!isOpen);
                sendParams?.type !== "alone" && setBorderColor("darkBlue.400");
              }}
            >
              <HStack
                bg="#5C50D2"
                borderRadius={pxToDp(40)}
                minWidth={pxToDp(174)}
                h={pxToDp(62)}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize={pxToDp(32)} color="white" mr={pxToDp(10)}>
                  {selectedItem?.symbol}
                </Text>
                <Image alt="img" w={pxToDp(35)} h={pxToDp(35)} source={Icons.arrowDownW}></Image>
              </HStack>
            </Pressable>
            <AssetsActionSheet
              isOpen={isOpen}
              close={setIsOpen}
              tabs={[I18n.t("wallet.coinsAssets"), I18n.t("wallet.nftAssets")]}
              type="double"
              selectItemArray={accountArray}
              handleSelect={handleSelect}
            ></AssetsActionSheet>
          </HStack>
        </ImageBackground>
        <VStack justifyContent="center" position="relative">
          <VStack w="100%">
            <Pressable
              onPress={() => {
                handleSetTransValue(selectedItem?.count.toString());
              }}
              w="100%"
              pr={pxToDp(37)}
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Text color="#5C50D2" fontSize={pxToDp(42)}>
                {/* Use the maximum value */}
                {I18n.t("send.useMax")}
              </Text>
            </Pressable>
          </VStack>
          <VStack mt={pxToDp(90)} w="100%" justifyContent="center">
            <HStack
              borderColor="#D2D2D2"
              borderBottomWidth={pxToDp(3)}
              justifyContent="space-between"
              borderRadius="6"
              alignItems="center"
              px={pxToDp(39)}
              h={pxToDp(100)}
            >
              <Text fontSize={pxToDp(36)} fontWeight="bold">
                {/* $
                {isNumber(Number(Number(inputCount * 6.65665).toFixed(4)))
                  ? Number(inputCount * 6.65665).toFixed(4)
                  : null} */}
              </Text>
              <Text fontSize={pxToDp(36)} fontWeight="bold">
                Balance:{selectedItem?.count}
                <Text> {selectedItem?.symbol}</Text>
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default React.memo(AccountStep);
