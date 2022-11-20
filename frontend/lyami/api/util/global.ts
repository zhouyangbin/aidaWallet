import type Web3 from "web3";

export interface globalKey {
  privateKey: string;
  publicKey: string;
  address: string;
  mnemonic: string;
  isSet: false;
}

export interface intentDataInterface {
  action: string;
  name: string;
  data: any;
}

export interface ERC20Interface {
  token_address: String;
  name: String;
  symbol: String;
  decimals: Number;
  balance: String;
}

export interface AidaInterface {
  ballid: Number;
  owner: String;
  gene: string;
  mutatedgene: string;
  birthday: Number;
  dynasty: Number;
  salePrice: Number;
  reproductionPrice: Number;
  isSale: Boolean;
  isReproduction: Boolean;
  fatherid: Number;
  montherid: Number;
  token: Number;
  falling: String;
}

export interface ERC721Assets {
  amount: Number;
  block_number: Number;
  block_number_minted: Number;
  contract_type: String;
  last_metadata_sync: String;
  last_token_uri_sync: String;
  metadata: String;
  minter_address: String;
  name: String;
  owner_of: String;
  symbol: String;
  token_address: String;
  token_hash: String;
  token_id: Number;
  token_uri: String;
}

export interface Dictionary<T> {
  [Key: string]: T;
}

export interface globalNetwork {
  name: string;
  RPC: string;
  ChainId: Number;
  CoinSymbol: string;
  BlockScan: string;
  isTestNetwork: boolean;
  assets: ERC20Interface[];
  AidaAssets: Dictionary<AidaInterface>;
  NFTAssets: Dictionary<ERC721Assets[]>;
}

export interface globalRecord {
  order: {};
  time: Number;
  type: string;
  status: string;
  info?: {};
  address: string;
}
export interface globalSystemSetting {
  passwordFree: boolean;
  password: boolean;
  fingerprint: boolean;
  faceId: boolean;
  prior: boolean;
  inuseCurrency: string;
}
export interface globalInterface {
  CreateNewPassword: string;
  defaultKey: globalKey;
  defaultAddress: () => string;
  keys: globalKey[];
  intentMsg: string;
  intentData: intentDataInterface;
  nativeCoinNetwork: globalNetwork[];
  defaultNetwork: globalNetwork;
  web3: Web3;
  concernCrystalballList: {};
  colectionNFTMap: any;
  sonAIDAList: [];
  shoppingList: [];
  defaultPriorityFeePerGas: Number;
  localOrderAddress: string[];
  NFTAssetCache: NFTAssetCacheInterface[];
  Records: globalRecord[];
  AddNfts: [];
  SystemSetting: globalSystemSetting;
  gameLoginRecordAccount: globalKey;
  totalAssets: any;
  assetsLoaded: boolean;
}

export interface NFTAssetCacheInterface {
  chainId: Number;
  contractAddress: String;
  image: string;
  name: string;
  tokenId: Number;
  description: string;
  isOnSale: boolean;
  isBreed: boolean;
  type: Number;
}

const global: globalInterface = {
  CreateNewPassword: "",
  defaultKey: {
    privateKey: "",
    publicKey: "",
    address: "",
    mnemonic: "",
    isSet: false,
  },
  keys: [],
  intentMsg: "",
  intentData: null,
  nativeCoinNetwork: [],
  defaultNetwork: {
    name: "Ethereum",
    RPC: "https://rpc.ankr.com/eth",
    ChainId: 1,
    CoinSymbol: "ETH",
    BlockScan: "https://etherscan.io",
    isTestNetwork: false,
    assets: [],
    AidaAssets: {},
    NFTAssets: {},
  },
  web3: null,
  concernCrystalballList: {}, //[]
  colectionNFTMap: {},
  sonAIDAList: [],
  shoppingList: [],
  defaultPriorityFeePerGas: 18000000000,
  localOrderAddress: [], //最近交易地址
  NFTAssetCache: [],
  Records: [], //记录
  AddNfts: [],
  SystemSetting: {
    //系统设置
    passwordFree: false,
    password: false,
    fingerprint: false,
    faceId: false,
    prior: false,
    inuseCurrency: "MATIC",
  },
  gameLoginRecordAccount: {
    privateKey: "",
    publicKey: "",
    address: "",
    mnemonic: "",
    isSet: false,
  },
  totalAssets: {},
  assetsLoaded: false,
  defaultAddress: function () {
    if (global.defaultKey.address.indexOf("0x") == -1 && global.defaultKey.address.indexOf("0X") == -1) {
      return "0x" + global.defaultKey.address;
    } else {
      return global.defaultKey.address;
    }
  },
};

export default global;
