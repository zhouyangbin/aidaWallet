import React, { useEffect, useState, useCallback, } from "react";
import { Button, VStack, Center, Text, HStack, Image, Pressable } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ListItem from "./compoments/ListItem";
import Tabs from "./compoments/Tabs";
import { Crystalball } from "../api/web3/Crystalball";
import global from "../api/util/global";
// import { contractAddress } from "../api/util/constant";
import config from "../api/util/config";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
import { FlatList, StatusBar, RefreshControl, View, StyleSheet, ActivityIndicator } from "react-native";
import METADialog from "./METADialog";
import { handleGetNFTJson } from "../api/service";
import Spin from "../component/Spin";
import Icons from "../asset/Icon";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import AlertDialogComp from '../component/AlertDialogComp'
import { I18n } from "../../language/I18n"

const TabArray = ["News", "Video"];
const count = 50;
/**
 * META 列表页面
 * @param {*} props
 * @returns
 */
const AIDAPage = props => {
  console.log(props, "props");
  const { item } = props.route.params || {};
  const ballid = item.ballid;
  console.log(item, "ballid");
  const navigation = useNavigation();
  const [METALists, setMETAList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [loadMoreText, setLoadMoreText] = useState("正在加载更多");
  const [loadMoreStatus, setLoadMoreStatus] = useState(true);
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  const [isConcern, setIsConcern] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const goToItemDetail = item => {
    console.log(item, "item ----");
    navigation.navigate("METAItemDetail", { item });
  };

  const confirmUnconcern = () => {
    console.log('-----');
    setIsConcern(false)
  }
  /**
   * 获取meta数据
   * @returns
   * @param  ballid: string,
   * @param startIndex: string,
   * @param count: string
   */
  const getMETADate = async () => {
    try {
      const METAData = await crystalballInstance.getCrystalBallMeta(ballid, startIndex, count); //ballid  后面改成ballid
      return METAData;
    } catch (err) {
      console.log("---------------err-------------");
      console.log(err);
      console.log("---------------err-------------");
    }
  };

  //取消关注
  const collectClickHandler = () => {
    console.log(1111);
    // setIsOpen(true)
    // alert("关注 取消关注");
  };

  //
  const refreshData = async () => {
    await getMETAUrls();
    console.log("refreshData----");
  };

  // 按时时间排序
  const sortByCreateTime = data => {
    data.sort((a, b) => {
      return b.createTime - a.createTime
    })
    return data 
  }
  // 获取所有meta的URL
  const getMETAUrls = async () => {
    const res = await getMETADate();
    console.log(res, "AIDAPage：getMETADate------");
    let promises = [];
    let result = [];
    if (res?.metaUrls.length === 0) {
      setLoading(false);
      return;
    }
    // 保存返回的当前数据的index，加载更多时使用
    setStartIndex(res?.endIndex);

    res?.metaUrls.forEach((item, index) => {
      if (item !== "") {
        promises.push(
          new Promise((resolve, reject) => {
            try {
              const obj = handleGetNFTJson(item.replace("ipfs://", config.IPFS_ROOT));
              resolve(obj);
            } catch (err) {
              console.log("---------------AXIOSerr-------------");
              console.log(err);
              console.log("---------------AXIOSerr-------------");
              reject();
            }
          })
        );
      }
    });

    if (promises.length === 0) {
      setLoading(false);
      return;
    }

    const responce = await Promise.all(promises);

    console.log(responce, '-----------responce------');
    try {
      responce.forEach((item, index) => {
        if (typeof item.data === "string") {
          // 暂时不处理无效json的meta数据
        } else {
          result.push({ ...item.data, image: item.data.image?.replace("ipfs://", config.IPFS_ROOT) });
        }
      });
  
      let allMETAData = [...METALists, ...result]
  
      // 将meta数据按照时间排序，最近的在前面
      allMETAData = sortByCreateTime(allMETAData)
      setMETAList(allMETAData);
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }

    // 没有更多数据了
    if (res?.total === res?.endIndex) {
      setLoading(false);
      setLoadMoreStatus(false);
      setLoadMoreText("已经全部加载");
      return;
    }
  };

  //上拉加载布局
  const renderLoadMoreView = () => {
    return (
      <View style={styles.loadMore}>
        {loadMoreStatus ? (
          <ActivityIndicator style={styles.indicator} size={"large"} color={"blue"} animating={true} />
        ) : null}

        <Text color="#999" mt={pxToDp(19)} mb={pxToDp(19)}>
          {loadMoreText}
        </Text>
      </View>
    );
  };

  // 上拉加载更多
  const loadMoreData = async () => {
    await getMETAUrls();
    console.log("更多数据--");
  };

  // useEffect(() => {
  //   (async function () {
  //     await getMETAUrls();
  //   })();
  //   return () => {};
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getMETAUrls()
      // (async function () {
      //   await getMETAUrls();
      // })();
    }, [])
  );

  return (
    <VStack bg='#EFF2F4'>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <AlertDialogComp isOpen={isOpen}
        close={setIsOpen}
        title='提示'
        context='确定要取消关注吗？'
        confirm={() => confirmUnconcern()}
      />
      {/* 手机顶部状态栏 end */}
      {/* <METADialog isShow={isShow} close={() => setIsShow(false)} /> */}
      <Spin
        isSpin={loading}
        position="absolute"
        w="100%"
        h="100%"
        bottom="0"
        top="0"
        justifyContent="space-between"
      >
        <VStack h={pxToDp(677)} >
          <Pressable mt={pxToDp(156)} ml={pxToDp(41)} onPress={() => navigation.goBack()}>
            <Image w={pxToDp(70)} h={pxToDp(49)} alt="img" source={Icons.goBackArrowBIcon} />
          </Pressable>
          <HStack justifyContent="center" mt={pxToDp(26)}>
            <Center w={pxToDp(204)} h={pxToDp(204)} borderRadius={pxToDp(102)} bg="#fff" position="relative">
              {/* <Text color="#fff">AIDA形象</Text> */}
              <CrystalBallComponent width={pxToDp(200)} height={pxToDp(200)} type="primary" gene={item.gene} />
              <Pressable position="absolute" right={-pxToDp(40)} top={pxToDp(136)} onPress={() => collectClickHandler()}>
                <HStack w="30px" h="30px" alignItems="center" justifyContent="center">
                  {
                    isConcern ? <Image alt="img" w={pxToDp(70)} h={pxToDp(70)} source={Icons.collectIcon} />
                    : <Image alt="img" w={pxToDp(70)} h={pxToDp(70)} source={Icons.unCollectIcon} />
                  }
                </HStack>
              </Pressable>
            </Center>
          </HStack>
          <Center mt={pxToDp(10)}>
            <Text color="#181818" fontSize={pxToDp(46)} fontWeight="800">
              AIDA#{item.ballid}
            </Text>
          </Center>
          {/* 等有了功能 再显示 */}
          {/* <Center mt={-pxToDp(10)}>
            <Tabs tabs={TabArray} w="594" tabIndex={tabIndex} setTabIndex={index => setTabIndex(index)} />
          </Center> */}
        </VStack>
        <VStack h={pxToDp(1243)}>
          {METALists?.length > 0 ? (
            <FlatList
              // refreshing={false}
              // onRefresh={() => refreshData()}
              data={METALists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return <ListItem item={item} click={payload => goToItemDetail(payload)} />;
              }}
              // 设置下拉刷新
              refreshControl={
                <RefreshControl
                  title={"Loading"} //android中设置无效
                  colors={["blue"]} //android
                  tintColor={"blue"} //ios
                  titleColor={"blue"}
                  refreshing={loading}
                  onRefresh={() => {
                    refreshData();
                    // this.loadData(); //下拉刷新加载数据
                  }}
                />
              }
              // 设置上拉加载更多
              //设置上拉加载
              ListFooterComponent={() => renderLoadMoreView()}
              onEndReached={() => loadMoreData()}
            />
          ) : null}
          {!loading && METALists?.length === 0 ? (
            <Center mt="130">
              <Text color="#999" fontSize="20px">
                {I18n.t("aida.metaDataEmpty")}
              </Text>
            </Center>
          ) : null}
        </VStack>
      </Spin>
    </VStack>
  );
};

const styles = StyleSheet.create({
  loadMore: {
    alignItems: "center",
  },
  indicator: {
    color: "red",
    margin: 10,
  },
});

export default React.memo(AIDAPage);
