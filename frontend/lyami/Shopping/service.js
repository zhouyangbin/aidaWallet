import { ERC721 } from "../api/web3/ERC721";
import global from "../api/util/global";
import { handlePromiseAll } from "../api/util/helper";

export const handleSearchProduction = payload => {
  const web3 = global.web3;
  const account = web3.eth.accounts.privateKeyToAccount(global.defaultKey.privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  try {
    const ERC = new ERC721(web3, payload );
    return handlePromiseAll([ERC.name(),  ERC.symbol(), ERC.balanceOf(account.address)]);
  } catch (error) {
    console.log(error);
    return false;
  }
};
