import type Web3 from "web3";
import type Eth from "web3-eth";
import type { Contract } from "web3-eth-contract";
import type { AbiItem } from "web3-utils";
import { BigNumber } from "bignumber.js";

import NFTMarketABI from "./NFTMarket.abi.json";

interface TransactionConfig {
  from?: string | number;
  to?: string;
  value?: number | string;
  gas?: number | string;
  gasPrice?: number | string;
  maxPriorityFeePerGas?: number | string;
  maxFeePerGas?: number | string;
  data?: string;
  nonce?: number;
  chainId?: number;
  common?: any;
  chain?: string;
  hardfork?: string;
}

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BigNumber;
  gas?: number;
}

export interface Log {
  address: string;
  data: string;
  topics: string[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
}

export interface EventLog {
  event: string;
  address: string;
  returnValues: any;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  raw?: { data: string; topics: any[] };
}

export interface TransactionReceipt {
  status: boolean;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  contractAddress?: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  effectiveGasPrice: number;
  logs: Log[];
  logsBloom: string;
  events?: {
    [eventName: string]: EventLog;
  };
}

export interface PromiEvent<T> extends Promise<T> {
  once(type: "sending", handler: (payload: object) => void): PromiEvent<T>;

  once(type: "sent", handler: (payload: object) => void): PromiEvent<T>;

  once(
    type: "transactionHash",
    handler: (transactionHash: string) => void
  ): PromiEvent<T>;

  once(
    type: "receipt",
    handler: (receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  once(
    type: "confirmation",
    handler: (
      confirmationNumber: number,
      receipt: TransactionReceipt,
      latestBlockHash?: string
    ) => void
  ): PromiEvent<T>;

  once(type: "error", handler: (error: Error) => void): PromiEvent<T>;

  once(
    type:
      | "error"
      | "confirmation"
      | "receipt"
      | "transactionHash"
      | "sent"
      | "sending",
    handler: (error: Error | TransactionReceipt | string | object) => void
  ): PromiEvent<T>;

  on(type: "sending", handler: (payload: object) => void): PromiEvent<T>;

  on(type: "sent", handler: (payload: object) => void): PromiEvent<T>;

  on(
    type: "transactionHash",
    handler: (receipt: string) => void
  ): PromiEvent<T>;

  on(
    type: "receipt",
    handler: (receipt: TransactionReceipt) => void
  ): PromiEvent<T>;

  on(
    type: "confirmation",
    handler: (
      confNumber: number,
      receipt: TransactionReceipt,
      latestBlockHash?: string
    ) => void
  ): PromiEvent<T>;

  on(type: "error", handler: (error: Error) => void): PromiEvent<T>;

  on(
    type:
      | "error"
      | "confirmation"
      | "receipt"
      | "transactionHash"
      | "sent"
      | "sending",
    handler: (error: Error | TransactionReceipt | string | object) => void
  ): PromiEvent<T>;
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

export interface MarketitemResponse {
    tokenId: string;
    seller: string;
    owner: string;
    price: string;
    sold: boolean;
  }

export interface MethodReturnContext extends MethodPayableReturnContext {}

class NFTMarket {
  constructor(web3: Web3, contractAddress: string) {
    this._type = "ERC721";
    this._Web3 = web3;
    this._account = web3.eth.defaultAccount;
    this._contractAddress = contractAddress;
    this._Contract = new web3.eth.Contract(
      NFTMarketABI as AbiItem[],
      contractAddress
    );
  }

  private _type: string;
  private _Web3: Web3;
  private _Contract: any;
  private _account: string;
  private _contractAddress: string;

  getType(): string {
    return this._type;
  }

  getAccount(): string {
    return this._account;
  }

  getContractAddress(): string {
    return this._contractAddress;
  }

  async sendTransactionSigned(
    methodABI: string,
    from: string,
    to: string,
    gas: Number | string,
    priorityFeePerGas: Number | string
  ) {
    const priorityFee = priorityFeePerGas || global.defaultPriorityFeePerGas;
    const nonce = await this._Web3.eth.getTransactionCount(
      this._account,
      "latest"
    );
    const tx: TransactionConfig = {
      from: from,
      to: to,
      nonce: nonce,
      gas: gas as any,
      data: methodABI,
      maxPriorityFeePerGas: priorityFee,
    };

    const signedTx = await this._Web3.eth.accounts.signTransaction(
      tx as any,
      this._Web3.eth.accounts.wallet[this._account].privateKey
    );
    const transactionReceipt = await this._Web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    return transactionReceipt;
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(to: string, tokenId: string): MethodReturnContext {
    return this._Contract.methods.approve(to, tokenId).call();
  }
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  createMarketSale(tokenId: string): MethodPayableReturnContext {
    return this._Contract.methods.createMarketSale(tokenId).call();
  }
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param tokenURI Type: string, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  createToken(tokenURI: string, price: string): MethodPayableReturnContext {
    return this._Contract.methods.createToken(tokenURI, price).call();
  }
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  resellToken(tokenId: string, price: string): MethodPayableReturnContext {
    return this._Contract.methods.resellToken(tokenId, price).call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: string,
    data: string | number[]
  ): MethodReturnContext {
    if (data == null) {
        return this._Contract.methods.resellToken(from, to, tokenId).call();
    } else {
        return this._Contract.methods.resellToken(from, to, tokenId, data).call();
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(operator: string, approved: boolean): MethodReturnContext {
    return this._Contract.methods.setApprovalForAll(operator, approved).call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, tokenId: string): MethodReturnContext {
    return this._Contract.methods.transferFrom(from, to, tokenId).call();
  }
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _listingPrice Type: uint256, Indexed: false
   */
  updateListingPrice(_listingPrice: string): MethodPayableReturnContext {
    return this._Contract.methods.updateListingPrice(_listingPrice).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(owner: string): MethodConstantReturnContext<string> {
    return this._Contract.methods.balanceOf(owner).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fetchItemsListed(): MethodConstantReturnContext<MarketitemResponse[]> {
    return this._Contract.methods.fetchItemsListed().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fetchMarketItems(): MethodConstantReturnContext<MarketitemResponse[]> {
    return this._Contract.methods.fetchMarketItems().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fetchMyNFTs(): MethodConstantReturnContext<MarketitemResponse[]> {
    return this._Contract.methods.fetchMyNFTs().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(tokenId: string): MethodConstantReturnContext<string> {
    return this._Contract.methods.getApproved(tokenId).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getListingPrice(): MethodConstantReturnContext<string> {
    return this._Contract.methods.getListingPrice().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    operator: string
  ): MethodConstantReturnContext<boolean> {
    return this._Contract.methods.isApprovedForAll(owner, operator).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string> {
    return this._Contract.methods.name().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(tokenId: string): MethodConstantReturnContext<string> {
    return this._Contract.methods.ownerOf(tokenId).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: string | number[]
  ): MethodConstantReturnContext<boolean> {
    return this._Contract.methods.supportsInterface(interfaceId).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string> {
    return this._Contract.methods.symbol().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: string): MethodConstantReturnContext<string> {
    return this._Contract.methods.tokenURI(tokenId).call();
  }
}
