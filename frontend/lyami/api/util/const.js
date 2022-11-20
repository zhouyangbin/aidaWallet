import RNFS from 'react-native-fs';

export default {
    updateNativeCoinUrl: 'https://liche.lyami.net/wallet/nativecoin.json',
    nativeCoinNetwork : [
        {
            "name": "Ethereum",
            "RPC": "https://rpc.ankr.com/eth",
            "ChainId": 1,
            "CoinSymbol": "ETH",
            "BlockScan": "https://etherscan.io",
            "isTestNetwork": false,
            "initAIDAMetaList": [],
        },
        {
            "name": "Polygon",
            "RPC": "https://polygon-rpc.com/",
            "ChainId": 137,
            "CoinSymbol": "MATIC",
            "BlockScan": "https://polygonscan.com/",
            "isTestNetwork": false,
            "initAIDAMetaList": [383],
        },
        {
            "name": "Astar",
            "RPC": "https://evm.astar.network",
            "ChainId": 592,
            "CoinSymbol": "Astar",
            "BlockScan": "https://blockscout.com/astar",
            "isTestNetwork": false,
            "initAIDAMetaList": [],
        },
        {
            "name": "Goerli",
            "RPC": "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            "ChainId": 5,
            "CoinSymbol": "GoerliETH",
            "BlockScan": "https://goerli.etherscan.io",
            "isTestNetwork": true,
            "initAIDAMetaList": [],
        },
        {
            "name": "Mumbai",
            "RPC": "https://rpc-mumbai.maticvigil.com/",
            "ChainId": 80001,
            "CoinSymbol": "MATIC",
            "BlockScan": "https://mumbai.polygonscan.com/",
            "isTestNetwork": true,
            "initAIDAMetaList": [],
        }
    ],
    networkJson: RNFS.DocumentDirectoryPath + '/network.json'
}