import crypto from "crypto";
import Aes from "react-native-aes-crypto";
import { privateToPublic } from "ethereumjs-util";

/**
 * 加密数据
 * @param {string} key 加密秘钥
 * @param {string} data 待加密数据
 * @returns {Promise<string>} 加密后的字符串
 */
export async function lyamiEncrypt(key, data) {
  const algorithm = "aes-256-cbc";
  if (key.length < 6) {
    throw new Error("invalid crypt key");
  }

  let password = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // password是用于生产密钥的密码
  let salt = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // 生成盐值
  let iv = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // 初始化向量

  const keyAES = await Aes.pbkdf2(password, salt, 5000, 256);

  const result = await Aes.encrypt(data, keyAES, iv, algorithm);
  // console.log(result);
  return result;
}

/**
 * 解密数据
 * @param {string} key 加密秘钥
 * @param {string} cipherText 待解密的字符串
 * @returns {Promise<string>} 解密后的字符串
 */
export async function lyamiDecrypt(key, cipherText) {
  const algorithm = "aes-256-cbc";
  if (key.length < 6) {
    throw new Error("invalid crypt key");
  }

  let password = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // password是用于生产密钥的密码
  let salt = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // 生成盐值
  let iv = Buffer.from(Array(3).fill(key).join("").slice(0, 16)).toString("hex"); // 初始化向量

  const keyAES = await Aes.pbkdf2(password, salt, 5000, 256);
  const result = await Aes.decrypt(cipherText, keyAES, iv, algorithm);
  // console.log(result);
  return result;
}

/**
 * 十六进制字符串到buffer数组
 * @param {string} hexString 
 * @return {Buffer}
 */
 export function parseHexString(hexString) {
  let startIndex = 0;
  if (hexString.startsWith('0x') || hexString.startsWith('0X')) {
      startIndex = 2;
  }
  let results = [];
  for (let i = startIndex; i < hexString.length; i += 2) {
      const data = parseInt(hexString.substring(i, i+2), 16);
      results.push(data);
  }

  return Buffer.from(results);
}

/**
* buffer数组到十六进制字符串
* @param {Buffer} buffer 
* @return {string}
*/
export function toHexString(buffer) {
  let strArray = [];
  for (let i = 0 ; i < buffer.length; i++) {
      if (buffer[i] < 16) {
          strArray.push('0' + buffer[i].toString(16) )
      } else {
          strArray.push(buffer[i].toString(16))
      }
  }
  return strArray.join('');
}

/**
 * 利用私钥计算出公钥
 * @param {string} privateKey 
 * @return {string}
 */
export function privateKeyToPublicKey(privateKey) {
  const privateKeyBuffer = parseHexString(privateKey)
  const publicKey = privateToPublic(privateKeyBuffer)
  return toHexString(publicKey)
}

/**
 * 对消息进行数字签名
 * @param {Web3} web3 
 * @param {string} msg 需要签名的消息
 * @param {string} privateKey 签名密钥
 * @returns 
 */
export async function signatureMessage(web3, msg, privateKey) {
  let sigObj = await web3.eth.accounts.sign(msg, privateKey)
  return sigObj.signature;
}