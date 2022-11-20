import React, { useState } from "react";
import { FormControl, useToast, VStack, HStack } from "native-base";
import { assign } from "lodash";
import global from "../api/util/global";
import Web3 from "web3";
import { SaveGlobalData } from "../api/localStorge/LocalStroge";
import Input from "../component/Input";
import Button from "../component/Button";
import { pxToDp } from "../../utils/stylesKits";
import AlertModal from "../component/AlertModal";
import { useGlobalStore } from "../api/Store/globalHook";

const CustomPage = props => {
  const { setIsLoading } = props;
  const { globalData, handleSetGlobalData } = useGlobalStore();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({ name: null, RPC: null, ChainId: null, CoinSymbol: null, isCustom: true });
  const handleSetName = payload => {
    setFormData(assign(formData, { name: payload }));
    handleJudgeDisabled();
  };
  const handleSetRPC = payload => {
    setFormData(assign(formData, { RPC: payload }));
    handleJudgeDisabled();
  };
  const handleSetChainId = payload => {
    setFormData(assign(formData, { ChainId: payload }));
    handleJudgeDisabled();
  };
  const handleSetCoinSymbol = payload => {
    setFormData(assign(formData, { CoinSymbol: payload }));
    handleJudgeDisabled();
  };
  const handleSetBlockScan = payload => {
    setFormData(assign(formData, { BlockScan: payload }));
  };
  const handleJudgeDisabled = () => {
    if (!formData.name || !formData.RPC || !formData.ChainId || !formData.CoinSymbol) {
      return setIsDisabled(true);
    }
    return setIsDisabled(false);
  };

  return (
    <VStack flex="1" alignItems="center">
      {/* <Center>
        <AlertModal
          show={alertShow}
          // show={true}
          w="90%"
          my={pxToDp(19)}
          borderColor="darkBlue.400"
          text={`You have ${selectedItem?.count}${selectedItem?.name} available in your account to pay transaction fees. Buy some ETH or deposit from another account.`}
        ></AlertModal>
      </Center> */}
      {/* <ImageBackground
        source={shadowConFull}
        resizeMode="stretch"
        style={{ width: pxToDp(1080), height: pxToDp(1071), marginTop: pxToDp(31) }}
      > */}
      <VStack
        bg="white"
        w={pxToDp(998)}
        py={pxToDp(71)}
        shadow={5}
        borderRadius={pxToDp(30)}
        mt={pxToDp(31)}
        px={pxToDp(71)}
      >
        <FormControl>
          <FormControl.Label
            _text={{
              fontSize: pxToDp(41),
              fontWeight: "800",
              color: "#181818",
            }}
          >
            Network name
          </FormControl.Label>
          <Input
            onChangeText={payload => {
              handleSetName(payload);
            }}
            placeholder="Network name (optional)"
            _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label
            _text={{
              fontSize: pxToDp(41),
              fontWeight: "800",
              color: "#181818",
            }}
          >
            RPC URL
          </FormControl.Label>
          <Input
            onChangeText={payload => {
              handleSetRPC(payload);
            }}
            placeholder="New RPC network"
            _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label
            _text={{
              fontSize: pxToDp(41),
              fontWeight: "800",
              color: "#181818",
            }}
          >
            Chain ID
          </FormControl.Label>
          <Input
            onChangeText={payload => {
              handleSetChainId(payload);
            }}
            placeholder="Chain ID (optional)"
            _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label
            _text={{
              fontSize: pxToDp(41),
              fontWeight: "800",
              color: "#181818",
            }}
          >
            Symbol
          </FormControl.Label>
          <Input
            onChangeText={payload => {
              handleSetCoinSymbol(payload);
            }}
            placeholder="Symbol (optional)"
            _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
          />
        </FormControl>
      </VStack>
      {/* </ImageBackground> */}

      <Button
        mt={pxToDp(53)}
        type="lg"
        isDisabled={isDisabled}
        onPress={() => {
          if (!formData.name) return;
          1;
          if (!formData.RPC) return;
          if (!formData.ChainId) return;
          if (!formData.CoinSymbol) return;
          // setIsLoading(true);
          let address = globalData.defaultAddress.call();

          setIsLoading(false);
          try {
            const web3 = new Web3(formData.RPC);
            web3.eth
              .getBalance(address)
              .then(e => {
                const coinNetWork = [
                  ...globalData.nativeCoinNetwork,
                  {
                    name: formData.name.trim(),
                    RPC: formData.RPC.trim(),
                    ChainId: formData.ChainId.trim(),
                    CoinSymbol: formData.CoinSymbol.trim(),
                    BlockScan: formData.BlockScan ? formData.BlockScan.trim() : null,
                    isTestNetwork: false,
                    isCustom: true,
                  },
                ];
                const totalAssets = globalData.totalAssets[address];
                totalAssets[formData.ChainId.trim()] = {
                  coinAssets: [],
                  NFTAssets: {},
                  AddNFTS: [],
                  Records: [],
                  concernCrystalBallList: {},
                  CoinSymbol: formData.CoinSymbol.trim(),
                  CoinSymbol: formData.CoinSymbol.trim(),
                  name: formData.name.trim(),
                  RPC: formData.RPC.trim(),
                };
                handleSetGlobalData({ nativeCoinNetwork: coinNetWork, totalAssets: totalAssets });
                toast.show({ description: "添加成功", placement: "top", duration: 2000 });
              })
              .catch(error => {
                console.log(error);
                setIsLoading(false);
                toast.show({ description: "请输入正确的RPC", placement: "top", duration: 2000 });
              })
              .finally(e => {
                setIsLoading(false);
              });
          } catch (error) {
            console.log(error);
            toast.show({ description: "请输入正确的RPC", placement: "top", duration: 2000 });
            setIsLoading(false);
          }
        }}
      >
        Add
      </Button>
    </VStack>
  );
};

export default React.memo(CustomPage);
