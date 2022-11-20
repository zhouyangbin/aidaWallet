// 这个文件定义了用户私钥的处理函数
import HDWallet from 'ethereum-hdwallet';
import bip39 from 'react-native-bip39';

/**
 * 根据助记词取得秘钥
 * @param {string} mnemonic 助记词
 * @returns 秘钥
 */
export async function getKeyFromMnemonic(mnemonic) {
	const seed = await bip39.mnemonicToSeed(mnemonic); //生成种子
	const hdwallet = HDWallet.fromSeed(seed);
	const key = hdwallet.derive("m/44'/60'/0'/0/0"); 
	return {
        privateKey: key.getPrivateKey().toString('hex'),
        publicKey: key.getPublicKey().toString('hex'),
        address: key.getAddress().toString('hex'),
        mnemonic: mnemonic
    }
}

export function createRandomMnemonic() {
    return bip39.generateMnemonic(128);
}

/**
 * 分割助记词
 * @param {String} mnemonic 
 * @returns 
 */
export function splitMnemonic(mnemonic) {
    console.log(mnemonic);
    return mnemonic.split(/\s+/);
}
