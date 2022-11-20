import React, { useState, useEffect } from "react";
import { Modal, HStack, Text, Image, VStack, FlatList, Pressable } from "native-base";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
import { ImageBackground } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import shadowCon from "@/../../assets/image/UiImg/shadowConFull.webp";
import Button from "../component/Button";
import { cloneDeep } from "lodash";
import config from "../api/util/config";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import global from "../api/util/global";
import { multiFilterArray, arrayToBase64 } from "../api/util/helper";
import {
  handleGetUserCrystalBalls,
  handleSetCrystalBallState,
  handleGetGameList,
  handleGetCrystalBallState,
} from "../api/service";
import { privateKeyToPublicKey, signatureMessage } from "../api/util/crypto";

const handleGetGames = async () => {
  const result = await handleGetGameList();
  console.log(result);
};
const handleGetMyBalls = async (setBallPoolArray, setTabArray) => {
  const userBallData = await handleGetUserCrystalBalls(global.defaultAddress.call());
  const {
    data: { Balls },
  } = userBallData;
  console.log(Balls);

  const ballArray = [];
  setBallPoolArray(Balls);
  const ballIds = [];
  Balls.map(item => {
    ballIds.push(item.Ballid);
  });

  const { data: stateArray } = await handleGetCrystalBallState(arrayToBase64(ballIds));

  stateArray.map((item, index) => {
    Balls.map((itemIn, indexIn) => {
      if (itemIn.Ballid == item.BallId) {
        if (item.Name && item.Value == 1) {
          const currentItem = {
            Ballid: itemIn.Ballid,
            Gene: itemIn.Gene,
            isInitAdvent: true,
            isAdvent: true,
            name: item.Name,
          };
          ballArray.push(currentItem);
          setTabArray(items => {
            items.map(itemsI => {
              if (item.Name == itemsI.name) {
                itemsI.data.push(currentItem);
                // itemsI.ballIds.push(itemIn.Ballid);
              }
            });
            return items;
          });
        } else {
          ballArray.push({
            Ballid: itemIn.Ballid,
            Gene: itemIn.Gene,
            isInitAdvent: false,
            isAdvent: false,
            name: null,
          });
        }
      }
    });
  });
  setBallPoolArray(ballArray || []);
  // });
};
const handleSetTabBallList = (
  tabArray,
  setTabArray,
  tabIndex,
  item,
  ballPoolArray,
  ballPoolIndex,
  setBallPoolArray
) => {
  const array = cloneDeep(tabArray);
  const boolArray = cloneDeep(ballPoolArray);
  if (boolArray[ballPoolIndex].name) return;
  boolArray[ballPoolIndex].name = tabArray[tabIndex].name;
  setBallPoolArray(boolArray);

  array[tabIndex].data.push(item);
  if (!item.isInitAdvent) array[tabIndex].ballIds.push({ id: item.Ballid, value: 1 });
  if (item.isInitAdvent && array[tabIndex].removeIds.length) {
    array[tabIndex].removeIds.forEach((value, index, arrayIn) => {
      if (value.id == item.Ballid) {
        arrayIn.splice(index, 1);
      }
    });
  }
  setTabArray(array);
};
const handleClickTabBall = (tabArray, setTabArray, tabIndex, item, ballPoolArray, ballPoolIndex, setBallPoolArray) => {
  const array = cloneDeep(tabArray);
  if (array[tabIndex].data.length == 0) return;
  array[tabIndex].data.forEach((value, index, arrayIn) => {
    if (value.Ballid == item.Ballid) {
      arrayIn.splice(index, 1);
      if (value.isInitAdvent) {
        array[tabIndex].removeIds.push({ id: item.Ballid, value: 0 });
      }
    }
  });
  const boolArray = cloneDeep(ballPoolArray);
  boolArray.filter((value, index, array) => {
    value.Ballid == item.Ballid ? (array[index].name = null) : null;
  });
  setBallPoolArray(boolArray);
  setTabArray(array);
};
// const handleSaveRestoreData = async () => {
//   try {
//     AsyncStorage.setItem("AdventRestoreData", JSON.stringify({ a: 1 }));
//   } catch (error) {
//     console.log(error);
//   }
// };
// const handleGetRestoreData = async () => {
//   try {
//     let value = await AsyncStorage.getItem("AdventRestoreData");
//   } catch (error) {
//     console.log(error);
//   }
// };
const handleRequestSetBallLaunch = async payload => {
  return await handleSetCrystalBallState(payload);
};

const handleAllLaunch = payload => {
  const promiseArray = [];
  payload.map(async item => {
    const time = new Date().toISOString();
    const requestPayload = {
      ballidlist: arrayToBase64(item.ballIds),
      name: item.name,
      time: time,
      publickey: privateKeyToPublicKey(global.defaultKey.privateKey),
      sign: await signatureMessage(global.web3, `${arrayToBase64(item.ballIds)}${time}`, global.defaultKey.privateKey),
    };
    const requestPayload2 = {
      ballidlist: arrayToBase64(item.removeIds),
      name: item.name,
      time: time,
      publickey: privateKeyToPublicKey(global.defaultKey.privateKey),
      sign: await signatureMessage(
        global.web3,
        `${arrayToBase64(item.removeIds)}${time}`,
        global.defaultKey.privateKey
      ),
    };
    promiseArray.push(handleRequestSetBallLaunch(requestPayload));
    promiseArray.push(handleRequestSetBallLaunch(requestPayload2));
  });
  Promise.all(promiseArray).then(stateArray => {
    console.log(stateArray);
  });
  // console.log(promiseArray);
};

const Come = props => {
  const { visible, close } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [tabArray, setTabArray] = useState([
    { name: "Triple Elimination", data: [], removeIds: [], ballIds: [] },
    { name: "三消游戏", data: [], removeIds: [], ballIds: [] },
    { name: "Game2", data: [], removeIds: [], ballIds: [] },
    { name: "Game3", data: [], removeIds: [], ballIds: [] },
    { name: "Game4", data: [], removeIds: [], ballIds: [] },
  ]);
  const [ballPoolArray, setBallPoolArray] = useState([]);
  const handleInit = () => {
    const initTabArray = [
      { name: "Triple Elimination", data: [], removeIds: [], ballIds: [] },
      { name: "三消游戏", data: [], removeIds: [], ballIds: [] },
      { name: "Game2", data: [], removeIds: [], ballIds: [] },
      { name: "Game3", data: [], removeIds: [], ballIds: [] },
      { name: "Game4", data: [], removeIds: [], ballIds: [] },
    ];
    setTabArray([...initTabArray]);
    setBallPoolArray([]);
    handleGetMyBalls(setBallPoolArray, setTabArray);
  };

  useEffect(() => {
    if (visible) {
      const initTabArray = [
        { name: "Triple Elimination", data: [], removeIds: [], ballIds: [] },
        { name: "三消游戏", data: [], removeIds: [], ballIds: [] },
        { name: "Game2", data: [], removeIds: [], ballIds: [] },
        { name: "Game3", data: [], removeIds: [], ballIds: [] },
        { name: "Game4", data: [], removeIds: [], ballIds: [] },
      ];
      setTabArray([...initTabArray]);
      handleGetMyBalls(setBallPoolArray, setTabArray);
      handleGetGames();
      // handleSaveRestoreData();
    }
    return () => {
      setTabArray([]);
      setBallPoolArray([]);
    };
  }, [visible]);

  return (
    <Modal isOpen={visible} onClose={() => close(false)}>
      {/* <Modal.Content pt={pxToDp(19)} w={pxToDp(921)} bg="#EBEEF0" borderRadius={pxToDp(59)}> */}
      <VStack pt={pxToDp(19)} w={pxToDp(921)} bg="#EBEEF0" borderRadius={pxToDp(59)}>
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <HStack w="33%"></HStack>
          <Text fontSize={pxToDp(53)} fontWeight="800" textAlign="center" w="33%">
            Descend
          </Text>
          <Pressable onPress={() => close(false)} alignItems="flex-end" w="33%">
            <Image mr={pxToDp(53)} w={pxToDp(39)} h={pxToDp(39)} source={Icons.closeIcon}></Image>
          </Pressable>
        </HStack>
        <ImageBackground
          source={shadowCon}
          style={{ width: "100%", marginTop: pxToDp(23), paddingBottom: pxToDp(43) }}
          resizeMode="stretch"
        >
          <VStack w="100%" px={pxToDp(51)}>
            <HStack w="100%" mt={pxToDp(41)}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                horizontal={true}
                data={tabArray}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      alignItems="center"
                      justifyContent="center"
                      borderRadius={pxToDp(17)}
                      borderWidth={pxToDp(2)}
                      h={pxToDp(79)}
                      key={index}
                      px={pxToDp(31)}
                      onPress={() => setTabIndex(index)}
                      borderColor={index == tabIndex ? "#5C50D2" : "#636363"}
                      bg={index == tabIndex ? "#5C50D2" : "white"}
                      mr={pxToDp(14)}
                    >
                      <Text
                        color={index == tabIndex ? "white" : "#181818"}
                        fontSize={pxToDp(27)}
                        // fontWeight={index == tabIndex ? "800" : "500"}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                }}
              ></FlatList>
            </HStack>
            <HStack mt={pxToDp(22)}>
              <FlatList
                data={tabArray[tabIndex]?.data}
                horizontal
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() =>
                        handleClickTabBall(
                          tabArray,
                          setTabArray,
                          tabIndex,
                          item,
                          ballPoolArray,
                          index,
                          setBallPoolArray
                        )
                      }
                      ml={index == 0 ? pxToDp(13) : pxToDp(0)}
                      w={pxToDp(105)}
                      key={index}
                      mr={pxToDp(31)}
                      position="relative"
                      alignItems="center"
                    >
                      {/* <HStack borderRadius={pxToDp(105)} bg="red.100" w={pxToDp(105)} h={pxToDp(105)}></HStack> */}
                      <CrystalBallComponent
                        gene={item.Gene}
                        width={pxToDp(105)}
                        height={pxToDp(105)}
                        type="primary"
                      ></CrystalBallComponent>
                      <Text
                        w={pxToDp(105)}
                        h={pxToDp(26)}
                        textAlign="center"
                        bg="#5C50D2"
                        borderRadius={pxToDp(8)}
                        color="white"
                        fontSize={pxToDp(21)}
                        fontWeight="bold"
                        position="absolute"
                        bottom={pxToDp(0)}
                        lineHeight={pxToDp(26)}
                      >
                        {item.Ballid}
                      </Text>
                    </Pressable>
                  );
                }}
              ></FlatList>
            </HStack>
            <HStack
              alignItems="center"
              justifyContent="center"
              mt={pxToDp(39)}
              w="100%"
              h={pxToDp(179)}
              borderRadius={pxToDp(17)}
              bg="#EFF1F5"
            >
              <Text fontSize={pxToDp(41)} fontWeight="800" color="#282828">
                NFT game information introduction
              </Text>
            </HStack>
          </VStack>
        </ImageBackground>
        <ImageBackground
          source={shadowCon}
          style={{ width: "100%", marginTop: pxToDp(23), height: pxToDp(719), paddingBottom: pxToDp(43) }}
          resizeMode="stretch"
        >
          <VStack h="100%" w="100%" px={pxToDp(51)}>
            <HStack mt={pxToDp(37)} flex="1">
              <FlatList
                data={ballPoolArray}
                numColumns={6}
                renderItem={({ item, index }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        handleSetTabBallList(
                          tabArray,
                          setTabArray,
                          tabIndex,
                          item,
                          ballPoolArray,
                          index,
                          setBallPoolArray
                        );
                      }}
                      key={index}
                      justifyContent="center"
                      w="16.666666%"
                    >
                      <VStack mb={pxToDp(13)} position="relative" alignItems="center">
                        {/* <HStack borderRadius={pxToDp(105)} bg="red.100" w={pxToDp(105)} h={pxToDp(105)}></HStack> */}
                        <CrystalBallComponent
                          gene={item.Gene}
                          width={pxToDp(105)}
                          height={pxToDp(105)}
                          type="primary"
                        ></CrystalBallComponent>
                        {item.name ? (
                          <Text
                            w={pxToDp(105)}
                            h={pxToDp(26)}
                            textAlign="center"
                            bg="#5C50D2"
                            borderRadius={pxToDp(8)}
                            color="white"
                            fontSize={pxToDp(21)}
                            fontWeight="bold"
                            position="absolute"
                            bottom={pxToDp(0)}
                            lineHeight={pxToDp(26)}
                          >
                            {item.name}
                          </Text>
                        ) : null}
                      </VStack>
                    </Pressable>
                  );
                }}
              ></FlatList>
            </HStack>
            <HStack
              alignItems="center"
              justifyContent="center"
              mt={pxToDp(39)}
              w="100%"
              h={pxToDp(179)}
              borderRadius={pxToDp(17)}
              bg="#EFF1F5"
            >
              <Text fontSize={pxToDp(41)} fontWeight="800" color="#282828">
                NFT game information introduction
              </Text>
            </HStack>
          </VStack>
        </ImageBackground>
        <HStack mt={pxToDp(17)} mb={pxToDp(31)} justifyContent="center">
          <Button
            onPress={() => {
              handleInit();
            }}
            w={pxToDp(377)}
            mr={pxToDp(53)}
            color="#5C50D2"
            bg="transparent"
            type="sm"
            borderWidth={pxToDp(3)}
            borderColor="#5C50D2"
          >
            Restore
          </Button>
          <Button
            onPress={() => {
              handleAllLaunch(tabArray);
            }}
            w={pxToDp(377)}
            type="sm"
          >
            Launch
          </Button>
        </HStack>
      </VStack>
      {/* </Modal.Content> */}
    </Modal>
  );
};

export default React.memo(Come);
