import React, { useState } from "react";
import { VStack, HStack, Text, Image } from "native-base";
import Icons from "../../asset/Icon";
import lockIcon from "@/../../assets/image/UiImg/lockIcon.webp";
import { pxToDp } from "../../../utils/stylesKits";
import { ImageBackground } from "react-native";
import shadowConFull from "@/../../assets/image/UiImg/shadowConFull.webp";
import shadowConF from "@/../../assets/image/UiImg/shadowConF.webp";
import Button from "../../component/Button";
import Input from "../../component/Input";
import global from "../../api/util/global";
import FingerprintPopup from "../../CreateWalletPage/CreatePersonAccount/FingerPrint";
import {I18n} from '../../../language/I18n'

const lelArray = [...new Array(3).keys()];
const KeepWalletSafe = props => {
  const { step, setStep, passwordFirst, biometrics } = props;
  const [safeLvl, setSafeLvl] = useState(1);
  const [passwordSecond, setPasswordSecond] = useState(null);
  const [passwordSecondRight, setPasswordSecondRight] = useState(true);
  const [fingerPrint, setFingerPrint] = useState({
    errorMessage: undefined,
    biometric: undefined,
    popupShowed: false,
  });
  const handleFingerprintShowed = () => {
    if (biometrics) {
      setFingerPrint({
        ...fingerPrint,
        popupShowed: true,
      });
    } else {
      setStep(step + 1);
    }
  };
  //   const [isKnown, setIsKnown] = useState(false);
  return (
    <VStack alignItems="center" flex="1">
      {fingerPrint.popupShowed ? (
        <FingerprintPopup
          fingerPrint={fingerPrint}
          success={() => {
            setStep(step + 1);
          }}
          setFingerPrint={setFingerPrint}
        />
      ) : null}
      {step == 2 ? (
        <>
          <VStack alignItems="center" zIndex="10">
            <Text  fontSize={pxToDp(57)} fontWeight="800">
              {/* Keep your wallet safe */}
              {I18n.t("login.keepYourWalletSafe")}
            </Text>
            <Text mt={pxToDp(22)}  fontSize={pxToDp(36)}>
              {/* Protect your wallet  */}
              {I18n.t("register.doNotRiskForMoney2")}
              <Text color="#5C50D2"> {I18n.t("login.mnemonic")}</Text>
            </Text>
            <HStack mt={pxToDp(29)} alignItems="center">
              <Image mr={pxToDp(11)} w={pxToDp(26)} h={pxToDp(26)} source={Icons.noticeBlueIcon}></Image>
              <Text  fontSize={pxToDp(41)} fontWeight="bold" color="#5C50D2">
                {/* Why it matters?  */}
                {I18n.t("login.itMatters")}
              </Text>
            </HStack>
            <Image mt={pxToDp(19)} w={pxToDp(172)} h={pxToDp(214)} source={lockIcon}></Image>
          </VStack>
          <ImageBackground
            resizeMode="stretch"
            source={shadowConFull}
            style={{ width: "100%", marginTop: pxToDp(-110), paddingBottom: pxToDp(119) }}
          >
            <VStack alignItems="center" w="100%" px={pxToDp(33)}>
              <HStack mt={pxToDp(62)} w="100%">
                <Text ml={pxToDp(67)} fontSize={pxToDp(50)} fontWeight="800">
                   {I18n.t("login.manual")}
                </Text>
              </HStack>
              <Text ml={pxToDp(55)} mr={pxToDp(90)} mt={pxToDp(45)} fontSize={pxToDp(36)}>
                {/* Write your mnemonic phrase on a piece of paper and store it in a safe place */}
                {I18n.t("login.writeYourMnemonic")}
              </Text>
              <VStack mt={pxToDp(50)} px={pxToDp(67)} w="100%">
                <Text fontSize={pxToDp(36)} fontWeight="bold">
                {I18n.t("login.securityLevel")}: {safeLvl == 0 ? I18n.t("login.low") : safeLvl == 1 ? I18n.t("login.secondary") : I18n.t("login.strong")}
                </Text>
                <HStack mt={pxToDp(29)}>
                  {lelArray.map((item, index) => {
                    return (
                      <HStack
                        key={index}
                        mr={pxToDp(14)}
                        w={pxToDp(140)}
                        h={pxToDp(14)}
                        bg={index > safeLvl ? "#E0E0E0" : "#5C50D2"}
                      ></HStack>
                    );
                  })}
                </HStack>
                <Text mt={pxToDp(49)} mb={pxToDp(29)} fontSize={pxToDp(42)} fontWeight="bold">
                   {I18n.t("login.riskIs")}:
                </Text>
                <VStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize={pxToDp(36)}>
                      <Text fontSize={pxToDp(42)} color="#FB5151">
                        *
                      </Text>
                      {/* You lose it */}
                      {I18n.t("login.youLoseIt")}
                    </Text>
                    <Text fontSize={pxToDp(36)}>
                      <Text fontSize={pxToDp(42)} color="#FB5151">
                        *
                      </Text>
                      {/* Where you forgot  */}
                      {I18n.t("login.whereYouForgot")}
                    </Text>
                  </HStack>
                  <Text fontSize={pxToDp(36)}>
                    <Text fontSize={pxToDp(42)} color="#FB5151">
                      *
                    </Text>
                    {/* Someone else posted it  */}
                    {I18n.t("login.someoneElsePost")}
                  </Text>
                </VStack>
                <Text mt={pxToDp(50)} fontWeight="bold" fontSize={pxToDp(36)}>
                  {/* Other options:Not necessarily paper  */}
                  {I18n.t("login.otherOption")}
                </Text>
                <Text mt={pxToDp(49)} mb={pxToDp(29)} fontSize={pxToDp(42)} fontWeight="bold">
                  {I18n.t("login.hint")}:
                </Text>
                <VStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize={pxToDp(36)}>
                      <Text fontSize={pxToDp(42)} color="#FB5151">
                        *
                      </Text>
                      {/* Stored in bank vaults  */}
                      {I18n.t("login.storeInBankVaults")}
                    </Text>
                    <Text fontSize={pxToDp(36)}>
                      <Text fontSize={pxToDp(42)} color="#FB5151">
                        *
                      </Text>
                      {/* Stored in a safe */}
                       {I18n.t("login.storeInSafe")}
                    </Text>
                  </HStack>
                  <Text fontSize={pxToDp(36)}>
                    <Text fontSize={pxToDp(42)} color="#FB5151">
                      *
                    </Text>
                    {/* Stored in multiple secret locations  */}
                    {I18n.t("login.storeInMultiple")}
                  </Text>
                </VStack>
              </VStack>
              <Button onPress={() => handleFingerprintShowed()} mt={pxToDp(43)} type="lg">
                {I18n.t("login.start")}
              </Button>
            </VStack>
          </ImageBackground>
        </>
      ) : (
        <VStack w="100%" alignItems="center" zIndex="10">
          <Text mb={pxToDp(63)} fontSize={pxToDp(57)} fontWeight="800">
            {/* Confirm your password  */}
            {I18n.t("login.confirmYourPassword")}
          </Text>
          <ImageBackground source={shadowConFull} resizeMode="stretch" style={{ width: "100%", height: pxToDp(741) }}>
            <VStack w="100%" h="100%" alignItems="center" justifyContent="space-between">
              <VStack mt={pxToDp(79)}>
                <Text ml={pxToDp(45)}>{I18n.t("login.beforeContinuing")}</Text>
                <ImageBackground
                  source={shadowConF}
                  resizeMode="stretch"
                  style={{
                    width: pxToDp(998),
                    height: pxToDp(162),
                    marginTop: pxToDp(45),
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Input
                    type="password"
                    onChangeText={value => setPasswordSecond(value)}
                    borderWidth="0"
                    w="80%"
                    h="69%"
                  ></Input>
                </ImageBackground>
                {passwordSecondRight ? null : (
                  <Text ml={pxToDp(45)} mt={pxToDp(19)} lineHeight={pxToDp(36)} fontSize={pxToDp(36)} color="#FB5151">
                     {I18n.t("login.passCorrectTips")}
                  </Text>
                )}
              </VStack>
              <Button
                isDisabled={!passwordSecond}
                onPress={() => {
                  if (!passwordFirst || !passwordSecond) return;
                  if (passwordFirst != passwordSecond) return setPasswordSecondRight(false);
                  setPasswordSecondRight(true);
                  global.CreateNewPassword = passwordFirst;
                  setStep(step + 1);
                }}
                mb={pxToDp(100)}
                type="lg"
              >
                 {I18n.t("register.submit")}
              </Button>
            </VStack>
          </ImageBackground>
        </VStack>
      )}
    </VStack>
  );
};

export default React.memo(KeepWalletSafe);
