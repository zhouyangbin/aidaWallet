import React, { useMemo, useState, useEffect } from "react";
import { VStack, Image, Pressable, Text, HStack, ScrollView, PresenceTransition, Center, useToast } from "native-base";
import AlertModal from "../component/AlertModal";
import SelectActionSheet from "../component/SelectActionSheet";
import Icons from "../asset/Icon";
import ScanQrcode from "../component/ScanQrcode";
import { handleMoneyFormatter, handleFormatAddress } from "@/../../frontend/lyami/api/util/helper";
import { getBalance } from "../api/web3/nativeCoin";
import global from "../api/util/global";
import { scanHandler } from "../api/util/scanConfig";
import UserInfoSimpleModal from "../Modal/UserInfoSimpleModal";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../utils/stylesKits";
import { resetGlobalWeb3 } from "../api/web3/nativeCoin";
import CrystalBallComponent from "../NFTAssetsPage/Crystalball";
import Input from "../component/Input";
import { I18n } from "../../language/I18n";
import { useGlobalStore } from "../api/Store/globalHook";

const AccountItem = props => {
  const { payload, handleSetToAddress, isLocal } = props;
  const [balance, setBalance] = useState(payload.count);

  if (!payload.count && payload?.account?.address) {
    getBalance(payload.account.address).then(res => {
      setBalance(handleMoneyFormatter(res, 8));
    });
  }
  return (
    <ImageBackground source={shadowCon} style={{ width: pxToDp(998), height: pxToDp(165) }} resizeMode="stretch">
      <Pressable
        onPress={() => {
          return handleSetToAddress(payload.account?.address);
        }}
      >
        <HStack h="100%" alignItems="center" pb={pxToDp(10)} w="100%">
          <HStack ml={pxToDp(50)} alt="img" mr={pxToDp(40)}>
            <CrystalBallComponent
              type="primary"
              width={pxToDp(85.1)}
              height={pxToDp(85.1)}
              gene={payload.account?.address.slice(2, 38)}
            ></CrystalBallComponent>
          </HStack>
          <VStack flex="1">
            <Text fontSize={pxToDp(39)} fontWeight="bold">
              {payload.title}
            </Text>
            {!isLocal && (
              <Text fontSize={pxToDp(30)}>
                Balance: {balance} <Text>{global.defaultNetwork.CoinSymbol}</Text>
              </Text>
            )}
          </VStack>
        </HStack>
      </Pressable>
    </ImageBackground>
  );
};

const AccountStep = props => {
  const { isScanning, setIsScanning, setNextDisabled, refresh, order, setOrder, fromScan, scanAddress } = props;
  const [account, setAccount] = useState(0);
  const [inputAddress, setInputAddress] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [borderColor, setBorderColor] = useState("rgba(212,212,212,1.0)");
  const [isOpen, setIsOpen] = useState(false);
  const [accountArray, setAccountArray] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [localAddressArray, setLocalAddressArray] = useState([]);
  const { handleSetGlobalData } = useGlobalStore();
  const toast = useToast();

  const handleSetPostAccountArray = payload => {
    const array = [];
    const accountArray = global.keys;
    // const account = global.defaultKey;
    const netWork = global.defaultNetwork;
    accountArray.map((item, index) => {
      getBalance(item.address)
        .then(res => {
          array.push({
            title: handleFormatAddress(item.address),
            image: Icons.bnbIcon,
            count: handleMoneyFormatter(res, 8),
            name: netWork.CoinSymbol,
            account: item,
          });
          if (item.address.substring(0, 2) != "0x") item.address = "0x" + item.address;
          item.address == global.defaultAddress.call()
            ? setSelectedItem({
                title: handleFormatAddress(item.address),
                image: Icons.bnbIcon,
                count: handleMoneyFormatter(res, 8),
                name: netWork.CoinSymbol,
                account: item,
              })
            : null;
          setAccountArray(array);
        })
        .catch(e => {
          console.log(e);
        });
    });
  };
  const handleSetToAddress = payload => {
    console.log(payload, "----handleSetToAddress----");
    // 校验网络合法性
    if (!payload) {
      setInputAddress(null);
      setOrder({
        from: selectedItem,
        to: null,
      });
    } else {
      if (payload.length >= 2) {
        if (payload.substr(0, 2) != "0x") {
          payload = `0x${payload}`;
        }
      }
      setInputAddress(payload);
      setOrder({
        from: selectedItem,
        to: payload,
      });
    }
  };
  const alertShow = useMemo(() => {
    if (selectedItem?.count == 0) {
      return true;
    } else {
      return false;
    }
  }, [selectedItem]);

  useEffect(() => {
    handleSetPostAccountArray();
    setLocalAddressArray(global.localOrderAddress);
    if (fromScan) {
      handleSetToAddress(scanAddress);
    }
    return () => {};
  }, [global.defaultAddress.call(), refresh, global.localOrderAddress, global.keys.length]);
  const handleSelect = payload => {
    const { item } = payload;
    console.log(item);
    setBorderColor("rgba(212,212,212,1.0)");
    setSelectedItem(item);
    handleSetGlobalData({ defaultKey: item.account });
    resetGlobalWeb3(global.defaultNetwork.RPC, item.account.privateKey);
  };
  const handleReceiveData = payload => {
    const { address } = scanHandler(payload, toast, null);
    handleSetToAddress(address);
    setIsScanning(false);
  };
  const handleButtonState = useMemo(() => {
    if (selectedItem && inputAddress) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [selectedItem, inputAddress]);

  const fixAddress = addr => {
    if (addr.indexOf("0x") == -1 && addr.indexOf("0X") == -1) {
      addr = "0x" + addr;
    }
    return addr;
  };

  return (
    <>
      <UserInfoSimpleModal
        visible={showAlert}
        onCancel={() => setShowAlert(!showAlert)}
        onItemChanged={item => handleSetToAddress(item.address)}
      ></UserInfoSimpleModal>
      {isScanning ? (
        <ScanQrcode
          back={() => {
            setIsScanning(false);
          }}
          callback={handleReceiveData}
        ></ScanQrcode>
      ) : (
        <ScrollView w="100%" flex="1">
          <VStack alignItems="center">
            <ImageBackground
              style={{ width: pxToDp(998), height: pxToDp(430) }}
              source={shadowCon}
              resizeMode="stretch"
            >
              <VStack justifyContent="center" alignItems="center" w="100%" h="100%" px={pxToDp(39)} pb={pxToDp(25)}>
                <HStack mb={pxToDp(39)} alignItems="center" w="100%">
                  <Text w={pxToDp(141)} fontSize={pxToDp(45)} fontWeight="bold">
                    {/* From: */}
                    {I18n.t("send.from")}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setIsOpen(!isOpen);
                      setBorderColor("darkBlue.400");
                    }}
                  >
                    <HStack
                      w={pxToDp(773.9)}
                      h={pxToDp(136.3)}
                      bg="#F3F3F4"
                      borderRadius={pxToDp(30)}
                      alignItems="center"
                      borderColor={borderColor}
                    >
                      <HStack ml={pxToDp(31)} mr={pxToDp(39)}>
                        <CrystalBallComponent
                          type="primary"
                          width={pxToDp(85.1)}
                          height={pxToDp(85.1)}
                          gene={selectedItem?.account?.address.slice(2, 38)}
                        ></CrystalBallComponent>
                      </HStack>
                      <VStack flex="1">
                        <Text fontSize={pxToDp(40)} fontWeight="bold">
                          {selectedItem?.title}
                        </Text>
                        {selectedItem ? (
                          <Text mb="1" fontWeight="400" fontSize={pxToDp(30)}>
                            Balance:{selectedItem?.count}
                            {selectedItem?.name}
                          </Text>
                        ) : (
                          <Text mb="1" fontSize="12"></Text>
                        )}
                      </VStack>
                      <Image
                        alt="img"
                        mr={pxToDp(40)}
                        w={pxToDp(37)}
                        h={pxToDp(29)}
                        source={Icons.arrowDownIcon}
                      ></Image>
                    </HStack>
                  </Pressable>
                  <SelectActionSheet
                    isOpen={isOpen}
                    close={setIsOpen}
                    type="single"
                    selectItemArray={accountArray}
                    handleSelect={handleSelect}
                  ></SelectActionSheet>
                </HStack>
                <HStack alignItems="center" w="100%">
                  <Text w={pxToDp(141)} fontSize={pxToDp(45)} fontWeight="bold">
                    {/* To: */}
                    {I18n.t("send.to")}
                  </Text>
                  <Input
                    w={pxToDp(773.9)}
                    h={pxToDp(136.3)}
                    borderRadius={pxToDp(30)}
                    alignItems="center"
                    // borderColor="#5C50D2"
                    // borderColor={borderColor}
                    InputRightElement={
                      inputAddress?.length > 0 ? (
                        <Pressable
                          w={pxToDp(70)}
                          onPress={() => {
                            handleSetToAddress(null);
                          }}
                        >
                          <Image
                            alt="img"
                            key={inputAddress?.length > 0}
                            w={pxToDp(37)}
                            h={pxToDp(37)}
                            source={Icons.closeIcon}
                          ></Image>
                        </Pressable>
                      ) : // <Pressable
                      //   onPress={() => {
                      //     setIsScanning(true);
                      //   }}
                      // >
                      //   <Image
                      //     key={inputAddress?.length > 0}
                      //     alt="img"
                      //     mr={pxToDp(32)}
                      //     w={pxToDp(53)}
                      //     h={pxToDp(53)}
                      //     source={Icons.scanIcon}
                      //   ></Image>
                      // </Pressable>
                      null
                    }
                    type="text"
                    placeholder="Search, public address (0x) or ENS"
                    onChangeText={payload => {
                      handleSetToAddress(payload);
                    }}
                    value={inputAddress}
                  />
                </HStack>
              </VStack>
            </ImageBackground>

            <Center>
              <AlertModal
                show={alertShow}
                // show={true}
                w="90%"
                my={pxToDp(19)}
                borderColor="darkBlue.400"
                text={`You have ${selectedItem?.count}${selectedItem?.name} available in your account to pay transaction fees. Buy some Crystal Coin or deposit from another account.`}
              ></AlertModal>
            </Center>
            {!showAccount ? (
              <Pressable
                w="100%"
                pl={pxToDp(78)}
                onPress={() => {
                  setShowAccount(!showAccount);
                }}
                mt={pxToDp(-29)}
                h={pxToDp(152)}
                justifyContent="center"
              >
                <Text w="100%" fontSize={pxToDp(42)} color="#5C50D2">
                  {/* Transfer between my accounts */}
                  {I18n.t("send.transfer")}
                </Text>
              </Pressable>
            ) : (
              <PresenceTransition
                visible={showAccount}
                initial={{
                  opacity: 0,
                  translateY: 10,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  transition: {
                    duration: 250,
                  },
                }}
              >
                <VStack>
                  {accountArray?.map((item, index) => {
                    return (
                      <AccountItem
                        handleSetToAddress={handleSetToAddress}
                        index={index}
                        payload={item}
                        key={index}
                      ></AccountItem>
                    );
                  })}
                </VStack>
              </PresenceTransition>
            )}
            <VStack pl={pxToDp(78)} w="100%" h={pxToDp(133)} mt={pxToDp(-10)} justifyContent="center">
              <Text fontSize={pxToDp(50)} fontWeight="800">
                {/* Recently */}
                {I18n.t("send.recently")}
              </Text>
            </VStack>

            <VStack>
              {localAddressArray.map((item, index) => {
                if (index < 10) {
                  return (
                    <AccountItem
                      index={index}
                      payload={item}
                      key={index}
                      handleSetToAddress={handleSetToAddress}
                      isLocal
                    ></AccountItem>
                  );
                }
              })}
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </>
  );
};

export default React.memo(AccountStep);
