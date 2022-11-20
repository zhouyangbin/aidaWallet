import React, { useState, useMemo, useRef } from "react";
import { VStack, HStack, Text, Image } from "native-base";
import Icons from "../../asset/Icon";
import { pxToDp } from "../../../utils/stylesKits";
import { ImageBackground, PermissionsAndroid } from "react-native";
import shadowConFull from "@/../../assets/image/UiImg/shadowConFull.webp";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { getKeyFromMnemonic, createRandomMnemonic, splitMnemonic } from "@/../../api/web3/privateKey";
import global from "../../api/util/global";
import { useNavigation } from "@react-navigation/native";
import { SavePrivateKey, SaveGlobalData } from "@/../../api/localStorge/LocalStroge";
import { resetGlobalWeb3 } from "@/../../api/web3/nativeCoin";
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";
import config from "../../api/util/const";
import { useGlobalStore } from "../../api/Store/globalHook";
import { I18n } from "../../../language/I18n";

/**
 * 生成全局助记词
 */
async function genarateGlobalMnemonic(setMnemonicArray) {
  const mnenonic = await createRandomMnemonic();
  const returnWord = splitMnemonic(mnenonic);
  global.defaultKey.mnemonic = mnenonic;
  setMnemonicArray(returnWord);
}

async function generateAddress(setStep, step, setIsLoading, handleSetGlobalData) {
  const keyData = await getKeyFromMnemonic(global.defaultKey.mnemonic);
  global.defaultKey.address = "0x" + keyData.address;
  global.defaultKey.isSet = true;
  global.defaultKey.privateKey = keyData.privateKey;
  global.defaultKey.publicKey = keyData.publicKey;
  global.keys.push(global.defaultKey);
  global.nativeCoinNetwork = config.nativeCoinNetwork;
  global.defaultNetwork = config.nativeCoinNetwork[0];
  handleSetGlobalData(global);
  // SaveGlobalData(global.CreateNewPassword);
  setIsLoading(false);
  setStep(step + 1);
}

async function storeUserAccount() {
  await SavePrivateKey(global.defaultKey, global.CreateNewPassword);
  //构造web3
  resetGlobalWeb3(global.defaultNetwork.RPC, global.defaultKey.privateKey);
}
async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
      title: "My App Storage Permission",
      message: "My App needs access to your storage " + "so you can save your photos",
    });
    return granted;
  } catch (err) {
    console.error("Failed to request permission ", err);
    return null;
  }
}

const handleGetRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const StepOneComponent = props => {
  const { step, setStep, setMnemonicArray, mnemonicArray = [], showCode, setShowCode } = props;

  return (
    <VStack alignItems="center" pt={pxToDp(22)}>
      <Text mb={pxToDp(89)} fontSize={pxToDp(42)} fontWeight="800">
        {/* Write down your mnemonic */}
        {I18n.t("login.writeDownYourMnemonic")}
      </Text>
      {!showCode ? (
        <>
          <Text fontSize={pxToDp(36)} w={pxToDp(934)}>
            {/* This is your mnemonic phrase, write it down on paper and keep it in a safe place.You will need to re-enter
            this mnemonic (in order) in the next step. */}
            {I18n.t("login.mnemonicPhrase")}
          </Text>
          <VStack
            mt={pxToDp(91)}
            alignItems="center"
            bg="#1F2F65"
            w={pxToDp(998)}
            h={pxToDp(686)}
            borderRadius={pxToDp(30)}
          >
            <Image mt={pxToDp(83)} w={pxToDp(104)} h={pxToDp(91)} source={Icons.eyecWIcon}></Image>
            <Text mt={pxToDp(73)} color="white" fontSize={pxToDp(42)} fontWeight="800">
              {/* Tap to show mnemonic */}
              {I18n.t("login.tapToShowMnemonic")}
            </Text>
            <Text mt={pxToDp(33)} color="white" fontSize={pxToDp(36)}>
              {/* Make sure no one is looking at your screen */}
              {I18n.t("login.makeSureNoOne")}
            </Text>
            <Button
              mt={pxToDp(83)}
              w={pxToDp(388)}
              borderColor="white"
              borderWidth={pxToDp(3)}
              borderRadius={pxToDp(30)}
              bg="transparent"
              type="lg"
              onPress={async () => {
                await genarateGlobalMnemonic(setMnemonicArray);
                setShowCode(true);
              }}
            >
              {/* Check */}
              {I18n.t("login.check")}
            </Button>
          </VStack>
        </>
      ) : (
        <>
          <VStack px={pxToDp(67)}>
            <Text fontSize={pxToDp(35)}>
              {/* Your private backup mnemonic will help you easily backup and restore your account. */}
              {I18n.t("login.privateBackupMnemonic")}
            </Text>
            <Text mt={pxToDp(31)} color="#FB5151" fontWeight="bold" fontSize={pxToDp(35)}>
              {/* Warning: Do not disclose your mnemonic to others. Anyone who has the mnemonic, will be able to take any of
              your items. */}
              {I18n.t("login.warning")}
            </Text>
            <Text mt={pxToDp(31)} fontSize={pxToDp(35)}>
              {/* The following box shows the system-generated mnemonic */}
              {I18n.t("login.generatedMnemonic")}
            </Text>
            <HStack mt={pxToDp(69)} flexWrap="wrap" justifyContent="center">
              {mnemonicArray.map((item, index) => {
                return (
                  <HStack
                    key={index}
                    alignItems="center"
                    justifyContent="center"
                    w={pxToDp(278)}
                    h={pxToDp(85)}
                    bg="#EAEEF6"
                    borderRadius={pxToDp(18)}
                    mt={pxToDp(28)}
                    mx={pxToDp(13)}
                  >
                    <Text>{item}</Text>
                  </HStack>
                );
              })}
            </HStack>
            <HStack mt={pxToDp(121)} justifyContent="center">
              <Text textAlign="center" w={pxToDp(553)} fontSize={pxToDp(35)}>
                {/* After confirming, the seed phrase will be saved in the album */}
                {I18n.t("login.phraseWillBeSaved")}
              </Text>
            </HStack>
          </VStack>
        </>
      )}
      <Button
        onPress={() => {
          setStep(step + 1);
        }}
        isDisabled={!showCode}
        mt={showCode ? pxToDp(41) : pxToDp(201)}
        type="lg"
      >
        {showCode ? I18n.t("login.confirm") : I18n.t("login.continue")}
      </Button>
    </VStack>
  );
};

const StepTwoComponent = props => {
  const { step, setStep, mnemonicArray, loading, setIsLoading, handleSetGlobalData } = props;
  const [word1, setWord1] = useState(null);
  const [word2, setWord2] = useState(null);
  const [word3, setWord3] = useState(null);
  const [word1True, setWord1True] = useState(true);
  const [word2True, setWord2True] = useState(true);
  const [word3True, setWord3True] = useState(true);
  const mnemonicIndexArray = useMemo(() => {
    return [handleGetRandomNum(0, 3), handleGetRandomNum(4, 7), handleGetRandomNum(8, 11)];
  }, [mnemonicArray]);
  return (
    <VStack w="100%" alignItems="center">
      <Text mb={pxToDp(39)} fontSize={pxToDp(57)} fontWeight="800">
        {/* Confirm mnemonic */}
        {I18n.t("login.confirmMnemonic")}
      </Text>
      <Text fontSize={pxToDp(42)} fontWeight="800">
        {/* Please confirm the secret backup mnemonic */}
        {I18n.t("login.confirmSecretMnemonic")}
      </Text>
      <ImageBackground
        resizeMode="stretch"
        source={shadowConFull}
        style={{ width: "100%", height: pxToDp(1200), marginTop: pxToDp(61) }}
      >
        <VStack alignItems="center" pt={pxToDp(49)}>
          <VStack mt={pxToDp(2)} w="100%" px={pxToDp(79)}>
            <Text ml={pxToDp(19)} mb={pxToDp(41)} fontSize={pxToDp(36)} color="#575757">
              {I18n.t("login.pleaseFill")} {mnemonicIndexArray[0] + 1} {I18n.t("login.mnemonic")}
            </Text>
            <Input
              type={"text"}
              onChangeText={value => {
                setWord1(value);
              }}
              onBlur={() => {
                setWord1True(word1 == mnemonicArray[mnemonicIndexArray[0]]);
              }}
            ></Input>
            <Text ml={pxToDp(19)} mt={pxToDp(19)} fontSize={pxToDp(36)} color="#FB5151">
              {word1True ? "" : I18n.t("login.correctMnemonic")}
            </Text>
          </VStack>
          <VStack mt={pxToDp(19)} w="100%" px={pxToDp(79)}>
            <Text ml={pxToDp(19)} mb={pxToDp(41)} fontSize={pxToDp(36)} color="#575757">
              {I18n.t("login.pleaseFill")} {mnemonicIndexArray[1] + 1} {I18n.t("login.mnemonic")}
            </Text>
            <Input
              type={"text"}
              onChangeText={value => {
                setWord2(value);
              }}
              onBlur={() => {
                setWord2True(word2 == mnemonicArray[mnemonicIndexArray[1]]);
              }}
            ></Input>
            <Text ml={pxToDp(19)} mt={pxToDp(19)} fontSize={pxToDp(36)} color="#FB5151">
              {word2True ? "" : I18n.t("login.correctMnemonic")}
            </Text>
          </VStack>
          <VStack mt={pxToDp(19)} w="100%" px={pxToDp(79)}>
            <Text ml={pxToDp(19)} mb={pxToDp(41)} fontSize={pxToDp(36)} color="#575757">
              {I18n.t("login.pleaseFill")} {mnemonicIndexArray[2] + 1} {I18n.t("login.mnemonic")}
            </Text>
            <Input
              type={"text"}
              onChangeText={value => {
                setWord3(value);
              }}
              onBlur={() => {
                setWord3True(word3 == mnemonicArray[mnemonicIndexArray[2]]);
              }}
            ></Input>
            <Text ml={pxToDp(19)} mt={pxToDp(19)} fontSize={pxToDp(36)} color="#FB5151">
              {word3True ? "" : I18n.t("login.correctMnemonic")}
            </Text>
          </VStack>
          <Button
            isLoading={loading}
            isDisabled={!word1True || !word2True || !word3True || !word1 || !word2 || !word3}
            onPress={() => {
              if (
                word1 == mnemonicArray[mnemonicIndexArray[0]] &&
                word2 == mnemonicArray[mnemonicIndexArray[1]] &&
                word3 == mnemonicArray[mnemonicIndexArray[2]]
              ) {
                setIsLoading(true);
                generateAddress(setStep, step, setIsLoading, handleSetGlobalData);
              } else {
                console.log("wrong");
              }
            }}
            mt={pxToDp(53)}
            type="lg"
          >
            {/* Confirm */}
            {I18n.t("login.confirm")}
          </Button>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};

const StepThreeComponent = props => {
  const { mnemonicArray, isIntentLogin, loading, setIsLoading, handleLoadCurrentAddressAssets } = props;
  const navigation = useNavigation();

  const saveRef = useRef();
  return (
    <VStack w="100%" alignItems="center">
      <Text mb={pxToDp(39)} fontSize={pxToDp(57)} fontWeight="800">
        {I18n.t("login.congratulations")}
      </Text>
      <ViewShot
        style={{ backgroundColor: "white", width: "100%" }}
        ref={saveRef}
        options={{ format: "jpg", quality: 1 }}
      >
        <VStack px={pxToDp(51)} w="100%">
          <HStack mr={pxToDp(79)}>
            <Text fontSize={pxToDp(42)} mr={pxToDp(13)} color="#FB5151">
              *
            </Text>
            <Text fontSize={pxToDp(36)}>{I18n.t("login.yourPrivateKeyDesc")}</Text>
          </HStack>
          <VStack mt={pxToDp(37)} ml={pxToDp(33)}>
            <Text fontSize={pxToDp(36)} fontWeight="800">
              {I18n.t("login.yourPrivateKey")}:
            </Text>
            <Text mt={pxToDp(23)} fontSize={pxToDp(36)}>
              {global.defaultKey.privateKey}
            </Text>
          </VStack>
          <HStack mt={pxToDp(33)} mr={pxToDp(79)}>
            <Text fontSize={pxToDp(42)} mr={pxToDp(13)} color="#FB5151">
              *
            </Text>
            <Text fontSize={pxToDp(36)}>
              {/* The public key is your account for logging into your wallet backpack, please don't forget it. */}
              {I18n.t("login.thePublicKeyDesc")}
            </Text>
          </HStack>
          <VStack mt={pxToDp(37)} ml={pxToDp(33)}>
            <Text fontSize={pxToDp(36)} fontWeight="800">
              {/* Your mnemonic is: */}
              {I18n.t("login.yourMnemonicIs")}:
            </Text>
            <Text mt={pxToDp(23)} fontSize={pxToDp(36)}>
              {global.defaultKey.publicKey}
            </Text>
          </VStack>
          <VStack mt={pxToDp(37)} ml={pxToDp(33)}>
            <Text fontSize={pxToDp(36)} fontWeight="800">
              {/* Your mnemonic sequence is: */}
              {I18n.t("login.yourMnemonicSequenceIs")}
            </Text>
            <VStack>
              <HStack mt={pxToDp(35)}>
                {mnemonicArray.map((item, index) => {
                  if (index < 4) {
                    return (
                      <Text key={index} textAlign="center" w={pxToDp(140)} mr={pxToDp(117)} fontSize={pxToDp(36)}>
                        {item}
                      </Text>
                    );
                  }
                })}
              </HStack>
              <HStack mt={pxToDp(35)}>
                {mnemonicArray.map((item, index) => {
                  if (index > 3 && index < 8) {
                    return (
                      <Text key={index} textAlign="center" w={pxToDp(140)} mr={pxToDp(117)} fontSize={pxToDp(36)}>
                        {item}
                      </Text>
                    );
                  }
                })}
              </HStack>
              <HStack mt={pxToDp(35)}>
                {mnemonicArray.map((item, index) => {
                  if (index > 7 && index < 12) {
                    return (
                      <Text key={index} textAlign="center" w={pxToDp(140)} mr={pxToDp(117)} fontSize={pxToDp(36)}>
                        {item}
                      </Text>
                    );
                  }
                })}
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ViewShot>
      <Button
        isLoading={loading}
        textW={pxToDp(463)}
        onPress={async () => {
          setIsLoading(true);
          const res = await requestExternalStoragePermission();
          if (res == "granted") {
            saveRef.current
              .capture()
              .then(uri => {
                console.log(uri);
                CameraRoll.saveToCameraRoll(uri)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(error);
                  })
                  .finally(e => {
                    storeUserAccount()
                      .then(() => {
                        console.log("save user account success!");
                        handleLoadCurrentAddressAssets();
                        if (isIntentLogin) {
                          navigation.navigate("Intent", {});
                        } else {
                          navigation.navigate("WalletMainNew", {});
                        }
                      })
                      .catch(err => {
                        console.log(err, "save password get an exception");
                      })
                      .finally(e => {
                        setIsLoading(false);
                      });
                  });
              })
              .catch(error => {
                setIsLoading(false);
                console.log(error);
              });
          } else {
            setIsLoading(false);
          }
        }}
        mt={pxToDp(113)}
        type="lg"
        fontSize={pxToDp(42)}
        mb={pxToDp(100)}
      >
        {/* Save the private key and generate an pictures */}
        {I18n.t("login.saveThePrivateKeyBtnText")}
      </Button>
    </VStack>
  );
};
const ConfirmMnemonic = props => {
  const { step, setStep, isIntentLogin } = props;
  const [mnemonicArray, setMnemonicArray] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { globalData, handleLoadCurrentAddressAssets, handleSetGlobalData } = useGlobalStore();
  const handleReturnComponent = useMemo(() => {
    switch (step) {
      case 4:
        return (
          <StepOneComponent
            showCode={showCode}
            setShowCode={setShowCode}
            mnemonicArray={mnemonicArray}
            setMnemonicArray={setMnemonicArray}
            step={step}
            setStep={setStep}
          ></StepOneComponent>
        );
      case 5:
        return (
          <StepTwoComponent
            loading={loading}
            setIsLoading={setIsLoading}
            mnemonicArray={mnemonicArray}
            step={step}
            setStep={setStep}
            handleSetGlobalData={handleSetGlobalData}
          ></StepTwoComponent>
        );
      case 6:
        return (
          <StepThreeComponent
            loading={loading}
            setIsLoading={setIsLoading}
            isIntentLogin={isIntentLogin}
            mnemonicArray={mnemonicArray}
            handleLoadCurrentAddressAssets={handleLoadCurrentAddressAssets}
          ></StepThreeComponent>
        );
    }
  }, [step, mnemonicArray, showCode, isIntentLogin]);
  return (
    <VStack flex="1" alignItems="center" bg={step == 4 || step == 6 ? "white" : "transparent"}>
      {handleReturnComponent}
    </VStack>
  );
};

export default React.memo(ConfirmMnemonic);
