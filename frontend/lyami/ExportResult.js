import React, { useState, useRef } from "react";
import { View, Text, HStack, Actionsheet, useToast, Center, VStack, Pressable, Image } from "native-base";
import { cloneDeep } from "lodash";
import request from "./api/util/request";
import { lyamiEncrypt } from "./api/util/crypto";
import QR from "react-native-qrcode-svg";
import Clipboard from "@react-native-community/clipboard";
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";
import { useGlobalStore } from "./api/Store/globalHook";
import Button from "./component/Button";
import { pxToDp } from "../utils/stylesKits";
import Icons from "./asset/Icon";
import { useNavigation } from "@react-navigation/native";

const ExportResult = props => {
  const [resResult, setResResult] = useState("");
  const [visible, setVisible] = useState(false);
  const qrCodeRef = useRef(null);
  const toast = useToast();
  const navigation = useNavigation();
  const { globalData } = useGlobalStore();
  const copyClipboard = () => {
    let copyKey = "";
    let userList = props?.route?.params?.userList;
    userList.map(
      (item, index) => (copyKey = copyKey.concat(item.privateKey) + (index + 1 !== userList.length ? ";" : ""))
    );
    // if (copyKey.substring(0, 2) == "0x") {
    //   Clipboard.setString(copyKey.slice(2));
    //   toast.show({ description: "已复制到剪贴板", placement: "top", duration: 3000 });
    // } else {
    Clipboard.setString(copyKey);
    toast.show({ description: "已复制到剪贴板", placement: "top", duration: 3000 });
    // }
  };
  const showQRcode = async () => {
    let globalDataClone = cloneDeep(globalData);
    let userList = props?.route?.params?.userList;
    globalDataClone.keys = userList;
    try {
      const result = await lyamiEncrypt(
        globalDataClone.CreateNewPassword,
        JSON.stringify({
          defaultKey: globalDataClone.defaultKey,
          keys: globalDataClone.keys,
          nativeCoinNetwork: globalDataClone.nativeCoinNetwork,
          defaultNetwork: globalDataClone.defaultNetwork,
          localOrderAddress: globalDataClone.localOrderAddress,
        })
      );
      let resResult = await request.post("/api/wallet/privatekeyshare", result);
      setResResult(resResult?.data);
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const saveToAlbum = () => {
    qrCodeRef.current.toDataURL(res => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/qrCode.png", res, "base64").then(success => {
        CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/qrCode.png", "photo").then(result => {
          toast.show({ description: "保存成功，请前往图库查看", placement: "top", duration: 3000 });
        });
      });
    });
  };
  return (
    <View h="100%" bg="white">
      <HStack pl={pxToDp(41)} pr={pxToDp(41)} mt={pxToDp(150)} alignItems="center" justifyContent="space-between">
        <Pressable
          w="25%"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image w={pxToDp(77)} h={pxToDp(49)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text w="50%" textAlign="center" color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          Derive
        </Text>
        <Text w="25%" />
      </HStack>
      <HStack mt={pxToDp(103)} mb={pxToDp(103)} w="100%" justifyContent="center" alignItems="center">
        <Image w={pxToDp(499)} h={pxToDp(508)} source={Icons.paySuccessIcon} />
      </HStack>
      <HStack mb={pxToDp(101)} justifyContent="center" alignItems="center">
        <Text fontSize={pxToDp(71)} fontWeight="bold">
          Export succeeded
        </Text>
      </HStack>
      <VStack h="16%" paddingTop="2" pb="2" p="10">
        <Button type="lg" marginBottom="6" onPress={copyClipboard}>
          Copy to clipboard
        </Button>
        <Button type="lg" onPress={showQRcode}>
          QR code
        </Button>
      </VStack>
      <Actionsheet isOpen={visible} size="full" onClose={() => setVisible(false)}>
        <Actionsheet.Content>
          <Center>
            <Text marginBottom="4">账户信息二维码</Text>
          </Center>
          <Center>
            <QR getRef={c => (qrCodeRef.current = c)} value={resResult} size={120} />
          </Center>
          <HStack bg="white" paddingTop="2" pb="2">
            <Button width="80%" marginBottom="2" onPress={saveToAlbum}>
              保存至相册
            </Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default ExportResult;
