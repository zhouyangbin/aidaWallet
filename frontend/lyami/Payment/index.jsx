import React, { useMemo, useState, useEffect } from "react";
import PaymentComponent from "./PaymentComponent";
import PaymentForCoinComponent from "./PaymentForCoinComponent";
import SendAddressComponent from "./SendAdressComponent";
import PayOrder from "./PayOrder";
import { HStack, Pressable, Image, VStack, Text, StatusBar } from "native-base";
import Icons from "../asset/Icon.js";
import { useNavigation } from "@react-navigation/native";
// import global from "../api/util/global";
import { pxToDp } from "../../utils/stylesKits";
import { I18n } from "../../language/I18n";
import { useGlobalStore } from "../api/Store/globalHook"
const PaymentIndex = props => {
  const { globalData } = useGlobalStore();
  const {
    route: {
      params: { currentCoin },
    },
  } = props;
  // step 0 输入页面 1 replave assets 2 next step
  const [step, setStep] = useState(0);
  const [selectCoinIndex, setSelectCoinIndex] = useState(globalData.nativeCoinNetwork.length - 1);
  const [inputValue, setInputValue] = useState("");
  const navigation = useNavigation();
  const selectCoin = useMemo(() => {
    return globalData.nativeCoinNetwork[selectCoinIndex];
  }, [selectCoinIndex]);
  useEffect(() => {
    if (currentCoin) {
      globalData.nativeCoinNetwork.filter((value, index, array) => {
        if (value.CoinSymbol == currentCoin.symbol) {
          setSelectCoinIndex(index);
        }
      });
    }
  }, []);
  const showComponent = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <PaymentComponent
            validateInputValue={validateInputValue}
            resetInputValue={resetInputValue}
            inputValue={inputValue}
            selectCoinIndex={selectCoinIndex}
            setSelectCoinIndex={setSelectCoinIndex}
            setStep={setStep}
            selectCoin={selectCoin}
            currentCoin={currentCoin}
          ></PaymentComponent>
        );
      case 1:
        return (
          <PaymentForCoinComponent
            selectCoinIndex={selectCoinIndex}
            setSelectCoinIndex={setSelectCoinIndex}
            setStep={setStep}
          ></PaymentForCoinComponent>
        );
      case 2:
        return <SendAddressComponent payValue={inputValue} selectCoin={selectCoin}></SendAddressComponent>;
      default:
        break;
    }
  }, [step, selectCoinIndex, inputValue]);

  //重置input的值
  function resetInputValue() {
    // setShowModal(true)
    setInputValue("");
  }

  //校验input的值必须为数字
  function validateInputValue(text) {
    text = replaceNoNumber(text);
    setInputValue(text);
  }

  // 限制输入框只能输入数字
  function replaceNoNumber(text) {
    return text.replace(/[^0-9|.]/gi, "");
  }
  return (
    <VStack bg={step == 0 ? "#1f2f65" : "white"} h="100%">
      {/* <StatusBar translucent backgroundColor="transparent"></StatusBar> */}
      <HStack
        h={pxToDp(308)}
        pr={pxToDp(50)}
        pt={pxToDp(70)}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack w="25%">
          <Pressable
            onPress={() => {
              if (step == 0) return navigation.goBack();
              if (step == 2) {
                setStep(0);
              } else {
                setStep(step - 1);
              }
            }}
            ml={pxToDp(41)}
          >
            <Image
              key={step}
              alt="img"
              w={pxToDp(70)}
              h={pxToDp(49)}
              source={step == 0 ? Icons.goBackArrowWIcon : Icons.goBackArrowBIcon}
            ></Image>
          </Pressable>
        </HStack>
        <VStack flex="1" alignItems="center" justifyContent="center">
          <Text
            textAlign="center"
            w="100%"
            color={step == 0 ? "white" : "#181818"}
            fontSize={pxToDp(49)}
            fontWeight="800"
          >
            {/* {step != 2 ? "" : "Send Link"} */}
            {step != 2 ? I18n.t("receive.requestForPay") : I18n.t("receive.sendForUrl")}
          </Text>
        </VStack>
        <HStack w="20%" justifyContent="flex-end">
          {step == 2 ? (
            <Pressable
              onPress={() => {
                return navigation.navigate("WalletMainNew", {});
              }}
            >
              <Image alt="img" w={pxToDp(41)} h={pxToDp(41)} source={Icons.closeIcon} />
            </Pressable>
          ) : null}
        </HStack>
      </HStack>
      {showComponent}
    </VStack>
  );
};

export default React.memo(PaymentIndex);
export { PayOrder };
