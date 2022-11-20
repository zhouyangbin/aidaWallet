/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-01 15:15:33
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-02 11:28:00
 * @FilePath: \project\frontend\lyami\api\util\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  API_ROOT: "https://api.aidameta.io/",
  API_TIMEOUT: 50000000,
  // IPFS_ROOT: "https://gateway.pinata.cloud/ipfs/",
  IPFS_ROOT: "https://gateway.pinata.cloud/ipfs/",
  CONTRACT_ADDRESS: {
    1:"0x015010A59177cF3bC565F9D736906b979848f567",
    137:"0xCA94743F3e6d6D492F09AA09a375e0E851c0CC41",
    592:"0x015010A59177cF3bC565F9D736906b979848f567",
    3:"0x015010A59177cF3bC565F9D736906b979848f567",
    4:"0x015010A59177cF3bC565F9D736906b979848f567",
    5:"0x015010A59177cF3bC565F9D736906b979848f567",
    42:"0x015010A59177cF3bC565F9D736906b979848f567",
    80001:"0x015010A59177cF3bC565F9D736906b979848f567",
  },
  IPFS_NET: "https://ipfs.lyami.net",
  maxProductionTime: 7,
  maxDynasty: 7,
};
