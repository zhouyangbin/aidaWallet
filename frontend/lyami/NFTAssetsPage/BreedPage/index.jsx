import React, { useState, useCallback, useMemo } from "react";
import { VStack, PresenceTransition, Image, HStack, Text, Pressable, FlatList } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import Icons from "../../asset/Icon";
import FooterModal from "../../component/FooterModal";
import CrystalBallComponent from "../Crystalball";
import { Crystalball } from "../../api/web3/Crystalball";
import PriorityEdit from "../../component/PriorityEdit";
// import { contractAddress as ERC721contractAddress } from "../../api/util/constant";
import config from "../../api/util/config";
import global from "../../api/util/global";
import { handleFetchTransactionGas } from "../../api/service/index";
import LinearGradient from "react-native-linear-gradient";
import { pxToDp } from "../../../utils/stylesKits";
import Button from "../../component/Button";
import ResultBox from "./ResultBox";
import { handleMoneyFormatter } from "../../api/util/helper";
import breedCon from "@/../../assets/image/UiImg/breedCon.webp";
import { ImageBackground } from "react-native";
import aidaTip from "@/../../assets/image/UiImg/aidaTip.webp";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import { cloneDeep } from "lodash";
import BreedGas from "./BreedGas";
import { useGlobalStore } from "../../api/Store/globalHook";
import {I18n} from '../../../language/I18n'

const BreedPage = props => {
  const { show, close, initFatherBall, listData, initCrystalballData, setShowDetail, passBreedResult } = props;
  const [seedShow, setSeedShow] = useState(false);
  const [fatherBall, setFatherBall] = useState(null);
  const [motherBall, setMotherBall] = useState(null);
  const [seedItemSelect, setSeedItemSelect] = useState(null);
  const [isFather, setIsFather] = useState(true);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState(null);
  // const [priorityShow, setPriorityShow] = useState({});
  // const [gasLimit, setGasLimit] = useState(null);
  const [isBreeded, setIsBreeded] = useState(false);
  const [resultShow, setResultShow] = useState(false);
  // const [priorityIndex, setPriorityIndex] = useState(1);
  const [breedResult, setBreedResult] = useState(null);
  const [coin, setCoin] = useState(0);
  const [gasShow, setGasShow] = useState(false);
  const [breedFee, setBreedFee] = useState(null);
  const { currentAccount } = useGlobalStore();
  const handleGetBreedFee = async () => {
    const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
    const response = await crystalballInstance.getMintBallPrice();
    setBreedFee(response);
  };
  const handleClickBreed = async () => {
    setGasShow(true);
    // setLoading(true);
    // try {
    //   const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS);
    //   const gas = await crystalballInstance.reproductionNewBall(fatherBall.ballid, motherBall.ballid);
    //   const result = await crystalballInstance.reproductionNewBall(
    //     fatherBall.ballid,
    //     motherBall.ballid,
    //     gas,
    //     priority.maxPriorityFee * 10 ** 9
    //   );
    //   //繁育成功 保存记录
    //   const orderData = {
    //     order: {
    //       value: 0,
    //       selectPayload: {
    //         symbol: "MITIC",
    //       },
    //     },
    //     time: new Date(),
    //     type: "breed",
    //     status: "success",
    //     info: result,
    //     address: global.defaultKey.address,
    //   };
    //   global.Records.unshift(orderData);
    //   SaveGlobalData(global.CreateNewPassword);
    //   setBreedResult(result);
    //   setIsBreeded(true);
    //   setLoading(false);
    // } catch (error) {
    //   //繁育失败 保存记录
    //   const orderData = {
    //     order: {
    //       value: 0,
    //       selectPayload: {
    //         symbol: "MITIC",
    //       },
    //     },
    //     time: new Date(),
    //     type: "breed",
    //     status: "fail",
    //     info: error,
    //     address: global.defaultKey.address,
    //   };
    //   global.Records.unshift(orderData);
    //   SaveGlobalData(global.CreateNewPassword);
    //   setLoading(false);
    // }
  };
  // const handleGetServerGasFee = async () => {
  //   const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
  //   const {
  //     data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
  //   } = res;
  //   setGasLimit(GasLimit);
  //   setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
  // };
  const removeArray = array => {
    console.log(fatherBall);
    array = array.filter(item => {
      if (fatherBall && motherBall) {
        return (
          item.ballid != fatherBall.ballid &&
          item.ballid != motherBall.ballid &&
          item.reproductionTimes < config.maxProductionTime &&
          item.dynasty < config.maxDynasty &&
          item.dynasty == fatherBall.dynasty
        );
      } else if (fatherBall) {
        return (
          item.ballid != fatherBall.ballid &&
          item.reproductionTimes < config.maxProductionTime &&
          item.dynasty < config.maxDynasty &&
          item.dynasty == fatherBall.dynasty
        );
      } else {
        return item.reproductionTimes < config.maxProductionTime && item.dynasty == config.maxDynasty;
      }
    });
    console.log(array);
    return array;
  };

  const memoListData = useMemo(() => {
    const array = cloneDeep(listData);
    return removeArray(array);
  }, [listData.length, seedShow]);

  const goToSonAIDA = () => {
    initCrystalballData();
    setResultShow(false);
    close(false);
    setShowDetail(false);
    passBreedResult(breedResult);
  };

  useFocusEffect(
    useCallback(() => {
      setFatherBall(initFatherBall);
      // handleGetServerGasFee();
      setCoin(handleMoneyFormatter(currentAccount.coinAssets[0]?.balance, 5));
      handleGetBreedFee();
      return () => {
        setFatherBall(null);
        setMotherBall(null);
        setPriority(null);
        setIsBreeded(false);
        setBreedFee(null);
        // setGasLimit(null);
        setSeedItemSelect(null);
      };
    }, [initFatherBall, show])
  );

  return (
    <VStack position="absolute" top="0" w="100%" h="100%" justifyContent="center">
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
        <Pressable
          onPress={() => {
            setSeedShow(false);
          }}
        >
          <VStack h="100%" shadow="4" width="100%" borderRadius="8" alignItems="center" bg="#E9ECEE">
            <HStack position="absolute" top="0" borderBottomRadius={pxToDp(30)} overflow="hidden">
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#1E2C5D", "#213370"]}
                style={{ width: "100%", height: pxToDp(533) }}
              />
            </HStack>
            <HStack w="100%" mt={pxToDp(130)} justifyContent="space-between">
              <HStack alignItems="center">
                <Pressable
                  ml={pxToDp(41)}
                  onPress={() => {
                    setSeedShow(false);
                    close(false);
                  }}
                >
                  <Image w={pxToDp(70)} h={pxToDp(49)} key={new Date()} source={Icons.goBackArrowWIcon}></Image>
                </Pressable>
                <Text ml={pxToDp(67)} fontSize={pxToDp(50)} fontWeight="800" color="white">
                {I18n.t("aida.breed")}
                </Text>
              </HStack>
              <HStack
                mr={pxToDp(40)}
                borderRadius={47}
                overflow="hidden"
                alignItems="center"
                bg="#3A4B86"
                pr={pxToDp(19)}
                h={pxToDp(94)}
              >
                <Image mt="0.5" mx={pxToDp(14)} w={pxToDp(85)} h={pxToDp(85)} source={Icons.coinLogoIcon}></Image>
                <Text color="white" textAlign="center" fontWeight="bold" fontSize={pxToDp(46)}>
                  {coin} <Text> {global.defaultNetwork.CoinSymbol}</Text>
                </Text>
              </HStack>
            </HStack>
            <VStack w="100%" flex="1" alignItems="center">
              <VStack justifyContent="space-between" borderRadius={30} mt={pxToDp(83)} w={pxToDp(1057)}>
                <ImageBackground
                  style={{ width: pxToDp(1057), height: pxToDp(1025), position: "absolute", top: 0 }}
                  source={breedCon}
                ></ImageBackground>
                <HStack h={pxToDp(687.5)} pt={pxToDp(70)} px={pxToDp(58)} justifyContent="space-around">
                  <VStack h={pxToDp(570)} alignItems="center" borderRadius="30" width={pxToDp(442)}>
                    <Pressable
                      onPress={() => {
                        if (seedShow) {
                          return setSeedShow(false);
                        }
                        setIsFather(true);
                        setSeedShow(true);
                      }}
                      w="100%"
                      h="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {fatherBall ? (
                        <VStack alignItems="center" pt={pxToDp(16)} px={pxToDp(21)}>
                          <CrystalBallComponent
                            type="primary"
                            width={pxToDp(410)}
                            height={pxToDp(424)}
                            gene={fatherBall.gene}
                          />
                          <HStack
                            mt={pxToDp(10)}
                            borderRadius={pxToDp(27)}
                            justifyContent="center"
                            w={pxToDp(370)}
                            h={pxToDp(53)}
                          >
                            <ImageBackground source={aidaTip} style={{ width: pxToDp(370), height: pxToDp(53) }}>
                              <HStack h="100%" w="100%" alignItems="center" justifyContent="center">
                                <Text color="white" textAlign="center" lineHeight={pxToDp(53)} h={pxToDp(53)}>
                                  AIDA-{fatherBall.ballid}
                                </Text>
                              </HStack>
                            </ImageBackground>
                          </HStack>
                        </VStack>
                      ) : (
                        <VStack alignItems="center">
                          <Image
                            mb={pxToDp(113)}
                            alt="img"
                            source={Icons.breedAddIcon}
                            h={pxToDp(152)}
                            w={pxToDp(152)}
                          ></Image>
                          <Text fontWeight="800" fontSize={pxToDp(50)}>
                           {I18n.t("aida.addAIDA")}
                          </Text>
                        </VStack>
                      )}
                    </Pressable>
                  </VStack>
                  <VStack h={pxToDp(570)} alignItems="center" borderRadius="30" width={pxToDp(442)}>
                    <Pressable
                      onPress={() => {
                        if (seedShow) {
                          return setSeedShow(false);
                        }
                        setIsFather(false);
                        setSeedShow(true);
                      }}
                      w="100%"
                      h="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {motherBall ? (
                        <VStack alignItems="center" pt={pxToDp(16)} px={pxToDp(21)}>
                          <CrystalBallComponent
                            type="primary"
                            width={pxToDp(410)}
                            height={pxToDp(424)}
                            gene={motherBall.gene}
                          />
                          <HStack
                            mt={pxToDp(10)}
                            borderRadius={pxToDp(27)}
                            justifyContent="center"
                            w={pxToDp(370)}
                            h={pxToDp(53)}
                          >
                            <ImageBackground source={aidaTip} style={{ width: pxToDp(370), height: pxToDp(53) }}>
                              <Text h={pxToDp(53)} lineHeight={pxToDp(53)} color="white" textAlign="center">
                                AIDA-{motherBall.ballid}
                              </Text>
                            </ImageBackground>
                          </HStack>
                        </VStack>
                      ) : (
                        <VStack alignItems="center">
                          <Image
                            mb={pxToDp(113)}
                            alt="img"
                            source={Icons.breedAddIcon}
                            h={pxToDp(152)}
                            w={pxToDp(152)}
                          ></Image>
                          <Text fontWeight="800" fontSize={pxToDp(50)}>
                          {I18n.t("aida.addAIDA")}
                          </Text>
                        </VStack>
                      )}
                    </Pressable>
                  </VStack>
                </HStack>
                <HStack mt={pxToDp(71)} pt={pxToDp(13)} h={pxToDp(220.5)} justifyContent="center" alignItems="center">
                  {loading ? (
                    <Text fontSize={pxToDp(60)} color="#5C50D2">
                      Breeding...
                    </Text>
                  ) : !isBreeded ? (
                    <HStack>
                      <VStack>
                        {/* <HStack>
                          <Text fontSize={pxToDp(42)} mr="2">
                            GAS:
                          </Text>
                          <Text fontSize={pxToDp(42)}>{priority?.maxFee} GWEI</Text>
                        </HStack> */}
                        <HStack>
                          <Text fontSize={pxToDp(42)} mr="2">
                            LEQ:
                          </Text>
                          <Text fontSize={pxToDp(42)}>{breedFee ? breedFee : "?"}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  ) : (
                    <Text fontSize={pxToDp(60)} color="#14CA54">
                      Breeding completed
                    </Text>
                  )}
                </HStack>
              </VStack>
              <HStack w="100%" flex="1" justifyContent="center" alignItems="center" mt="4">
                {loading ? null : (
                  <Button
                    type="lg"
                    onPress={() => {
                      if (isBreeded) {
                        setResultShow(true);
                      } else {
                        handleClickBreed();
                      }
                    }}
                    isDisabled={!fatherBall || !motherBall}
                  >
                    {isBreeded ? I18n.t("aida.chargeAIDA") : I18n.t("aida.startBreeding")}
                  </Button>
                )}
              </HStack>
            </VStack>
          </VStack>
        </Pressable>
      </PresenceTransition>
      {/* <PriorityEdit
        priority={priority}
        setPriority={setPriority}
        setGasLimit={setGasLimit}
        setPriorityIndex={setPriorityIndex}
        priorityIndex={priorityIndex}
        // initGasLimit={gasFee.count}
        show={priorityShow}
        close={setPriorityShow}
      ></PriorityEdit> */}
      <FooterModal show={seedShow}>
        <VStack
          alignItems="center"
          position="relative"
          h={pxToDp(906)}
          w="100%"
          overflow="hidden"
          borderTopRadius={pxToDp(70)}
          bg="white"
        >
          <HStack h={pxToDp(153)} justifyContent="center" alignItems="center">
            <Text fontSize={pxToDp(54)} fontWeight={800}>
              AIDA Backpack
            </Text>
          </HStack>
          <HStack w={pxToDp(998)} flex="1">
            <FlatList
              numColumns={7}
              data={memoListData}
              keyExtractor={(item, index) => index.toString()}
              bg="#E9ECEE"
              borderRadius={pxToDp(30)}
              p={pxToDp(19)}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    mb={pxToDp(17)}
                    w={pxToDp(205)}
                    h={pxToDp(205)}
                    mr={(index + 1) % 7 == 0 && index != 0 ? 0 : pxToDp(14)}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={pxToDp(19)}
                    bg="white"
                    borderWidth={pxToDp(2)}
                    borderColor={item.ballid == seedItemSelect?.ballid ? "#5C50D2" : "white"}
                    onPress={() => {
                      setSeedItemSelect(item);
                    }}
                  >
                    <CrystalBallComponent type="primary" width={pxToDp(150)} height={pxToDp(150)} gene={item.gene} />
                    <Text
                      bg="#ECEBF7"
                      h={pxToDp(37)}
                      lineHeight={pxToDp(37)}
                      mb={pxToDp(11)}
                      color="#5C50D2"
                      borderRadius={pxToDp(17)}
                      px={pxToDp(23)}
                      fontSize={pxToDp(26)}
                    >
                      AIDA-{item.ballid}
                    </Text>
                  </Pressable>
                );
              }}
            ></FlatList>
          </HStack>
          <HStack mt={pxToDp(59)}>
            <Button
              type="lg"
              mb={pxToDp(53)}
              isDisabled={seedItemSelect?.isReproduction}
              onPress={() => {
                // if (seedItemSelect.reproductionTimes == 7) return alert('已经繁育七次了，不能继续繁育');
                if (isFather) {
                  setSeedShow(false);
                  return setFatherBall(seedItemSelect);
                }
                setSeedShow(false);
                setMotherBall(seedItemSelect);
                // handleGetGas(seedItemSelect);
              }}
            >
              Put in
            </Button>
          </HStack>
          {/* 
          <HStack borderRadius={pxToDp(30)} w={pxToDp(998)} bg="#E9ECEE" h={pxToDp(444)} mt={pxToDp(59)}>
            <VStack w={pxToDp(504)} alignItems="center" justifyContent="center">
              {seedItemSelect ? (
                <VStack>
                  <CrystalBallComponent
                    type="primary"
                    width={pxToDp(307)}
                    height={pxToDp(319)}
                    gene={seedItemSelect.gene}
                  />
                  <Text fontSize={pxToDp(46)} textAlign="center">
                    BallId:{seedItemSelect.ballid}
                  </Text>
                </VStack>
              ) : null}
            </VStack>
            <HStack flex="1">
              <VStack justifyContent="center">
                <HStack
                  alignItems="center"
                  mb={pxToDp(29)}
                  shadow={1}
                  w={pxToDp(438)}
                  h={pxToDp(166)}
                  borderRadius={pxToDp(30)}
                  bg="white"
                >
                  <Image
                    ml={pxToDp(31)}
                    mr={pxToDp(34)}
                    w={pxToDp(110)}
                    h={pxToDp(110)}
                    source={Icons.breedLogoIcon}
                  ></Image>
                  <VStack>
                    <Text fontSize={pxToDp(36)}>Breed</Text>
                    <Text fontSize={pxToDp(44)} fontWeight={800}>
                      {seedItemSelect ? seedItemSelect.reproductionTimes : 0} times
                    </Text>
                  </VStack>
                </HStack>
                <HStack
                  alignItems="center"
                  shadow={1}
                  w={pxToDp(438)}
                  h={pxToDp(166)}
                  borderRadius={pxToDp(30)}
                  bg="white"
                >
                  <Image
                    ml={pxToDp(31)}
                    mr={pxToDp(34)}
                    w={pxToDp(110)}
                    h={pxToDp(110)}
                    source={Icons.breedStatusIcon}
                  ></Image>
                  <VStack>
                    <Text fontSize={pxToDp(36)}>Status</Text>
                    <Text fontSize={pxToDp(44)} fontWeight={800}>
                      {seedItemSelect?.isReproduction ? "disBreedable" : "Breedable"}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </HStack> */}
        </VStack>
      </FooterModal>
      {gasShow ? (
        <BreedGas
          setBreedResult={setBreedResult}
          gasShow={gasShow}
          setGasShow={setGasShow}
          fatherBall={fatherBall}
          motherBall={motherBall}
          setIsBreeded={setIsBreeded}
          breedFee={breedFee}
        ></BreedGas>
      ) : null}
      {resultShow ? <ResultBox resultBall={breedResult} show={show} goToSonAIDA={goToSonAIDA} /> : null}
    </VStack>
  );
};

export default React.memo(BreedPage);
