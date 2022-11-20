import React, { useState } from "react";
import { HStack, VStack, Image, Text, Pressable, Box, Select } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
// import { center } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";
import ToolHead from "./ToolHead"
const Notice = props => {
  const navigation = useNavigation();

  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [face, setFace] = useState(false);

  const showLanguageCom = () => {
    console.log(111);
    setStep(2);
    // setIsShow(true);
  };

  return (
    <VStack w={screenWidth} h={screenHeight} bg="#fff" position="absolute">
      {/* 顶部导航栏 start  */}
      <ToolHead title={I18n.t("setting.remind")} type="remind"/>
      <Box h="100%" bg="#efefef" pt={pxToDp(41)}>
        <HStack style={[styles.listBox]}>
          <Text style={[styles.boxText]} maxWidth={pxToDp(800)}>
          {I18n.t("setting.remindTitle1")}
          </Text>
          <Pressable
            w={pxToDp(130)}
            onPress={() => {
              setPassword(!password);
            }}
          >
            <Image
              key={password}
              w={pxToDp(135)}
              h={pxToDp(69)}
              source={password ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
            ></Image>
          </Pressable>
        </HStack>
        <HStack style={[styles.listBox]} borderTopWidth={pxToDp(1)} borderColor="#bbc0c5">
          <Text style={[styles.boxText]} maxWidth={pxToDp(800)}>
          {I18n.t("setting.remindTitle2")}

          </Text>
          <Pressable
            w={pxToDp(130)}
            onPress={() => {
              setPointer(!pointer);
            }}
          >
            <Image
              key={pointer}
              w={pxToDp(135)}
              h={pxToDp(69)}
              source={pointer ? Icons.openSwitchIcon : Icons.closeSwitchIcon}
            ></Image>
          </Pressable>
        </HStack>
      </Box>
    </VStack>
  );
};
const styles = StyleSheet.create({
  listBox: {
    paddingTop: pxToDp(30),
    paddingRight: pxToDp(30),
    paddingLeft: pxToDp(50),
    paddingBottom: pxToDp(30),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  boxText: {
    color: "#181818",
    fontWeight: "600",
    fontSize: pxToDp(41),
  },
});
export default React.memo(Notice);
