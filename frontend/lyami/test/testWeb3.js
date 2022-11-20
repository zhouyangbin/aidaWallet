import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Button,
} from 'react-native';
import { add } from 'react-native-reanimated';
import {Scrollview} from 'native-base';
import global from '../api/util/global';
import {getBalance, updateDefaultNativeCoinNetwork} from '../api/web3/nativeCoin';

import { CrystalCoin } from '../api/web3/CrystalCoin';

import RampSdk from '@ramp-network/react-native-sdk';

import CoinGecko from '../api/web3/CoinGeckoApi';

import {handleGetConfig} from '../api/service'

async function myGetBlance(setTestValue) {

    const address = global.defaultAddress.call();
    const balance = await getBalance(address);
    
    const contractAddress = '0x33ADE90491363a1d08332F23693BAf85C666C2d8';
    console.log(global.web3);
    const crystalCoin = new CrystalCoin(global.web3, contractAddress);
    const money = await crystalCoin.balanceOf(address);

    const name = await crystalCoin.name();
    const symbol = await crystalCoin.symbol();
    const decimal = await crystalCoin.decimals();

    const msg = `当前的数字货币是: ${name}, 货币符号是: ${symbol}, 货币精度是: ${decimal}, 用户拥有的数字货币数量是: ${money}`;
    setTestValue(msg)
}

async function testCoinGeckoApi() {
    let coinGecko = new CoinGecko();
    const coinGeckStatus = await coinGecko.ping();
    console.log(coinGeckStatus);

    const global = await coinGecko.global();
    console.log(global);

    const coins = await coinGecko.coins.markets();
    console.log(coins);
}

function TestWeb3Form() {
    const [testValue, setTestValue] = useState('');

    const loadConfigData = async() => {
        const resp = await fetch('https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples');
        const resData = await resp.text();
        setTestValue(resData);
    }

    console.log('testWeb3');
    loadConfigData();
    
    return (
        <View>
            {/* <Button title={`Run Ramp Widget`} onPress={() => ramp?.show()} /> */}
            <Text>{testValue}</Text>
        </View>
    )
} 
   
export default TestWeb3Form;