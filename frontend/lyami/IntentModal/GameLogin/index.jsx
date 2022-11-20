import React, { useState, useEffect, useCallback } from "react";
import { HStack, VStack, Image, Text, Pressable, useToast, FlatList } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import global from "../../api/util/global";
import { NativeModules, ImageBackground } from "react-native";
import { pxToDp } from "../../../utils/stylesKits";
import notSelectShadowCon from "@/../../assets/image/UiImg/notSelectShadowCon.webp";
import selectedShadowCon from "@/../../assets/image/UiImg/selectedShadowCon.webp";
import CrystalBallComponent from "../../NFTAssetsPage/Crystalball";
import Button from "../../component/Button";
import { handleFormatAddress, arrayToBase64 } from "@/../../frontend/lyami/api/util/helper";
import { handleGetUserCrystalBalls, handleGetCrystalBallState, handleGetUserCrystalBallData } from "../../api/service";
import { SaveGlobalData } from "../../api/localStorge/LocalStroge";
import { cloneDeep } from "lodash";
import Clipboard from "@react-native-community/clipboard";
import { useGlobalStore } from "../../api/Store/globalHook";

const handleReturnButtonClick = async (account, goCome, intentData, setIsLoading, setLoginAccount, toast) => {
  // return console.log(intentData);
  try {
    // if (account.ballList.length == 0) {
    //   // return alert("没球玩个蛋");
    //   const returnData = {
    //     address: account.address, // 用户登录过的账户地址
    //     result: true, // 降临或飞升是否成功
    //     balls: [], // 降临的所有水晶球
    //   };
    //   const msg = JSON.stringify(returnData);
    //   global.gameLoginRecordAccount = account;
    //   await SaveGlobalData(global.CreateNewPassword);
    //   setIsLoading(false);
    //   return await NativeModules.NativeIntent.SetIntentResult(msg);
    // }

    const balls = [];
    account.comeList.map(item => {
      if (item.Value == 1) {
        balls.push(item.BallId);
      }
    });

    if (balls.length < intentData.data.minNumber) {
      toast.show({
        description: "所选账号不满足最小降临AIDA数量",
        placement: "top",
        duration: 3000,
      });
      setLoginAccount(account);
      return goCome();
    }
    if (balls.length > intentData.data.maxNumber) {
      toast.show({
        description: "所选账号不满足最大降临AIDA数量",
        placement: "top",
        duration: 3000,
      });
      setLoginAccount(account);
      return goCome();
    }
    const returnData = {
      address: account.address, // 用户登录过的账户地址
      result: true, // 降临或飞升是否成功
      balls: balls, // 降临的所有水晶球
    };
    const msg = JSON.stringify(returnData);
    global.gameLoginRecordAccount = account;
    await SaveGlobalData(global.CreateNewPassword);
    await NativeModules.NativeIntent.SetIntentResult(msg);
  } catch (error) {
    console.log(error);
    const returnData = {
      msg: "",
    };
    const msg = JSON.stringify(returnData);
    await NativeModules.NativeIntent.SetIntentResult(msg);
  }
};
const handleGetData = async (accountArray, setAccount, setIsLoading, intentData) => {
  try {
    let currentArray = cloneDeep(accountArray);
    currentArray.map(async (item, index) => {
      const {
        data: { Balls },
      } = await handleGetUserCrystalBalls(item.address);
      const ballIds = [];
      Balls.map(items => {
        ballIds.push(items.Ballid);
      });
      const { data: comeList } = await handleGetCrystalBallState(arrayToBase64(ballIds));
      const currentGameComeList = [];
      const comeIds = [];
      comeList.map((item, index) => {
        if (item.Name == intentData.data.gameName && item.Value == 1) {
          currentGameComeList.push(item);
          comeIds.push(item.BallId);
        }
      });
      setAccount(array => {
        const current = cloneDeep(array);
        current[index].comeList = currentGameComeList;
        return current;
      });

      const { data: ballLvList } = await handleGetUserCrystalBallData(arrayToBase64(comeIds));
      let copyBalls = cloneDeep(Balls);
      ballLvList.map(lvItem => {
        for (let i = 0; i < copyBalls.length; i++) {
          if (lvItem.BallId == copyBalls[i].Ballid) {
            lvItem.Gene = copyBalls[i].Gene;
            copyBalls.splice(i, 1);
          }
        }
      });
      setAccount(array => {
        const current = cloneDeep(array);
        current.map(items => {
          current[index].ballList = ballLvList;
        });
        return current;
      });
      setIsLoading(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const AidaItem = props => {
  const { gene, ml, w, h, payload } = props;
  return (
    <VStack
      w={w ? w : pxToDp(125)}
      h={h ? h : pxToDp(125)}
      position="relative"
      borderRadius={pxToDp(125)}
      overflow="hidden"
      bg={w ? "#A3AAB4" : "#EBEBEB"}
      ml={ml ? pxToDp(35) : 0}
    >
      <CrystalBallComponent width={w ? w : pxToDp(125)} height={h ? h : pxToDp(125)} type="primary" gene={gene} />
    </VStack>
  );
};

const GameLogin = props => {
  const { goCome, setLoginAccount } = props;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [accountArray, setAccount] = useState([]);
  const [selectedAccountIndex, setSelectAccountIndex] = useState(0);
  const navigation = useNavigation();
  const [intentData, setIntentData] = useState({});
  const { handleSetGlobalData } = useGlobalStore();

  useEffect(() => {
    const intentData = global.intentData;
    setIntentData(intentData);
    const LoginAccountData = cloneDeep(global.keys);
    setAccount(LoginAccountData);
    global.keys.filter((value, index, array) => {
      if (value.address == global.gameLoginRecordAccount?.address) {
        setSelectAccountIndex(index);
      }
    });

    handleGetData(LoginAccountData, setAccount, setIsLoading, intentData);
  }, []);
  useFocusEffect(
    useCallback(() => {
      return () => {
        handleSetGlobalData({ assetsLoaded: false });
      };
    }, [])
  );

  return (
    <VStack h="100%" w="100%" bg="#F5F8FA">
      <HStack mt={pxToDp(155)} w="100%" px={pxToDp(31)} alignItems="center" justifyContent="space-between">
        <Pressable
          w="25%"
          onPress={() => {
            return handleReturnButtonClick();
          }}
        >
          <Image w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text flex="1" textAlign="center" fontSize={pxToDp(49)} fontWeight="800">
          Connection request
        </Text>
        <HStack w="25%"></HStack>
      </HStack>
      <VStack pt={pxToDp(71)} alignItems="center" justifyContent="space-between" flex="1" w="100%">
        <HStack w="100%" flex="1" mb={pxToDp(23)}>
          <FlatList
            data={accountArray}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item, index }) => {
              return (
                <ImageBackground
                  source={index == selectedAccountIndex ? selectedShadowCon : notSelectShadowCon}
                  resizeMode="stretch"
                  style={{
                    width: "99%",
                    height: pxToDp(249),
                    marginLeft: "1%",
                    position: "relative",
                    marginTop: index == 0 ? pxToDp(13) : 0,
                  }}
                >
                  {item.address == global.gameLoginRecordAccount?.address ? (
                    <ImageBackground
                      style={{
                        width: pxToDp(297),
                        height: pxToDp(51),
                        position: "absolute",
                        top: pxToDp(-14),
                        left: pxToDp(19),
                      }}
                      source={Icons.recentLoginIcon}
                    >
                      <HStack w="100%" h="100%" alignItems="center" justifyContent="center">
                        <Text color="white" fontSize={pxToDp(31)} lineHeight={pxToDp(51)}>
                          Recently logged in
                        </Text>
                      </HStack>
                    </ImageBackground>
                  ) : null}

                  <Pressable
                    flexDirection="row"
                    alignItems="center"
                    h="100%"
                    w="100%"
                    pl={pxToDp(55)}
                    pb={pxToDp(17)}
                    justifyContent="space-between"
                    onPress={() => {
                      setSelectAccountIndex(index);
                    }}
                  >
                    <HStack>
                      <AidaItem w={pxToDp(139)} h={pxToDp(139)} gene={item.address.slice(2, 38)}></AidaItem>
                      <VStack ml={pxToDp(45)} justifyContent="center">
                        <Text fontWeight="bold" fontSize={pxToDp(45)}>
                          Account {index}
                        </Text>
                        <Pressable
                          onPress={() => {
                            Clipboard.setString(item.address);
                            toast.show({
                              description: "已复制到剪贴板",
                              placement: "top",
                              duration: 1500,
                            });
                          }}
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Text mt={pxToDp(11)} fontSize={pxToDp(35)}>
                            {handleFormatAddress(item.address)}
                          </Text>
                          <Image
                            ml={pxToDp(11)}
                            key={new Date()}
                            source={Icons.copyIcon}
                            alt="img"
                            h={pxToDp(51)}
                            w={pxToDp(51)}
                          ></Image>
                        </Pressable>
                      </VStack>
                    </HStack>
                    <HStack mr={pxToDp(75)} alignItems="center" justifyContent="flex-end">
                      <HStack mr={pxToDp(49)} w={pxToDp(125)}>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          data={item?.ballList}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={items => {
                            return (
                              <HStack mr={pxToDp(35)}>
                                <AidaItem gene={items.item.Gene} payload={items}></AidaItem>
                              </HStack>
                            );
                          }}
                        />
                        {item?.ballList?.length == 0 && (
                          <HStack
                            w={pxToDp(139)}
                            h={pxToDp(139)}
                            bg="#EBEBEB"
                            borderRadius={pxToDp(71)}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text
                              textAlign="center"
                              fontSize={pxToDp(28)}
                              // lineHeight={pxToDp(139)}
                            >
                              暂无降临的AIDA
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                      <Pressable
                        alignItems="center"
                        onPress={() => {
                          setLoginAccount(item);
                          goCome();
                        }}
                      >
                        <Text
                          w={pxToDp(186)}
                          h={pxToDp(61)}
                          borderRadius={pxToDp(31)}
                          bg="#ECEBF7"
                          color="#5C50D2"
                          fontSize={pxToDp(31)}
                          fontWeight="bold"
                          textAlign="center"
                          lineHeight={pxToDp(61)}
                        >
                          To Choose
                        </Text>
                      </Pressable>
                    </HStack>
                  </Pressable>
                </ImageBackground>
              );
            }}
          />
        </HStack>
        <VStack mb={pxToDp(23)}>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={() => {
              setIsLoading(true);
              handleReturnButtonClick(
                accountArray[selectedAccountIndex],
                goCome,
                intentData,
                setIsLoading,
                setLoginAccount,
                toast
              );
            }}
            type="lg"
          >
            Connect
          </Button>

          <Button
            onPress={() => {
              handleReturnButtonClick();
            }}
            bg="transparent"
            type="lg"
            color="#5C50D2"
          >
            Cancel
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default React.memo(GameLogin);
