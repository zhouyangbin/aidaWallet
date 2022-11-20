import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-community/clipboard";
import { View, Text, Image, HStack, Pressable, VStack, useToast, Progress, Box, ScrollView } from "native-base";
import Icons from "../asset/Icon";
import WalletIndexListItem from "../component/WalletIndexListItem";
import NFTListItem from "../component/NFTListItem";
import LanguageModal from "./LanguageModal";
import { I18n } from "../../language/I18n";
import Tabs from "../METAPage/compoments/Tabs";
import { pxToDp } from "../../utils/stylesKits";
import shadowConF from "@/../../assets/image/UiImg/shadowConF.webp";
import { ImageBackground, Animated, Easing, DeviceEventEmitter } from "react-native";
import Come from "./Come";
import config from "../api/util/config";
import { useGlobalStore } from "../api/Store/globalHook";
import LoadingContext from "../../providers/LoadContext";
import mainCoinWrap from "../../../assets/image/UiImg/mainCoinWrap.webp";
import { handleMoneyFormatter } from "../api/util/helper";
// const tabs = [I18n.t("wallet.assets"), I18n.t("wallet.space")];

const handleSetClipboard = payload => {
  Clipboard.setString(payload);
};

const formatDefaultAddress = payload => {
  return `${payload.substring(0, 7)}...${payload.substring(payload.length - 5, payload.length)}`;
};

const LyamiWalletPanel = props => {
  const {
    isScanning,
    setIsScanning,
    useDeleteItem,
    // setIndex,
    getNftAll,
    nftLoadingValue,
    isGetNfts,
    setCurrentCoin,
    currentCoin,
  } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  // const [comeVisible, setComeVisible] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showLangModal, setShowLangModal] = useState(false);

  const [showAni, setShowAni] = useState(false);
  const navigation = useNavigation();
  const loading = useContext(LoadingContext);
  const toast = useToast();
  const tabs = [I18n.t("wallet.coinsAssets"), I18n.t("wallet.nftAssets")];
  //钱包组件
  const handleSetCurrentCoin = payload => {
    setCurrentCoin(payload);
  };
  const WalletContent = payload => {
    const { data, tabIndex } = payload;
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    const rotateRef = useRef(new Animated.Value(0));
    const rotate = {
      transform: [
        {
          rotate: rotateRef.current.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", "360deg"],
          }),
        },
      ],
    };
    const rotateStart = useRef(
      Animated.loop(
        Animated.timing(rotateRef.current, {
          toValue: 360,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      )
    ).current;
    useEffect(() => {
      // console.log(isGetNfts);
      if (isGetNfts && nftLoadingValue < 100) {
        rotateStart.start();
      } else {
        rotateStart.stop();
      }
    }, [isGetNfts, nftLoadingValue]);
    return (
      <VStack justifyContent="center" alignItems="center">
        {tabIndex == 0 ? (
          <VStack w={pxToDp(997)}>
            {/* 资产列表 */}
            {account?.coinAssets?.map((item, index) => {
              return (
                <WalletIndexListItem
                  handleSetCurrentCoin={handleSetCurrentCoin}
                  payload={item}
                  length={globalData.defaultNetwork.assets?.length}
                  key={index}
                  index={index}
                  useDeleteItem={useDeleteItem}
                />
              );
            })}
          </VStack>
        ) : (
          // <PresenceTransition
          //   visible={tabIndex == 1}
          //   initial={{
          //     opacity: showAni ? 0 : 1,
          //     translateY: showAni ? 30 : 0,
          //   }}
          //   animate={{
          //     opacity: 1,
          //     translateY: 0,
          //     transition: {
          //       duration: 150,
          //     },
          //   }}
          // >
          <HStack w="100%" pb={pxToDp(31)} justifyContent="center">
            <VStack w={pxToDp(998)} py={pxToDp(19)}>
              {/* //进度条 */}
              <HStack
                mb={pxToDp(29)}
                bg="#FFFFFF"
                borderRadius={pxToDp(30)}
                shadow={3}
                mt={pxToDp(1)}
                w="100%"
                h={pxToDp(149)}
                alignItems="center"
              >
                <Pressable
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => {
                    getNftAll();
                  }}
                  w={pxToDp(121)}
                  isDisabled={isGetNfts}
                  position="relative"
                >
                  <Image w={pxToDp(83)} h={pxToDp(83)} alt="img" source={Icons.loadingWrap}></Image>
                  <Animated.Image
                    alt="img"
                    style={[{ width: pxToDp(39), height: pxToDp(39), position: "absolute" }, rotate]}
                    source={Icons.loadingPoint}
                  ></Animated.Image>
                </Pressable>
                <Box flex="1">
                  <Progress
                    h={pxToDp(17)}
                    bg="#E8EAEB"
                    _filledTrack={{
                      bg: "#897BF3",
                    }}
                    value={nftLoadingValue}
                    mx="1"
                  />
                </Box>
                <Box ml={pxToDp(11)} mr={pxToDp(41)}>
                  {nftLoadingValue ? (
                    <Text fontSize={pxToDp(32)}>{isNaN(nftLoadingValue) ? 100 : nftLoadingValue}%</Text>
                  ) : null}
                </Box>
              </HStack>
              {/* NFT列表 */}
              {account != undefined ? <View>{NFTListItemView(account)}</View> : null}
            </VStack>
          </HStack>
          // </PresenceTransition>
        )}
      </VStack>
    );
  };
  const NFTListItemView = account => {
    let rows = [];
    if (!Object.keys(account).length) {
      return;
    }
    const AddNFTS = account?.AddNFTS || [];
    const NFTAssets = account?.NFTAssets || {};
    if (AddNFTS[0] != config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]) {
      AddNFTS.unshift(config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]);
    }
    //初始没有0
    //根据缓存的nft 的key 渲染
    if (NFTAssets != undefined) {
      const pushRow = index => {
        rows.push(
          <NFTListItem
            spe
            // isNFT={index % 3 == 0}
            payload={NFTAssets[index] || []}
            length={NFTAssets?.length}
            key={index}
            index={index}
            w="100%"
            h="50"
            account={account}
            useDeleteItem={useDeleteItem}
          />
        );
      };
      for (let index of AddNFTS) {
        if (NFTAssets[index]) {
          const source = NFTAssets[index]?.source;
          const account = NFTAssets[index]?.account;
          if (source == undefined) {
            pushRow(index);
          } else if (account != undefined && account == globalData.defaultKey.address) {
            pushRow(index);
          }
        }
      }
    }
    return rows;
  };
  return (
    <VStack flex="1">
      <LanguageModal show={showLangModal} close={setShowLangModal} />
      <View flex="1" paddingBottom={pxToDp(161)} alignItems="center" justifyContent="center">
        {/* {tabIndex == 0 && (
          <HStack w="100%" alignItems="center" justifyContent="flex-end">
            <Pressable
              alignItems="flex-end"
              onPress={() => {
                setIsScanning(!isScanning);
                loading.hideMenu();
              }}
            >
              <Image mr={pxToDp(41)} w={pxToDp(65)} h={pxToDp(65)} alt="img" source={Icons.scanIconB}></Image>
            </Pressable>
          </HStack>
        )} */}
        {tabIndex == 0 && (
          <VStack
            w={pxToDp(998)}
            h={pxToDp(591)}
            shadow={5}
            alignItems="center"
            borderRadius={pxToDp(30)}
            mt={pxToDp(39)}
            bg="white"
          >
            <ImageBackground
              source={mainCoinWrap}
              style={{ height: pxToDp(285), width: pxToDp(998) }}
              resizeMode="stretch"
            >
              <HStack h="100%" alignItems="center">
                <Image ml={pxToDp(45)} w={pxToDp(175)} h={pxToDp(175)} source={Icons.coinLogoIcon}></Image>
                <HStack alignItems="center" justifyContent="center">
                  <Text ml={pxToDp(33)} fontSize={pxToDp(57)} fontWeight="800" color="white">
                    <Text textAlign="center">
                      {currentCoin?.balance ? handleMoneyFormatter(currentCoin?.balance, 11) : null}
                    </Text>
                    <Text> {currentCoin?.symbol}</Text>
                  </Text>
                </HStack>
              </HStack>
            </ImageBackground>
            <HStack w={pxToDp(916)} mt={pxToDp(56)} justifyContent="space-around">
              <Pressable
                onPress={() => {
                  navigation.navigate("Payment", { currentCoin: currentCoin });
                  loading.hideMenu();
                }}
                alignItems="center"
              >
                <Image source={Icons.receiveBtnIcon} w={pxToDp(118)} h={pxToDp(118)}></Image>
                <Text lineHeight={pxToDp(38)} mt={pxToDp(23)} color="#2F2F2F" fontWeight="bold" fontSize={pxToDp(32)}>
                  {I18n.t("receive.receive")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("PostAsset", { currentCoin: currentCoin });
                  loading.hideMenu();
                }}
                alignItems="center"
              >
                <Image source={Icons.sendBtnIcon} w={pxToDp(118)} h={pxToDp(118)}></Image>
                <Text lineHeight={pxToDp(38)} mt={pxToDp(23)} color="#2F2F2F" fontWeight="bold" fontSize={pxToDp(32)}>
                  {I18n.t("wallet.send")}
                </Text>
              </Pressable>
              {/* <Pressable
                onPress={() => {
                  navigation.navigate("Exchange", {});
                  loading.hideMenu();
                }}
                alignItems="center"
              >
                <Image source={Icons.redeemBtnIcon} w={pxToDp(118)} h={pxToDp(118)}></Image>
                <Text lineHeight={pxToDp(38)} mt={pxToDp(23)} color="#2F2F2F" fontWeight="bold" fontSize={pxToDp(32)}>
                  {I18n.t("wallet.redeem")}
                </Text>
              </Pressable> */}
              <Pressable
                onPress={() => {
                  navigation.navigate("HistoryList", {});
                  loading.hideMenu();
                }}
                alignItems="center"
              >
                <Image source={Icons.recordBtnIcon} w={pxToDp(118)} h={pxToDp(118)}></Image>
                <Text lineHeight={pxToDp(38)} mt={pxToDp(23)} color="#2F2F2F" fontWeight="bold" fontSize={pxToDp(32)}>
                  {I18n.t("wallet.records")}
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        )}
        <HStack
          mt={tabIndex === 0 ? pxToDp(53) : pxToDp(70)}
          w="100%"
          justifyContent="center"
          h={pxToDp(84)}
          alignItems="center"
        >
          <Tabs
            mt={0.1}
            w={594}
            tabs={tabs}
            tabIndex={tabIndex}
            setTabIndex={index => {
              if (index == tabIndex) return;
              // setShowAni(true);
              // setTimeout(() => {
              //   setShowAni(false);
              // }, 200);
              setTabIndex(index);
              // setIndex(index);
            }}
          />
          <Pressable
            h={pxToDp(84)}
            position="absolute"
            right={pxToDp(41)}
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              navigation.navigate("AddAssets", {});
              loading.hideMenu();
            }}
          >
            <Image w={pxToDp(51)} h={pxToDp(51)} source={Icons.addAssetBtn}></Image>
          </Pressable>
        </HStack>
        <ScrollView w="100%" flex="1" h="100%" pb={pxToDp(101)} mt={pxToDp(51)}>
          <WalletContent data={globalData} tabIndex={tabIndex} />
        </ScrollView>
      </View>
    </VStack>
  );
};

export default React.memo(LyamiWalletPanel);
