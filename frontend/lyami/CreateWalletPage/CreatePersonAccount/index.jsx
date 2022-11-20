import React, { useMemo, useState, useCallback } from "react";
import { VStack, StatusBar, HStack, Text, Image, ScrollView, Pressable } from "native-base";
import Icons from "../../asset/Icon";
import { pxToDp } from "../../../utils/stylesKits";
import AccountForm from "./AccountForm";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SelectArea from "./SelectArea";
import KeepWalletSafe from "./KeepWalletSafe";
import ConfirmMnemonic from "./ConfirmMnemonic";
import { NativeModules } from "react-native";
import {I18n } from '../../../language/I18n'

const StepTable = props => {
  const { step } = props;
  const TextItem = props => {
    const { children, active } = props;
    return (
      <Text
        borderColor={active ? "#5C50D2" : "#A1A2A4"}
        h={pxToDp(53)}
        w={pxToDp(54)}
        borderWidth={pxToDp(3)}
        borderRadius={pxToDp(54)}
        fontSize={pxToDp(36)}
        color={active ? "#5C50D2" : "#A1A2A4"}
        textAlign="center"
      >
        {children}
      </Text>
    );
  };
  const TextItemT = props => {
    const { children, active, w } = props;
    return (
      <Text fontSize={pxToDp(27)} textAlign="center" w={`${w}%`} color={active ? "#5C50D2" : "#575757"}>
        {children}
      </Text>
    );
  };

  return (
    <VStack mt={pxToDp(35)} alignItems="center" mb={pxToDp(31)}>
      <HStack alignItems="center">
        <TextItem active={step == 0 || step == 1}>1</TextItem>
        <HStack alignItems="center">
          <HStack w={pxToDp(325)} h={pxToDp(4)} bg="#A1A2A4"></HStack>
          <TextItem active={step == 2 || step == 3}>2</TextItem>
          <HStack w={pxToDp(325)} h={pxToDp(4)} bg="#A1A2A4"></HStack>
        </HStack>
        <TextItem active={step == 4 || step == 5 || step == 6}>3</TextItem>
      </HStack>
      <HStack justifyContent="space-between">
        <TextItemT w={32} active={step == 0 || step == 1}>
          {/* Create account */}
          {I18n.t("login.createAccount")}
        </TextItemT>
        <TextItemT w={36} active={step == 2 || step == 3}>
          {/* Keep your wallet safe */}
          {I18n.t("login.keepYourWalletSafe")}
        </TextItemT>
        <TextItemT w={32} active={step == 4 || step == 5 || step == 6}>
          {/* Confirm mnemonic */}
          {I18n.t("login.confirmMnemonic")}
        </TextItemT>
      </HStack>
    </VStack>
  );
};

const CreatePersonAccount = props => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [showArea, setShowArea] = useState(false);
  const [areaCode, setAreaCode] = useState(null);
  const [passwordFirst, setPasswordFirst] = useState();
  const [isIntentLogin, setIsIntentLogin] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getIntentData = async () => {
        const response = JSON.parse(await NativeModules.NativeIntent.GetIntent());
        if (response?.action == "come" || response?.action == "gameLogin") {
          setIsIntentLogin(true);
        } else {
          setIsIntentLogin(false);
        }
      };
      getIntentData();
      return () => {
        try {
          setIsIntentLogin(false);
        } catch (error) {
          console.log("--------------error----------");
          console.log(error);
          console.log("--------------error----------");
        }
      };
    }, [])
  );

  const handleReturnComponent = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <AccountForm
            setPasswordFirst={setPasswordFirst}
            step={step}
            setStep={setStep}
            areaCode={areaCode}
            setShowArea={setShowArea}
            biometrics={biometrics}
            setBiometrics={setBiometrics}
          ></AccountForm>
        );
      case 1:
        return (
          <AccountForm
            setPasswordFirst={setPasswordFirst}
            step={step}
            setStep={setStep}
            areaCode={areaCode}
            setShowArea={setShowArea}
            biometrics={biometrics}
            setBiometrics={setBiometrics}
          ></AccountForm>
        );
      case 2:
        return (
          <KeepWalletSafe
            biometrics={biometrics}
            setBiometrics={setBiometrics}
            passwordFirst={passwordFirst}
            step={step}
            setStep={setStep}
          ></KeepWalletSafe>
        );
      case 3:
        return (
          <KeepWalletSafe
            biometrics={biometrics}
            setBiometrics={setBiometrics}
            passwordFirst={passwordFirst}
            step={step}
            setStep={setStep}
          ></KeepWalletSafe>
        );
      case 4:
        return <ConfirmMnemonic isIntentLogin={isIntentLogin} step={step} setStep={setStep}></ConfirmMnemonic>;
      case 5:
        return <ConfirmMnemonic isIntentLogin={isIntentLogin} step={step} setStep={setStep}></ConfirmMnemonic>;
      case 6:
        return <ConfirmMnemonic isIntentLogin={isIntentLogin} step={step} setStep={setStep}></ConfirmMnemonic>;
    }
  }, [step, areaCode, passwordFirst, isIntentLogin, biometrics]);
  return (
    <>
      <ScrollView h="100%" bg={step == 4 || step == 6 ? "white" : "#F5F8FA"}>
        <VStack w="100%" h="100%">
          {/* <StatusBar bg="transparent" translucent></StatusBar> */}
          <HStack mt={pxToDp(155)} justifyContent="space-between" alignItems="center">
            <Pressable
              onPress={() => {
                if (step > 0) {
                  return setStep(step - 1);
                }
                navigation.goBack();
              }}
              w="30%"
            >
              <Image ml={pxToDp(41)} source={Icons.goBackArrowBIcon} w={pxToDp(70)} h={pxToDp(49)}></Image>
            </Pressable>
            <HStack justifyContent="center" flex="1">
              <Text lineHeight={pxToDp(50)} fontSize={pxToDp(50)} fontWeight="800">
                Aidameta
              </Text>
            </HStack>
            <HStack w="30%"></HStack>
          </HStack>
          <StepTable step={step}></StepTable>
          {handleReturnComponent}
        </VStack>
      </ScrollView>
      {showArea ? <SelectArea setAreaCode={setAreaCode} show={showArea} close={setShowArea}></SelectArea> : null}
    </>
  );
};

export default React.memo(CreatePersonAccount);
