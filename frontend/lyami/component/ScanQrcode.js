import React, { useState } from "react";
import { VStack, Text, HStack, Box, Pressable, Image } from "native-base";
import { QRScannerView } from "react-native-qrcode-scanner-view";
import ImagePicker from "react-native-image-crop-picker";
// import LocalBarcodeRecognizer from "react-native-local-barcode-recognizer";
import Icons from "../asset/Icon";

const QRScanner = props => {
  const { callback, back } = props;
  const [torchOn, setTorchOn] = useState(false);
  const RenderTitleBar = () => {
    return (
      <HStack padding="10" alignItems="center" justifyContent="space-between">
        <Pressable
          onPress={() => {
            back();
          }}
        >
          <Box padding="2" backgroundColor="rgba(155,155,155,0.5)" borderRadius="20">
            <Image alt='img' size={4} source={Icons.arrowLeftIconW}></Image>
          </Box>
        </Pressable>
        <Pressable
          onPress={() => {
            handlePickerImage();
          }}
        >
          <Box padding="2" backgroundColor="rgba(155,155,155,0.5)" borderRadius="20">
            <Image alt='img' size={4} source={Icons.albumIcon}></Image>
          </Box>
        </Pressable>
      </HStack>
    );
  };
  const RenderMenu = () => {
    return (
      <HStack paddingBottom="20" alignItems="center" justifyContent="center">
        <Pressable
          onPress={() => {
            setTorchOn(!torchOn);
          }}
        >
          <Box padding="2" backgroundColor="rgba(155,155,155,0.5)" borderRadius="20">
            <Image alt='img' size={6} source={Icons.torchIcon}></Image>
          </Box>
        </Pressable>
      </HStack>
    );
  };
  const handlePickerImage = payload => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      includeBase64: true,
    })
      .then(image => {
        handleImage(image);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleImage = async payload => {
    if (payload.data) {
      // let result = await LocalBarcodeRecognizer.decode(payload.data.replace("data:image/jpeg;base64,", ""), { codeTypes: ["ean13", "qr"] });
      // callback(result);
    }
  };

  const BarcodeReceived = event => {
    callback(event.data);
    // console.log("Type: " + event.type + "\nData: " + event.data);
  };

  return (
    <VStack position="absolute" top="0" h="100%" w="100%">
      <QRScannerView onScanResult={BarcodeReceived} renderHeaderView={RenderTitleBar} renderFooterView={RenderMenu} scanBarAnimateReverse={true} torchOn={torchOn} hintText={null} />
    </VStack>
  );
};

export default QRScanner;
