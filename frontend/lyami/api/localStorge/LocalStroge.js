import { lyamiEncrypt, lyamiDecrypt } from "../util/crypto";
import RNFS from "react-native-fs";
import web3 from "web3";

import global from "../util/global";
import localStorageObj from "../util/localStrogeObj";
import { resetGlobalWeb3 } from "../web3/nativeCoin";
/**
 * 保存私钥文件
 * @param {Object} keyData 私钥数据
 * @param {string} password 用户密码
 * @returns {Promise}
 */
export async function SavePrivateKey(keyData, password) {
  const find = global.keys.find(x => x.address == keyData.address);
  if (find == null) {
    global.keys.push(keyData);
    global.defaultKey = keyData;
  }

  await SaveGlobalData(password);
}

/**
 * 从文件加载Global数据到内存中，这里只会保存需要存储到文件的数据
 * @param {String} password 保存文件的密码
 */
export async function LoadGlobalData(password) {
  const fileName = RNFS.DocumentDirectoryPath + "/global.json";
  const isExist = await RNFS.exists(fileName);
  if (isExist) {
    try {
      const cryptText = await RNFS.readFile(fileName);
      const rawText = await lyamiDecrypt(password, cryptText);
      const globalData = JSON.parse(rawText);
      global.defaultKey = globalData.defaultKey;
      global.keys = globalData.keys;
      global.nativeCoinNetwork = globalData.nativeCoinNetwork;
      global.defaultNetwork = globalData.defaultNetwork;
      global.NFTAssetCache = globalData.NFTAssetCache || [];
      global.concernCrystalballList = globalData.concernCrystalballList || [];
      global.colectionNFTMap = globalData.colectionNFTMap || {};
      global.localOrderAddress = globalData.localOrderAddress || [];
      global.sonAIDAList = globalData.sonAIDAList || [];
      global.Records = globalData.Records || [];
      global.AddNfts = globalData.AddNfts || [];
      global.SystemSetting = globalData.SystemSetting || {};
      global.gameLoginRecordAccount = globalData.gameLoginRecordAccount;
      global.webShowed = globalData.webShowed;
      global.totalAssets = {};
      // 重新构造Web3
      resetGlobalWeb3(global.defaultNetwork.RPC, global.defaultKey.privateKey);
      // console.log(global);
      return global;
    } catch (e) {
      console.log(e);
      return global;
    }
  } else {
    console.log("file not exist");
    return null;
  }
}

export async function SaveGlobalData(password) {
  const fileName = RNFS.DocumentDirectoryPath + "/global.json";
  const saveObject = {
    defaultKey: global.defaultKey,
    keys: global.keys,
    nativeCoinNetwork: global.nativeCoinNetwork,
    defaultNetwork: global.defaultNetwork,
    localOrderAddress: global.localOrderAddress,
    NFTAssetCache: global.NFTAssetCache,
    concernCrystalballList: global.concernCrystalballList,
    colectionNFTMap: global.colectionNFTMap,
    sonAIDAList: global.sonAIDAList,
    Records: global.Records,
    AddNfts: global.AddNfts,
    SystemSetting: global.SystemSetting,
    gameLoginRecordAccount: global.gameLoginRecordAccount,
    webShowed: global.webShowed,
  };

  const cryptText = await lyamiEncrypt(password, JSON.stringify(saveObject));
  await RNFS.writeFile(fileName, cryptText);

  /* 保存assets文件 */
  // console.log("----------------保存GLOBAL-------------");

  // console.log(global.defaultAddress.call());
  // console.log(global.totalAssets);
  SaveAssetsData(global.defaultAddress.call(), global.totalAssets);
}

export async function GlobalDataExist() {
  const fileName = RNFS.DocumentDirectoryPath + "/global.json";
  console.log(fileName);
  const isExist = await RNFS.exists(fileName);
  return isExist;
}

export async function SetLocalPassword(password) {
  let fileName = RNFS.DocumentDirectoryPath + "/localpassword.json";
  if (password == null || typeof password == "undefined") {
    password = "";
  }
  localStorageObj.password = password;
  await RNFS.writeFile(fileName, password);
}

export async function GetLocalPassword() {
  if (localStorageObj.password == "") {
    let fileName = RNFS.DocumentDirectoryPath + "/localpassword.json";
    let isExist = await RNFS.exists(fileName);
    if (isExist) {
      try {
        let passwordText = await RNFS.readFile(fileName);
        localStorageObj.password = passwordText;
      } catch (e) {
        console.log(e);
      }
    }
  }

  return localStorageObj.password;
}

export async function SaveAssetsData(fileName, payload) {
  if (JSON.stringify(payload) === "{}") return;
  const fileNameStr = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  const saveObject = payload;
  const cryptText = JSON.stringify(saveObject);
  await RNFS.writeFile(fileNameStr, cryptText);
}

export async function LoadAssetsData(fileName) {
  const fileNameStr = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  const isExist = await RNFS.exists(fileNameStr);
  if (isExist) {
    const cryptText = await RNFS.readFile(fileNameStr);
    const AssetsData = JSON.parse(cryptText);
    return AssetsData;
  } else {
    console.log("file not exist");
    return null;
  }
}
