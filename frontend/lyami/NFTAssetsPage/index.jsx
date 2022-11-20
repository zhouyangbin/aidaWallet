import React, { useState, useCallback, useMemo } from "react";
import {
  HStack,
  Image,
  VStack,
  Pressable,
  Center,
  Box,
  Text,
  useDisclose,
  FlatList,
  useToast,
  Modal,
} from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icons from "../asset/Icon";
import AssetsItem from "./AssetsItem";
import AssetsItemDetail from "./AssetsItemDetailPage";
import BreedPage from "./BreedPage";
import { handleGetNFTJson } from "../api/service/index";
import config from "../api/util/config";
import global from "../api/util/global";
import { ERC721 } from "../api/web3/ERC721";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import { Crystalball } from "../api/web3/Crystalball";
// import { contractAddress as ERC721contractAddress } from "../api/util/constant";
import { screenWidth, pxToDp } from "../../utils/stylesKits";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import CollectionPage from "./CollectionPage";
import AddCrystalball from "./AddCrystalball";
import LinearGradient from "react-native-linear-gradient";
import CollectionItemDetail from "./CollectionPage/CollectionItemDetail";
import { useEffect } from "react";
import SonAIDA from "./SonAIDA";
import Unprinting from "./Unprinting";
import ipfsClient from "./ipfsClient";
import { RawFormData } from "../api/util/rawFormData";
import PrintingToast from "./PrintingToast";
import PayOrder from "./PayOrder";
import PaySuccess from "./PaySuccess";
import { handleFetchTransactionGas } from "../api/service/index";
// import { getAllExternalFilesDirs } from "react-native-fs";
import Spin from "../component/Spin";
import { I18n } from "../../language/I18n";
import { isArray } from "lodash";
import { useGlobalStore } from "../api/Store/globalHook";
import { handleMoneyFormatter } from "../api/util/helper";
import PopButton from "../METAPage/PopButton";
const Head = props => {
  const { account } = props;
  const navigation = useNavigation();
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Pressable onPress={() => navigation.goBack()}>
        <Image alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon} />
      </Pressable>
      <HStack pl={pxToDp(14)} pr={pxToDp(72)} alignItems="center" h={pxToDp(94)} borderRadius={pxToDp(47)} bg="#3A4B86">
        <Image alt="img" w={pxToDp(69)} h={pxToDp(69)} source={Icons.coinLogoIcon} />
        <Text ml={pxToDp(52)} fontSize={pxToDp(46)} color="#fff" fontWeight="bold">
          {handleMoneyFormatter(account.coinAssets[0]?.balance, 6)}
        </Text>
      </HStack>
    </HStack>
  );
};
const NFTAssetsPage = props => {
  const { globalData, handleSetGlobalData } = useGlobalStore();
  //nftType 上一页列表的index
  const {
    route: {
      params: { nftType = 0, payload: routePayload, changeNFTType, account },
    },
  } = props;
  const [NFTType, setNFTType] = useState(nftType);
  const [contractAddress] = useState(
    routePayload.token || routePayload[0].contractAddress || routePayload[0].token_address
  );
  // console.log(contractAddress, '每一个nft的合约地址---');
  const erc721 = new ERC721(global.web3, contractAddress);
  const navigation = useNavigation();
  const { isOpen, onToggle } = useDisclose();
  const [tabIndex, setTabIndex] = useState("my");
  const [showDetail, setShowDetail] = useState(false);
  const [showBreed, setShowBreed] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null); //选中的item
  // const [account, setAccount] = useState({ name: "", money: "" });
  const [NFTArray, setNFTArray] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selectItem, setSelectItem] = useState({}); //选中的item
  const [hasBtn, setHasBtn] = useState(false);
  const [crystalballList, setCrystalballList] = useState([]);
  const [isAddDialogShow, setIsAddDialogShow] = useState(false);
  const toast = useToast();
  const [crystalImage, setCrystalImage] = useState(null);
  // const [collectionList, setCollectionList] = useState(globalData.totalAssets.collectionNFTMap[contractAddress] || []);
  let ballIds = globalData.totalAssets[globalData.defaultKey.address][globalData.defaultNetwork.ChainId]["concernCrystalBallList"][contractAddress] || [];
  ballIds = ballIds.concat(globalData.defaultNetwork.initAIDAMetaList)
  const [collectionList, setCollectionList] = useState(ballIds);
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  const [sonAIDAList, setSonAIDAList] = useState([]);
  const [selectedAIDA, setSelectedAIDA] = useState(null); // 选中的子aida
  // const [isPayShow, setIsPayShow] = useState(false)
  const [fuelCost, setFuelCost] = useState(0);
  const [payStep, setPayStep] = useState(0); //0: 未支付  1: 支付中(显示支付页面)  2: 支付成功(成功页面)  3： 支付失败
  const [ipfsCId, setIpfsCId] = useState("");
  // const [orderGas, setOrderGas] = useState('')
  const [priority, setPriority] = useState(null); // 燃油费编辑后返回的数据
  const [printingResultState, setPrintingResultState] = useState(false); //解印失败 或者成功 弹窗
  const [printingResultType, setPrintingResultType] = useState(""); //解印 失败 或者 成功 类型
  const [printingButtonShow, setPrintingButtonShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //解印 的button loading

  // tab 页签
  const Tabs = props => {
    let TabArray;
    const { tabIndex, handleSetTab } = props;
    if (contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) {
      TabArray = [
        { text: I18n.t("NFTAssets.my"), key: "my" },
        { text: I18n.t("NFTAssets.sonAida"), key: "son" },
        { text: I18n.t("NFTAssets.collect"), key: "collect" },
      ];
    } else {
      TabArray = [
        { text: I18n.t("NFTAssets.my"), key: "my" },
        { text: I18n.t("NFTAssets.collect"), key: "collect" },
      ];
    }
    return (
      <HStack
        mt={pxToDp(49)}
        alignItems="center"
        justifyContent="space-between"
        bg="#fff"
        w={pxToDp(999)}
        borderRadius={pxToDp(17)}
      >
        {TabArray.map((item, index) => {
          return (
            <Pressable
              key={index}
              w={pxToDp(999) / TabArray.length}
              borderRadius={pxToDp(17)}
              bg={item.key == tabIndex ? "#5C50D2" : null}
              onPress={() => {
                handleSetTab(item.key);
              }}
            >
              <Text
                h={pxToDp(84)}
                lineHeight={pxToDp(84)}
                textAlign="center"
                color={item.key == tabIndex ? "#fff" : "#5C50D2"}
                fontSize={pxToDp(36)}
                fontWeight="800"
              >
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    );
  };
  //显示添加水晶人弹窗
  const showAddCrystalballDialog = () => {
    setIsAddDialogShow(true);
  };
  const listData = useMemo(() => {
    const array1 = [];
    const array2 = [];
    crystalballList.map(item => {
      if (item.token != 0) {
        array1.push(item);
      } else {
        array2.push(item);
      }
    });
    console.log(crystalballList, "----------crystalballList---------");
    console.log(array1, "----array1---");
    setSonAIDAList(array2);
    return array1;
    // return handleSwitchList(NFTArray, tabIndex);
    // return crystalballList;
  }, [tabIndex, NFTArray.length, crystalballList.length]);

  //NFT列表数据
  const NFTData = useMemo(() => {
    // console.log("NFTArray", NFTArray);
    return NFTArray; //handleSwitchList(NFTArray, tabIndex);
  }, [tabIndex, NFTArray]);
  // const handleStructureList = (contractAddress, payload, tokenId) => {
  //   const item = {
  //     chainId: global.defaultNetwork.ChainId,
  //     contractAddress: contractAddress,
  //     image: payload?.image?.replace("ipfs://", config.IPFS_ROOT),
  //     tokenId: tokenId,
  //     name: `NFT${tokenId}`,
  //     description: payload.description,
  //     isOnSale: false,
  //     isBreed: false,
  //     type: 0,
  //     attributes: payload?.attributes || [],
  //     show: true,
  //   };
  //   // 加入Global缓存
  //   const findGlobalNFT = global.NFTAssetCache.find(
  //     (x) =>
  //       x.chainId == global.defaultNetwork.ChainId &&
  //       x.contractAddress == contractAddress &&
  //       x.tokenId == tokenId
  //   );
  //   if (findGlobalNFT == null) {
  //     global.NFTAssetCache.push(item);
  //   }
  //   const findNFT = global.NFTAssetCache.filter(
  //     (x) =>
  //       x.chainId == global.defaultNetwork.ChainId &&
  //       x.contractAddress == contractAddress
  //   );
  //   setNFTArray(findNFT);
  //   console.log();
  // };
  // const handleSearchCallback = async (payload) => {
  //   try {
  //     const res = await handleGetMetaURI(contractAddress, payload);
  //     const requestUrl = res.replace("ipfs://", config.IPFS_ROOT);
  //     const NFTJson = await handleGetNFTJson(requestUrl);
  //     const { data } = NFTJson;
  //     handleStructureList(contractAddress, data, payload);
  //   } catch (error) {
  //     console.log(error, "handleSearchCallback--------");
  //   }
  // };
  // const handleGetData = async () => {
  //   try {
  //     setLoading(true);
  //     // const res = await handleSearchERC721NFT(
  //     //   contractAddress,
  //     //   handleSearchCallback
  //     // );
  //   } catch (error) {
  //     console.log(error, "handleSearchCallback-------");
  //   }
  // };

  const handleSetTab = payload => {
    if (payload === tabIndex) return;
    setTabIndex(payload);
    setIsShow(false);
    if (payload === "my") {
      setHasBtn(false);
    } else if (payload === "collect") {
      setHasBtn(true);
    }
  };
  //nft 缓存
  // const needUpdateNFTAssets = async () => {
  //   try {
  //     const ownerAddress = global.defaultAddress();
  //     const balance = await erc721.balanceOf(ownerAddress);
  //     const findNFT = global.NFTAssetCache.filter(
  //       (x) =>
  //         x.chainId == global.defaultNetwork.ChainId &&
  //         x.contractAddress == contractAddress
  //     );
  //     let initArray = [];
  //     initArray.push(...findNFT);
  //     setNFTArray(initArray);
  //     if (balance > 0 && findNFT.length != balance) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  //获取水晶人的数据
  const initCrystalballData = async () => {
    try {
      const crystalball = await crystalballInstance.getUserCrystalBallList(global.defaultAddress.call(), 0, 100);
      console.log(crystalball);
      // console.log(crystalball.ballList, '-----------------aida数据111-------------------');
      setCrystalballList(crystalball.ballList);
    } catch (err) {
      console.log(err, "获取aida数据有误---");
    }
  };
  //nft 水晶球
  const setNFTCrystalballData = async () => {
    const tem = props?.route?.params?.payload || [];
    if (!isArray(tem)) {
      return;
    }
    const ballArr = tem.map((item, index) => {
      item = {
        chainId: global.defaultNetwork.ChainId,
        contractAddress: contractAddress,
        image: item?.metadata ? JSON.parse(item?.metadata)?.image?.replace("ipfs://", config.IPFS_ROOT) : "",
        tokenId: item?.token_id || "",
        name: `NFT${item?.token_id || ""}`,
        description: item?.metadata ? JSON.parse(item?.metadata)?.description : "",
        isOnSale: false,
        isBreed: false,
        type: 0,
        attributes: item?.metadata ? JSON.parse(item?.metadata)?.attributes : [],
        show: true,
        metadata: item?.metadata ? JSON.parse(item?.metadata) : {},
      };
      // 加入Global缓存
      const findGlobalNFT = global.NFTAssetCache.find(
        x =>
          x.chainId == global.defaultNetwork.ChainId &&
          x.contractAddress == contractAddress &&
          x.tokenId == item?.token_id
      );
      if (findGlobalNFT == null) {
        global.NFTAssetCache.push(item);
      }
      return item;
    });
    console.log("ballArr", ballArr);
    setNFTArray(ballArr);
    setLoading(false);
  };
  //请求Nft数据
  useFocusEffect(
    useCallback(() => {
      // 请求水晶球 list
      if (contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) {
        initCrystalballData();
      } else {
        //nft数据
        setNFTCrystalballData();
      }

      return () => {
        () => {};
      };
    }, [])
  );
  const goToDetailOrShowAttribute = item => {
    // console.log(item);
    setDetailsItem(item);
    setSelectItem(item);
    // 有gene的就是aida  判断是aida 还是 其他NFT AIDA 跳转详情页面，其他NFT 显示属性面板
    if (item.gene) {
      //打开 aida详情页面
      setShowDetail(true);
    } else {
      setIsShow(true);
      setSelectItem(item);
    }
  };

  //渲染水晶人的列表item
  const renderCrystabllItem = ({ item, index }) => {
    // console.log(80808,item.gene)
    const renderImage = payload => {
      return <CrystalBallComponent width={pxToDp(421)} height={pxToDp(403)} type="primary" gene={payload.gene} />;
    };
    return (
      <AssetsItem
        renderImage={payload => renderImage(payload)}
        isR={index % 2 == 0}
        contractAddress={contractAddress}
        breedPress={payload => {
          setShowBreed(true);
          setDetailsItem(payload);
        }}
        onClick={payload => {
          setDetailsItem(payload);
          setShowDetail(true);
        }}
        payload={item}
      ></AssetsItem>
    );
  };
  // 渲染NFT列表的item
  const renderNFTItem = ({ item, index }) => {
    const renderImage = payload => {
      return (
        <Image w={pxToDp(410)} h={pxToDp(410)} resizeMode="cover" resizeMethod="auto" source={{ uri: payload.image }} />
      );
    };
    return (
      <AssetsItem
        renderImage={payload => renderImage(payload)}
        isR={index % 2 == 0}
        contractAddress={contractAddress}
        breedPress={payload => {}}
        hasButtons={false}
        onClick={payload => {
          goToDetailOrShowAttribute(payload);
        }}
        payload={item}
      />
    );
  };

  const getAddNFTData = async (tokenid, contractAddress) => {
    try {
      const erc721 = new ERC721(global.web3, contractAddress);
      const url = await erc721.tokenURI(tokenid);
      // console.log(url, "----url----");
      if (!url) {
        return toast.show({
          description: "您输入得Token无效，请重新输入",
          placement: "top",
          duration: 2000,
        });
      }
      let data;
      try {
        if (url.indexOf("http") > 0) {
          data = await handleGetNFTJson(url);
        } else {
          data = await handleGetNFTJson(url.replace("ipfs://", config.IPFS_ROOT));
        }
      } catch (err) {
        return toast.show({
          description: "获取NFT的Meta失败，请切换ipfs gateway后重试",
          placement: "top",
          duration: 2000,
        });
      }
      return data;
    } catch (err) {
      console.log(err, "验证ballid是否有效---");
      toast.show({
        description: "已收藏，请勿重复收藏",
        placement: "top",
        duration: 2000,
      });
      return false; //tokenid 无效
    }
  };
  //验证ballid是否有效
  const validataBallid = async ballid => {
    try {
      const res = await crystalballInstance.getCrystalballProperty(ballid);

      if (res.ballid === ballid) return true;
      return false;
    } catch (err) {
      console.log(err, "ballid----data--");
      return false;
    }
  };
  //添加收藏
  const concern = async ballid => {
    // 将关注的水晶球存放在本地数据库中，然后在关注列表页面获取到存储在本地的数据进行显示
    // let collectionList = globalData.totalAssets.colectionNFTMap[contractAddress] || [];
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;

    let collectionList = globalData.totalAssets[Address][ChainId]["concernCrystalBallList"][contractAddress] || [];
    const flag = collectionList.some(id => id === ballid);
    if (flag) {
      return toast.show({
        description: "已收藏，请勿重复收藏",
        placement: "top",
        duration: 2000,
      });
    }
    if (contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) {
      //aida
      const validate = await validataBallid(ballid);
      if (!validate) {
        return toast.show({
          description: "ballid 无效",
          placement: "top",
          duration: 2000,
        });
      }
    } else {
      //其他NFT
      // 查看此tokenid 是否有效

      const NFTData = await getAddNFTData(ballid, contractAddress);
      if (NFTData === false) {
        return toast.show({
          description: "tokenid 无效",
          placement: "top",
          duration: 2000,
        });
      }
    }

    toast.show({
      description: "收藏成功",
      placement: "top",
      duration: 2000,
    });

    collectionList.unshift(ballid);
    // globalData.totalAssets.collectionNFTMap[contractAddress] = collectionList;

    globalData.totalAssets[Address][ChainId]["concernCrystalBallList"][contractAddress] = collectionList;
    // 保存收藏的nft 一个账户-对应多个网络-每个网络对应多种nft
    handleSetGlobalData(globalData);
    // await SaveGlobalData(global.CreateNewPassword);
    setCollectionList(collectionList);
  };

  useFocusEffect(
    useCallback(() => {
      if (tabIndex === "son") {
        if (tabIndex) return;
        setPrintingButtonShow(true);
      } else {
        if (!tabIndex) return;
        setPrintingButtonShow(false);
      }
    }, [tabIndex])
  );

  const selectAIDA = (item, index) => {
    //第一个新繁育的aida 点击后，新繁育的标识消失
    sonAIDAList[index]["isNew"] = false;
    setSonAIDAList([...sonAIDAList]);
    setSelectedAIDA(item);
    setPrintingButtonShow(true);
  };
  //IADA列表
  const AIDAList = useMemo(() => {
    switch (tabIndex) {
      case "my":
        return (
          <Box>
            {listData.length > 0 ? (
              <FlatList
                w="100%"
                refreshing={false}
                horizontal={false}
                onRefresh={() => initCrystalballData()}
                numColumns={2}
                data={listData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderCrystabllItem({ item, index })}
              />
            ) : (
              <Center mt={pxToDp(400)}>
                <Text fontSize={pxToDp(50)}>{I18n.t("aida.noData")}</Text>
              </Center>
            )}
          </Box>
        );
      case "son":
        return (
          <SonAIDA
            selectAIDA={(item, index) => selectAIDA(item, index)}
            sonAIDAList={sonAIDAList}
            setCrystalImage={setCrystalImage}
          />
        );
      case "collect":
        return (
          <Box>
            {collectionList.length > 0 ? (
              <CollectionPage
                contractAddress={contractAddress}
                collectionList={collectionList}
                setIsShow={setIsShow}
                setSelectItem={setSelectItem}
                selectHandler={goToDetailOrShowAttribute}
                item={selectItem}
              />
            ) : (
              <Center mt={pxToDp(400)}>
                <Text fontSize={pxToDp(50)}>{I18n.t("aida.noData")}</Text>
              </Center>
            )}
          </Box>
        );
    }
  }, [tabIndex, crystalballList, sonAIDAList, collectionList]);
  //NFT列表
  const NFTList = useMemo(() => {
    switch (tabIndex) {
      case "my":
        return (
          <FlatList
            numColumns={2}
            data={NFTData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderNFTItem({ item, index })}
          />
        );
      case "collect":
        return (
          <CollectionPage
            contractAddress={contractAddress}
            collectionList={collectionList}
            setIsShow={setIsShow}
            setSelectItem={setSelectItem}
            selectHandler={goToDetailOrShowAttribute}
            item={selectItem}
          />
        );
    }
  }, [tabIndex, NFTData, collectionList]);
  const renderNFTOrAIDAList = () => {
    //是平台NFT
    if (contractAddress === config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]) {
      return AIDAList;
    }
    //添加的NFT
    return NFTList;
  };
  useEffect(() => {
    //更新收藏列表数据
    console.log(collectionList, 'collectionList----');
    setCollectionList([...collectionList]);
  }, [collectionList.length]);

  //搜索NFT 资产
  const searchNFT = () => {
    setNFTType(1);
  };
  //保存繁育的子aida到本地
  const saveSonAIDA = async data => {
    let sonList = global.sonAIDAList || [];
    sonList.unshift(data.ballid);
    global.sonAIDAList = sonList;
    await SaveGlobalData(global.CreateNewPassword);
  };

  //根据本地的子aida ballid 查找子aida列表数据
  const getCrystallBallData = async ballIds => {
    if (ballIds.length === 0) return;
    let promises = [];
    ballIds.forEach((id, index) => {
      if (id) {
        promises.push(
          new Promise((resolve, reject) => {
            try {
              const res = crystalballInstance.getCrystalballProperty(id);
              resolve(res);
            } catch (err) {
              reject(err);
              console.log(err, "获取收藏的水晶人数据报错");
            }
          })
        );
      }
    });

    try {
      const response = await Promise.all(promises);
      return response;
    } catch (err) {
      console.log(err, "获取aida数据有错 ------");
      return false;
    }
  };

  // 繁育成功后显示子aida页签，并接收到繁育后的子aida数据
  const receiveBreedResult = async breedData => {
    if (!breedData?.ballid) return;
    console.log(breedData, "breedData-------------繁育结果");
    // handleSetTab("son"); //定位到son aida页签，
    handleSetTab("my"); //定位到son aida页签，
    // 将新繁育的子aida id添加到本地存储的数据中
    await saveSonAIDA(breedData);
    // 同时更新子aida列表数据，将刚才添加的aida标记为new
    await refreshSonAIDAList("isNew");
  };

  // 获取编辑gas弹窗默认的gas费用
  const handleGetServerGasFee = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
    } = res;
    // setGasLimit(GasLimit);
    setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetServerGasFee();
    }, [])
  );

  //支付成功后，去aida页签看铸造出来的aida
  const GotoAIDA = () => {
    setTabIndex("my");
    setPayStep(0);
    setPrintingResultState(false);
  };
  const deleteCurAIDAFromAIDAList = async () => {
    let AIDAList = global.sonAIDAList;
    let index = AIDAList.indexOf(Number(selectedAIDA.ballid));
    // alert(JSON.stringify(selectedAIDA))
    if (index === -1) return;
    AIDAList.splice(index, 1);
    console.log(AIDAList, index, "--------删除解印成功后的aida数据---");
    // alert(AIDAList)
    // 更新AIDAList本地存储数据
    await SaveGlobalData(global.CreateNewPassword);
    //重新获取子aida列表数据
    await refreshSonAIDAList();
  };
  const payGas = async props => {
    // setLoading(true);
    // 4. 传入gas费用，支付订单 priority.maxPriorityFee
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    try {
      const result = await crystalballInstance.mintCrystalBall(
        global.defaultAddress(),
        selectedAIDA.ballid,
        ipfsCId,
        fuelCost,
        priority.maxPriorityFee * 10 ** 9
      );
      console.log(result, "result-----铸造成功---");
      //铸造成功 保存记录
      const orderData = {
        order: {
          value: 0,
          selectPayload: {
            symbol: "MITIC",
          },
        },
        time: new Date(),
        type: "ProductBall",
        status: "success",
        info: {
          receipt: {
            from: global.defaultKey.address,
            to: config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId],
          },
        },
        address: global.defaultKey.address,
        priority: priority,
      };
      account.Records.unshift(orderData);
      handleSetGlobalData(globalData);
      //子aida解印成功后，需要将子aida列表中当前aida移除
      await deleteCurAIDAFromAIDAList();
      setPrintingResultType("success");
      setPrintingResultState(true);
      setPayStep(2);
      setLoading(false);
    } catch (err) {
      console.log("err-----铸造失败---", err);
      //铸造失败 保存记录
      const orderData = {
        order: {
          value: 0,
          selectPayload: {
            symbol: "MITIC",
          },
        },
        time: new Date(),
        type: "ProductBall",
        status: "fail",
        info: {
          receipt: {
            from: global.defaultKey.address,
            to: config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId],
          },
        },
        address: global.defaultKey.address,
        priority: priority,
      };
      account.Records.unshift(orderData);
      handleSetGlobalData(globalData);
      setLoading(false);
      setPayStep(0);
      setPrintingResultType("failure");
      setPrintingResultState(true);
      // setPayStep(2)
      // setPrintingResultType('success')
      // setPrintingResultState(true)

      console.log(err, "errr支付解印gas报错-----");
    }
  };
  // 子aida 解印
  const UnprintingHandler = async () => {
    try {
      // 显示 button loading
      setIsLoading(true);
      // 1. 上传图片文件到IPFS， 返回一个路径地址
      const buffer = Buffer.from(crystalImage);

      const formData = new RawFormData();
      formData.addFile("path", buffer);

      const urlHash = await ipfsClient.add(formData);
      // const urlHash = await ipfsClient.add(crystalImage);
      console.log(urlHash, "urlHash-----");

      // 2.合成json文件，再上传ipfs 得到一个cid，cid就是URI，
      const AIDA = {
        // ballid: selectedAIDA.ballid,
        // url: urlHash,
        description: "",
        external_url: `ipfs://${urlHash}`,
        image: `ipfs://${urlHash}`,
        name: `AIDA#${selectedAIDA.ballid}`,
        attributes: [],
      };

      // 3. 通过getCrystalballProperty 方法获取 ballid, gene, birthday, dynasty, fatherid, montherid  属性，添加到attributes 中
      const crystalBallProperties = await crystalballInstance.getCrystalballProperty(selectedAIDA.ballid);
      console.log(crystalBallProperties, "crystalBallProperties----");
      const properties = ["ballid", "gene", "birthday", "dynasty", "fatherid", "montherid"];

      properties.forEach(key => {
        AIDA.attributes.push({
          trait_type: key,
          value: crystalBallProperties[key],
        });
      });

      console.log(AIDA, "合成的json  ----AIDA  ---");

      const Cid = await ipfsClient.addJSON(AIDA);
      setIpfsCId(`ipfs://${Cid}`);
      console.log(Cid, "Cid---");
      const uri = `ipfs://${Cid}`;
      console.log(uri, "uri-----");

      // 4. 调用mintCrystalBall 方法铸造
      const gas = await crystalballInstance.mintCrystalBall(global.defaultAddress(), selectedAIDA.ballid, uri); // 245074
      console.log(gas, "gas---");
      // setOrderGas(gas)
      setFuelCost(gas);
      setPayStep(1);

      // 隐藏 button loading
      setIsLoading(false);

      // 5. 传入gas费用，支付订单 priority.maxPriorityFee
      // const result = await crystalballInstance.mintCrystalBall(global.defaultAddress(), selectedAIDA.ballid, uri, gas, priorityFeePerGas )

      // 6. 支付解印成功，出现成功弹窗，

      // 7. 生成成人AIDA显示在 AIDA 页签
      // setTabIndex('my')
    } catch (e) {
      // 隐藏 button loading
      setIsLoading(false);
      // 铸造子aida失败，出现提示弹窗
      console.error(e, "上传子aida图片报错");
    }
  };
  //删除Nft
  const deleteOtherNFT = async item => {
    // if (tabIndex == "my") {
    //   //删除My
    //   const NFTAssetCache = global.NFTAssetCache;
    //   console.log(8881, NFTAssetCache);
    //   const findIndex = NFTAssetCache.findIndex(
    //     (cur) => cur.tokenId == item.tokenId
    //   );
    //   //改变参数，本地软删
    //   if (findIndex !== -1) {
    //     global.NFTAssetCache[findIndex].show = false;
    //   }
    //   SaveGlobalData(global.CreateNewPassword);
    //   const findNFT = global.NFTAssetCache.filter(
    //     (x) =>
    //       x.chainId == global.defaultNetwork.ChainId &&
    //       x.contractAddress == contractAddress
    //   );
    //   setNFTArray(findNFT);
    //   setIsShow(false);
    // } else {
    //收藏删除
    let collection = global.colectionNFTMap[contractAddress];
    const findIndex = collection.findIndex(cur => cur == item.id);
    if (findIndex !== -1) {
      collection.splice(findIndex, 1);
    }
    global.colectionNFTMap[contractAddress] = collection;
    await SaveGlobalData(global.CreateNewPassword);
    console.log(global.colectionNFTMap[contractAddress]);
    setCollectionList(collection);
    setIsShow(false);
    // }
  };
  return (
    <>
      <VStack position="absolute" w="100%" h="100%" bottom="0" top="0" bg="#fff" justifyContent="space-between">
        {!showBreed && !showDetail ? (
          <VStack>
            <HStack position="absolute" top="0" overflow="hidden">
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#1E2C5D", "#213370"]}
                style={{ width: "100%", height: pxToDp(505) }}
              />
            </HStack>
            <VStack mt={pxToDp(130)} w={screenWidth} pl={pxToDp(41)} pr={pxToDp(41)}>
              <Head account={account} />
              <Tabs tabIndex={tabIndex} handleSetTab={handleSetTab} />
            </VStack>
          </VStack>
        ) : null}
        {/* NFT 列表区域 start  */}
        <VStack
          position="relative"
          w="100%"
          bg="#E9ECEE"
          flex="1"
          mt={pxToDp(51)}
          // h={pxToDp(1515)}
          pt={pxToDp(49)}
          borderTopRadius={pxToDp(59)}
          justifyContent="space-between"
        >
          <Spin isSpin={loading} textContent={I18n.t("NFTAssets.loadingText")}>
            {/* aida NFT 列表区域 start  */}
            <Box pl={pxToDp(39)} pr={pxToDp(39)} h="100%">
              {tabIndex == "son" && (
                <HStack mb={pxToDp(13)} mt={pxToDp(-13)} alignItems="center">
                  <Image w={pxToDp(43)} h={pxToDp(43)} source={Icons.noticeBlueIcon}></Image>
                  <Text ml={pxToDp(13)} fontSize={pxToDp(33)} color="#5C50D2">
                    KID ~ing
                  </Text>
                </HStack>
              )}
              {renderNFTOrAIDAList()}
            </Box>
            {/* aida NFT 列表区域 end  */}
            {/* NFT 属性 start  */}
            <Modal
              maxHeight="200px"
              style={{
                position: "absolute",
                zIndex: 100,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              isOpen={isShow}
              onClose={() => setIsShow(false)}
            >
              <CollectionItemDetail
                style={{
                  height: "100%",
                }}
                isShow={isShow}
                // hasBtn={hasBtn}
                hasBtn={false}
                setIsShow={setIsShow}
                deleteOtherNFT={deleteOtherNFT}
                item={selectItem}
                tabIndex={tabIndex}
              />
            </Modal>
            {/* NFT 属性 end  */}
            {/* 子AIDA解印 button start  */}
            {/* <Unprinting
              isLoading={isLoading}
              style={{
                position: "absolute",
                zIndex: 100,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              isShow={printingButtonShow}
              click={() => UnprintingHandler()}
            /> */}
            {/* 子AIDA解印 button start  */}

            {/* 添加收藏 start  */}
            <AddCrystalball
              NFTType={NFTType}
              isOpen={isAddDialogShow}
              close={() => setIsAddDialogShow(false)}
              title="添加"
              contractAddress={contractAddress}
              confirm={concern}
            />
            {/* 悬浮的按钮区域 start  */}
            <PopButton showAddCrystalballDialog={showAddCrystalballDialog}/>
          </Spin>
        </VStack>
        {/* NFT 列表区域 end  */}
        {printingResultState ? (
          <PrintingToast
            type={printingResultType}
            GotoAIDA={GotoAIDA}
            close={setPrintingResultState}
            isShow={printingResultState}
          />
        ) : null}
        {payStep === 1 ? (
          <PayOrder
            payGas={payGas}
            priority={priority}
            setPriority={setPriority}
            payStep={payStep}
            fuelCost={fuelCost}
            setFuelCost={setFuelCost}
            setPayStep={setPayStep}
            loading={loading}
          />
        ) : payStep === 2 ? (
          <PaySuccess setPayStep={setPayStep} refreshAIDAList={refreshAIDAList} />
        ) : null}

        {showDetail ? (
          <AssetsItemDetail
            close={setShowDetail}
            show={showDetail}
            detailsItem={detailsItem}
            setShowBreed={setShowBreed}
          />
        ) : null}
        {showBreed ? (
          <BreedPage
            passBreedResult={data => receiveBreedResult(data)}
            setShowDetail={setShowDetail}
            initCrystalballData={initCrystalballData}
            listData={listData}
            close={setShowBreed}
            show={showBreed}
            initFatherBall={detailsItem}
          />
        ) : null}
      </VStack>
      {/* 页面内容区域 end */}
    </>
  );
};
export default React.memo(NFTAssetsPage);
