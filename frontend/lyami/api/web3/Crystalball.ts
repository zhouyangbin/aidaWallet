import type Web3 from "web3";
import Eth from "web3-eth";
import type { TransactionReceipt } from "web3-eth";
import type { Contract } from "web3-eth-contract";
import type { AbiItem } from "web3-utils";
import { BigNumber } from "bignumber.js";
import crystalballABI from "./Crystalball.abi.json";
import global from "../util/global";

import { parseEthereumEventData } from "../util/helper";

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
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface TransferEventEmittedResponse {
  _from: string;
  _to: string;
  _tokenId: string;
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
export interface BallStruct {
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
export interface BallDataResponse extends BallStruct {}
export interface GetBallStateResponse {
  state: string;
  lastSeconds: string;
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
export interface BalldataResponse extends BallStruct {}
export interface BallListResponse extends BallStruct {}
export interface GetReproductionFreeBallListResponse {
  ballList: BallStruct[];
  endIndex: string;
  total: string;
}
export interface GetSalesCrystalBallListResponse {
  ballList: BallStruct[];
  endIndex: string;
}
export interface GetUserCrystalBallListResponse {
  ballList: BallStruct[];
  endIndex: string;
  total: string;
}
export interface GetBallLeaseHoldInfoResponse {
  state: string;
  leaseUser: string;
  expiredTime: string;
}
export interface GetLeaseHoldBallListResponse {
  ballids: string[];
  endIndex: string;
  total: string;
}
interface TransactionConfig {
  from?: string | number;
  to?: string;
  value?: number | string;
  gas?: number | string;
  gasPrice?: number | string;
  maxPriorityFeePerGas?: number | Number | string;
  maxFeePerGas?: number | string;
  data?: string;
  nonce?: number;
  chainId?: number;
  common?: any;
  chain?: string;
  hardfork?: string;
}

interface RecentMeta {}

export interface GetFallingKeysResponse {
  result0: string[];
  result1: string;
}

interface RecentCrystalMetas {
  createTime: Date;
  ballId: number;
  metas: RecentMeta[];
}

export interface GetMarketSalingBallsResponse {
  ballDatas: BallStruct[];
  endIndex: string;
  total: string;
}

function toBall(ballRawData: BallDataResponse): BallStruct {
  const ball: BallStruct = {
    ballid: ballRawData.ballid,
    owner: ballRawData.owner,
    gene: ballRawData.gene,
    mutatedgene: ballRawData.mutatedgene,
    birthday: ballRawData.birthday,
    dynasty: ballRawData.dynasty,
    salePrice: ballRawData.salePrice,
    reproductionPrice: ballRawData.reproductionPrice,
    isSale: ballRawData.isSale,
    isReproduction: ballRawData.isReproduction,
    reproductionInterval: ballRawData.reproductionInterval,
    fatherid: ballRawData.fatherid,
    montherid: ballRawData.montherid,
    reproductionTimes: ballRawData.reproductionTimes,
    token: ballRawData.token,
    falling: ballRawData.falling,
  };

  return ball;
}

export type CrystalballNFTMethodNames =
  | "new"
  | "approve"
  | "createNew"
  | "initialize"
  | "LeaseHoldBall"
  | "mint"
  | "mintCrystalBall"
  | "mintCrystalBallMeta"
  | "setCrystalballMaxReproductionTimes"
  | "setCrystalBuyRate"
  | "renounceOwnership"
  | "reproductionNewBall"
  | "safeTransferFrom"
  | "safeTransferFrom"
  | "setApprovalForAll"
  | "setBallLeaseHold"
  | "setCrystalCoinContract"
  | "setLeaseHoldBallPrice"
  | "setMintBallPrice"
  | "setPotionNFTContract"
  | "setReproductContract"
  | "transferFrom"
  | "transferOwnership"
  | "balanceOf"
  | "getApproved"
  | "getBallByNFTToken"
  | "getBallLeaseHoldInfo"
  | "getBallState"
  | "getCrystalballMaxReproductionTimes"
  | "getCrystalBallMeta"
  | "getCrystalballMetaReverse"
  | "getCrystalballProperty"
  | "getCrystalBuyRate"
  | "getCrystalCoin"
  | "getCrystalCoinContract"
  | "getCrystalCointotalSupply"
  | "getLeaseHoldBallList"
  | "getLeaseHoldBallPrice"
  | "getMintBallPrice"
  | "getPotionNFTContract"
  | "getRandomLeaseHoldBallId"
  | "getReproductContract"
  | "getUserCrystalBallList"
  | "getUserLeaseHoldBall"
  | "isApprovedForAll"
  | "name"
  | "owner"
  | "ownerOf"
  | "supportsInterface"
  | "symbol"
  | "tokenURI";

export class Crystalball {
  constructor(web3: Web3, contractAddress: string) {
    this._Web3 = web3;
    this._account = web3.eth.defaultAccount;
    this._contractAddress = contractAddress;
    this._Contract = new web3.eth.Contract(
      crystalballABI as AbiItem[],
      contractAddress
    );
  }

  private _Web3: Web3;
  private _Contract: any;
  private _account: string;
  private _contractAddress: string;

  async sendTransactionSigned(
    methodABI: string,
    from: string,
    to: string,
    gas: Number | string,
    priorityFeePerGas: Number | string,
    sendValue?: string | null 
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

    if (sendValue) {
      tx.value = sendValue;
    }

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
   * @param ballid Type: uint256, Indexed: false
   * @param gameKey Type: string, Indexed: false
   * @param upOrDown Type: bool, Indexed: false
   */
  async FallingCrystalball(
    ballid: string,
    gameKey: string,
    upOrDown: boolean,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Eth.TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .FallingCrystalball(ballid, gameKey, upOrDown)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .FallingCrystalball(ballid, gameKey, upOrDown)
        .encodeABI();
      const transactionReceipt = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
      return transactionReceipt;
    }
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _approved Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_approved: string, _tokenId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .approve(_approved, _tokenId)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param money Type: uint256, Indexed: false
   */
  async buyCrystalball(
    ballid: string,
    money: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Eth.TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .buyCrystalball(ballid, money)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .buyCrystalball(ballid, money)
        .encodeABI();
      const transactionReceipt = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
      return transactionReceipt;
    }
  }

  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  async buyCrystalballNC(ballid: string, sendValue: string, gas: Number | null,
    priorityFeePerGas: Number | null): Promise<Eth.TransactionReceipt> {
      if (gas == null) {
        return await this._Contract.methods
          .buyCrystalballNC(ballid)
          .estimateGas({ from: this._account });
      } else {
        const abi = this._Contract.methods
          .buyCrystalballNC(ballid)
          .encodeABI();
        const transactionReceipt = await this.sendTransactionSigned(
          abi,
          this._account,
          this._contractAddress,
          gas,
          parseInt(priorityFeePerGas.toFixed()),
          sendValue
        );
        return transactionReceipt;
      }

    }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballOwner Type: address, Indexed: false
   * @param fixGene Type: string, Indexed: false
   */
  async createNew(
    ballOwner: string,
    fixGene: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Number> {
    if (gas == null) {
      return await this._Contract.methods
        .createNew(ballOwner, fixGene)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .createNew(ballOwner, fixGene)
        .encodeABI();
      const transactionReceipt = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );

      const logData = transactionReceipt.logs[0].data;
      const ballid = parseInt(logData.substr(logData.length / 2 + 1), 16);
      return ballid;
    }
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param uri Type: string, Indexed: false
   */
  async mint(
    to: string,
    uri: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Number | TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .mint(to, uri)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods.mint(to, uri).encodeABI();
      return await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param ballId Type: uint256, Indexed: false
   * @param uri Type: string, Indexed: false
   */
  async mintCrystalBall(
    to: string,
    ballId: string,
    uri: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Number | TransactionReceipt> {
    console.log(uri, "promise 中的URI----");

    if (gas == null) {
      return await this._Contract.methods
        .mintCrystalBall(to, ballId, uri)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .mintCrystalBall(to, ballId, uri)
        .encodeABI();
      return await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param metaUrl Type: string, Indexed: false
   */
  async mintCrystalBallMeta(
    ballid: string,
    metaUrl: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<
    | Number
    | TransactionReceipt
    | {
        eventData: { sender: string; ballid: number; metaid: number };
        metaResponse: TransactionReceipt;
      }
  > {
    if (gas == null) {
      return await this._Contract.methods
        .mintCrystalBallMeta(ballid, metaUrl)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .mintCrystalBallMeta(ballid, metaUrl)
        .encodeABI();
      const metaResponse = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
      const eventData: {
        sender: string;
        ballid: number;
        metaid: number;
      } = parseEthereumEventData(metaResponse.logs[0].data, [
        { name: "sender", type: "address", index: 0 },
        { name: "ballid", type: "number", index: 1 },
        { name: "metaid", type: "number", index: 2 },
      ]);
      // console.log(eventData);
      return {
        eventData,
        metaResponse,
      };
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
  setApprovalForAll(_operator: string, _approved: boolean): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .setApprovalForAll(_operator, _approved)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param fatherBallId Type: uint256, Indexed: false
   * @param montherBallId Type: uint256, Indexed: false
   */
  async reproductionNewBall(
    fatherBallId: string,
    montherBallId: string,
    gas: Number | null,
    priorityFeePerGas: Number | null,
    sendValue: string
  ): Promise<Number | TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .reproductionNewBall(fatherBallId, montherBallId)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .reproductionNewBall(fatherBallId, montherBallId)
        .encodeABI();
      const response = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed(0)),
        sendValue
      );

      const newBallData = parseEthereumEventData(response.logs[0].data, [
        { name: "owner", index: 0, type: "address" },
        { name: "ballid", index: 1, type: "number" },
      ]);
      // console.log(newBallData);
      return newBallData;
    }
  }

  getReproductionPrice(dynasty: number) : Promise<string>{
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getReproductionPrice(dynasty)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
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
    _data: string | number[]
  ): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .safeTransferFrom(_from, _to, _tokenId, _data)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param canLeaseHold Type: bool, Indexed: false
   */
  async setBallLeaseHold(
    ballid: string,
    canLeaseHold: boolean,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Number | Eth.TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .setBallLeaseHold(ballid, canLeaseHold)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods
        .setBallLeaseHold(ballid, canLeaseHold)
        .encodeABI();
      const response = await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed(0))
      );
      return response;
    }
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param rate Type: uint256, Indexed: false
   */
  async setCrystalBuyRate(
    rate: string,
    gas: Number | null,
    priorityFeePerGas: Number | null
  ): Promise<Number | TransactionReceipt> {
    if (gas == null) {
      return await this._Contract.methods
        .setCrystalBuyRate(rate)
        .estimateGas({ from: this._account });
    } else {
      const abi = this._Contract.methods.setCrystalBuyRate(rate).encodeABI();
      return await this.sendTransactionSigned(
        abi,
        this._account,
        this._contractAddress,
        gas,
        parseInt(priorityFeePerGas.toFixed())
      );
    }
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
  transferFrom(_from: string, _to: string, _tokenId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .transferFrom(_from, _to, _tokenId)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newOwner Type: address, Indexed: false
   */
  transferOwnership(_newOwner: string): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .transferOwnership(_newOwner)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string): Promise<string> {
    return new Promise((resolve, rejects) => {});
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CANNOT_TRANSFER_TO_ZERO_ADDRESS(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .CANNOT_TRANSFER_TO_ZERO_ADDRESS()
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param user Type: address, Indexed: false
   * @param ballId Type: uint256, Indexed: false
   */
  LeaseHoldBall(user: string, ballId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .LeaseHoldBall(user, ballId)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve();
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getApproved(_tokenId).call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getBallBuyNFTToken(tokenId: string): Promise<BallStruct> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getBallBuyNFTToken(tokenId)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(toBall(res));
          }
        });
    });
  }

  getBallLeaseHoldInfo(ballid: string): Promise<GetBallLeaseHoldInfoResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getBallLeaseHoldInfo(ballid)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  getBallState(ballid: string): Promise<GetBallStateResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getBallState(ballid).call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalballMaxReproductionTimes(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getCrystalballMaxReproductionTimes()
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  getCrystalBallMeta(
    ballid: string,
    startIndex: string,
    count: string
  ): Promise<GetCrystalBallMetaResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getCrystalBallMeta(ballid, startIndex, count)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }
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
  ): Promise<GetCrystalballMetaReverseResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getCrystalballMetaReverse(ballid, startIndex, count)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   */
  getCrystalballProperty(ballid: string): Promise<BallStruct> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getCrystalballProperty(ballid)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(toBall(res));
          }
        });
    });
  }

    /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
     getFallingKeys(): Promise<GetFallingKeysResponse> {
      return new Promise((resolve, rejects) => {
        this._Contract.methods
          .getFallingKeys()
          .call(function (err, res) {
            if (err) {
              rejects(err);
            } else {
              resolve(res);
            }
          });
      });
     }
     /**
      * Payable: false
      * Constant: true
      * StateMutability: view
      * Type: function
      * @param gameKey Type: string, Indexed: false
      */
     getGameFallingCount(gameKey: string): Promise<string> {
      return new Promise((resolve, rejects) => {
        this._Contract.methods
          .getGameFallingCount(gameKey)
          .call(function (err, res) {
            if (err) {
              rejects(err);
            } else {
              resolve(res);
            }
          });
      });
     }
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
     ): Promise<GetMarketSalingBallsResponse> {
      return new Promise((resolve, rejects) => {
        this._Contract.methods
          .getMarketSalingBalls(startIndex, count)
          .call(function (err, res) {
            if (err) {
              rejects(err);
            } else {
              resolve(res);
            }
          });
      });
     }

     getMaxReproductionTimes(): Promise<string> {
      return new Promise((resolve, rejects) => {
        this._Contract.methods
          .getMaxReproductionTimes()
          .call(function (err, res) {
            if (err) {
              rejects(err);
            } else {
              resolve(res);
            }
          });
      });
     }

     getReproductTimes(ballid: string): Promise<string> {
      return new Promise((resolve, rejects) => {
        this._Contract.methods
          .getReproductTimes(ballid)
          .call(function (err, res) {
            if (err) {
              rejects(err);
            } else {
              resolve(res);
            }
          });
      });
     }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalBuyRate(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getCrystalBuyRate().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  getCrystalCoin(account: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getCrystalCoin(account).call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalCoinContract(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getCrystalCoinContract().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLeaseHoldBallPrice(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getLeaseHoldBallPrice().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCrystalCointotalSupply(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getCrystalCointotalSupply()
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getMintBallPrice(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getMintBallPrice().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPotionNFTContract(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getPotionNFTContract().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getReproductContract(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.getReproductContract().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param startIndex Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  getReproductionFreeBallList(
    startIndex: string,
    count: string
  ): Promise<GetReproductionFreeBallListResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getReproductionFreeBallList(startIndex, count)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            const result: GetReproductionFreeBallListResponse = {
              ballList: res.ballList.map((x) => toBall(x)),
              endIndex: res.endIndex,
              total: res.total,
            };
            resolve(result);
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param startIndex Type: uint256, Indexed: false
   * @param pageCount Type: uint256, Indexed: false
   */
  getLeaseHoldBallList(
    startIndex: string,
    pageCount: string
  ): Promise<GetLeaseHoldBallListResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getLeaseHoldBallList(startIndex, pageCount)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }

  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param startIndex Type: uint256, Indexed: false
   * @param pageCount Type: uint256, Indexed: false
   */
  getSalesCrystalBallList(
    startIndex: string,
    pageCount: string
  ): Promise<GetSalesCrystalBallListResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getSalesCrystalBallList(startIndex, pageCount)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            const result: GetSalesCrystalBallListResponse = {
              ballList: res.ballList.map((x) => toBall(x)),
              endIndex: res.endIndex,
            };
            resolve(result);
          }
        });
    });
  }
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
  ): Promise<GetUserCrystalBallListResponse> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getUserCrystalBallList(owner, startIndex, pageCount)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            const result: GetUserCrystalBallListResponse = {
              ballList: res.ballList.map((x) => toBall(x)),
              endIndex: res.endIndex,
              total: res.total,
            };
            // console.log(result);
            resolve(result);
          }
        });
    });
  }

  getUserLeaseHoldBall(user: string): Promise<BallStruct> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .getUserLeaseHoldBall(user)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(toBall(res));
          }
        });
    });
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
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .isApprovedForAll(_owner, _operator)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.name().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  NOT_CURRENT_OWNER(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.NOT_CURRENT_OWNER().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.owner().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  ownerOf(_tokenId: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.ownerOf(_tokenId).call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ballid Type: uint256, Indexed: false
   * @param bSale Type: bool, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
    async setBallSaling(
      ballid: string,
      bSale: boolean,
      price: string,
      gas: Number | null,
      priorityFeePerGas: Number | null
    ): Promise<Eth.TransactionReceipt> {
      if (gas == null) {
        return await this._Contract.methods
          .setBallSaling(ballid, bSale, price)
          .estimateGas({ from: this._account });
      } else {
        const abi = this._Contract.methods
          .setBallSaling(ballid, bSale, price)
          .encodeABI();
        const response = await this.sendTransactionSigned(
          abi,
          this._account,
          this._contractAddress,
          gas,
          parseInt(priorityFeePerGas.toFixed(0))
        );
        return response;
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
    return new Promise((resolve, rejects) => {
      this._Contract.methods
        .supportsInterface(_interfaceID)
        .call(function (err, res) {
          if (err) {
            rejects(err);
          } else {
            resolve(res);
          }
        });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.symbol().call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  tokenURI(_tokenId: string): Promise<string> {
    return new Promise((resolve, rejects) => {
      this._Contract.methods.tokenURI(_tokenId).call(function (err, res) {
        if (err) {
          rejects(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  async loadRecentCrystalMeta(): Promise<RecentCrystalMetas[]> {
    return new Promise((resolve, rejects) => {});
  }
}
