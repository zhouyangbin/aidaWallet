import { solidity } from "ethereum-waffle";
import { HStack, FlatList, useToast, Select, VStack, Box, Image } from "native-base";
import React, { useState, useRef, useCallback,useContext } from "react";
import Icons from "../asset/Icon.js";
import ShelvesList from "./ShelvesList";
// import CrystalBallList from "./CrystalBallList";
import EstateList from "./EstateList";
import GameList from "./GameList";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import ape from "../../../assets/image/ape.webp";
import List from "./List";
import { handleSearchProduction } from "./service";
import global from "../api/util/global";
// import {contractAddress} from "../api/util/constant";
import config from "../api/util/config";
import LinearGradient from "react-native-linear-gradient";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
import Head from "./Head";
import Tabs from "./Tabs";
import RenderListItem from "./RenderListItem";
import { handleMoneyFormatter } from "../api/util/helper";
import Approve from "../component/Approve.jsx";
import LoadingContext from "../../providers/LoadContext";
const listarr = [];
const keys = [...new Array(30).keys()];
keys.forEach((item, index) => {
  listarr.push({
    id: index + "1",
    title: "水晶娃娃",
    number: 21344444,
    price: `10${index}`,
    icon: ape,
    checked: false,
  });
});

const clickTabItem = props => {
  const { item, setIndex, index } = props;
  console.log(item, "item", index);
  setIndex(index);
};

const ListData = [
  {
    ballId: 13,
    gene: "I01J60O91OB76LDFNFQVQ4YMDGGLJHSYQ72G",
  },
  {
    ballId: 14,
    gene: "8GEV9LKILI9HQOR2E0YMVJGMQPK60DV7YDWB",
  },
  {
    ballId: 14,
    gene: "8GEV9LKILI9HQOR2E0YMVJGMQPK60DV7YDWB",
  },
  {
    ballId: 14,
    gene: "8GEV9LKILI9HQOR2E0YMVJGMQPK60DV7YDWB",
  },
  {
    ballId: 14,
    gene: "8GEV9LKILI9HQOR2E0YMVJGMQPK60DV7YDWB",
  },
  {
    ballId: 14,
    gene: "8GEV9LKILI9HQOR2E0YMVJGMQPK60DV7YDWB",
  },
];

//购物车
const ShoppingMall = props => {
  const [show, setShow] = useState(true);
  const loading = useContext(LoadingContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortValue, setSortValue] = useState("价格降序");
  const [filterValue, setFilterValue] = useState("筛选");
  const [list, setList] = useState([...listarr]);
  const [coin, setCoin] = useState(0);
  const [selectActiveIndex, setSelectActiveIndex] = useState(null);
  const [isApproveShow, setIsApproveShow] = useState(false);
  const toast = useToast();

  const [tabIndex, setTabIndex] = useState("my");
  useFocusEffect(
    useCallback(() => {
      // setCoin(handleMoneyFormatter(global.defaultNetwork.assets[0].balance, 5));
      loading.showMenu(3);
      return ()=>{
        ()=>{}
      }
    }, [])
  );
  const handleSetTabIndex = payload => {
    setTabIndex(payload);
  };
  const itemClickHandler = props => {
    const { item: payload, type } = props;
    if (type === 0) return;
    navigation.navigate("ProductDetail", { payload });
  };

  const buyProduct = payload => {
    if (tabIndex === 0) {
      console.log("下架1", payload);
      // 下架先请求接口，下架成功后，删除上架中此商品
      // 下架逻辑 TODO
      const res = list.filter(item => item.id !== payload.id);
      console.log(res, list, "对比");
      setList([...res]);

      toast.show({
        placement: "top",
        duration: 2000,
        render: () => {
          return (
            <Box bg="#d81e06" _text={{ color: "#fff" }} px="2" py="1" rounded="sm" mb={5}>
              下架失败，请稍后再试！
            </Box>
          );
        },
      });
    } else {
      navigation.navigate("PayOrder", { payload: [payload] });
    }
  };


  
  const handleSetActiveIndex = index => {
    setSelectActiveIndex(index);
  };
  const searchPro = async () => {
    var res = await handleSearchProduction(config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  };

  useEffect(() => {
    searchPro();
    return () => {};
  });

  useEffect(() => {
    console.log("价格降序更新数据---");
  }, [sortValue]);

  useEffect(() => {
    console.log("筛选更新数据---");
  }, [filterValue]);

  const handleSetTab = payload => {
    if (payload === tabIndex) return;
    setTabIndex(payload);
    // setIsShow(false);
  };
  let tabs = [
    { text: "My Shelves", key: "my" },
    { text: "AIDA", key: "son" },
    // { text: "Real Estate", key: "Real" },
    // { text: "Game", key: "Game" },
  ];

  const refreshListData = () => {};

  //不同的tab项渲染对应的列表
  const renderTabContent = () => {
    return (
      <Box w="100%" h="100%">
        <FlatList
          w="100%"
          refreshing={false}
          horizontal={false}
          onRefresh={() => refreshListData()}
          numColumns={2}
          data={ListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <RenderListItem
                setActive={handleSetActiveIndex}
                isActive={selectActiveIndex == index}
                item={item}
                index={index}
                setIsApproveShow={setIsApproveShow}
              />
            );
          }}
        />
      </Box>
    );
  };
  return (
    <>
      {/* 手机顶部状态栏 start */}
      {/* <StatusBar backgroundColor="transparent"  translucent={true} /> */}
      {/* 手机顶部状态栏 end */}

      {/* 页面内容区域 start */}
      <VStack position="absolute" w="100%" h="100%" bottom="0" top="0" bg="#fff" justifyContent="space-between">
        <VStack>
          {/* 顶部渐变背景 start */}
          <HStack position="absolute" top="0" overflow="hidden">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#1E2C5D", "#213370"]}
              style={{ width: "100%", height: pxToDp(505) }}
            />
          </HStack>
          {/* 顶部渐变背景 end */}

          <VStack position="absolute" top={pxToDp(130)} w={screenWidth} pl={pxToDp(41)} pr={pxToDp(41)}>
            {/* 导航按钮，NFT数量 start  */}
            {/* <Head account={{ money: coin }} /> */}
            {/* 导航按钮，NFT数量 end  */}

            {/*  tab导航区域 start */}
            <Tabs tabs={tabs} tabIndex={tabIndex} handleSetTab={handleSetTab} />
            {/*  tab导航区域 end */}
          </VStack>
        </VStack>

        {/* tab 对应的内容区域 start  */}
        <VStack
          position="relative"
          w="100%"
          bg="#E9ECEE"
          h={pxToDp(1515)}
          pt={pxToDp(50)}
          borderTopRadius={pxToDp(60)}
          justifyContent="space-between"
        >
          <Box pl={pxToDp(40)} pr={pxToDp(40)} h="100%">
            {renderTabContent()}
          </Box>
        </VStack>
        {/* tab 对应的内容区域 start  */}
      </VStack>
      {/* 页面内容区域 end */}
      <Approve isOpen={isApproveShow} onClose={setIsApproveShow}></Approve>
    </>
  );
};

export default React.memo(ShoppingMall);
