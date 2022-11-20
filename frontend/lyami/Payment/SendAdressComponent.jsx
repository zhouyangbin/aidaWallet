import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, AlertDialog, useToast, VStack } from "native-base";
import QR from "react-native-qrcode-svg";
import Clipboard from "@react-native-community/clipboard";
import ShareComponent from "../component/ShareComponent";
import { pxToDp } from "../../utils/stylesKits";
import Button from "../component/Button";
import RNFS from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { I18n } from "../../language/I18n";
import {useGlobalStore} from "../api/Store/globalHook";
//复制到剪贴板
const copyToBoard = (urlAddress, setCopyShow) => {
  try {
    Clipboard.setString(urlAddress);
    setCopyShow(true);
  } catch (e) {
    console.log(e, "err");
  }
};
//二维码
const generateQrcode = setIsOpen => {
  setIsOpen(true);
  // navigation.navigate('Payment', {});
};
//发送链接
const sendUrl = async props => {
  const { setShowModal, urlAddress } = props;
  try {
    const res = await Clipboard.getString();
    console.log(res, "从剪贴板获取数据");
  } catch (err) {
    console.log("从剪贴板获取数据失败，", err);
  }
  setShowModal(true);
};

const QrcodeComponent = props => {
  const { cancelRef, isOpen, onClose, urlAddress } = props;
  const qrCodeRef = useRef(null);
  const toast = useToast()
  // 保存到相册
  const saveToAlbum = () => {
    console.log(qrCodeRef);
    qrCodeRef.current.toDataURL(res => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/qrCode.png", res, "base64").then(success => {
        CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/qrCode.png", "photo").then(result => {
          toast.show({ description: "保存成功，请前往图库查看", placement: "top", duration: 3000 });
        });
      });
    });
  };
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content w={pxToDp(781.5)}  paddingBottom="4">
        <AlertDialog.CloseButton />
        <AlertDialog.Body alignItems="center" paddingBottom="4">
          <Text fontSize={pxToDp(50)} fontWeight="bold" mb={pxToDp(44)} w={pxToDp(400)} textAlign="center">
            {/* Payment request QR code */}
            {I18n.t('receive.paymentRequestQRcode')}
          </Text>
          <QR getRef={c => (qrCodeRef.current = c)} value={urlAddress} size={pxToDp(344)} />
          <Button type='lg' mt={pxToDp(71)} h={pxToDp(121)} w={pxToDp(661)}  bg="transparent" borderWidth={pxToDp(3)} borderColor="#5C50D2" mb={pxToDp(10)} color="#5C50D2" onPress={() => saveToAlbum()}>
            {/* Save to album */}
            {I18n.t('receive.saveToAlbum')}
          </Button>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
const CopyComponent = props => {
  const { isOpen, onClose } = props;
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content w={pxToDp(781.5)} justifyContent="center" alignItems="center">
        <AlertDialog.CloseButton />
        <AlertDialog.Body h={pxToDp(640)} alignItems="center" justifyContent="center">
          <Text fontSize={pxToDp(50)} fontWeight="bold" mb={pxToDp(44)} textAlign="center">
            {/* Link copied to clipboard */}
            {I18n.t('receive.copySuccessToast')}
            
          </Text>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
const generateAdressUrl = payload => {
  // let contractAdress = "0x33ADE90491363a1d08332F23693BAf85C666C2d8";
  return JSON.stringify(payload);
};
const SendAdressComponent = props => {
  const { globalData } = useGlobalStore();
  const { payValue, selectCoin } = props;
  const cancelRef = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [urlAddress, seturlAddress] = useState("");
  const [copyShow, setCopyShow] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    seturlAddress(
      generateAdressUrl({
        action: "pay",
        type: 2,
        address: globalData.defaultAddress.call(),
        value: payValue,
        coin: selectCoin.CoinSymbol,
        chainId: selectCoin.ChainId,
      })
    );
  }, [props]);

  return (
    <>
      <ShareComponent showModal={showModal} setShowModal={setShowModal}></ShareComponent>
      <QrcodeComponent
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        urlAddress={urlAddress}
      ></QrcodeComponent>
      <CopyComponent
        // leastDestructiveRef={cancelRef}
        isOpen={copyShow}
        setIsOpen={setCopyShow}
        onClose={() => {
          setCopyShow(false);
        }}
      ></CopyComponent>
      <VStack alignItems="center" w="100%" flex="1" pb={pxToDp(100)}>
        <Text fontSize={pxToDp(36)} mb={pxToDp(41)}>
          {/* Your request link is ready to sent! */}
          
          {I18n.t('receive.sendUrlDesc1')}
        </Text>
        <Text textAlign="center" fontSize={pxToDp(36)} mb={pxToDp(41)}>
          {/* Send this link to a friend and then it will ask them to send */}
          {I18n.t('receive.sendUrlDesc2')}
        </Text>
        <Text fontSize={pxToDp(36)}>{`${payValue}${selectCoin.CoinSymbol}`}</Text>

        {/* <HStack>
          <Center>
            <Button _text={{ color: "darkBlue.400" }} w="40" variant="Unstyled" onPress={() => goback(navigation)}>
              链接地址
            </Button>
          </Center>
        </HStack> */}
        <VStack justifyContent="flex-end" alignItems="center" w="100%" flex="1">
          <Button type="lg" bg="transparent" borderWidth={pxToDp(3)} borderColor="#5C50D2" mb={pxToDp(43)} color="#5C50D2" onPress={() => copyToBoard(urlAddress, setCopyShow)}>
            {/* Copy to clipboard */}
            {I18n.t('receive.copyToClipboard')}
          </Button>
          <Button type="lg" bg="transparent" borderWidth={pxToDp(3)} borderColor="#5C50D2" mb={pxToDp(43)} color="#5C50D2" onPress={() => generateQrcode(setIsOpen)}>
            {/* QR Code */}
            {I18n.t('receive.Qrcode')}
          </Button>
          <Button type="lg" mb={pxToDp(133)} onPress={() => sendUrl({ setShowModal, urlAddress })}>
            {/* Send link */}
            {I18n.t('receive.sendForUrl')}
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default SendAdressComponent;
