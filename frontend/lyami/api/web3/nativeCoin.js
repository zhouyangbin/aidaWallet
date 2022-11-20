// Web3接口，提供常见加密数字货币的访问接口
import RNFS from "react-native-fs";
import Web3 from "web3";
import BigInt from "big-integer";

import config from "../util/const";
import global from "../util/global";
import { SaveGlobalData } from "../localStorge/LocalStroge";

/**
 * 从本地文件中读取Web3网络
 */
export async function loadDefaultNativeCoinNetwork() {
  global.nativeCoinNetwork = config.nativeCoinNetwork;
  // const isExist = await RNFS.exists(config.networkJson);
  // if (isExist) {
  //   const content = await RNFS.readFile(config.networkJson);
  //   const networks = JSON.parse(content);
  //   // 更新本地内存网络配置
  //   global.nativeCoinNetwork = networks;
  // } else {
  //   global.nativeCoinNetwork = config.nativeCoinNetwork;
  // }
}

/**
 * 自动更新默认货币列表
 * @param {String} password 保存文件的密码
 */
export async function updateDefaultNativeCoinNetwork(password) {
  try {
    // 从网络上获取配置文件，设置为无缓存获取
    const noCacheHeaders = new Headers();
    noCacheHeaders.append("pragma", "no-cache");
    noCacheHeaders.append("cache-control", "no-cache");

    const noCacheInit = {
      method: "GET",
      headers: noCacheHeaders,
    };

    const request = new Request(config.updateNativeCoinUrl);

    const resp = await fetch(request, noCacheInit);
    const networks = await resp.json();
    // 更新本地内存网络配置
    global.nativeCoinNetwork = networks;
    // 写入数据到本地文件
    await SaveGlobalData(password);
  } catch (e) {
    // 将本地默认配置的网络设置到内存中
    global.nativeCoinNetwork = config.nativeCoinNetwork;
    console.error(e);
    throw Error("更新配置文件失败，请稍后重试");
  }
}

/**
 * 利用当前网络配置重新建立Web3接口，每次切换网络以后需要调用此接口重置Web3
 */
export function resetGlobalWeb3(RPC, privateKey) {
  try {
    // 重置Web3
    // global.web3 = new Web3(new Web3.providers.HttpProvider(global.defaultNetwork.RPC));
    //   global.web3 = new Web3("https://evm.astar.network");
    if (RPC.endsWith("/")) RPC = RPC.slice(0, -1);
    global.web3 = new Web3(RPC);
    // console.log(JSON.stringify(global.web3, 'global.web3'));
    const account = global.web3.eth.accounts.privateKeyToAccount(privateKey);

    global.web3.eth.accounts.wallet.add(account);
    global.web3.eth.defaultAccount = account.address;
  }
  catch (e) {
    console.error(e, '--------------resetGlobalWeb3---------------')
  }
}

/**
 * 更改默认连接的网络
 * @param {Number} chainId
 */
export function changeDefaultNetwork(chainId) {
  const find = global.nativeCoinNetwork.filter(x => x.ChainId == chainId);
  if (find != null) {
    global.defaultNetwork = find;
    resetGlobalWeb3(global.defaultNetwork.RPC, global.defaultKey.privateKey);
  }
}

/**
 * 增加用户自定义的Web3接口
 * @param {any} network
 */
export function addCustomerNetwork(network) {
  global.nativeCoinNetwork.push(network);
}

/**
 * 获取用户的账户金额
 * @param {any} network RPC网络
 * @param {string} address Web3地址
 * @return {Promise<string>} 金额
 */
export function getBalance(address, web3) {
  if (!(address.startsWith("0x") || address.startsWith("0X"))) {
    address = "0x" + address;
  }

  if (web3 == null) {
    web3 = global.web3;
  }

  return web3.eth.getBalance(address);
}

/**
 * 计算大概需要的Gas费用
 * @param {Account} account
 * @param {String} to
 * @param {Number} money
 * @returns
 */
export async function estimateGas(account, to, money) {
  const web3 = global.web3;
  const nonce = await web3.eth.getTransactionCount(account.address, "latest");
  const tx = {
    from: account.address,
    to: to,
    nonce: nonce,
    gasPrice: "0x09184e72a000",
    gasLimit: "0x09184e72a000",
    gas: 210000,
    maxPriorityFeePerGas: 18000000000,
    maxFeePerGas: 115499000000,
    value: web3.utils.toWei(money.toString(), "ether"),
  };

  const gasNeed = await web3.eth.estimateGas(tx);
  return gasNeed;
}

/**
 *
 * @param {Account} account 发送者账户
 * @param {String} to 目标地址
 * @param {Number} money 金额
 * @param {Callback} onSignedTx 签名后的回调函数
 * @param {Number} gas gas费
 * @param {Number} priorityFeePerGas 给旷工优先验证的费用
 * @param {Number} gasPrice gas价格
 * @param {Number} gasLimit gas
 * @param {Number} maxFeePerGas gas最高收费
 * @returns
 */
export async function transform(account, to, money, onSignedTx, gas, priorityFeePerGas, gasPrice, gasLimit, maxFeePerGas) {
    const web3 = global.web3;
    const sendAddress = (account.address.indexOf('0x') != -1 || account.address.indexOf('0X') != -1) ? account.address : '0x' + account.address;
    const nonce = await web3.eth.getTransactionCount(sendAddress, 'latest');
    const bigIntMoney = BigInt(web3.utils.toWei(money.toString(), "ether"));
    const tx = {
        'from': sendAddress,
        'to': to,
        'nonce': nonce,
        // 'gasPrice': gasPrice,
        'gasLimit': gasLimit,
        'gas': gas || 21000,
        'maxPriorityFeePerGas': parseInt(priorityFeePerGas?.toFixed()),
        'maxFeePerGas': parseInt(maxFeePerGas?.toFixed()),
        'value': '0x' + bigIntMoney.toString(16),
    };

  console.log(tx);

  const gasNeed = await web3.eth.estimateGas(tx);
  tx.gas = gasNeed;

  const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
  // console.log(signedTx);
  if (onSignedTx != null) {
    onSignedTx(signedTx);
  }

  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  // console.log(transactionReceipt);
  return transactionReceipt;
}
