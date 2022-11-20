import React, { useState } from "react";
import {
  Text,
  Image,
  HStack,
  Box,
  Pressable,
  VStack,
  useToast,
  FlatList,
  Stack,
  ScrollView,
  Center,
} from "native-base";
import ActionButton from "react-native-action-button";
import { useNavigation } from "@react-navigation/native";
import Icons from "../asset/Icon";
import moment from "moment";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
import { useEffect } from "react";
import global from "../api/util/global";
import config from "../api/util/config";
import { Crystalball } from "../api/web3/Crystalball";
import { handleGetNFTJson } from "../api/service";
import Spin from "../component/Spin";
import Clipboard from "@react-native-community/clipboard";

const METASpaceContent = () => {
  const [METADataList, setMETADataList] = useState([]);
  const navigation = useNavigation();
  const [isSpin, setIsSpin] = useState(true);
  const crystalballInstance = new Crystalball(
    global.web3,
    config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]
  );
  const toast = useToast();

  //跳转关注页面
  const goToConcernList = () => {
    navigation.navigate("ConcernList", {});
  };

  //复制ballID
  const copyBallId = (ballId) => {
    // alert(1)
    Clipboard.setString(String(ballId));
    toast.show({
      description: "已复制到剪贴板",
      placement: "top",
      duration: 1500,
    });
  };
  // 跳转meta 详情页面
  const goToMETADetail = (item) => {
    // 判断type是html 还是非html，html 跳转webview
    // if(item.type === 'html') {

    // } else {
    //   navigation.navigate("METADetail", {});
    // }

    navigation.navigate("METAItemDetail", { item });
  };

  // 跳转aida页面
  const goToAIDAPage = (item) => {
    navigation.navigate("AIDAPage", { item });
  };

  // 获取meta空间数据，收藏的是ballid组成的array ['1', '2', '3']
  // const getMETAURLList = async () => {
  //   let ballidList = global.colectionNFTMap[config.CONTRACT_ADDRESS];
  //   console.log(ballidList, "ballidList");
  //   let promises = [];

  //   ballidList.forEach((id, index) => {
  //     if (typeof id == "string") {
  //       promises.push(
  //         new Promise((resolve, reject) => {
  //           try {
  //             const url = crystalballInstance.getCrystalballMetaReverse(id, 0, 50);
  //             resolve(url);
  //           } catch (err) {
  //             reject(err);
  //             console.log(err, "获取meta空间数据报错item");
  //           }
  //         })
  //       );
  //     }
  //   });

  //   try {
  //     const urlList = await Promise.all(promises);
  //     const res = [];
  //     urlList.forEach(item => res.push(...item.metaUrls));
  //     return res.filter(item => item !== "");
  //   } catch (err) {
  //     console.log(err, "获取meta空间数据报错");
  //     return false;
  //   }
  // };

  // 获取meta空间数据，收藏的是ballid组成的array ['1', '2', '3']
  const getMETAURLList = async () => {
    let ballidList = global.colectionNFTMap[config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]];
    let promises = [];
    ballidList.forEach((id, index) => {
      if (typeof id == "string") {
        promises.push(
          (async () => {
            const url = await crystalballInstance.getCrystalballMetaReverse(
              id,
              0,
              50
            );
            url.ballid = id;
            return url;
          }).call()
        );
      }
    });

    try {
      const urlList = await Promise.all(promises);
      console.log(urlList, "urlList /////-----");
      const res = [];
      for (let urlObject of urlList) {
        for (let i = 0; i < urlObject.metaUrls.length; i++) {
          res.push({
            ballid: urlObject.ballid,
            index: i,
            url: urlObject.metaUrls[i],
          });
        }
      }
      return res.filter((item) => item.url !== "");
    } catch (err) {
      console.log(err, "获取meta空间数据报错");
      return false;
    }
  };
  // 获取meta空间数据
  const getMETAData = async (urlsList) => {
    if (!urlsList) return;
    if (urlsList && urlsList?.length === 0) return;
    let promises = [];
    urlsList.forEach((urlObj, index) => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            const data = handleGetNFTJson(
              urlObj.url.replace("ipfs://", config.IPFS_ROOT)
            );
            resolve(data);
          } catch (err) {
            reject(err);
            console.log(err);
          }
        })
      );
    });

    try {
      const data = await Promise.all(promises);
      // console.log(data, 'meta 空间数据-----没有gene-----');
      return data
        .map((item) => item.data)
        .filter((item) => typeof item === "object");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  //提取ballid
  const gernerateBallID = (metaList) => {
    // 对ballid 去重
    const ballIds = [];
    metaList.forEach((item) => {
      if (ballIds.indexOf(item.aida) === -1) {
        ballIds.push(item.aida);
      }
      // ballIds.push(item.aida);
    });
    console.log(ballIds, "-----------------ballids----------------");
    return ballIds;
  };
  const getAIDAList = async (metaList) => {
    const ballids = gernerateBallID(metaList);

    let promises = [];
    ballids.forEach((ballid) => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            const AIDAData = crystalballInstance.getCrystalballProperty(ballid);
            resolve(AIDAData);
          } catch (err) {
            console.log(err, "获取aida数据报错-----");
            reject(err);
          }
        })
      );
    });

    const AIDAList = await Promise.all(promises);
    // console.log(AIDAList, "aidalist -------");

    return AIDAList;
  };

  const setGeneToMETAData = (METAData, AIDALists) => {
    // console.log('----------------');
    // console.log(METAData, '------- METAData, --------');
    // console.log('----------------');

    // console.log('----------------');
    // console.log(AIDALists, '------- AIDALists, --------');
    // console.log('----------------');

    const len1 = METAData.length;
    const len2 = AIDALists.length;
    if (len1 === 0 || len2 === 0) return;

    try {
      for (let i = 0; i < len1; i++) {
        let ballid = Number(METAData[i]["aida"]);
        METAData[i]["ballid"] = ballid;
        for (let j = 0; j < len2; j++) {
          if (ballid === Number(AIDALists[j]["ballid"])) {
            METAData[i]["gene"] = AIDALists[j]["gene"];
            break;
          }
        }
      }
    } catch (err) {
      console.log(err, "for ------------------------");
    }
    return METAData;
  };

  // 按时间排序
  const sortByCreateTime = (metaData) => {
    metaData.sort((a, b) => {
      return b.createTime - a.createTime;
    });

    return metaData;
  };

  // 初始化meta 空间数据  只显示aida的数据
  useEffect(() => {
    //根据收藏的数据  获取 meta空间的数据  通过getCrystalballMetaReverse api获取
    (async function () {
      try {
        // 获取urls
        const urlList = await getMETAURLList();
        // console.log(urlList, "urlList----");
        // return
        // 根据urls获取meta数据
        const METAData = await getMETAData(urlList);

        // 对METAData 数据进行排序
        const METADataOrderByTime = sortByCreateTime(METAData);
        //根据aida的ballid 获取gene
        const AIDALists = await getAIDAList(METAData);

        // 将获取到的AIDALists里面的gene数据塞到METAData 中
        const result = setGeneToMETAData(METADataOrderByTime, AIDALists);
        console.log(result, "-------meta 数据--------------------");
        if (!result) return;
        const res = result
          .filter((item) => item.image && item.url)
          .map((item) => {
            return {
              ...item,
              image: item.image.replace("ipfs://", config.IPFS_ROOT),
              url: item.url.replace("ipfs://", config.IPFS_ROOT),
            };
          });
        setIsSpin(false);

        // console.log("-----------METAData-------------");
        // console.log(res);
        // console.log("-----------METAData-------------");
        setMETADataList(res);
      } catch (err) {
        setIsSpin(false);
      } finally {
        setIsSpin(false);
      }
    })();
  }, []);

  return (
    <Center h={pxToDp(1230)}>
      <Spin isSpin={isSpin} bg="RGBA(233, 236, 238, 0.3)">
        {isSpin ? null : (
          <ActionButton
            position="right"
            style={{ zIndex: 101 }}
            onPress={(e) => {
              console.log(e);
            }}
            offsetY={pxToDp(100)}
            offsetX={pxToDp(10)}
            hideShadow={true}
            degrees={0}
            spacing={1}
            renderIcon={(active) => {
              return active ? (
                <Image
                  key={active}
                  alt="img"
                  w={pxToDp(119)}
                  h={pxToDp(119)}
                  source={Icons.foldIcon}
                />
              ) : (
                <Image
                  key={active}
                  alt="img"
                  w={pxToDp(119)}
                  h={pxToDp(119)}
                  source={Icons.unfoldIcon}
                />
              );
            }}
            buttonColor="rgba(255,255,255,0)"
          >
            <ActionButton.Item onPress={() => goToConcernList()}>
              <Image
                alt="img"
                w={pxToDp(119)}
                h={pxToDp(119)}
                source={Icons.concernIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        )}

        <ScrollView h={pxToDp(1209)} w={screenWidth}>
          {!isSpin && METADataList.length == 0 ? (
            <Box w="100%" mt={pxToDp(41)} alignItems="center">
              <VStack
                w={pxToDp(900)}
                bg="#FFFFFF"
                borderRadius={pxToDp(30)}
                h={pxToDp(494)}
                alignItems="center"
                justifyContent="center"
              >
                <Text>暂无数据</Text>
              </VStack>
            </Box>
          ) : null}
          <FlatList
            data={METADataList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <Pressable key={index} onPress={() => goToMETADetail(item)}>
                  <HStack mt="4" ml={pxToDp(70)}>
                    <Box w={pxToDp(940)} bg="#fff" borderRadius={pxToDp(30)}>
                      <VStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          pl={pxToDp(25)}
                          pr={pxToDp(40)}
                          pt={pxToDp(19)}
                        >
                          {/* <Image alt="img" source={Icons.qqIcon} w="50" h="50" /> */}
                          <HStack>
                            <Pressable onPress={() => goToAIDAPage(item)}>
                              <HStack
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="30px"
                              >
                                <CrystalBallComponent
                                  width={pxToDp(100)}
                                  height={pxToDp(104)}
                                  type="primary"
                                  gene={item.gene}
                                />
                              </HStack>
                            </Pressable>
                            <VStack ml={pxToDp(23)}>
                              <HStack alignItems="center">
                                <Text
                                  color="#41398E"
                                  fontWeight="bold"
                                  fontSize={pxToDp(42)}
                                >
                                  AIDA#{item.aida}
                                </Text>
                                <Pressable
                                  onPress={() => copyBallId(item.aida)}
                                >
                                  <Image
                                    ml={pxToDp(45)}
                                    alt="img"
                                    w={pxToDp(57)}
                                    h={pxToDp(57)}
                                    source={Icons.copyIcon}
                                  />
                                </Pressable>
                              </HStack>
                              <Text color="#aaa">
                                {moment(item.createTime).format("YYYY.MM.DD")}
                              </Text>
                            </VStack>
                          </HStack>
                          {/* <Image position="relative" top={-pxToDp(19)} alt="img" w={pxToDp(57)} h={pxToDp(57)} source={Icons.collectIcon} /> */}
                        </HStack>
                        <VStack
                          w="100%"
                          minHeight={pxToDp(200)}
                          mt={pxToDp(19)}
                          position="relative"
                          borderBottomLeftRadius="10"
                          borderBottomRightRadius="10"
                          overflow="hidden"
                        >
                          <Image
                            alt="img"
                            w="100%"
                            h={pxToDp(342)}
                            source={{ uri: item.image }}
                          />
                          <Box
                            position="absolute"
                            w="100%"
                            h={pxToDp(110)}
                            bottom="0"
                            mt="2"
                            pt={pxToDp(19)}
                            pr={pxToDp(40)}
                            pb={pxToDp(19)}
                            pl={pxToDp(40)}
                            bg="rgba(0,0,0,0.5)"
                            justifyContent="center"
                            borderBottomLeftRadius="10"
                            borderBottomRightRadius="10"
                          >
                            <Text
                              color="#fff"
                              fontWeight="bold"
                              fontSize={pxToDp(40)}
                            >
                              {item.title}
                            </Text>
                          </Box>
                        </VStack>
                        {/* <HStack w="100%" justifyContent="space-between">
                    {[...new Array(4).keys()].map((item, index) => {
                      return (
                        <Box key={index} w="50px" h="50px" borderRadius="50px" bg="blue.200" alignItems="center" justifyContent="center">
                          <Image w="30px" h="30px" source={Icons.heartIcon} />
                        </Box>
                      );
                    })}
                  </HStack> */}
                      </VStack>
                    </Box>
                  </HStack>
                </Pressable>
              );
            }}
          />
        </ScrollView>
      </Spin>
    </Center>
  );
};

export default React.memo(METASpaceContent);
