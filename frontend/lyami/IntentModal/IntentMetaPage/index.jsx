import React, { useState, useEffect } from "react";
import { HStack, VStack, Image, Text, Box, Select, Center, Pressable, Button, useToast, CheckIcon } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import Spin from "../../component/Spin";
import { Crystalball } from "../../api/web3/Crystalball";
import global from "../../api/util/global";
import PriorityEdit from "../../component/PriorityEdit";
import config from "../../api/util/config";
import { handleGetNFTJson } from "../../api/service/index";
import { handleFetchTransactionGas } from "../../api/service/index";
import { NativeModules } from "react-native";
import { pxToDp } from "../../../utils/stylesKits";
import ConfirmBaseCom from "../ConfirmBaseCom";
import { resetGlobalWeb3 } from "../../api/web3/nativeCoin";

const PAGE_TITLE = "META Chain";
const BUTTON_TEXT = "META Chain";
const MetaPage = props => {
  const toast = useToast();
  const [isSpin, setSpin] = useState(false);
  const [priorityShow, setPriorityShow] = useState(false);
  const [gasLimit, setGasLimit] = useState(null);
  const [priority, setPriority] = useState({});
  const [metaData, setMetaData] = useState({});
  const [selectBall, setSelectBall] = useState(null);
  const [crystalballList, setCrystalballList] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [metaResponse, setMetaResponse] = useState(null);
  const [step, setStep] = useState(1); //1: 提现 or 支付 or 上链 页面   2：成功页面

  const navigation = useNavigation();
  const handleClickCome = async () => {
    if (!selectBall) return;
    setSpin(true);
    try {
      // console.log(metaData);
      const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
      const gas = await crystalballInstance.mintCrystalBallMeta(selectBall, global.intentData.url);
      const metaResult = await crystalballInstance.mintCrystalBallMeta(
        selectBall,
        global.intentData.url,
        gas,
        priority.MaxPriorityFeePerGas * 10 ** 9
      );
      setMetaResponse(metaResult);
      toast.show({ duration: 1500, description: "成功", placement: "top" });
      setSpin(false);
      setIsOver(true);
      setStep(2);
    } catch (error) {
      console.error(error, "handleClickCome");
      setSpin(false);
    }
  };
  const getLocalTime = nS => {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
  };
  const handleGetServerGasFee = async () => {
    const res = await handleFetchTransactionGas(global.defaultNetwork.ChainId);
    console.log(res);
    const {
      data: { MaxPriorityFeePerGas, MaxFeePerGas, GasLimit },
    } = res;
    setGasLimit(GasLimit);
    setPriority({ MaxPriorityFeePerGas, maxFee: MaxFeePerGas });
  };
  const initCrystalballData = async () => {
    const crystalballInstance = new Crystalball(global.web3, config.CONTRACT_ADDRESS[global.defaultNetwork.ChainId]);
    const crystalball = await crystalballInstance.getUserCrystalBallList(global.defaultAddress.call(), 0, 20);
    setCrystalballList(crystalball.ballList);
    console.log(crystalball);
  };
  const handleGetData = async () => {
    const intentData = global.intentData;
    const { url, address, ballId } = intentData;
    const [currentAccount] = global.keys.filter(item => item.address == address);
    if (currentAccount) {
      global.defaultKey = currentAccount;
    } else {
      return alert("账号不存在,请确认钱包内有当前地址");
    }
    const [net] = global.nativeCoinNetwork.filter(item => item.ChainId == 80001);
    global.defaultNetwork = net;
    resetGlobalWeb3(net.RPC, global.defaultKey.privateKey);
    const requestUrl = url.replace("ipfs://", config.IPFS_ROOT);
    try {
      const NFTJson = await handleGetNFTJson(requestUrl);
      const { data } = NFTJson;
      setMetaData(data);
    } catch (error) {
      console.log(error);
    }

    setSelectBall(ballId);
  };
  const handleReturnCallbackApp = async () => {
    const returnData = {
      result: true,
      meta: metaResponse.eventData,
      transactionHash: metaResponse.metaResponse.transactionHash,
    };
    const msg = JSON.stringify(returnData);
    await NativeModules.NativeIntent.SetIntentResult(msg);
  };
  useEffect(() => {
    handleGetData();
    handleGetServerGasFee();
    // initCrystalballData();
    return () => {};
  }, []);

  const UseIntentMetaCom = props => {
    return (
      <VStack>
        <HStack
          alignItems="center"
          pt={pxToDp(5)}
          pl={pxToDp(36)}
          w={pxToDp(998)}
          h={pxToDp(141)}
          bg="#ECEAF7"
          borderTopRadius={pxToDp(30)}
        >
          <Center w={pxToDp(107)} h={pxToDp(107)} bg="#fff" borderRadius={pxToDp(54)}>
            <Image w={pxToDp(74)} h={pxToDp(88)} source={metaData.image} />
          </Center>
          <Text ml={pxToDp(30)} color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
            AIDA Token
          </Text>
          <Text ml={pxToDp(100)} color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
            {metaData.aida}
          </Text>
        </HStack>
        <Box pt={pxToDp(18)} pl={pxToDp(36)} pb={pxToDp(33)}>
          <HStack alignItems="center">
            <Text w={pxToDp(400)} color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
              META Name
            </Text>
            <Text w={pxToDp(598)} color="#181818" fontWeight="bold" fontSize={pxToDp(42)}>
              {metaData.title}
            </Text>
          </HStack>
          <HStack alignItems="center" mt={pxToDp(19)}>
            <Text w={pxToDp(400)} color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
              Role attainment
            </Text>
            <Text w={pxToDp(598)} color="#181818" fontWeight="bold" fontSize={pxToDp(42)}>
              {metaData.level}
            </Text>
          </HStack>
          <HStack alignItems="center" mt={pxToDp(19)}>
            <Text w={pxToDp(400)} color="#181818" fontWeight="500" fontSize={pxToDp(42)}>
              Creation time
            </Text>
            <Text w={pxToDp(598)} color="#181818" fontWeight="bold" fontSize={pxToDp(42)}>
              {getLocalTime(metaData.createTime)}
            </Text>
          </HStack>
        </Box>
      </VStack>
    );
  };
  return (
    <Spin isSpin={isSpin}>
      <ConfirmBaseCom
        buttonText={BUTTON_TEXT}
        pageTitle={PAGE_TITLE}
        render={() => <UseIntentMetaCom />}
        setStep={setStep}
        step={step}
        goBack={() => handleReturnCallbackApp()}
        // clickHandler={() => setStep(2)}
        clickHandler={() => handleClickCome()}
        priority={priority}
        setPriority={setPriority}
        setGasLimit={setGasLimit}
        gasLimit={gasLimit}
      />
      {/* <HStack w="100%" mt="2" px="2%" alignItems="center" justifyContent="space-between">
        <Pressable
          w="15%"
          onPress={() => {
            return navigation.navigate("WalletMainNew", {});
          }}
        >
          <Image alt="img" size="2xs" source={Icons.backIcon}></Image>
        </Pressable>
        <Text flex="1" textAlign="center" fontSize="lg">
          META
        </Text>
        <HStack w="15%"></HStack>
      </HStack>
      <VStack height="100%" alignItems="center" flex="1" mt="6" w="100%">
        <VStack>
          <Text>类型：{metaData.type}</Text>
          <Text>标题：{metaData.title}</Text>
          <Text>描述：{metaData.description}</Text>
          <Text>创建时间：{getLocalTime(metaData.createTime)}</Text>
          <Image source={metaData.image}></Image>
          <Text>aidaToken：{metaData.aida}</Text>
          <HStack>
            <Text>GAS: {priority.maxPriorityFee} GWEI </Text>
            <Pressable
              onPress={() => {
                setPriorityShow(true);
              }}
            >
              <Text color="darkBlue.400">编辑</Text>
            </Pressable>
          </HStack>
        </VStack>
        <Select
          selectedValue={selectBall}
          minWidth="200"
          accessibilityLabel="Choose ball"
          placeholder="Choose ball"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => {
            setSelectBall(itemValue);
            initGas(itemValue);
          }}
        >
          {crystalballList.map((item, index) => {
            return <Select.Item key={index} label={`ballid--${item.ballid}`} value={item.ballid}></Select.Item>;
          })}
        </Select>
        <HStack mt="6" justifyContent="center" alignItems="center">
          <Button
            onPress={() => {
              isOver ?  handleReturnCallbackApp() : handleClickCome();
            }}
            bg="darkBlue.400"
            borderWidth="1"
            borderColor="darkBlue.400"
            w="80%"
          >
            {isOver ? "回到主页" : "META上链"}
          </Button>
        </HStack>
      </VStack>
      <PriorityEdit
        priority={priority}
        setPriority={setPriority}
        setGasLimit={setGasLimit}
        show={priorityShow}
        close={setPriorityShow}
      ></PriorityEdit> */}
    </Spin>
  );
};

export default React.memo(MetaPage);
