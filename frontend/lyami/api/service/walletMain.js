import { ERC20 } from "../web3/ERC20";
import global from "../util/global";

export const handleSearchAllERC20Assets = async payload => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  const ERC = new ERC20(web3, payload);
  const res = await ERC.balanceOf(account.address);
  return res;
};
