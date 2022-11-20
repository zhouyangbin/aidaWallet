import { useState, useMemo, useEffect } from "react";
import { createStore } from "hox";
import global from "../util/global";
import { SaveGlobalData, LoadAssetsData, SaveAssetsData } from "../localStorge/LocalStroge";
import { assign } from "lodash";
import { resetGlobalWeb3 } from "../web3/nativeCoin";
const handleCreateNewAssetJson = (currentAddress, netWorkList, handleSetGlobalData) => {
  const data = {};
  data[currentAddress] = {};
  for (let i = 0; i < netWorkList.length; i++) {
    data[currentAddress][netWorkList[i].ChainId] = {
      coinAssets: [],
      NFTAssets: {},
      AddNFTS: [],
      Records: [],
      concernCrystalBallList: {},
      CoinSymbol: netWorkList[i].CoinSymbol,
      CoinSymbol: netWorkList[i].CoinSymbol,
      name: netWorkList[i].name,
      RPC: netWorkList[i].RPC,
    };
  }
  handleSetGlobalData({ totalAssets: data, assetsLoaded: true });
  // SaveAssetsData(currentAddress, data);
};
export const [useGlobalStore, GlobalStoreProvider] = createStore(() => {
  const [initGlobalData, setInitGlobalData] = useState(global);
  const handleSetGlobalData = payload => {
    setInitGlobalData(state => {
      assign(global, payload);
      SaveGlobalData(initGlobalData.CreateNewPassword);
      return { ...state, ...payload };
    });
  };
  const globalData = useMemo(() => {
    return initGlobalData;
  }, [initGlobalData]);
  /* 切换账户读取该账户资产文件 */
  const handleLoadCurrentAddressAssets = async () => {
    // console.log(initGlobalData.defaultAddress.call());
    if (initGlobalData.defaultAddress.call() != "0x") {
      /* 已经登录进入钱包 */
      try {
        const currentAddressAssets = await LoadAssetsData(initGlobalData.defaultAddress.call());

        if (currentAddressAssets && JSON.stringify(currentAddressAssets) != "{}") {
          /* 已经有当前地址的资产文件 */
          let netWork = initGlobalData.nativeCoinNetwork;
          if (Object.keys(currentAddressAssets[initGlobalData.defaultAddress.call()]).length != netWork.length) {
            netWork.map(item => {
              if (!currentAddressAssets[initGlobalData.defaultAddress.call()][item.ChainId]) {
                currentAddressAssets[initGlobalData.defaultAddress.call()][item.ChainId] = {
                  coinAssets: [],
                  NFTAssets: {},
                  AddNFTS: [],
                  Records: [],
                  concernCrystalBallList: {},
                  CoinSymbol: item.CoinSymbol,
                  CoinSymbol: item.CoinSymbol,
                  name: item.name,
                  RPC: item.RPC,
                };
              }
            });
          }

          handleSetGlobalData({ totalAssets: currentAddressAssets, assetsLoaded: true });
        } else {
          handleCreateNewAssetJson(
            initGlobalData.defaultAddress.call(),
            initGlobalData.nativeCoinNetwork,
            handleSetGlobalData
          );
        }
      } catch (error) {
        console.log("---------------读取错误");
        console.log(error);
      }
    }
  };
  useEffect(() => {
    resetGlobalWeb3(initGlobalData.defaultNetwork.RPC, initGlobalData.defaultKey.privateKey);
    handleSetGlobalData({ ...global, web3: global.web3, assetsLoaded: true });
  }, [initGlobalData.defaultNetwork]);
  useEffect(() => {
    setInitGlobalData(state => {
      return { ...state, assetsLoaded: false };
    });
    handleLoadCurrentAddressAssets();

    return () => {};
  }, [initGlobalData.defaultAddress.call()]);
  useEffect(() => {
    if (JSON.stringify(initGlobalData.totalAssets) == "{}") {
      setInitGlobalData(state => {
        return { ...state, assetsLoaded: false };
      });
      handleLoadCurrentAddressAssets();
    }
    return () => {};
  }, [initGlobalData.totalAssets]);
  //获取当前账户下数据
  const currentAccount = useMemo(() => {
    const Address = initGlobalData?.defaultKey?.address;
    const ChainId = initGlobalData?.defaultNetwork?.ChainId;
    let account = {};
    if (initGlobalData.totalAssets[Address] != undefined) {
      account = initGlobalData.totalAssets[Address][ChainId];
    }
    return account;
  }, [initGlobalData.totalAssets, initGlobalData?.defaultKey?.address, initGlobalData?.defaultNetwork?.ChainId]);
  return {
    globalData,
    handleSetGlobalData,
    handleLoadCurrentAddressAssets,
    currentAccount,
  };
});
