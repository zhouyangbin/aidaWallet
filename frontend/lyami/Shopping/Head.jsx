import React from "react";
import { HStack, Pressable, Image, Text } from "native-base";
import { pxToDp, screenWidth, screenHeight } from "../../utils/stylesKits";
import { useNavigation } from "@react-navigation/native";
import Icons from "../asset/Icon";

const Head = props => {
  const { account } = props;
  const navigation = useNavigation();
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Pressable onPress={() => navigation.goBack()}>
        <Image alt="img" w={pxToDp(70)} h={pxToDp(49)} source={Icons.goBackArrowWIcon} />
      </Pressable>
      <HStack pl={pxToDp(14)} pr={pxToDp(71)} alignItems="center" h={pxToDp(93)} borderRadius={pxToDp(47)} bg="#3A4B86">
        <Image alt="img" w={pxToDp(69)} h={pxToDp(69)} source={Icons.coinLogoIcon} />
        <Text textAlign="right" ml={pxToDp(51)} fontSize={pxToDp(46)} color="#fff" fontWeight="bold">
          {account?.money}
        </Text>
      </HStack>
    </HStack>
  );
};

export default React.memo(Head);
