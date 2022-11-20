import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  CrystalballNFT,
  CrystalballNFTMethodNames,
  CrystalballNFTEventsContext,
  CrystalballNFTEvents
>;
export type CrystalballNFTEvents =
  | 'Approval'
  | 'ApprovalForAll'
  | 'Initialized'
  | 'OwnershipTransferred'
  | 'Transfer'
  | 'mintCrystalBallMetaEvent'
  | 'newBallTransform'
  | 'reproductionTransform';
export interface CrystalballNFTEventsContext {
  Approval(
    parameters: {
      filter?: {
        _owner?: string | string[];
        _approved?: string | string[];
        _tokenId?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ApprovalForAll(
    parameters: {
      filter?: { _owner?: string | string[]; _operator?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Initialized(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Transfer(
    parameters: {
      filter?: {
        _from?: string | string[];
        _to?: string | string[];
        _tokenId?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  mintCrystalBallMetaEvent(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  newBallTransform(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  reproductionTransform(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type CrystalballNFTMethodNames =
  | 'new'
  | 'FallingCrystalball'
  | 'approve'
  | 'balanceOf'
  | 'buyCrystalball'
  | 'buyCrystalballNC'
  | 'createNew'
  | 'getApproved'
  | 'getBallByNFTToken'
  | 'getCrystalBallMeta'
  | 'getCrystalBuyRate'
  | 'getCrystalCoin'
  | 'getCrystalCoinContract'
  | 'getCrystalCointotalSupply'
  | 'getCrystalballMaxReproductionTimes'
  | 'getCrystalballMetaReverse'
  | 'getCrystalballProperty'
  | 'getFallingKeys'
  | 'getGameFallingCount'
  | 'getMarketSalingBalls'
  | 'getMaxReproductionTimes'
  | 'getMintBallPrice'
  | 'getPotionNFTContract'
  | 'getReproductContract'
  | 'getReproductTimes'
  | 'getUserCrystalBallList'
  | 'initialize'
  | 'isApprovedForAll'
  | 'mint'
  | 'mintCrystalBall'
  | 'mintCrystalBallMeta'
  | 'name'
  | 'owner'
  | 'ownerOf'
  | 'registerFallingString'
  | 'renounceOwnership'
  | 'reproductionNewBall'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setBallSaling'
  | 'setCrystalBuyRate'
  | 'setCrystalCoinContract'
  | 'setCrystalballMaxReproductionTimes'
  | 'setMaxReproductionTimes'
  | 'setMintBallPrice'
  | 'setPotionNFTContract'
  | 'setReproductContract'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenURI'
  | 'transferFrom'
  | 'transferOwnership';
export interface ApprovalEventEmittedResponse {
  _owner: string;
  _approved: string;
  _tokenId: string;
}
export interface ApprovalForAllEventEmittedResponse {
  _owner: string;
  _operator: string;
  _approved: boolean;
}
export interface InitializedEventEmittedResponse {
  version: string | number;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface TransferEventEmittedResponse {
  _from: string;
  _to: string;
  _tokenId: string;
}
export interface MintCrystalBallMetaEventEventEmittedResponse {
  self: string;
  ballid: string;
  metaid: string;
}
export interface NewBallTransformEventEmittedResponse {
  self: string;
  ballid: string;
}
export interface ReproductionTransformEventEmittedResponse {
  self: string;
  useMoney: string;
  targetAddress: string;
}
export interface BallDataResponse {
  ballid: string;
  owner: string;
  gene: string;
  mutatedgene: string;
  birthday: string;
  dynasty: string;
  salePrice: string;
  reproductionPrice: string;
  isSale: boolean;
  isReproduction: boolean;
  reproductionInterval: string;
  fatherid: string;
  montherid: string;
  reproductionTimes: string;
  token: string;
  falling: string;
}
export interface GetCrystalBallMetaResponse {
  metaUrls: string[];
  endIndex: string;
  total: string;
}
export interface GetCrystalballMetaReverseResponse {
  metaUrls: string[];
  endIndex: string;
  total: string;
}
export interface BalldataResponse {
  ballid: string;
  owner: string;
  gene: string;
  mutatedgene: string;
  birthday: string;
  dynasty: string;
  salePrice: string;
  reproductionPrice: string;
  isSale: boolean;
  isReproduction: boolean;
  reproductionInterval: string;
  fatherid: string;
  montherid: string;
  reproductionTimes: string;
  token: string;
  falling: string;
}
export interface GetFallingKeysResponse {
  result0: string[];
  result1: string;
}
export interface BallDatasResponse {
  ballid: string;
  owner: string;
  gene: string;
  mutatedgene: string;
  birthday: string;
  dynasty: string;
  salePrice: string;
  reproductionPrice: string;
  isSale: boolean;
  isReproduction: boolean;
  reproductionInterval: string;
  fatherid: string;
  montherid: string;
  reproductionTimes: string;
  token: string;
  falling: string;
}
export interface GetMarketSalingBallsResponse {
  ballDatas: BallDatasResponse[];
  endIndex: string;
  total: string;
}
export interface BallListResponse {
  ballid: string;
  owner: string;
  gene: string;
  mutatedgene: string;
  birthday: string;
  dynasty: string;
  salePrice: string;
  reproductionPrice: string;
  isSale: boolean;
  isReproduction: boolean;
  reproductionInterval: string;
  fatherid: string;
  montherid: string;
  reproductionTimes: string;
  token: string;
  falling: string;
}
export interface GetUserCrystalBallListResponse {
  ballList: BallListResponse[];
  endIndex: string;
  total: string;
}
export interface CrystalballNFT {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param gameKey Type: string, Indexed: false
   * @param upOrDown Type: bool, Indexed: false
   */
  FallingCrystalball(
    ballid: string,
    gameKey: string,
    upOrDown: boolean
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _approved Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_approved: string, _tokenId: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string): MethodConstantReturnContext<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param money Type: uint256, Indexed: false
   */
  buyCrystalball(ballid: string, money: string): MethodPayableReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  buyCrystalballNC(ballid: string): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballOwner Type: address, Indexed: false
   * @param fixGene Type: string, Indexed: false
   */
  createNew(ballOwner: string, fixGene: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getBallByNFTToken(
    tokenId: string
  ): MethodConstantReturnContext<BallDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param startIndex Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  getCrystalBallMeta(
    ballid: string,
    startIndex: string,
    count: string
  ): MethodConstantReturnContext<GetCrystalBallMetaResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalBuyRate(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  getCrystalCoin(account: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalCoinContract(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalCointotalSupply(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalballMaxReproductionTimes(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param startIndex Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  getCrystalballMetaReverse(
    ballid: string,
    startIndex: string,
    count: string
  ): MethodConstantReturnContext<GetCrystalballMetaReverseResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  getCrystalballProperty(
    ballid: string
  ): MethodConstantReturnContext<BalldataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFallingKeys(): MethodConstantReturnContext<GetFallingKeysResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param gameKey Type: string, Indexed: false
   */
  getGameFallingCount(gameKey: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param startIndex Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  getMarketSalingBalls(
    startIndex: string,
    count: string
  ): MethodConstantReturnContext<GetMarketSalingBallsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getMaxReproductionTimes(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getMintBallPrice(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPotionNFTContract(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getReproductContract(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  getReproductTimes(ballid: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param startIndex Type: uint256, Indexed: false
   * @param pageCount Type: uint256, Indexed: false
   */
  getUserCrystalBallList(
    owner: string,
    startIndex: string,
    pageCount: string
  ): MethodConstantReturnContext<GetUserCrystalBallListResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  initialize(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _operator Type: address, Indexed: false
   */
  isApprovedForAll(
    _owner: string,
    _operator: string
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param uri Type: string, Indexed: false
   */
  mint(to: string, uri: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param ballId Type: uint256, Indexed: false
   * @param uri Type: string, Indexed: false
   */
  mintCrystalBall(to: string, ballId: string, uri: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param metaUrl Type: string, Indexed: false
   */
  mintCrystalBallMeta(ballid: string, metaUrl: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  ownerOf(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param gameKey Type: string, Indexed: false
   * @param addOrRemove Type: bool, Indexed: false
   */
  registerFallingString(
    gameKey: string,
    addOrRemove: boolean
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fatherBallId Type: uint256, Indexed: false
   * @param montherBallId Type: uint256, Indexed: false
   */
  reproductionNewBall(
    fatherBallId: string,
    montherBallId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    _from: string,
    _to: string,
    _tokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    _from: string,
    _to: string,
    _tokenId: string,
    _data: string | number[]
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _operator Type: address, Indexed: false
   * @param _approved Type: bool, Indexed: false
   */
  setApprovalForAll(_operator: string, _approved: boolean): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param bSale Type: bool, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  setBallSaling(
    ballid: string,
    bSale: boolean,
    price: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param rate Type: uint256, Indexed: false
   */
  setCrystalBuyRate(rate: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param coinAddress Type: address, Indexed: false
   */
  setCrystalCoinContract(coinAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param maxTimes Type: uint256, Indexed: false
   */
  setCrystalballMaxReproductionTimes(maxTimes: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param times Type: uint256, Indexed: false
   */
  setMaxReproductionTimes(times: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param price Type: uint256, Indexed: false
   */
  setMintBallPrice(price: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param potionAddress Type: address, Indexed: false
   */
  setPotionNFTContract(potionAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param contractAddress Type: address, Indexed: false
   */
  setReproductContract(contractAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _interfaceID Type: bytes4, Indexed: false
   */
  supportsInterface(
    _interfaceID: string | number[]
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  tokenURI(_tokenId: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    _from: string,
    _to: string,
    _tokenId: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
}
