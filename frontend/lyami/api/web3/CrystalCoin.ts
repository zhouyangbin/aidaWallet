import type Web3 from "web3";
import type Eth from "web3-eth"
import type {Contract} from "web3-eth-contract";
import type {AbiItem} from "web3-utils";
import {BigNumber} from 'bignumber.js';

import crystalCoinABI from './CrystalCoin.abi.json';

export interface LendsResponse {
    add: string;
    val: string;
    isValue: boolean;
  }
export interface StakerateResponse {
    id: string;
    stakeTime: string;
    rate: string;
    isValue: boolean;
  }
export interface StakedataResponse {
    id: string;
    add: string;
    amount: string;
    starttime: string;
    endtime: string;
    rate: string;
    isValue: boolean;
    useinterest: string;
  }

export class CrystalCoin {
    constructor(web3: Web3, contractAddress: string) {
        this._Web3 = web3;
        this._Contract = new web3.eth.Contract(crystalCoinABI as AbiItem[], contractAddress);
    }
    
    private _Web3: Web3;
    private _Contract: any;


   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param spender Type: address, Indexed: false
    * @param amount Type: uint256, Indexed: false
    */
   approve(spender: string, amount: string): Promise<void> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.approve(spender, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param from Type: address, Indexed: false
    * @param id Type: uint256, Indexed: false
    */
   cancelStakeCrystalCoin(from: string, id: string): Promise<void> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.cancelStakeCrystalCoin(from, id).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param spender Type: address, Indexed: false
    * @param subtractedValue Type: uint256, Indexed: false
    */
   decreaseAllowance(spender: string,subtractedValue: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.decreaseAllowance(spender, subtractedValue).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param spender Type: address, Indexed: false
    * @param addedValue Type: uint256, Indexed: false
    */
   increaseAllowance(spender: string, addedValue: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.increaseAllowance(spender, addedValue).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param _to Type: address, Indexed: false
    * @param _amount Type: uint256, Indexed: false
    */
   mint(_to: string, _amount: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.mint(_to, _amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param from Type: address, Indexed: false
    * @param amount Type: uint256, Indexed: false
    */
   regainCrystalCoin(from: string, amount: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.regainCrystalCoin(from, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param contractAddress Type: address, Indexed: false
    */
   registerContractAddress(contractAddress: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.registerContractAddress(contractAddress).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    */
   renounceOwnership(): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.renounceOwnership().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param id Type: uint256, Indexed: false
    * @param time Type: uint256, Indexed: false
    * @param rate Type: uint256, Indexed: false
    */
   setStakeRate(id: string, time: string, rate: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.setStakeRate(id, time, rate).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param from Type: address, Indexed: false
    * @param time Type: uint256, Indexed: false
    * @param amount Type: uint256, Indexed: false
    */
   stakeCrystalCoin(
     from: string,
     time: string,
     amount: string
   ): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.stakeCrystalCoin(from, time, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param recipient Type: address, Indexed: false
    * @param amount Type: uint256, Indexed: false
    */
   transfer(recipient: string, amount: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.transfer(recipient, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param to Type: address, Indexed: false
    * @param amount Type: uint256, Indexed: false
    */
   transferCrystalCoin(to: string, amount: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.transferCrystalCoin(to, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
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
   transferFrom(
     sender: string,
     recipient: string,
     amount: string
   ): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.transferFrom(sender, recipient, amount).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: false
    * StateMutability: nonpayable
    * Type: function
    * @param newOwner Type: address, Indexed: false
    */
   transferOwnership(newOwner: string): Promise<void>{
    return new Promise((resolve, rejects) => {
        this._Contract.methods.transferOwnership(newOwner).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve();
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    * @param owner Type: address, Indexed: false
    * @param spender Type: address, Indexed: false
    */
   allowance(
     owner: string,
     spender: string
   ): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.allowance(owner, spender).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    * @param account Type: address, Indexed: false
    */
   balanceOf(account: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.balanceOf(account).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   decimals(): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.decimals().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   getLendData(): Promise<LendsResponse[]> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.getLendData().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    * @param time Type: uint256, Indexed: false
    */
   getStakeRate(time: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.getStakeRate(time).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   getStakeRates(): Promise<StakerateResponse[]> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.getStakeRates().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    * @param from Type: address, Indexed: false
    */
   getUserStake(from: string): Promise<StakedataResponse[]> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.getUserStake(from).call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   name(): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.name().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   owner(): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.owner().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   symbol(): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.symbol().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
   /**
    * Payable: false
    * Constant: true
    * StateMutability: view
    * Type: function
    */
   totalSupply(): Promise<string> {
    return new Promise((resolve, rejects) => {
        this._Contract.methods.totalSupply().call(function(err, res) {
            if (err) {
                rejects(err);
            } else {
                resolve(res);
            }
        })
    })
   }
}