import React, { useState, useEffect } from "react";
import { VStack, HStack, Input, useToast, Image, Pressable, Text } from "native-base";
import { handleSearchAssets, handleSearch721Assets } from "../api/service";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import global from "../api/util/global";
import { debounce } from "lodash";
import { ERC721 } from "../api/web3/ERC721";
import { ImageBackground } from "react-native";
import shadowConF from "@/../../assets/image/UiImg/shadowConF.webp";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import Button from "../component/Button";
import { I18n } from "../../language/I18n";
import { cloneDeep } from "lodash";
import { useGlobalStore } from "../api/Store/globalHook";

const judgeERC721 = async address => {
  try {
    const instance = new ERC721(global.web3, address);
    const state = await instance.supportsInterface("0x01ffc9a7");
    return state;
  } catch (err) {
    console.log(err, "err---");
    return false;
  }
};

const AddAssetCoinListCustomModal = props => {
  const { netWorkIndex, setAddressValue, addressValue } = props;
  const [assets, setAssets] = useState(null);
  const [addDisabled, setAddDisabled] = useState(false);
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const toast = useToast();
  useEffect(() => {
    handleSearch(addressValue ? addressValue.trim() : "");
    return () => {};
  }, [netWorkIndex]);
  //输入防抖
  const handleSearch = debounce(async payload => {
    if (!payload) return;
    setAddressValue(payload);
    let res;
    let state = await judgeERC721(payload); //返回true，当前地址为721 合约
    if (state) {
      res = await handleSearch721Assets(payload);
    } else {
      res = await handleSearchAssets(payload);
    }
    if (res) {
      setAddDisabled(true);
      const [name, decimal, symbol, balance, type] = res;
      const obj = {
        name: name,
        decimal: decimal,
        symbol: symbol,
        token: payload,
        balance: balance,
        type: type,
        isNew: true,
        ChainId: globalData.defaultNetwork.ChainId,
      };
      setAssets(obj);
    } else {
      setAssets(null);
      setAddDisabled(false);
    }
  }, 1000);

  const addCoin = async payload => {
    const Address = globalData.defaultKey.address;
    const ChainId = globalData.defaultNetwork.ChainId;
    let account = {};
    if (globalData.totalAssets[Address] != undefined) {
      account = globalData.totalAssets[Address][ChainId];
    }
    // console.log(account,"addCoin",assets);
    //判断添加的是ERC20 还是ERC721，ERC20添加到assets，ERC721添加到NFTAssets
    let keyArray = {};
    let findToken = null;
    if (assets.type == "ERC20") {
      keyArray = account?.coinAssets || [];
      findToken  = keyArray.findIndex(x => x.token == assets.token);
    } else if (assets.type == "ERC721") {
      keyArray = account.NFTAssets || {};
      findToken  = keyArray[assets.token] == undefined ? "-1" : "1";
    } else {
      return toast.show({
        description: "暂不支持的代币类型",
        duration: 1500,
        placement: "top",
      });
    }
    if (findToken != -1) {
      return toast.show({
        description: "请勿重复添加",
        duration: 1500,
        placement: "top",
      });
    }
    if (assets.type == "ERC20") {
      account.coinAssets.push(assets);
    } else if (assets.type == "ERC721") {
      if (!account.AddNFTS.includes(assets.token)) {
        account.AddNFTS.splice(1, 0, assets.token);
      }
      account.NFTAssets[assets.token] = assets;
    }
    handleSetGlobalData(globalData)
    toast.show({ description: "添加成功", duration: 1500, placement: "top" });
  };

  return (
    <VStack flex="1" px={pxToDp(79)} alignItems="center">
      <Pressable mt={pxToDp(57)}>
        <ImageBackground source={shadowConF} style={{ width: pxToDp(1080), height: pxToDp(337) }} resizeMode="stretch">
          <HStack px={pxToDp(61)} py={pxToDp(93)} h="100%" w="100%" alignItems="flex-start">
            <Image mr={pxToDp(23)} w={pxToDp(47)} h={pxToDp(47)} source={Icons.noticeIconB}></Image>
            <Text flex="1" h={pxToDp(180)} fontSize={pxToDp(37)} fontWeight="bold">
              {I18n.t("wallet.addTokenDesc")}
              <Text color="#5C50D2" fontSize={pxToDp(37)} h={pxToDp(37)} fontWeight="bold">
                <Text></Text> {I18n.t("wallet.scamsAndSecurityRisks")}
              </Text>
            </Text>
          </HStack>
        </ImageBackground>
      </Pressable>
      <VStack flex="1" mt={pxToDp(59)} w="100%">
        <VStack w="100%">
          <VStack w="100%" mb={pxToDp(31)}>
            <Text mb={pxToDp(26)} fontSize={pxToDp(42)} fontWeight="800">
              {I18n.t("wallet.tokenAddress")}
            </Text>
            <Input
              onChangeText={e => {
                handleSearch(e);
              }}
              _focus={{
                borderColor: "#5C50D2",
                backgroundColor: "transparent",
              }}
              borderWidth={pxToDp(2)}
              w={pxToDp(922)}
              h={pxToDp(136)}
              borderRadius={pxToDp(30)}
              borderColor="#5C50D2"
              bg="#F3F3F4"
              type="text"
              placeholder={I18n.t("wallet.pleaseEnterToken")}
              fontSize={pxToDp(40)}
            />
          </VStack>
          <VStack w="100%" mb={pxToDp(31)}>
            <Text mb={pxToDp(26)} fontSize={pxToDp(42)} fontWeight="800">
              {I18n.t("wallet.tokenSymbols")}
            </Text>
            <HStack
              pl={pxToDp(39)}
              alignItems="center"
              borderWidth={0}
              w={pxToDp(922)}
              h={pxToDp(136)}
              borderRadius={pxToDp(30)}
              bg="#F3F3F4"
            >
              <Text fontSize={pxToDp(39)}>{assets?.name}</Text>
            </HStack>
          </VStack>
          <VStack w="100%" mb={pxToDp(31)}>
            <Text mb={pxToDp(26)} fontSize={pxToDp(42)} fontWeight="800">
              {I18n.t("wallet.tokenAccuracy")}
            </Text>
            <HStack
              pl={pxToDp(39)}
              alignItems="center"
              borderWidth={0}
              w={pxToDp(922)}
              h={pxToDp(136)}
              borderRadius={pxToDp(30)}
              bg="#F3F3F4"
            >
              <Text fontSize={pxToDp(39)}>{assets?.symbol}</Text>
            </HStack>
          </VStack>
        </VStack>
        <HStack mt={pxToDp(30)} flex="1" w="100%">
          <Button
            mr={pxToDp(43)}
            w={pxToDp(439.3)}
            borderColor="#5C50D2"
            borderWidth={pxToDp(3)}
            bg="transparent"
            type="lg"
            color="#5c50d2"
          >
            {I18n.t("wallet.cancel")}
          </Button>
          <Button w={pxToDp(439.3)} type="lg" isDisabled={!addDisabled} onPress={() => addCoin()}>
            {I18n.t("wallet.addToken")}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default React.memo(AddAssetCoinListCustomModal);
