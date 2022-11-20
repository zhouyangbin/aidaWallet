import React, { useEffect } from "react";
import { VStack, PresenceTransition, Image, HStack, Text, Pressable, ScrollView, FlatList, Center } from "native-base";
import { useState } from "react";
import Icons from "../../asset/Icon";
import Breed, { BasicInformation, BloodInformation, BreedingRecord } from "./Breed";
import GameComp from "./GameComp";
import { useNavigation } from "@react-navigation/native";
import { pxToDp } from "../../../utils/stylesKits";
import { handleMoneyFormatter } from "../../api/util/helper";
import global from "../../api/util/global";
import CrystalBallComponent from "../Crystalball";
import shadowCon from "@/../../assets/image/UiImg//shadowCon.webp";
import { ImageBackground } from "react-native";
import metaSearch from "@/../../assets/image/UiImg/metaSearch.webp";
import Button from "../../component/Button";
import EditMetaModal from "./EditMetaModal";
import { useGlobalStore } from "../../api/Store/globalHook";
import { I18n } from "../../../language/I18n";
import config from "../../api/util/config";
import { Crystalball } from "../../api/web3/Crystalball";
import { handleGetNFTJson } from "../../api/service";
import moment from "moment";
// const tabsArray = ["Breed data", "Game data"];
const Tab = payload => {
  const tabsArray = [I18n.t("aida.breedData"), I18n.t("aida.gameData")];
  const { tabIndex, setTabIndex } = payload;
  return (
    <HStack w="100%" mt={pxToDp(28)} mb={pxToDp(26)} borderRadius={pxToDp(16)}>
      <HStack w={pxToDp(594)} h={pxToDp(84)} bg="white" borderRadius={pxToDp(16)} overflow="hidden">
        {tabsArray.map((item, index) => {
          return (
            <Pressable
              w={pxToDp(297)}
              h={pxToDp(84)}
              key={index}
              onPress={() => {
                setTabIndex(index);
              }}
              bg={index == tabIndex ? "#5C50D2" : "white"}
              borderRadius={pxToDp(16)}
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize={pxToDp(36)}
                fontWeight={index == tabIndex ? "800" : "500"}
                color={index == tabIndex ? "white" : null}
                textAlign="center"
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </HStack>
  );
};
const AssetsItemDetailPage = props => {
  const { globalData, handleSetGlobalData, currentAccount } = useGlobalStore();
  const { show, detailsItem, close, setShowBreed, tabType, selectedAIDA } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const navigation = useNavigation();
  const [coin, setCoin] = useState(0);
  const [metaShow, setMetaShow] = useState(false);
  // const [metaArr, setMetaArr] = useState([]);不要删
  useEffect(() => {
    console.log(detailsItem, "----");
    //不要删 getMETAUrls();
    const balance = currentAccount.coinAssets[0].balance;
    setCoin(handleMoneyFormatter(balance, 5));
    return () => {};
  }, [show]);

  const handleSetTabIndex = payload => {
    setTabIndex(payload);
  };
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  const getMETADate = async () => {
    try {
      const METAData = await crystalballInstance.getCrystalBallMeta(detailsItem.ballid, 0, 100); //ballid  后面改成ballid
      return METAData;
    } catch (err) {
      console.log(err);
    }
  };
  // 获取所有meta的URL
  const getMETAUrls = async () => {
    const res = await getMETADate();
    console.log(res, "getMETADate------");
    let promises = [];
    let result = [];
    if (res?.metaUrls.length === 0) {
      return;
    }
    // 保存返回的当前数据的index，加载更多时使用
    res?.metaUrls.forEach((item, index) => {
      if (item !== "") {
        promises.push(
          new Promise((resolve, reject) => {
            try {
              const obj = handleGetNFTJson(item.replace("ipfs://", config.IPFS_ROOT));
              resolve(obj);
            } catch (err) {
              console.log(err);
              reject();
            }
          })
        );
      }
    });
    if (promises.length === 0) {
      return;
    }
    const responce = await Promise.all(promises);
    console.log(responce, "-----------responce------");
    try {
      responce.forEach((item, index) => {
        if (typeof item.data === "string") {
          // 暂时不处理无效json的meta数据
        } else {
          result.push({ ...item.data, image: item.data.image?.replace("ipfs://", config.IPFS_ROOT) });
        }
      });
      console.log(result, "-----------result------");
      setMetaArr(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleReturnComposeItem = detailsItem => {
    switch (tabIndex) {
      case 0:
        return (
          <PresenceTransition
            style={{ width: "100%" }}
            visible={tabIndex == 0}
            initial={{
              opacity: 0,
              translateX: 10,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              transition: {
                duration: 150,
              },
            }}
          >
            {/*不要删 <VStack> */}
              {/* {metaArr.length != 0 ? (
                <ScrollView w={pxToDp(1037)}>
                  <FlatList
                    data={metaArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <VStack
                          borderColor="#fff"
                          w={pxToDp(998)}
                          bg="#fff"
                          borderRadius={pxToDp(30)}
                          justifyContent="space-between"
                          px={pxToDp(22)}
                          py={pxToDp(22)}
                          mb={pxToDp(22)}
                          ml={pxToDp(22)}
                        >
                          <Text py={pxToDp(11)} color="#9F9F9F" fontWeight="bold" fontSize={pxToDp(36)}>
                            {moment(item.createTime).format("YYYY.MM.DD")}
                          </Text>
                          <HStack justifyContent="space-between" alignItems="center">
                            <Text w={pxToDp(651)} color="#181818" fontWeight="bold" fontSize={pxToDp(40)}>
                              {item.title}
                            </Text>
                            <VStack>
                              <Image
                                w={pxToDp(165)}
                                h={pxToDp(165)}
                                borderRadius={pxToDp(16)}
                                alt="image"
                                source={{ uri: item.image }}
                              />
                            </VStack>
                          </HStack>
                        </VStack>
                      );
                    }}
                  />
                </ScrollView>
              ) : null} */}
              {/* 
              <BasicInformation detailsItem={detailsItem}></BasicInformation>
              <BloodInformation detailsItem={detailsItem}></BloodInformation>
              <BreedingRecord detailsItem={detailsItem}></BreedingRecord> 
              */}
            {/* </VStack> */}
          </PresenceTransition>
        );
      case 1:
        return <GameComp></GameComp>;
    }
  };

  const showMETAListPage = () => {
    navigation.navigate("AIDAPage", { item: detailsItem });
  };

  if (detailsItem == null) {
    return <></>;
  }

  return (
    <VStack position="absolute" top="0" w="100%" h={show ? "100%" : 0} alignItems="center" justifyContent="center">
      {/* <ScrollView w="100%"> */}
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 250,
          },
        }}
      >
        <VStack px={pxToDp(41)} h="100%" w="100%" alignItems="center" bg="#E9ECEE">
          <HStack w={pxToDp(1080)} mt={pxToDp(130)} alignItems="center" justifyContent="space-between">
            <Pressable
              ml={pxToDp(41)}
              onPress={() => {
                close(false);
              }}
            >
              <Image w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowBIcon}></Image>
            </Pressable>
            <HStack mr={pxToDp(41)} borderRadius={47} alignItems="center" bg="#DEDEE2" pr={pxToDp(19)} h={pxToDp(94)}>
              <Image mt="0.5" mx={pxToDp(14)} w={pxToDp(85)} h={pxToDp(85)} source={Icons.coinLogoIcon}></Image>
              <Text color="#484848" textAlign="center" fontWeight="bold" fontSize={pxToDp(46)}>
                {coin}
                <Text> {globalData.defaultNetwork.CoinSymbol}</Text>
              </Text>
            </HStack>
          </HStack>
          <HStack mt={pxToDp(32)} w="100%" alignItems="center" justifyContent="space-between">
            <ImageBackground
              resizeMode="stretch"
              source={shadowCon}
              style={{ width: pxToDp(1037), height: pxToDp(367) }}
            >
              <HStack w="100%" h="100%" alignItems="center">
                <HStack h="100%" alignItems="center">
                  <HStack ml={pxToDp(47)} w={pxToDp(232)} h={pxToDp(232)}>
                    {detailsItem ? (
                      <CrystalBallComponent
                        type="primary"
                        width={pxToDp(233)}
                        height={pxToDp(233)}
                        gene={detailsItem.gene}
                      ></CrystalBallComponent>
                    ) : null}
                  </HStack>
                  <VStack ml={pxToDp(23)}>
                    <Text mb={pxToDp(47)} fontSize={pxToDp(42)} fontWeight="bold">
                      AIDA#{detailsItem?.ballid}
                    </Text>

                    <HStack>
                      <Text
                        fontSize={pxToDp(42)}
                        fontWeight="bold"
                        px={pxToDp(14)}
                        lineHeight={pxToDp(54)}
                        borderRadius={pxToDp(54)}
                        color="white"
                        bg="#6F67E1"
                        h={pxToDp(54)}
                      >
                        {detailsItem?.reproductionTimes}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <VStack flex="1" pr={pxToDp(58)} alignItems="flex-end">
                  {/* <Button type="sm" isDisabled={detailsItem?.isOnSale} mb={pxToDp(34)}>
                    {detailsItem?.isOnSale ? I18n.t("aida.uploaded") : I18n.t("aida.upload")}
                  </Button> */}
                  {detailsItem.owner == globalData.defaultAddress.call() && (
                    <Button
                      onPress={() => {
                        if (detailsItem?.reproductionTimes >= 7) {
                          return alert(I18n.t("aida.breedTimes"));
                        }
                        setShowBreed(true);
                      }}
                      type="sm"
                      isDisabled={
                        detailsItem?.isBreed ||
                        detailsItem.reproductionTimes >= config.maxProductionTime ||
                        detailsItem.dynasty >= config.maxDynasty ||
                        detailsItem.reproductionInterval > 0
                      }
                    >
                      {detailsItem?.isOnSale ? I18n.t("aida.breeding") : I18n.t("aida.breed")}
                    </Button>
                  )}
                </VStack>
              </HStack>
            </ImageBackground>
          </HStack>
          <HStack>
            <ImageBackground
              resizeMode="stretch"
              source={shadowCon}
              style={{ width: pxToDp(1037), height: pxToDp(222) }}
            >
              <HStack w="100%" h="100%" pb={pxToDp(11)} justifyContent="space-between" alignItems="center">
                <HStack ml={pxToDp(57)} alignItems="center">
                  <Image source={Icons.homeIcon} w={pxToDp(91)} h={pxToDp(91)}></Image>
                  <Text fontSize={pxToDp(42)} fontWeight="bold" ml={pxToDp(45)}>
                    {I18n.t("aida.gotoHerSpace")}
                  </Text>
                </HStack>
                <HStack h="100%" alignItems="center">
                  <Pressable w={pxToDp(213)} mr={pxToDp(25)} onPress={() => showMETAListPage()}>
                    <Image w={pxToDp(213)} h={pxToDp(70)} source={metaSearch} />
                  </Pressable>
                  {detailsItem.owner == globalData.defaultAddress.call() && (
                    <Pressable
                      w={pxToDp(187)}
                      h={pxToDp(61)}
                      onPress={() => {
                        setMetaShow(true);
                      }}
                      borderRadius={pxToDp(31)}
                      bg="#ECEBF7"
                      alignItems="center"
                      justifyContent="center"
                      mr={pxToDp(58)}
                    >
                      <Text textAlign="center" color="#5C50D2" fontSize={pxToDp(30)} fontWeight="bold">
                        {I18n.t("aida.addMeta")}
                      </Text>
                    </Pressable>
                  )}
                </HStack>
              </HStack>
            </ImageBackground>
            {/* <Compose detailsItem={detailsItem}></Compose>
            <Breed detailsItem={detailsItem}></Breed> */}
          </HStack>
          {/* 不要删 
          <Tab tabIndex={tabIndex} setTabIndex={handleSetTabIndex}></Tab>
           */}
          {/* COMPOSE */}
          <ScrollView w="100%" flex="1" mb="2" pt="2">
            {handleReturnComposeItem(detailsItem)}
          </ScrollView>
          {/* COMPOSE */}
        </VStack>
      </PresenceTransition>
      {/* </ScrollView> */}
      <EditMetaModal ballid={detailsItem.ballid} show={metaShow} close={setMetaShow}></EditMetaModal>
    </VStack>
  );
};

export default React.memo(AssetsItemDetailPage);
