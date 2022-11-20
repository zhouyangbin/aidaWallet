import React, { useState, useEffect, useCallback } from "react";
import { HStack, VStack, Image, Text, FlatList, Pressable, useToast } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Spin from "../../component/Spin";
import {
  handleGetUserCrystalBalls,
  handleSetCrystalBallState,
  handleUserLeaseHoldBall,
  handleGetCrystalBallState,
  handleGetUserAllBalls,
  handleGetUserBallsState,
  handleSetUserBallsState,
} from "../../api/service";
import global from "../../api/util/global";
import { ImageBackground, NativeModules } from "react-native";
import { handleFindArrayItem, arrayToBase64 } from "../../api/util/helper";
import CrystalBallComponent from "../../NFTAssetsPage/Crystalball";
import { pxToDp } from "../../../utils/stylesKits";
import { assign, cloneDeep } from "lodash";
import { privateKeyToPublicKey, signatureMessage } from "../../api/util/crypto";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import Button from "../../component/Button";
import { useGlobalStore } from "../../api/Store/globalHook";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const openLink = async () => {
  try {
    const url = "https://opensea.io/collection/aidameta";
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        // dismissButtonStyle: "cancel",
        // preferredBarTintColor: "#453AA4",
        // preferredControlTintColor: "white",
        // readerMode: false,
        // animated: true,
        // modalPresentationStyle: "fullScreen",
        // modalTransitionStyle: "coverVertical",
        // modalEnabled: true,
        // enableBarCollapsing: false,
        // Android Properties
        showTitle: false,
        toolbarColor: "#5C50D2",
        secondaryToolbarColor: "black",
        navigationBarColor: "black",
        navigationBarDividerColor: "white",
        enableUrlBarHiding: false,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
        headers: {
          Browser: "Browser",
        },
      });
      await sleep(800);
      //   Alert.alert(JSON.stringify(result));
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};

const handleGoBack = async (isFromLogin, goLogin, actionName) => {
  if (actionName == "come") {
    const msg = JSON.stringify("");
    return await NativeModules.NativeIntent.SetIntentResult(msg);
  }
  return goLogin();
};
const handleReturnButtonClick = async (intentPayload, result, balls, isFromLogin, loginAccount) => {
  // // 生成返回数据
  const returnData = {
    address: isFromLogin ? loginAccount.address : intentPayload.address, // 用户登录过的账户地址
    result: result, // 降临或飞升是否成功
    balls: balls, // 降临的所有水晶球
  };
  const msg = JSON.stringify(returnData);
  await NativeModules.NativeIntent.SetIntentResult(msg);
};

const handleCheckAddress = async (address, setBallsList, intentPayload, setCheckOver, setClickedBuy) => {
  //查询钱包是否包含该地址
  const indexOf = handleFindArrayItem(global.keys, "address", address);
  if (indexOf == -1) {
    const msg = JSON.stringify("");
    return await NativeModules.NativeIntent.SetIntentResult(msg);
  } else {
    global.defaultKey = global.keys[indexOf];
    SaveGlobalData(global.CreateNewPassword);
  }
  handleGetMyBalls(address, setBallsList, intentPayload, setCheckOver, setClickedBuy);
};
const handleGetMyBalls = async (address, setBallsList, intentPayload, setCheckOver, setClickedBuy) => {
  const userBallData = await handleGetUserCrystalBalls(address);
  const {
    data: { Balls },
  } = userBallData;

  if (Balls.length == 0) {
    setCheckOver(true);
    return setClickedBuy(false);
  }
  const ballIdArray = [];
  Balls.map(item => {
    ballIdArray.push(item.Ballid);
  });
  const { data: ballStateResult } = await handleGetCrystalBallState(arrayToBase64(ballIdArray));

  Balls.map((item, index) => {
    ballStateResult?.map((itemIn, indexIn) => {
      if (item.Ballid == itemIn.BallId) {
        item.value = itemIn.Value;
        if (itemIn.Name == intentPayload.gameName) {
          item.isInitAdvent = true;
          if (item.value == 1) {
            item.isAdvent = true;
          }
        }
        item.name = itemIn.Name;
        ballStateResult?.splice(indexIn, 1);
      }
    });
  });
  setBallsList(Balls);
  setCheckOver(true);
  setClickedBuy(false);
};

const handleClickAida = (ballsList, index, setBallsList, toast, isAlerted, setIsAlerted, intentPayload) => {
  const array = cloneDeep(ballsList);
  if (intentPayload.maxNumber == 1) {
    array.map((item, indexIn) => {
      item.isAdvent = false;
      if (index == indexIn) {
        item.isAdvent = true;
        if (item.name != intentPayload.gameName && item.value == 1) {
          toast.show({
            description: `将会从${item.name}中召回此AIDA并降临到${intentPayload.gameName}`,
            duration: 2000,
            placement: "top",
          });
        }
      }
    });
  } else {
    const shouldAdventList = array.filter((value, index, array) => {
      return value.isAdvent;
    });
    if (shouldAdventList.length < intentPayload.maxNumber) {
      array.map((item, indexIn) => {
        if (index == indexIn) {
          item.isAdvent = !item.isAdvent;
          if (item.name != intentPayload.gameName && item.value == 1 && item.isAdvent) {
            toast.show({
              description: `将会从${item.name}中召回此AIDA并降临到${intentPayload.gameName}`,
              duration: 2000,
              placement: "top",
            });
          }
          if (item.name == intentPayload.gameName && !item.isAdvent) {
            toast.show({
              description: `将会从${item.name}中召回此AIDA`,
              duration: 2000,
              placement: "top",
            });
          }
        }
      });
    } else {
      array.map((item, indexIn) => {
        if (index == indexIn) {
          if (item.isAdvent) {
            item.isAdvent = false;
          } else {
            toast.show({
              description: "AIDA降临数量已达上限",
              duration: 3000,
              placement: "top",
            });
          }
        }
      });
    }
  }
  setBallsList(array);
};

const handleClickCome = async (
  setSpin,
  toast,
  ballsList,
  intentPayload,
  isFromLogin,
  loginAccount,
  handleSetGlobalData
) => {
  setSpin(true);

  try {
    const time = new Date().toISOString();
    if (ballsList.length != 0) {
      const ballIds = [];
      const returnBallIds = [];

      const willAdventList = ballsList.filter((value, index, array) => {
        return value.isAdvent || (value.isInitAdvent && value.value == 1);
      });

      if (willAdventList.length < intentPayload.minNumber && intentPayload?.type == 1) {
        setSpin(false);
        return toast.show({
          description: `请至少选择${intentPayload.minNumber}个aida进行降临`,
          duration: 3000,
          placement: "top",
        });
      }
      if (willAdventList.length > intentPayload.maxNumber) {
        setSpin(false);
        return toast.show({
          description: `请至多选择${intentPayload.maxNumber}个aida进行降临`,
          duration: 3000,
          placement: "top",
        });
      }
      ballsList.map((item, index) => {
        if (item.isAdvent) {
          returnBallIds.push(item.Ballid);
          if (!item.isInitAdvent) {
            ballIds.push({ id: item.Ballid, value: 1 });
          }
        } else {
          if (item.isInitAdvent) {
            ballIds.push({ id: item.Ballid, value: 0 });
          }
        }
      });
      // console.log(ballIds);
      // try {
      //   const gas = await handleSetUserBallsState(11, "Lobby", false);
      //   const response = await handleSetUserBallsState(11, "Lobby", false, gas, 0);
      //   console.log(response);
      // } catch (error) {
      //   console.log("-----------降临调试-----------");
      //   console.log(error);
      //   console.log("-----------降临调试-----------");
      // }

      try {
        const requestPayload = {
          ballidlist: arrayToBase64(ballIds),
          name: intentPayload.gameName,
          time: time,
          publickey: privateKeyToPublicKey(global.defaultKey.privateKey),
          sign: await signatureMessage(global.web3, `${arrayToBase64(ballIds)}${time}`, global.defaultKey.privateKey),
        };

        const requestResult = await handleSetCrystalBallState(requestPayload);
        setSpin(false);
        if (requestResult.state != 0) return;
        handleReturnButtonClick(intentPayload, true, returnBallIds, isFromLogin, loginAccount, handleSetGlobalData);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("租借");
      // try {
      //   const getBall = await handleUserLeaseHoldBall(1, global.defaultAddress());
      //   const leasedBalls = await handleGetUserCrystalBalls(global.defaultAddress());
      //   const {
      //     data: {
      //       Balls: [currentBall],
      //     },
      //   } = leasedBalls;
      //   const comeResult = await handleSetCrystalBallState(
      //     currentBall.Ballid,
      //     intentPayload.gameName,
      //     intentPayload.type
      //   );
      //   console.log(comeResult);
      //   setSpin(false);

      //   toast.show({
      //     description: "降临成功",
      //     duration: 1500,
      //     placement: "top",
      //   });
      // } catch (error) {checkOver
      //   console.log(error);
      // }
    }
    setSpin(false);
  } catch (error) {
    console.log("------------error------------");
    console.log(error);
    console.log("------------error------------");

    setSpin(false);
  }
};
const handleReturnTitle = intentPayload => {
  if (intentPayload.minNumber == intentPayload.maxNumber) {
    return "必须降临一个AIDA";
  } else {
    return `请降临${intentPayload.minNumber}-${intentPayload.maxNumber}个AIDA`;
  }
};
const ComePage = props => {
  const { isFromLogin, goLogin, loginAccount } = props;
  const toast = useToast();
  const [isSpin, setSpin] = useState(false);
  const [intentPayload, setIntentPayload] = useState({});
  const [ballsList, setBallsList] = useState([]);
  const [checkOver, setCheckOver] = useState(false);
  const [isCome, setIsCome] = useState(null);
  const [actionName, setActionName] = useState("");
  const [isAlerted, setIsAlerted] = useState(false);
  const { handleSetGlobalData } = useGlobalStore();
  const [clickedBuy, setClickedBuy] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const intentData = global.intentData;
    const {
      action,
      data: { address, type, gameName },
    } = intentData;
    setActionName(action);
    if (type == 1) {
      setIsCome(true);
    } else {
      setIsCome(false);
    }
    console.log(intentData);
    setIntentPayload(intentData.data);
    handleCheckAddress(
      isFromLogin ? loginAccount.address : address,
      setBallsList,
      intentData.data,
      setCheckOver,
      setClickedBuy
    );
    return () => {};
  }, [global.intentData.data.address, loginAccount, isFromLogin]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        handleSetGlobalData({ assetsLoaded: false });
      };
    }, [global.intentData.data.address, loginAccount, isFromLogin])
  );

  return (
    <Spin isSpin={isSpin}>
      <HStack
        w="100%"
        pt={pxToDp(101)}
        h={pxToDp(265)}
        px="2%"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        shadow={5}
      >
        <Pressable
          w="25%"
          onPress={() => {
            return navigation.navigate("WalletMainNew", {});
          }}
        >
          {/* <Image alt="img" size="2xs" source={Icons.backIcon}></Image> */}
        </Pressable>
        <VStack flex="1" justifyContent="center" alignItems="center">
          <Text textAlign="center" fontSize={pxToDp(49)} fontWeight="800">
            Lobby
          </Text>
          <Text textAlign="center" fontSize={pxToDp(34)} fontWeight="800">
            {handleReturnTitle(intentPayload)}
          </Text>
        </VStack>

        <HStack w="25%"></HStack>
      </HStack>
      <VStack height="100%" alignItems="center" flex="1" w="100%">
        <HStack flex="1" w="100%" pt={pxToDp(17)}>
          {checkOver && ballsList.length == 0 ? (
            <VStack w="100%" h="100%" alignItems="center" justifyContent="center">
              <Text fontSize={pxToDp(31)} fontWeight="bold">
                需要至少三个AIDA才可以进行降临游戏，请前往购买
              </Text>
              {clickedBuy ? (
                <Button
                  mt={pxToDp(43)}
                  type="lg"
                  onPress={() => {
                    setCheckOver(false);
                    handleCheckAddress(
                      isFromLogin ? loginAccount.address : address,
                      setBallsList,
                      global.intentData.data,
                      setCheckOver,
                      setClickedBuy
                    );
                  }}
                >
                  已购买？点击加载AIDA
                </Button>
              ) : (
                <Button
                  mt={pxToDp(43)}
                  type="lg"
                  onPress={() => {
                    openLink();
                    setClickedBuy(true);
                  }}
                >
                  去购买
                </Button>
              )}
            </VStack>
          ) : (
            <FlatList
              data={ballsList}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <HStack w="25%" alignItems="center" justifyContent="center" mb={pxToDp(1)} position="relative">
                    <ImageBackground
                      key={item.isAdvent}
                      source={item.isAdvent ? Icons.selectedComeIcon : Icons.notSelectCome}
                      resizeMode="stretch"
                      style={{ width: pxToDp(279), height: pxToDp(347), position: "absolute" }}
                    ></ImageBackground>
                    <Pressable
                      w={pxToDp(259)}
                      h={pxToDp(327)}
                      onPress={() => {
                        handleClickAida(ballsList, index, setBallsList, toast, isAlerted, setIsAlerted, intentPayload);
                      }}
                      alignItems="center"
                      position="relative"
                      justifyContent="center"
                    >
                      {item.name && item.value == 1 && (
                        <Text
                          borderRadius={pxToDp(31)}
                          px={pxToDp(7)}
                          fontSize={pxToDp(25)}
                          bg={item.isInitAdvent && item.isAdvent ? "#5C50D2" : "gray.400"}
                          color="white"
                          position="absolute"
                          left={pxToDp(14)}
                          top={pxToDp(2)}
                        >
                          Lobby on {item.name}
                        </Text>
                      )}
                      <CrystalBallComponent width={pxToDp(207)} height={pxToDp(207)} type="primary" gene={item.Gene} />
                      <Text mt={pxToDp(1)} mb={pxToDp(17)} fontSize={pxToDp(28)} fontWeight="bold">
                        AidaID:#{item.Ballid}
                      </Text>
                      <Image
                        w={pxToDp(39)}
                        h={pxToDp(39)}
                        position="absolute"
                        top={pxToDp(19)}
                        right={pxToDp(31)}
                        key={item.isAdvent}
                        source={item.isAdvent ? Icons.selectPIcon : Icons.notSelectIcon}
                      ></Image>
                    </Pressable>
                  </HStack>
                );
              }}
            ></FlatList>
          )}
        </HStack>
        <VStack
          w="100%"
          alignItems="center"
          h={pxToDp(365)}
          bg="white"
          borderTopLeftRadius={pxToDp(59)}
          borderTopRightRadius={pxToDp(59)}
        >
          <Button
            isLoading={!checkOver}
            mt={pxToDp(69)}
            type="lg"
            onPress={() => {
              if (ballsList.length == 0) {
                return toast.show({ placement: "top", duration: 2000, description: "请先购买AIDA" });
              }
              handleClickCome(setSpin, toast, ballsList, intentPayload, isFromLogin, loginAccount, handleSetGlobalData);
            }}
          >
            Immediately Advent
          </Button>
          <Button
            color="#5C50D2"
            bg="transparent"
            type="lg"
            onPress={() => {
              handleGoBack(isFromLogin, goLogin, actionName);
            }}
          >
            Return
          </Button>
        </VStack>
      </VStack>
    </Spin>
  );
};

export default React.memo(ComePage);
