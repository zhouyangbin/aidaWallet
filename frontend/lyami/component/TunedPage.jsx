import React ,{ useState,useContext,useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Image, VStack, HStack } from "native-base";
import Icons from "../asset/Icon";
import { pxToDp } from "../../utils/stylesKits";
import LoadingContext from "../../providers/LoadContext";
const TunedPage = props => {
  const loading = useContext(LoadingContext);
  useFocusEffect(
    useCallback(()=>{
      loading.showMenu(3);
      return ()=>{
        ()=>{}
      }
    },[])
  )
  return (
    <VStack h="100%">
      <HStack h={pxToDp(301)} borderBottomRadius={pxToDp(60)} bg="#20326D"></HStack>
      <VStack pt={pxToDp(201)} alignItems="center" flex="1">
        <Image w={pxToDp(256)} h={pxToDp(256)} source={Icons.tunedIcon}></Image>
        <Text fontSize={pxToDp(70)}>Coming soon</Text>
      </VStack>
    </VStack>
  );
};

export default React.memo(TunedPage);
