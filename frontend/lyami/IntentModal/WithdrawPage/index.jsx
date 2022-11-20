import React, { useState, useEffect } from "react";
import { HStack, VStack, Image, Text, useToast } from "native-base";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import Spin from "../../component/Spin";
import { handleWithDrawUserCoin } from "../../api/service";
import global from "../../api/util/global";
import { pxToDp } from "../../../utils/stylesKits";
import { NativeModules } from "react-native";
import ConfirmBaseCom from "../ConfirmBaseCom";

const PAGE_TITLE = "Withdraw";
const BUTTON_TEXT = "Redeem now";
async function handleReturnButtonClick() {
  // 生成返回数据
  const returnData = {
    address: global.defaultAddress.call(),
  };
  const msg = JSON.stringify(returnData);
  await NativeModules.NativeIntent.SetIntentResult(msg);
}

const WithDrawPage = props => {
  const toast = useToast();
  const [exchangeMoney, setExchangeMoney] = useState(1);
  const [isSpin, setSpin] = useState(false);
  const navigation = useNavigation();
  const [step, setStep] = useState(1); //1: 提现 or 支付 or 上链 页面   2：成功页面

  const handleClickWithDraw = async () => {
    const intentData = global.intentData;
    if (intentData) {
      setSpin(true);
      try {
        const result = await handleWithDrawUserCoin(0, global.defaultAddress(), exchangeMoney);
        console.log(result);
        setStep(2);
        toast.show({ description: "提现成功", duration: 1500, placement: "top" });
        setSpin(false);
      } catch (error) {
        setSpin(false);
      }
    }
  };

  useEffect(() => {
    const intentData = global.intentData;
    const {
      action,
      data: { money },
    } = intentData;
    setExchangeMoney(money);
    return () => {};
  }, []);

  const goBack = () => {
    navigation.navigate("WalletMainNew", {});
  };

  const UseWithdrawCom = props => {
    return (
      <VStack pb={pxToDp(5)}>
        <HStack mt={pxToDp(80)} alignItems="center" justifyContent="space-between">
          <Text w={pxToDp(457)} textAlign="center" color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
            {exchangeMoney}
          </Text>
          <Image w={pxToDp(83)} h={pxToDp(56)} source={Icons.transformArrowIcon} />
          <Text w={pxToDp(457)} textAlign="center" color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
            {exchangeMoney}
          </Text>
        </HStack>
        <HStack mt={pxToDp(38)} pb={pxToDp(50)}>
          <Text w={pxToDp(499)} textAlign="center" color="#707070" fontWeight="800" fontSize={pxToDp(42)}>
            lottery ticket
          </Text>
          <Text w={pxToDp(499)} textAlign="center" color="#707070" fontWeight="800" fontSize={pxToDp(42)}>
            LEQ
          </Text>
        </HStack>
      </VStack>
    );
  };

  return (
    <Spin isSpin={isSpin} textContent="waiting...">
      <ConfirmBaseCom
        goBack={handleReturnButtonClick}
        clickHandler={handleClickWithDraw}
        setStep={setStep}
        step={step}
        buttonText={BUTTON_TEXT}
        pageTitle={PAGE_TITLE}
        render={() => <UseWithdrawCom />}
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
          提现
        </Text>
        <HStack w="15%"></HStack>
      </HStack>
      <VStack height="100%" alignItems="center" flex="1" mt="6" w="100%">
        <Center mt="6">
          <Text fontSize="30">{exchangeMoney}水晶币</Text>
        </Center>
        <HStack>
          <Box w="10%"/>
          <Box w="36%">
          <Button
            onPress={() => {
              handleClickWithDraw();
            }}
            bg="darkBlue.400"
            borderWidth="1"
            borderColor="darkBlue.400"
            w="80%"
          >
            立即提现
          </Button>
          </Box>
          <Box w="8%" />
          <Box w="36%">
          <Button
            onPress={() => {
              handleReturnButtonClick();
            }}
            bg="darkBlue.400"
            borderWidth="1"
            borderColor="darkBlue.400"
            w="80%"
          >
            返回
          </Button>
          </Box>
          <Box w="10%"></Box>
        </HStack>
      </VStack> */}
    </Spin>
  );
};

export default React.memo(WithDrawPage);
