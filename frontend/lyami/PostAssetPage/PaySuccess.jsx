import React, { useRef, useState } from "react";
import { HStack, VStack, Image, Text, Center, Pressable } from "native-base";
import Icons from "../../lyami/asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { pxToDp } from "../../utils/stylesKits";
import { I18n } from "../../language/I18n";

const handleFormatAddress = address => {
  return `${address.substring(0, 5)}...${address.substring(address.length - 5, address.length)}`;
};

const PaySuccess = props => {
  const { order, orderHash } = props;
  const navigate = useNavigation();
  return (
    <VStack alignItems="center" flex="1" mt={pxToDp(111)} w="100%">
      <Image alt="img" source={Icons.paySuccessIcon} w={pxToDp(499)} h={pxToDp(507)}></Image>
      <Text mt={pxToDp(107)} fontSize={pxToDp(69)} fontWeight="800">
        {I18n.t("send.sendCompleted")}
      </Text>
      <Text fontSize={pxToDp(31)}>
        Your {order.value} {order.selectPayload.symbol} Has been send to
        {handleFormatAddress(order.to)}.
      </Text>
      <Center mt="10">
        <Pressable
          onPress={() => {
            navigate.navigate("HistoryItemRecord", { transactionHash: orderHash.transactionHash });
          }}
        >
          <HStack>
            <Text fontWeight="800" color="#5C50D2" fontSize={pxToDp(49)}>
              {I18n.t("send.viewInRecord")}
              {/* View in the <Text underline>record</Text> */}
            </Text>
          </HStack>
        </Pressable>
      </Center>
    </VStack>
  );
};

export default React.memo(PaySuccess);
