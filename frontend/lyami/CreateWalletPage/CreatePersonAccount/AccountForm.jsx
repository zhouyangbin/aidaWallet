import React, { useState, useEffect } from "react";
import { VStack, HStack, Text, Image, Pressable } from "native-base";
import { pxToDp } from "../../../utils/stylesKits";
import Input from "../../component/Input";
import Icons from "../../asset/Icon";
import Button from "../../component/Button";
import { ImageBackground, NativeModules, NativeEventEmitter } from "react-native";
import shadowConFull from "@/../../assets/image/UiImg/shadowConFull.webp";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import { useNavigation } from "@react-navigation/native";
import { handleGetPhoneCode, handleVerificationPhoneCode, handleGetEmailCode, handleVerificationEmailCode } from "../../api/service";
import GetCode from "../../component/GetCode";
import TextModal from "../../component/TextModal";
import { I18n } from "../../../language/I18n";

const captchaHelper = NativeModules.NTESCaptchaHelper; //对象创建
captchaHelper.init({
  captcha_id: "af02bc0c53354f429e0c7c07d4900bf8",
  is_no_sense_mode: false,
  language_type: "en-US",
  is_close_button_bottom: true,
  styleConfig: {
    radius: pxToDp(30),
    capBarBorderColor: "transparent",
    capBarTextColor: "#181818",
    capBarTextSize: pxToDp(54),
    capBarTextWeight: "800",
    capBodyPadding: pxToDp(53),
    capPaddingTop: pxToDp(0),
    borderColor: "transparent",
    background: "#5C50D2",
    borderColorMoving: "transparent",
    backgroundMoving: "#E3E6EB",
    height: pxToDp(140),
    borderRadius: pxToDp(19),
    slideBackground: "#5C50D2",
    textSize: 0,
  },
});
// const typeArray = [ I18n.t("login.mail"), I18n.t("login.cellphoneNumber")];

const TypeSwitch = props => {
  // const typeArray = [ I18n.t("login.mail"), I18n.t("login.cellphoneNumber")];
  const typeArray = [I18n.t("login.mail")]; //先注释手机号注册
  const { type, setType } = props;
  const TypeItem = props => {
    const { children, onclick, active } = props;
    return (
      <ImageBackground resizeMode="stretch" source={active ? shadowCon : null}>
        <Pressable
          bg={active ? "white" : "#ECEFF5"}
          w={pxToDp(270)}
          h={pxToDp(70)}
          borderRadius={pxToDp(10)}
          //   shadow={active ? 0 : null}
          alignItems="center"
          justifyContent="center"
          onPress={onclick}
        >
          <Text fontSize={pxToDp(30)} color={active ? "#181818" : "#808080"}>
            {children}
          </Text>
        </Pressable>
      </ImageBackground>
    );
  };
  return (
    <HStack alignItems="center" justifyContent="space-around" ml={pxToDp(79)} w={pxToDp(594)} h={pxToDp(88)} bg="#ECEFF5" borderRadius={pxToDp(16)}>
      {typeArray.map((item, index) => {
        return (
          <TypeItem
            key={index}
            active={type == index}
            onclick={() => {
              setType(index);
            }}
          >
            {item}
          </TypeItem>
        );
      })}
    </HStack>
  );
};
const valid = (value, type, setter, controller) => {};
const AccountForm = props => {
  const { setShowArea, areaCode, step, setStep, setPasswordFirst, biometrics, setBiometrics } = props;
  const navigation = useNavigation();
  const [type, setType] = useState(0);
  const [emailValue, setEmailValue] = useState(null);
  const [emailValueCorrect, setEmailValueCorrect] = useState(true);
  const [phoneNum, setPhoneNum] = useState(null);
  const [phoneValueCorrect, setPhoneValueCorrect] = useState(true);
  const [showPassWord, setShowPassWord] = useState(false);
  const [phoneCode, setPhoneCode] = useState(null);
  const [isCodeRight, setIsCodeRight] = useState(true);
  const [tipSelect, setTipSelect] = useState(false);
  const [passwordFirstCorrect, setPasswordFirstCorrect] = useState(true);
  const [focusInput, setFocusInput] = useState(false);
  const [textModalShow, setTextModalShow] = useState(false);
  const [textType, setTextType] = useState(0);
  const [readState, setReadState] = useState(false);
  // const [isCaptchaed, setIdCaptchaed] = useState(false);

  useEffect(() => {
    const NTESRNRouterEmitter = new NativeEventEmitter(NativeModules.NTESCaptchaHelper);
    NTESRNRouterEmitter.addListener("onSuccess", event => {
      // validate：返回的结果码
      // if (event.result) {
      //   if (type == 0) {
      //     //email
      //     handleGetEmailCode(emailValue);
      //   } else {
      //     //phone
      //     handleGetPhoneCode(phoneNum);
      //     setStep(step + 1);
      //   }
      // }
      setStep(step + 1);
    });
    return () => {
      NTESRNRouterEmitter.removeListener("onSuccess", e => {
        console.log(e);
      });
    };
  }, []);

  return (
    <VStack alignItems="center" flex="1">
      {step == 1 ? (
        <>
          <HStack>
            <Text fontSize={pxToDp(42)} fontWeight="800">
              {type == 0 ? I18n.t("login.emailVerification") : I18n.t("login.phoneNumberVerification")}
            </Text>
          </HStack>
          <HStack mt={pxToDp(97)} w={pxToDp(940)} mb={pxToDp(62)}>
            {type == 0 ? (
              <Text fontSize={pxToDp(36)} fontWeight="400">
                {I18n.t("register.pleaseEnterEmail")} {emailValue}
                {I18n.t("register.receivePromo")}
              </Text>
            ) : (
              <Text fontSize={pxToDp(36)} fontWeight="400">
                {I18n.t("register.pleaseEnterCellPhone")} {phoneNum}
                {I18n.t("register.receivePromo")}
              </Text>
            )}
          </HStack>
          <ImageBackground source={shadowConFull} resizeMode="stretch" style={{ width: "100%", height: pxToDp(686) }}>
            <VStack mt={pxToDp(62)} w="100%" px={pxToDp(79)}>
              <Text ml={pxToDp(19)} mb={pxToDp(41)} fontSize={pxToDp(36)} color="#575757">
                {type == 0 ? I18n.t("login.emailVerificationCode") : I18n.t("login.mobileVerificationCode")}
              </Text>
              <GetCode
                onChangeText={value => {
                  setPhoneCode(value);
                }}
                onPress={() => {
                  type == 0 ? handleGetEmailCode(emailValue) : handleGetPhoneCode(phoneNum);
                }}
              ></GetCode>

              <Text ml={pxToDp(19)} mt={pxToDp(10)} lineHeight={pxToDp(50)} fontSize={pxToDp(36)} color="#FB5151">
                {isCodeRight ? "" : I18n.t("login.emailTips")}
              </Text>
            </VStack>
            <VStack mt={pxToDp(99)} flex="1" alignItems="center" justifyContent="space-between">
              <Button
                onPress={async () => {
                  const res = type == 0 ? await handleVerificationEmailCode(emailValue, phoneCode) : await handleVerificationPhoneCode(phoneNum, phoneCode);
                  const { data } = res;
                  if (data) {
                    setStep(step + 1);
                  } else {
                    setIsCodeRight(false);
                  }
                }}
                type="lg"
              >
                {I18n.t("register.submit")}
              </Button>
              <HStack w="100%" mb={pxToDp(59)} mt={pxToDp(16)}>
                <Text ml={pxToDp(97)} color="#5C50D2" fontSize={pxToDp(36)}>
                  {I18n.t("login.verificationCodeNotReceived")}
                </Text>
              </HStack>
            </VStack>
          </ImageBackground>
        </>
      ) : (
        <>
          <HStack>
            <Text fontSize={pxToDp(42)} fontWeight="800">
              {/* Create a personal account */}
              {I18n.t("login.createPersonalAccount")}
            </Text>
          </HStack>
          <ImageBackground source={shadowConFull} resizeMode="stretch" style={{ width: "100%", paddingBottom: pxToDp(100) }}>
            <VStack w="100%" alignItems="center">
              {/* <HStack mt={pxToDp(63)} w="100%">
                <TypeSwitch type={type} setType={setType}></TypeSwitch>
              </HStack> */}
              {type == 0 ? (
                <VStack mt={pxToDp(26)} w="100%" px={pxToDp(79)}>
                  <Text ml={pxToDp(19)} mb={pxToDp(22)} fontSize={pxToDp(36)} color="#575757">
                    {/* Personal email */}
                    {I18n.t("register.personalEmail")}
                  </Text>
                  <Input
                    onChangeText={value => {
                      setEmailValue(value);
                    }}
                    onBlur={e => {
                      const emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
                      setEmailValueCorrect(emailReg.test(emailValue));
                    }}
                  ></Input>
                  {emailValueCorrect ? null : (
                    <Text ml={pxToDp(19)} mt={pxToDp(19)} fontSize={pxToDp(36)} color="#FB5151">
                      {/* Please input the correct email address */}
                      {I18n.t("register.emailValidateTips")}
                    </Text>
                  )}
                </VStack>
              ) : (
                <VStack mt={pxToDp(46)} w="100%" px={pxToDp(79)}>
                  <Text ml={pxToDp(19)} mb={pxToDp(41)} fontSize={pxToDp(36)} color="#575757">
                    {/* Personal phone number */}
                    {I18n.t("login.cellphoneNumber")}
                  </Text>
                  <HStack w={pxToDp(922)} h={pxToDp(111)} borderRadius={pxToDp(19)} borderWidth={pxToDp(2)} borderColor={focusInput ? "#5C50D2" : "#AFBAC5"} alignItems="center">
                    <Pressable
                      h="100%"
                      justifyContent="center"
                      onPress={() => {
                        setShowArea(true);
                      }}
                    >
                      <HStack
                        w={pxToDp(320)}
                        h={pxToDp(52)}
                        alignItems="center"
                        borderRightWidth={pxToDp(3)}
                        // borderColor="#DDDFE3"
                        borderColor={focusInput ? "#5C50D2" : "#AFBAC5"}
                        justifyContent="space-between"
                      >
                        <Image alt="img" ml={pxToDp(32)} w={pxToDp(38)} h={pxToDp(52)} source={Icons.positionIcon}></Image>
                        <Text lineHeight={pxToDp(49)} fontsize={pxToDp(36)}>
                          + {areaCode}
                        </Text>
                        <Image alt="img" mr={pxToDp(50)} w={pxToDp(28)} h={pxToDp(19)} source={Icons.arrowDownGIcon}></Image>
                      </HStack>
                    </Pressable>
                    <Input
                      onFocus={() => {
                        setFocusInput(true);
                      }}
                      onBlur={e => {
                        console.log(22);
                        setFocusInput(false);
                        const phoneReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
                        setPhoneValueCorrect(phoneReg.test(phoneNum));
                      }}
                      onChangeText={value => {
                        setPhoneNum(value);
                      }}
                      h={pxToDp(103)}
                      borderWidth="0"
                      flex="1"
                      mr={pxToDp(11)}
                    ></Input>
                  </HStack>
                  {phoneValueCorrect ? null : (
                    <Text ml={pxToDp(19)} mt={pxToDp(19)} lineHeight={pxToDp(36)} fontSize={pxToDp(36)} color="#FB5151">
                      {/* Please input the correct phone number */}
                      {I18n.t("login.cellPhoneNumberValidateTips")}
                    </Text>
                  )}
                </VStack>
              )}
              <VStack mt={pxToDp(42)} w="100%" px={pxToDp(79)}>
                <Text ml={pxToDp(19)} mb={pxToDp(22)} fontSize={pxToDp(36)} color="#575757">
                  {/* Password */}
                  {I18n.t("login.password")}
                </Text>
                <Input
                  type={showPassWord ? "number" : "password"}
                  onChangeText={value => {
                    const passReg = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                    /* 至少一个大写字母，一个数字，8位 */
                    if (value.length >= 8) {
                      setPasswordFirstCorrect(passReg.test(value));
                    }
                    setPasswordFirst(value);
                  }}
                  InputRightElement={
                    <Pressable h="100%" w={pxToDp(87)} justifyContent="center" onPress={() => setShowPassWord(!showPassWord)}>
                      <Image alt="img" key={showPassWord} w={pxToDp(57)} h={pxToDp(49)} source={showPassWord ? Icons.eyeSIcon : Icons.eyeCIcon}></Image>
                    </Pressable>
                  }
                ></Input>
                {passwordFirstCorrect ? null : (
                  <Text ml={pxToDp(19)} mt={pxToDp(10)} lineHeight={pxToDp(50)} fontSize={pxToDp(36)} color="#FB5151">
                    {/* At least 8 characters, must contain 1 uppercase letter and 1 digit */}
                    {I18n.t("register.passwordValidateTips")}
                  </Text>
                )}
              </VStack>
              {/* <HStack mt={pxToDp(37)} w="100%" alignItems="center" justifyContent="space-between">
                <Text ml={pxToDp(97)} fontSize={pxToDp(42)}>
                  {I18n.t("register.signInWithBiometrics")}
                </Text>
                <Pressable
                  onPress={() => {
                    setBiometrics(!biometrics);
                  }}
                  mr={pxToDp(124)}
                >
                  <Image
                    alt="img"
                    key={biometrics}
                    w={pxToDp(135)}
                    h={pxToDp(69)}
                    source={biometrics ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
                  ></Image>
                </Pressable>
              </HStack> */}
              <Pressable onPress={() => setTipSelect(!tipSelect)}>
                <HStack mt={pxToDp(40)} w="100%" alignItems="flex-start">
                  <Image alt="img" ml={pxToDp(5)} mr={pxToDp(17)} w={pxToDp(47)} h={pxToDp(47)} mt={pxToDp(7)} key={tipSelect} source={tipSelect ? Icons.selectedIcon : Icons.notSelectIcon}></Image>

                  <VStack>
                    <Text w={pxToDp(740)} fontSize={pxToDp(36)} color="#B2B2B2">
                      {I18n.t("register.IHaveRead")}
                    </Text>
                    <HStack>
                      <Pressable
                        onPress={() => {
                          setTextType(0);
                          setTextModalShow(true);
                        }}
                      >
                        <Text fontSize={pxToDp(36)} color="#2E2E2E">
                          {I18n.t("register.service")}
                        </Text>
                      </Pressable>
                      <Text fontSize={pxToDp(36)} color="#B2B2B2">
                        {I18n.t("register.and")}
                      </Text>
                      <Pressable
                        onPress={() => {
                          setTextType(1);
                          setTextModalShow(true);
                        }}
                      >
                        <Text fontSize={pxToDp(36)} color="#2E2E2E">
                          {I18n.t("register.privacyPolice")}
                        </Text>
                      </Pressable>
                    </HStack>
                    {readState ? (
                      <Text mt={pxToDp(10)} w={pxToDp(828)} color="#FF4F4F" fontsize={pxToDp(36)}>
                        {I18n.t("register.over18Years")}
                      </Text>
                    ) : null}
                  </VStack>
                </HStack>
              </Pressable>
              <Button
                // isDisabled={!tipSelect}
                bg={!tipSelect ? '#ddd' : '#5c50d2'}
                onPress={() => {
                  console.log(tipSelect, 'tipselect');
                  if(!tipSelect) {

                    setReadState(true)
                    return
                  }
                  captchaHelper.showCaptcha();
                }}
                mt={pxToDp(49)}
                type="lg"
              >
                {I18n.t("login.createPersonalAccount")}
              </Button>
              {/* <VStack pl={pxToDp(143.5)} w="100%" mt={pxToDp(47)}>
                <Text fontsize={pxToDp(35)}>{I18n.t("login.notWantingToCreateAPersonalAccount")}</Text>
                <Text mt={pxToDp(13)} fontsize={pxToDp(35)} color="#5C50D2">
                  {I18n.t("login.signRorBusAccount")}
                </Text>
              </VStack> */}
            </VStack>
          </ImageBackground>
        </>
      )}
      <TextModal type={textType} isOpen={textModalShow} onClose={setTextModalShow}></TextModal>
    </VStack>
  );
};

export default React.memo(AccountForm);
