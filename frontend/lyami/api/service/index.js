import request from "../util/request";
import { ERC20 } from "../web3/ERC20";
import global from "../util/global";
import { ERC721 } from "../web3/ERC721";
import { handlePromiseAll } from "../util/helper";
import axios from "axios";
import config from "../util/config";
import { estimateGas, transform } from "../web3/nativeCoin";
import { Crystalball } from "../web3/Crystalball";

/* 获取优先级gas费数据 */
export const handleFetchTransactionGas = async chainid => {
  return await request({
    url: "/api/wallet/fetchtransactiongas",
    params: {
      chainid: chainid,
    },
    method: "get",
  });
};

export const handleFetchERC20Token = async (chainid, address) => {
  return await request({
    url: "/api/wallet/getaddrestokens",
    params: {
      chainid,
      address,
    },
    method: "get",
  });
};

export const handleFetchNFTs = async ({ chainid, address, limit, cursor }) => {
  return await request({
    url: "/api/wallet/getaddressnfts",
    params: {
      chainid,
      address,
      limit: limit == null ? 50 : limit,
      cursor,
    },
    method: "get",
  });
};

/* 查询ERC20资产 */

export const handleSearchAssets = async contractAddress => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  try {
    const ERC = new ERC20(web3, contractAddress);
    const res = await handlePromiseAll([
      ERC.name(),
      ERC.decimals(),
      ERC.symbol(),
      ERC.balanceOf(account.address),
      ERC.getType(),
    ]);
    return res;
  } catch (error) {
    console.log(error, "获取数据出错ERC20");
    return false;
  }
};

/* 查询ERC721资产 */

export const handleSearch721Assets = async contractAddress => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;

  try {
    const ERC = new ERC721(web3, contractAddress);
    const res = await handlePromiseAll([
      ERC.name(),
      Promise.resolve("1"),
      ERC.symbol(),
      ERC.balanceOf(account.address),
      ERC.getType(),
    ]);
    return res;
  } catch (error) {
    console.log(error, "获取数据出错ERC721");
    return false;
  }
};

/* 查询水晶球第三方游戏数据 */

export const handleGetUserCrystalBallData = async ballidlist => {
  return await request({
    url: "/api/wallet/thirdservicegetappdata",
    params: {
      ballidlist: ballidlist,
    },
    method: "get",
  });
};

/* 
获取手机验证码
*/
export const handleGetPhoneCode = async phone => {
  return await request({
    url: "/api/wallet/requestsmscode",
    params: {
      phone: phone,
    },
    method: "get",
  });
};
/* 验证手机验证码 */
export const handleVerificationPhoneCode = async (phone, code) => {
  return await request({
    url: "/api/wallet/phonelogin",
    params: {
      phone: phone,
      code: code,
    },
    method: "get",
  });
};

/* 获取邮箱验证码 */
export const handleGetEmailCode = async email => {
  return await request({
    url: "/api/wallet/sendverifyemail",
    params: {
      email: email,
    },
    method: "get",
  });
};

/* 验证邮箱验证码 */
export const handleVerificationEmailCode = async (email, code) => {
  return await request({
    url: "/api/wallet/emaillogin",
    params: {
      email: email,
      code: code,
    },
    method: "get",
  });
};

/* 获取用户所有水晶球 */
export const handleGetUserCrystalBalls = async address => {
  return await request({
    url: "/api/wallet/getusercrystalballs",
    params: {
      address: address,
      startindex: 0,
      pagecount: 50,
    },
    method: "get",
  });
};

/* 修改用户水晶球状态 */
export const handleSetCrystalBallState = async ({ ballidlist, name, time, publickey, sign }) => {
  return await request({
    url: "/api/wallet/setcrystalballstate",
    params: {
      ballidlist: ballidlist,
      name: name,
      time: time,
      publickey: publickey,
      sign: sign,
    },
    method: "get",
  });
};

/* 用户租借水晶球 */
export const handleUserLeaseHoldBall = async (appid, useraddress) => {
  return await request({
    url: "/api/wallet/userleaseholdball",
    params: {
      appid: appid,
      useraddress: useraddress,
    },
    method: "get",
  });
};

//请求水晶球降临状态
export const handleGetCrystalBallState = async ballidlist => {
  return await request({
    url: "/api/wallet/getcrystalballstate",
    params: {
      ballidlist: ballidlist,
    },
    method: "get",
  });
};

//获取第三方游戏列表
export const handleGetGameList = async () => {
  return await request({
    url: "/api/wallet/getthirdgamekeys",
    params: {},
    method: "get",
  });
};

/* 提现资产 */
export const handleWithDrawUserCoin = async (appid, useraddress, money) => {
  return await request({
    url: "/api/wallet/exchangeusercoin",
    params: {
      appid: appid,
      useraddress: useraddress,
      money: money,
    },
    method: "get",
  });
};

// export const handleSearchERC721NFT = async (contractAddress, callback) => {
//   const ownerAddress = global.defaultAddress.call();
//   let web3 = global.web3;
//   const ERC = new ERC721(web3, contractAddress);
//   return await ERC.researchUserToken(ownerAddress, callback);
// };

// export const handleGetMetaURI = async (contractAddress, tokenId) => {
//   let web3 = global.web3;
//   const ERC = new ERC721(web3, contractAddress);
//   return await ERC.tokenURI(tokenId);
// };

/* 查询NFT JSON内容 */
export const handleGetNFTJson = async url => {
  // const response = await axios.get(url);
  // console.log(response);
  return await axios({
    url: url,
    method: "get",
  });
};

/* 默认transform */
export const handleTransForm = async (
  account,
  to,
  money,
  onSignedTx,
  gas,
  priorityFeePerGas,
  gasPrice,
  gasLimit,
  maxFeePerGas
) => {
  return await transform(account, to, money, onSignedTx, gas, priorityFeePerGas, gasPrice, gasLimit, maxFeePerGas);
};

/* ERC20Transform */
export const handleERC20TransForm = async (
  contractAddress,
  recipient,
  amount,
  gasReal,
  onSignedTx,
  priorityFeePerGas,
  gasPrice,
  gasLimit,
  maxFeePerGas
) => {
  let web3 = global.web3;
  const ERC = new ERC20(web3, contractAddress);
  return await ERC.transfer(
    recipient,
    amount,
    gasReal,
    onSignedTx,
    priorityFeePerGas,
    gasPrice,
    gasLimit,
    maxFeePerGas
  );
};

/* ERC721 Transform */
export const handleERC721TransForm = async (
  contractAddress,
  recipient,
  amount,
  gasReal,
  onSignedTx,
  priorityFeePerGas,
  gasPrice,
  gasLimit,
  maxFeePerGas
) => {
  let web3 = global.web3;
  const ERC = new ERC721(web3, contractAddress);
  return await ERC.transfer(
    recipient,
    amount,
    gasReal,
    onSignedTx,
    priorityFeePerGas,
    gasPrice,
    gasLimit,
    maxFeePerGas
  );
};

/* 获取默认GAS */
export const handleGetGas = async order => {
  return await estimateGas(order.from.account, order.to, order.value);
};

/* 去中心化获取所有水晶球 */

export const handleGetUserAllBalls = async address => {
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  console.log(global.defaultAddress.call());
  return await crystalballInstance.getUserCrystalBallList(global.defaultAddress.call());
};

/* 去中心化查询水晶球状态 */

export const handleGetUserBallsState = async ballid => {
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  return await crystalballInstance.getBallState(ballid);
};

/* 去中心化设置水晶球降临、飞升状态 */

export const handleSetUserBallsState = async (ballid, gameKey, upOrDown, gas, priorityFeePerGas) => {
  const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
  // return console.log(crystalballInstance.FallingCrystalball);
  return await crystalballInstance.FallingCrystalball(ballid, gameKey, upOrDown, gas, priorityFeePerGas);
};
