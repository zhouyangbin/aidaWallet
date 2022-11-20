import React, { useMemo, useState, useEffect, useContext } from "react";
import { Text, Image, HStack, Pressable, TextArea, useToast, VStack, Actionsheet, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import global from "./api/util/global";
import { SaveGlobalData } from "./api/localStorge/LocalStroge";
import Web3 from "web3";
import RNFileSelector from "react-native-file-selector";
import RNFS from "react-native-fs";
import { lyamiDecrypt } from "./api/util/crypto";
import ScanQrcode from "./component/ScanQrcode";
import request from "./api/util/request";
import { assign, cloneDeep, debounce } from "lodash";
import { pxToDp } from "../utils/stylesKits";
import Button from "./component/Button";
import Icons from "./asset/Icon";
import Input from "./component/Input";
import LoadingContext from "../providers/LoadContext";
import { Alert } from "react-native";
import { getKeyFromMnemonic } from "./api/web3/privateKey";
import config from "./api/util/const";
import { useGlobalStore } from "./api/Store/globalHook";

const handleTrimAll = ele => {
  if (typeof ele === "string") {
    return ele.split(" ").join("");
  }
};
const ImportAccount = props => {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();
  const [privateKey, setPrivateKey] = useState("");
  const [jsonArray, setJsonArray] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState("privateKey");
  const [typeSelectShow, setTypeSelectShow] = useState(false);
  const [isFromCreate, setIsFromCreate] = useState(false);
  const [mnemonicValue, setMnemonicValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { globalData, handleSetGlobalData, handleGetNewGlobalData } = useGlobalStore();
  const loading = useContext(LoadingContext);

  useEffect(() => {
    if (params?.fromCreate) {
      setIsFromCreate(true);
    } else {
      setIsFromCreate(false);
    }
    return () => {
      setIsFromCreate(false);
    };
  }, [params]);

  const toast = useToast();
  const setArray = (arr, key) => {
    var map = new Map();
    return arr.filter(a => {
      if (!map.has(a[key])) {
        return map.set(a[key], 1);
      }
    });
  };
  const checkKey = (data, type) => {
    data.forEach(item => {
      try {
        const web3 = new Web3(globalData.defaultNetwork.RPC); //私钥检验
        globalData.web3 = web3;
        const account = web3.eth.accounts.privateKeyToAccount(item.privateKey);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
      } catch (error) {
        toast.show({
          description: "存在无效私钥",
          placement: "top",
          duration: 2000,
        });
        loading.hide();
        console.log(error);
        item.check = false;
      }
    });
    if (data.some(item => !item.check)) {
      loading.hide();
      toast.show({
        description: "存在无效私钥",
        placement: "top",
        duration: 2000,
      });
    } else {
      data.forEach(e => {
        delete e.check;
      });
      if (type === "privateKey") {
        try {
          const web3 = globalData.web3;
          const keys = data.map(item => {
            const { privateKey, publicKey, address, mnemonic, isSet } = web3.eth.accounts.privateKeyToAccount(
              item.privateKey
            );
            return {
              privateKey,
              publicKey,
              address,
              mnemonic,
              isSet,
              isImport: true,
            };
          });

          const keysArray = setArray(globalData.keys.concat(keys), "privateKey");
          handleSetGlobalData({ keys: keysArray });

          completeImport(isFromCreate, navigation, loading, password);
          toast.show({
            description: "导入成功",
            placement: "top",
            duration: 2000,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        // global.defaultNetwork = Object.assign(global.defaultNetwork, globalData.defaultNetwork);
        // global.defaultKey = Object.assign(global.defaultKey, globalData.defaultKey);
        // global.nativeCoinNetwork = setArray(globalData.nativeCoinNetwork.concat(global.nativeCoinNetwork), "ChainId");
        // global.keys = setArray(globalData.keys.concat(global.keys), "privateKey");
        // completeImport(isFromCreate, navigation, loading, password);
      }
    }
  };
  const handleImport = debounce(async () => {
    loading.show();
    if (selectValue === "privateKey") {
      const privateKeyData = privateKey.split(";").map(item => {
        if (globalData.keys.every(value => value.privateKey != item)) {
          let params = {};
          params.privateKey = item;
          params.check = true;
          return params;
        }
      });

      checkKey(privateKeyData, "privateKey");
    } else if (selectValue === "Json") {
      if (jsonArray.every(items => items.password)) {
        const cloneArray = cloneDeep(jsonArray);
        let promiseArray = [];
        cloneArray.map(async item => {
          promiseArray.push(lyamiDecrypt(item.password, item.entryResult));
        });
        Promise.all(promiseArray)
          .then(e => {
            const keyData = [];
            e.map(item => {
              if (
                globalData.keys.every(value => {
                  return value.privateKey != item;
                })
              ) {
                keyData.push({ privateKey: item, check: true });
              }
            });
            checkKey(keyData, "privateKey");
          })
          .catch(e => {
            console.log(e);
            toast.show({
              description: "存在错误密码，请核验",
              placement: "top",
              duration: 3000,
            });
          });
      } else {
        toast.show({
          description: "请先输入解密密码",
          placement: "top",
          duration: 3000,
        });
      }
    } else {
      if (!mnemonicValue) {
        Alert.alert("助记词不能为空");
        return;
      }
      const mnemonic = handleTrimAll(mnemonicValue);
      const keyData = await getKeyFromMnemonic(mnemonic);
      keyData.address = "0x" + keyData.address;

      const shouldAdd = globalData.keys.every(value => {
        return value.privateKey != keyData.privateKey;
      });
      if (!shouldAdd) return Alert.alert("不能import重复的账户");
      const defaultKeyItem = {
        address: keyData.address,
        isSet: true,
        privateKey: keyData.privateKey,
        publicKey: keyData.publicKey,
      };
      const keysArray = [...globalData.keys, defaultKeyItem];
      handleSetGlobalData({ defaultKey: defaultKeyItem, keys: keysArray });
      completeImport(isFromCreate, navigation, loading, password);
    }
  }, 500);
  const handleUpload = () => {
    RNFileSelector.Show({
      title: "选择文件",
      onDone: async path => {
        if (path.indexOf("json") > -1) {
          if (jsonArray.some(item => item.path === path)) {
            toast.show({
              description: "不允许导入重复json",
              placement: "top",
              duration: 3000,
            });
            return;
          }
          try {
            let entryResult = await RNFS.readFile(path);
            let name = path.split("/")[path.split("/").length - 1];
            setJsonArray(array => {
              return array.concat([{ name, path, entryResult }]);
            });
          } catch (error) {
            console.log(error, "error");
          }
        } else {
          toast.show({
            description: "请选择正确的文件类型",
            placement: "top",
            duration: 3000,
          });
        }
      },
      onCancel: () => {
        console.log("cancelled");
      },
    });
  };
  const handleReceiveData = async payload => {
    try {
      let entryResult = await request.get(`/api/wallet/getprivatekeyshare?key=${payload}`);
      setVisible(false);
      setJsonArray(array => {
        return array.concat([{ entryResult: entryResult.data }]);
      });
    } catch (error) {
      console.log(error, "e");
    }
  };
  const disabledFlag = useMemo(() => {
    if (globalData.keys.length == 0) {
      if (password && confirmPassword && password == confirmPassword) {
        if (selectValue === "privateKey") {
          return privateKey.length == 0 ? true : false;
        } else if (selectValue == "Json") {
          return jsonArray.length == 0 ? true : false;
        } else {
          return mnemonicValue.length == 0 ? true : false;
        }
      } else {
        return true;
      }
    } else {
      if (selectValue === "privateKey") {
        return privateKey.length == 0 ? true : false;
      } else if (selectValue == "Json") {
        return jsonArray.length == 0 ? true : false;
      } else {
        return mnemonicValue.length == 0 ? true : false;
      }
    }
  }, [privateKey.length, jsonArray.length, mnemonicValue.length, password, confirmPassword]);
  const completeImport = (isFromCreate, navigation, loading, password) => {
    if (global.nativeCoinNetwork.length == 0) {
      handleSetGlobalData({
        defaultKey: assign(global.keys[0], { isSet: true }),
        nativeCoinNetwork: config.nativeCoinNetwork,
        defaultNetwork: config.nativeCoinNetwork[0],
      });
    }
    if (!global.CreateNewPassword) {
      global.CreateNewPassword = password;
      SaveGlobalData(global.CreateNewPassword ? global.CreateNewPassword : password);
      handleSetGlobalData({
        CreateNewPassword: password,
      });
    } else {
      handleSetGlobalData({
        CreateNewPassword: password,
      });
    }

    loading.hide();
    if (isFromCreate) {
      // return navigation.navigate("Intent", {});
      return navigation.reset({
        index: 0,
        routes: [{ name: "Intent" }],
      });
    }
  };
  return visible ? (
    <VStack h={"100%"}>
      <ScanQrcode
        back={() => {
          setVisible(false);
        }}
        callback={handleReceiveData}
      ></ScanQrcode>
    </VStack>
  ) : (
    <VStack w="100%" h="100%" bg="#E8EDFF">
      <VStack alignItems="flex-start" px={pxToDp(41)} mb={pxToDp(33)}>
        <HStack mt={pxToDp(75)} width="100%" justifyContent="space-between" alignItems="flex-end">
          <Pressable
            alignItems="flex-end"
            justifyContent="center"
            flex="1"
            onPress={() => {
              // console.log(isFromCreate);
              navigation.goBack();
            }}
          >
            <Image alt="img" w={pxToDp(39)} h={pxToDp(39)} source={Icons.closeIcon}></Image>
          </Pressable>
        </HStack>
        <HStack alignItems="center">
          <Image w={pxToDp(93)} h={pxToDp(107)} source={Icons.importIcon} alt="Logo"></Image>
          <Text ml={pxToDp(37)} fontSize={pxToDp(69)} fontWeight="bold">
            Import account
          </Text>
        </HStack>
        <Text mt={pxToDp(109)} fontSize={pxToDp(35)} fontWeight="normal">
          The imported account can be viewed in your wallet, but it can't be retrieved through the mnemonic of Leyami
          wallet.
        </Text>
        <Text mt={pxToDp(57)} fontSize={pxToDp(41)} fontWeight="800">
          Learn more about the imported accounts here.
        </Text>
      </VStack>
      <VStack
        alignItems="center"
        flex="1"
        w="100%"
        bg="#FFFFFF"
        px={pxToDp(41)}
        borderTopLeftRadius={pxToDp(79)}
        borderTopRightRadius={pxToDp(79)}
        justifyContent="space-between"
      >
        <VStack w="100%" flex="1">
          <HStack mt={pxToDp(29)} w="100%" mb={pxToDp(39)} justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Text mr={pxToDp(25)} fontSize={pxToDp(35)} fontWeight="800">
                Import mode
              </Text>
              <Pressable
                w={pxToDp(377)}
                h={pxToDp(69)}
                bg="#EDF0F4"
                borderWidth={0}
                fontSize={pxToDp(31)}
                borderRadius={pxToDp(35)}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
                onPress={() => setTypeSelectShow(true)}
              >
                <Text fontSize={pxToDp(37)} ml={pxToDp(39)}>
                  {selectValue}
                </Text>
                <Image mr={pxToDp(33)} w={pxToDp(29)} h={pxToDp(19)} source={Icons.arrowDownIcon}></Image>
              </Pressable>
            </HStack>
            {selectValue === "privateKey" ? (
              <Pressable mr={pxToDp(22)} onPress={() => setVisible(true)}>
                {/* <Text
                  alignItems="center"
                  fontWeight="800"
                  color="#5C50D2"
                  justifyContent="center"
                  fontSize={pxToDp(35)}
                >
                  Or scan Qr code
                </Text> */}
              </Pressable>
            ) : jsonArray.length != 0 ? (
              <Pressable
                alignItems="center"
                w={pxToDp(344)}
                h={pxToDp(69)}
                bg="#EDF0F4"
                borderRadius={pxToDp(35)}
                onPress={handleUpload}
                flexDirection="row"
                justifyContent="center"
              >
                <Text alignItems="center" justifyContent="center" fontSize={pxToDp(35)}>
                  Select file
                </Text>
                <Image ml={pxToDp(47)} source={Icons.extraIcon} w={pxToDp(55)} h={pxToDp(11)}></Image>
              </Pressable>
            ) : null}
          </HStack>

          {selectValue === "privateKey" && (
            <TextArea
              h={pxToDp(443)}
              placeholder="For example                             0xc04e4*********ab9b1d8e680e;0xc04e4*********ab9b1d8e680e;0xc04e4*********ab9b1d8e680e"
              fontSize={pxToDp(37)}
              value={privateKey}
              borderRadius={pxToDp(29)}
              bgColor="#ECF0F3"
              borderWidth={0}
              onChangeText={value => setPrivateKey(value)}
              p={pxToDp(31)}
            ></TextArea>
          )}
          {selectValue === "Json" && (
            <HStack h={pxToDp(443)} pb={pxToDp(41)}>
              {jsonArray.length == 0 ? (
                <Pressable
                  bg="#ECF0F3"
                  borderWidth={0}
                  borderRadius={pxToDp(31)}
                  h={pxToDp(443)}
                  onPress={handleUpload}
                  width="100%"
                  borderBottomColor="#ccc"
                  alignItems="center"
                >
                  <Image
                    mt={pxToDp(89)}
                    mb={pxToDp(49)}
                    source={Icons.jsonfileIcon}
                    w={pxToDp(95)}
                    h={pxToDp(107)}
                  ></Image>
                  <HStack
                    borderWidth={pxToDp(3)}
                    borderColor="#C8C8C8"
                    w={pxToDp(477)}
                    h={pxToDp(78)}
                    borderRadius={pxToDp(10)}
                    alignItems="center"
                  >
                    <Text
                      h={pxToDp(78)}
                      borderRightWidth={pxToDp(3)}
                      borderColor="#C8C8C8"
                      flex="1"
                      fontSize={pxToDp(37)}
                      fontWeight="bold"
                      textAlign="center"
                      lineHeight={pxToDp(78)}
                    >
                      Select file
                    </Text>
                    <Image mx={pxToDp(35)} source={Icons.extraIcon} w={pxToDp(57)} h={pxToDp(13)}></Image>
                  </HStack>
                </Pressable>
              ) : null}
              <VStack w="100%">
                <FlatList
                  data={jsonArray}
                  renderItem={({ item, index }) => {
                    return (
                      <VStack key={item.entryResult} w="100%">
                        <Text fontSize={pxToDp(41)} fontWeight="bold">
                          Account{index + 1}
                        </Text>
                        <HStack width="100%" alignItems="center" justifyContent="space-between">
                          <Text fontSize={pxToDp(41)} fontWeight="bold">
                            Password
                          </Text>
                          <Input
                            value={item.password}
                            onChangeText={value => {
                              const newArray = cloneDeep(jsonArray);
                              newArray[index].password = value;
                              setJsonArray(newArray);
                            }}
                            w={pxToDp(493)}
                            h={pxToDp(89)}
                            borderWidth={0}
                            bg="#E9E9E9"
                            _focus={{
                              backgroundColor: "#E9E9E9",
                              borderColor: "#5C50D2",
                              borderWidth: pxToDp(2),
                              width: pxToDp(489),
                              height: pxToDp(85),
                            }}
                          />

                          <Text fontSize={pxToDp(23)}>(输入该JSON导出时的密码)</Text>
                        </HStack>
                      </VStack>
                    );
                  }}
                ></FlatList>
              </VStack>
            </HStack>
          )}
          {selectValue === "Mnemonic" && (
            <TextArea
              h={pxToDp(443)}
              placeholder="For example : word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
              fontSize={pxToDp(37)}
              value={mnemonicValue}
              borderRadius={pxToDp(29)}
              bgColor="#ECF0F3"
              borderWidth={0}
              onChangeText={value => setMnemonicValue(value)}
              p={pxToDp(31)}
            ></TextArea>
          )}
          {isFromCreate ? (
            <VStack w="100%" mt={pxToDp(33)}>
              <Text my={pxToDp(31)} color="#5C50D2" fontSize={pxToDp(31)}>
                设置密码后点击导入以完成钱包初始化
              </Text>
              <HStack w="100%" alignItems="center">
                <Text fontSize={pxToDp(29)} mr={pxToDp(31)}>
                  输入密码
                </Text>
                <Input onChangeText={e => setPassword(e)} type="password" flex="1"></Input>
              </HStack>
              <HStack mt={pxToDp(31)} alignItems="center">
                <Text fontSize={pxToDp(29)} mr={pxToDp(31)}>
                  确认密码
                </Text>
                <Input onChangeText={e => setConfirmPassword(e)} type="password" flex="1"></Input>
              </HStack>
            </VStack>
          ) : null}
        </VStack>
        <Button
          mb={pxToDp(67)}
          type="lg"
          isDisabled={disabledFlag}
          onPress={() => {
            handleImport();
          }}
        >
          One click import
        </Button>
      </VStack>
      <Actionsheet isOpen={typeSelectShow} onClose={() => setTypeSelectShow(false)}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              setSelectValue("privateKey");
              setTypeSelectShow(false);
            }}
          >
            <Text>PrivateKey</Text>
          </Actionsheet.Item>
          {/* <Actionsheet.Item
            onPress={() => {
              setSelectValue("Json");
              setTypeSelectShow(false);
            }}
          >
            <Text>Json</Text>
          </Actionsheet.Item> */}
          <Actionsheet.Item
            onPress={() => {
              setSelectValue("Mnemonic");
              setTypeSelectShow(false);
            }}
          >
            <Text>Mnemonic</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default React.memo(ImportAccount);
