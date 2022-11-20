import { ERC20 } from "@/../../frontend/lyami/api/web3/ERC20";
import global from "../api/util/global";
import { handlePromiseAll } from "../api/util/helper";
import { ERC721 } from "@/../../frontend/lyami/api/web3/ERC721";

export const handleSearchAssets = async contractAddress => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  try {
    const ERC = new ERC20(web3, contractAddress);
    const res= await handlePromiseAll([ERC.name(), ERC.decimals(), ERC.symbol(), ERC.balanceOf(account.address), ERC.getType()]);
    return res
  } catch (error) {
    console.log(error, '获取数据出错ERC20');
    return false;
  }
};

export const handleSearch721Assets = async contractAddress => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  
  try {
    const ERC = new ERC721(web3, contractAddress );
    const res = await handlePromiseAll([ERC.name(), Promise.resolve('1'), ERC.symbol(), ERC.balanceOf(account.address),ERC.getType()]);
    return res
  } catch (error) {
    console.log(error, '获取数据出错ERC721');
    return false;
  }
};
