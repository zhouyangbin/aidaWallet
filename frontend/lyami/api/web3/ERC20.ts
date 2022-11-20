import type Web3 from "web3";
import type Eth from "web3-eth";
import type { Contract } from "web3-eth-contract";
import type { AbiItem } from "web3-utils";
import type { SignedTransaction } from "web3-core";
import { BigNumber } from "bignumber.js";

import ERC20ABI from "./ERC20.abi.json";

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
  gasLimit?: number | string;
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

export class ERC20 {
  constructor(web3: Web3, contractAddress: string, privateKey?: string) {
    this._type = "ERC20";
    this._Web3 = web3;

    this._contractAddress = contractAddress;
    this._Contract = new web3.eth.Contract(ERC20ABI as AbiItem[], contractAddress);

    if (privateKey == null) {
      this._account = web3.eth.defaultAccount;
      this._privateKey = web3.eth.accounts.wallet[this._account].privateKey;
    } else {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      this._account = account.address;
      this._privateKey = privateKey;
    }
  }

  private _type: string;
  private _Web3: Web3;
  private _Contract: any;
  private _account: string;
  private _privateKey: string;
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
    onSignedTx: (signedTx: SignedTransaction) => void,
    gas: Number | string,
    priorityFeePerGas: Number | string,
    gasPrice: string | number,
    gasLimit: string | number,
    maxFeePerGas: any
  ) {
    const priorityFee = priorityFeePerGas || global.defaultPriorityFeePerGas;
    const nonce = await this._Web3.eth.getTransactionCount(this._account, "latest");
    const tx: TransactionConfig = {
      from: from,
      to: to,
      nonce: nonce,
      gas: gas as any,
      data: methodABI,
      maxPriorityFeePerGas: parseInt(priorityFee?.toFixed()),
      maxFeePerGas: parseInt(maxFeePerGas?.toFixed()),
      gasLimit: gasLimit,
    };
    console.log(methodABI);
    console.log(tx);

    const signedTx = await this._Web3.eth.accounts.signTransaction(tx as any, this._privateKey);
    if (onSignedTx != null) {
      onSignedTx(signedTx);
    }
    const transactionReceipt = await this._Web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return transactionReceipt;
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(owner: string, spender: string): Promise<string> {
    return this._Contract.methods.allowance(owner, spender).call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  approve(spender: string, amount: string): Promise<void> {
    return this._Contract.methods.approve(spender, amount).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  balanceOf(account: string): Promise<string> {
    return this._Contract.methods.balanceOf(account).call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(): Promise<string> {
    return this._Contract.methods.decimals().call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  decreaseAllowance(spender: string, subtractedValue: string): Promise<void> {
    return this._Contract.methods.decreaseAllowance(spender, subtractedValue).call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  increaseAllowance(spender: string, addedValue: string): Promise<void> {
    return this._Contract.methods.increaseAllowance(spender, addedValue).call();
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
   */
  symbol(): Promise<string> {
    return this._Contract.methods.symbol().call();
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(): Promise<string> {
    return this._Contract.methods.totalSupply().call();
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  async transfer(
    recipient: string,
    amount: string,
    gas?: string,
    onSignedTx?: (signedTx: SignedTransaction) => void,
    priorityFeePerGas?: any,
    gasPrice?: string,
    gasLimit?: string,
    maxFeePerGas?: any
  ): Promise<TransactionReceipt | Number> {
    const decimals = await this.decimals();
    const bigAmount = new BigNumber(amount);
    const amountWei = bigAmount.multipliedBy(new BigNumber(10 ** parseInt(decimals)));

    // return this._Contract.methods.transfer(recipient, amount).call();
    if (gas == null) {
      const gasValue = await this._Contract.methods
        .transfer(recipient, amountWei?.toFixed())
        .estimateGas({ from: this._account });
      return gasValue;
    } else {
      const abi: string = this._Contract.methods.transfer(recipient, amountWei?.toFixed()).encodeABI();
      const resp = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        onSignedTx,
        gas,
        parseInt(priorityFeePerGas?.toFixed()),
        gasPrice,
        gasLimit,
        parseInt(maxFeePerGas?.toFixed())
      );
      return resp;
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  async transferFrom(
    sender: string,
    recipient: string,
    amount: string,
    gas?: string,
    onSignedTx?: (signedTx: SignedTransaction) => void,
    priorityFeePerGas?: any,
    gasPrice?: string,
    gasLimit?: string,
    maxFeePerGas?: any
  ): Promise<TransactionReceipt | Number> {
    const decimals = await this.decimals();
    const bigAmount = new BigNumber(amount);
    const amountWei = bigAmount.multipliedBy(new BigNumber(10 ** parseInt(decimals)));
    //return this._Contract.methods.transfer(sender, recipient, amount).call();
    if (gas == null) {
      const gasValue = await this._Contract.methods
        .transferFrom(sender, recipient, amountWei.toFixed())
        .estimateGas({ from: this._account });
      // console.log(gasValue);
      return gasValue;
    } else {
      const abi: string = this._Contract.methods.transferFrom(sender, recipient, amountWei.toFixed()).encodeABI();
      // console.log(abi);
      const resp = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        onSignedTx,
        gas,
        parseInt(priorityFeePerGas.toFixed()),
        gasPrice,
        gasLimit,
        parseInt(maxFeePerGas.toFixed())
      );
      return resp;
    }
  }
}
