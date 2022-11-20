import React, { useState, useCallback } from "react";
import { HStack, VStack, Image, Text, Pressable, FlatList, Input, ScrollView, View, Box } from "native-base";
import { pxToDp } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import { StyleSheet } from "react-native";
const ToolHead = props => {
  const navigation = useNavigation();
  const { title,type ,headBackPress} = props;
  return (
    <View w="100%">
      <HStack mt={pxToDp(141)} mb={pxToDp(22)} px={pxToDp(41)} alignItems="center" justifyContent="space-between">
        <Pressable
          w="33%"
          onPress={() => {
            if(type == "setting" && headBackPress!= undefined){
              headBackPress()
            }else{
              navigation.goBack();
            }
          }}
        >
          <Image alt="img" w={pxToDp(50)} h={pxToDp(50)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          {title}
        </Text>
        <Text w="33%"></Text>
      </HStack>
    </View>
  );
};
export default React.memo(ToolHead);
