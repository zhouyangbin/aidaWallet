import React, { useState, useCallback, useEffect, useContext } from "react";
import { Text, HStack, VStack, Pressable, Image, useToast } from "native-base";
import { FlatList, ImageBackground } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LyamiWalletPanel from "./Modal/LyamiWalletPanel";
import global from "./api/util/global";
import Spin from "./component/Spin";
import Icons from "./asset/Icon";
import { remove } from "lodash";
import AlertDialogComp from "./component/AlertDialogComp";
import ScanQrcode from "./component/ScanQrcode";
import { SaveGlobalData } from "./api/localStorge/LocalStroge";
import { scanHandler } from "./api/util/scanConfig";
import { handleSearchAllERC20Assets } from "./api/service/walletMain";
import { getBalance } from "./api/web3/nativeCoin";
import { cloneDeep, debounce } from "lodash";
import { Crystalball } from "./api/web3/Crystalball";
import config from "./api/util/config";
import { pxToDp } from "../utils/stylesKits";
import netwrap from "@/../../assets/image/UiImg/netwrap.webp";
import netPoint from "@/../../assets/image/UiImg/netPoint.webp";
import SelectNetWork from "./component/SelectNetWork";
import { handleFetchERC20Token, handleFetchNFTs, handleSearch721Assets } from "./api/service";
import { useGlobalStore } from "./api/Store/globalHook";
import LoadingContext from "../providers/LoadContext";

// import

const WalletMain = props => {
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const loading = useContext(LoadingContext);
  // console.log(globalData);
  const [isSpin, setIsSpin] = useState(false);
  const [spinText, setSpinText] = useState("wait...");
  const [alertShow, setAlertShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [netWorkIndex, setNetWorkIndex] = useState(false);
  const [initFlag, setInitFlag] = useState(false);
  const [addNetWorkShow, setAddNetWorkShow] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  // const [netWorkList, setNetWorkList] = useState(global.defaultNetwork);
  const [confirmShow, setConfirmShow] = useState(false);
  const [deleteItemCoin, setDeleteItemCoin] = useState(null);
  const [selectNetworkShow, setSelectNetworkShow] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [nftLoadingValue, setNftLoadingValue] = useState(0);
  const [isGetNfts, setIsGetNfts] = useState(false);
  const [currentCoin, setCurrentCoin] = useState({});
  //获取其他币信息
  const getERC20Token = async () => {
    // console.log("getERC20Token---获取其他币信息");
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {
      coinAssets: [],
    };
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    try {
      const res = await handleFetchERC20Token(globalData.defaultNetwork.ChainId, globalData.defaultAddress.call());
      const assetsAddress = account.coinAssets.map(item => item.token);
      const resData = res?.data || [];
      for (let item of resData) {
        if (assetsAddress.includes(item?.token_address)) {
          const findIndex = account.coinAssets.findIndex(x => x.token == item?.token_address);
          account.coinAssets[findIndex].balance = item.balance;
        } else {
          const obj = {
            balance: item?.balance,
            decimal: item?.decimals,
            name: item?.name,
            symbol: item?.symbol,
            token: item?.token_address,
            type: "ERC20",
          };
          account.coinAssets.push(obj);
        }
      }
      // console.log(account,"account")
      handleSetGlobalData(globalData);
    } catch (e) {}
  };
  const handleSearchAllCoins = async () => {
    global.defaultNetwork.assets?.map(async (item, index) => {
      if (index != 0) {
        if (item.type == "ERC20") item.balance = await handleSearchAllERC20Assets(item.token);
      }
    });
    const currentNetIndex = global.nativeCoinNetwork.findIndex(item => item.ChainId == global.defaultNetwork.ChainId);
    setNetWorkIndex(currentNetIndex);
    global.nativeCoinNetwork[currentNetIndex] = global.defaultNetwork;
    await SaveGlobalData(global.CreateNewPassword);
    setInitFlag(!initFlag);
  };
  //获取默认币信息
  const handleGetData = async () => {
    getBalance(globalData.defaultAddress.call())
      .then(res => {
        // console.log(res,"获取默认币信息")
        const Address = globalData.defaultKey.address;
        const ChainId = globalData.defaultNetwork.ChainId;
        let account = {
          coinAssets: [],
        };
        if (globalData.totalAssets[Address] != undefined) {
          account = globalData.totalAssets[Address][ChainId];
        }
        setCurrentCoin({
          name: account.name,
          symbol: account.CoinSymbol,
          decimal: "18",
          balance: res,
        });
        const hasDefaultCoin = account.coinAssets?.findIndex(item => item.symbol == account.CoinSymbol);
        if (hasDefaultCoin == -1) {
          let array = cloneDeep(account.coinAssets);
          array.unshift({
            name: account.name,
            symbol: account.CoinSymbol,
            decimal: "18",
            balance: res,
          });
          account.coinAssets = array;
        } else if (hasDefaultCoin == undefined) {
          account.coinAssets = [
            {
              name: account.name,
              symbol: account.CoinSymbol,
              decimal: "18",
              balance: res,
            },
          ];
        } else {
          account.coinAssets[0].balance = res;
        }
        handleSetGlobalData(globalData);
      })
      .catch(error => {
        console.error(error, "--------handleGetDatahandleGetData---------");
      });
  };
  //获取NFT
  const getUserNFTs = async (bGetAll, onGetNFTs) => {
    console.log("---getUserNFTs---");
    let cursor = "";
    let isFinish = false;
    let defaultLimit = 100;
    while (!isFinish) {
      const res = await handleFetchNFTs({
        chainid: globalData.defaultNetwork.ChainId,
        address: globalData.defaultAddress.call(),
        limit: defaultLimit,
        cursor: cursor ? cursor : "",
      });
      const total = res?.data?.total;
      const current = res?.data?.page_size * res?.data?.page;

      if (bGetAll) {
        isFinish = true;
        setIsGetNfts(false);
      } else {
        if (!res?.data?.cursor) {
          isFinish = true;
          setIsGetNfts(false);
        } else {
          cursor = res?.data?.cursor;
        }
      }
      onGetNftsCallback(res?.data?.result, total, current);
    }
  };
  //NFT set
  const onGetNftsCallback = async (nfts, total, current) => {
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {
      NFTAssets: {},
      AddNFTS: [],
    };
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    if (total == 0) {
      setNftLoadingValue(100);
      setIsGetNfts(true);
    } else {
      let pro = ((current / total) * 100).toFixed(2);
      pro > 100 ? 100 : pro;
      setNftLoadingValue(pro);
      if (pro >= 100) {
        setNftLoadingValue(100);
      }
    }
    // console.log(account, '--------------onGetNftsCallback----------------');
    // 插入到当前NFT列表中去
    for (let nft of nfts) {
      let nftCollection = account.NFTAssets[nft.token_address];
      if (!account.AddNFTS.includes(nft.token_address)) {
        account.AddNFTS.push(nft.token_address);
      }
      if (nftCollection == null) {
        account.NFTAssets[nft.token_address] = [];
        nftCollection = account.NFTAssets[nft.token_address];
      }
      const find = nftCollection.find(x => x.token_id == nft.token_id);
      if (!find) {
        nftCollection.push(nft);
      }
    }
    handleSetGlobalData(globalData);
  };
  //加载全部eft
  const getNftAll = debounce(() => {
    setNftLoadingValue(0);
    setIsGetNfts(true);
    getUserNFTs(false);
  }, 500);
  //初始化crystalball 数据
  const handleGetCrystalBallData = async () => {
    //实例化crystalball
    const crystalballInstance = new Crystalball(
      global.web3,
      config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]
    );
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    try {
      //获取用户水晶球列表数据
      const crystalball = await crystalballInstance.getUserCrystalBallList(globalData.defaultAddress.call(), 0, 20);
      // 获取智能合约数据
      const res = await handleSearch721Assets(config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]);
      // console.log(res, "res");
      const [name, decimal, symbol, balance, type] = res;
      const obj = {
        name: name,
        contractAddress: config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId],
        decimal: decimal,
        symbol: symbol,
        token: config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId],
        balance: crystalball.ballList?.length,
        type: "ERC721",
        isNew:false
      };

      const currentNetIndex = globalData.nativeCoinNetwork.findIndex(item => item.ChainId == account.ChainId);
      if (account.NFTAssets == null) {
        account.NFTAssets = {};
      }
      const hasDefaultCoin = account.NFTAssets[config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]];
      if (hasDefaultCoin == null || hasDefaultCoin == undefined) {
        account.NFTAssets[obj.token] = obj;
      } else {
        // 有水晶球，更新数量
        const CurNFTAssets= account.NFTAssets[config.CONTRACT_ADDRESS[globalData.defaultNetwork.ChainId]]
        const balanceLength = CurNFTAssets.balance;
        //缓存小于请求数量 isNew
        if(balanceLength < crystalball.ballList?.length){
          CurNFTAssets.isNew = true
        }else[
          CurNFTAssets.isNew = false
        ]
        CurNFTAssets.balance = crystalball.ballList?.length;
      }
      globalData.nativeCoinNetwork[currentNetIndex] = account;
      handleSetGlobalData(globalData);
    } catch (err) {
      console.log(err, "getUserCrystalBallList-- err");
    }
  };
  const deleteFromDefaultNetwork = (key, payload) => {
    deleteFromList(key, payload);
  };
  const [index271, setIndex271] = useState();
  const deleteFromList = async (key, payload) => {
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    if (!Object.keys(account).length) {
      return;
    }
    let a = account[key];
    if (index271) {
      delete a[index271];
      setIndex271(null);
    } else {
      let findIndex = a.findIndex(item => item.token === payload.token);
      console.log(account);
      if (findIndex === -1) return;
      a.splice(findIndex, 1);
    }
    handleSetGlobalData(globalData);
  };
  //删除nft coinAssets
  const deleteNFTItem = async payload => {
    let key;
    if (payload.type === "ERC20") {
      key = "coinAssets";
    } else if (index271) {
      key = "NFTAssets";
    } else {
      key = "coinAssets";
    }
    deleteFromDefaultNetwork(key, payload);
  };
  const confirmDelete = () => {
    setConfirmShow(false);
    deleteNFTItem(deleteItemCoin);
  };
  const showConfirmDialog = (payload, index) => {
    setDeleteItemCoin(payload);
    setIndex271(index);
    setConfirmShow(true);
  };
  const useDeleteItem = (payload, index) => {
    return (
      <Pressable w={pxToDp(80)} onPress={() => showConfirmDialog(payload, index)}>
        <Image alt="img" w={pxToDp(42)} h={pxToDp(47)} source={Icons.deleteIcon} mr={pxToDp(36)} />
      </Pressable>
    );
  };
  const refreshData = () => {
    handleGetData();
    handleSearchAllCoins();
    handleGetCrystalBallData();
  };
  //切换账户//切换网络 // 第一次进来
  useEffect(() => {
    setSelectNetworkShow(false);
    handleSearchAllCoins();
    if (globalData.assetsLoaded) {
      handleGetCrystalBallData();
      handleGetData();
      getERC20Token();
      getUserNFTs(true);
      setNftLoadingValue(0);
    }
    return () => {};
  }, [globalData.defaultNetwork.ChainId, globalData.assetsLoaded]);
  /* 进入就显示底部导航 */

  useFocusEffect(
    useCallback(() => {
      loading.showMenu(0);
      return () => {
        () => {};
      };
    }, [])
  );
  const handleReceiveData = payload => {
    setIsScanning(false);
    scanHandler(payload, toast, navigation);
  };
  return isScanning ? (
    <VStack h={"100%"}>
      <ScanQrcode
        back={() => {
          loading.showMenu(0);
          setIsScanning(false);
        }}
        callback={handleReceiveData}
      ></ScanQrcode>
    </VStack>
  ) : (
    <Spin textContent={spinText} position="absolute" w="100%" h={"100%"} isSpin={isSpin}>
      {/* <FreeAidaModal show={true}></FreeAidaModal> */}
      <HStack flex="1">
        <FlatList
          style={{ flex: 1, backgroundColor: "#EFF2F4" }}
          data={[1]}
          w="100%"
          refreshing={false}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => refreshData()}
          renderItem={() => {
            return (
              <VStack>
                <Pressable
                  zIndex="4"
                  onPress={() => {
                    setSelectNetworkShow(true);
                  }}
                  w="100%"
                  alignItems="center"
                  mt={pxToDp(63)}
                  mb={pxToDp(13)}
                >
                  <ImageBackground
                    source={netwrap}
                    style={{
                      minWidth: pxToDp(308),
                      height: pxToDp(91),
                    }}
                    resizeMode="stretch"
                  >
                    <HStack justifyContent="center" px={pxToDp(50)} pb={pxToDp(10)} h="100%" alignItems="center">
                      <Image mt={pxToDp(5)} mr={pxToDp(19)} source={netPoint} w={pxToDp(41)} h={pxToDp(41)}></Image>
                      <Text fontSize={pxToDp(31)} color="#181818">
                        {globalData.defaultNetwork.name}
                      </Text>
                    </HStack>
                  </ImageBackground>
                </Pressable>
                <VStack zIndex="4" flex="1">
                  <LyamiWalletPanel
                    isScanning={isScanning}
                    setIsScanning={setIsScanning}
                    initFlag={initFlag}
                    setInitFlag={setInitFlag}
                    useDeleteItem={useDeleteItem}
                    netWork={globalData.defaultNetwork}
                    refreshData={refreshData}
                    key={netWorkIndex}
                    setIndex={setIndex}
                    getNftAll={getNftAll}
                    nftLoadingValue={nftLoadingValue}
                    isGetNfts={isGetNfts}
                    setCurrentCoin={setCurrentCoin}
                    currentCoin={currentCoin}
                  ></LyamiWalletPanel>
                </VStack>
                <SelectNetWork show={selectNetworkShow} setModalShow={setSelectNetworkShow}></SelectNetWork>
                <AlertDialogComp
                  confirm={() => {
                    const array = remove(global.nativeCoinNetwork, n => {
                      return n.name != deleteItem.name;
                    });
                    global.nativeCoinNetwork = array;
                    setInitFlag(!initFlag);
                  }}
                  title="提示"
                  context="确定要删除吗？"
                  isOpen={alertShow}
                  close={setAlertShow}
                ></AlertDialogComp>
                <AlertDialogComp
                  confirm={() => {
                    confirmDelete();
                  }}
                  title="提示"
                  context="确定要删除吗？"
                  isOpen={confirmShow}
                  close={setConfirmShow}
                />
              </VStack>
            );
          }}
        ></FlatList>
      </HStack>
    </Spin>
  );
};

export default React.memo(WalletMain);
