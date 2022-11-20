import type Web3 from "web3";
import type Eth from "web3-eth";
import type { Contract } from "web3-eth-contract";
import type { AbiItem } from "web3-utils";
import { BigNumber } from "bignumber.js";

import ERC721ABI from "./ERC721.abi.json";

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

  once(type: "transactionHash", handler: (transactionHash: string) => void): PromiEvent<T>;

  once(type: "receipt", handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;

  once(
    type: "confirmation",
    handler: (confirmationNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void
  ): PromiEvent<T>;

  once(type: "error", handler: (error: Error) => void): PromiEvent<T>;

  once(
    type: "error" | "confirmation" | "receipt" | "transactionHash" | "sent" | "sending",
    handler: (error: Error | TransactionReceipt | string | object) => void
  ): PromiEvent<T>;

  on(type: "sending", handler: (payload: object) => void): PromiEvent<T>;

  on(type: "sent", handler: (payload: object) => void): PromiEvent<T>;

  on(type: "transactionHash", handler: (receipt: string) => void): PromiEvent<T>;

  on(type: "receipt", handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;

  on(
    type: "confirmation",
    handler: (confNumber: number, receipt: TransactionReceipt, latestBlockHash?: string) => void
  ): PromiEvent<T>;

  on(type: "error", handler: (error: Error) => void): PromiEvent<T>;

  on(
    type: "error" | "confirmation" | "receipt" | "transactionHash" | "sent" | "sending",
    handler: (error: Error | TransactionReceipt | string | object) => void
  ): PromiEvent<T>;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(options: SendOptions, callback: (error: Error, result: any) => void): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(options: EstimateGasOptions, callback: (error: Error, result: any) => void): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(options: CallOptions, callback: (error: Error, result: TCallReturn) => void): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export class ERC721 {
  constructor(web3: Web3, contractAddress: string) {
    this._type = "ERC721";
    this._Web3 = web3;
    this._account = web3.eth.defaultAccount;
    this._contractAddress = contractAddress;
    this._Contract = new web3.eth.Contract(ERC721ABI as AbiItem[], contractAddress);
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
    const nonce = await this._Web3.eth.getTransactionCount(this._account, "latest");
    const tx: TransactionConfig = {
      from: from,
      to: to,
      nonce: nonce,
      gas: gas as any,
      data: methodABI,
      maxPriorityFeePerGas: parseInt(priorityFee.toFixed()),
    };

    const signedTx = await this._Web3.eth.accounts.signTransaction(
      tx as any,
      this._Web3.eth.accounts.wallet[this._account].privateKey
    );
    const transactionReceipt = await this._Web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return transactionReceipt;
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _approved Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_approved: string, _tokenId: string): MethodReturnContext {
    return this._Contract.methods.approve(_approved, _tokenId).call();
  }
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
    _data: string | number[] | undefined | null
  ): MethodReturnContext {
    if (_data == null) {
      return this._Contract.methods.safeTransferFrom(_from, _to, _tokenId).call();
    } else {
      return this._Contract.methods.safeTransferFrom(_from, _to, _tokenId, _data).call();
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _operator Type: address, Indexed: false
   * @param _approved Type: bool, Indexed: false
   */
  setApprovalForAll(_operator: string, _approved: boolean): MethodReturnContext {
    return this._Contract.methods.setApprovalForAll(_operator, _approved).call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transferFrom(_from: string, _to: string, _tokenId: string): MethodReturnContext {
    return this._Contract.methods.transferFrom(_from, _to, _tokenId).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string): Promise<string> {
    return this._Contract.methods.balanceOf(_owner).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: string): Promise<string> {
    return this._Contract.methods.getApproved(_tokenId).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _operator Type: address, Indexed: false
   */
  isApprovedForAll(_owner: string, _operator: string): Promise<boolean> {
    return this._Contract.methods.isApprovedForAll(_owner, _operator).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): Promise<string> {
    return this._Contract.methods.name().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  async ownerOf(_tokenId: string): Promise<string> {
    try {
      const result = await this._Contract.methods.ownerOf(_tokenId).call();
      return result;
    } catch (e) {
      return "";
    }
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _interfaceID Type: bytes4, Indexed: false
   */
  supportsInterface(_interfaceID: string | number[]): Promise<boolean> {
    return this._Contract.methods.supportsInterface(_interfaceID).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): Promise<string> {
    return this._Contract.methods.symbol().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  tokenURI(_tokenId: string): Promise<string> {
    return this._Contract.methods.tokenURI(_tokenId).call();
  }
}
