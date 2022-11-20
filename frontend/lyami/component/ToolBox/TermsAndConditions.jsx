import React, { useState ,useCallback} from "react";
import {HStack, VStack, Image, Text, Pressable, FlatList,Input, ScrollView,View, Box } from "native-base";
import Button from "../Button";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import {StyleSheet } from 'react-native';
import global from "../../api/util/global";
import TextModal from "../../component/TextModal";
const TermsAndConditions = props => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [netArray, setNetArray] = useState(global.nativeCoinNetwork);
  const [netWorkIndex, setNetWorkIndex] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const currentNetIndex = global.nativeCoinNetwork.findIndex(item => 
        item.ChainId == global.defaultNetwork.ChainId);
        setNetWorkIndex(currentNetIndex);
      return () => {
        ()=>{}
      };
    }, [])
  );
  

  const handleSetInput = text => {
    setSearchValue(text);
  };
  return (
    <View w="100%" h="100%">
      <HStack mt={pxToDp(141)} px={pxToDp(40)} pr={pxToDp(40)} alignItems="center" justifyContent="space-between">
        <Pressable w="33%" onPress={() => navigation.goBack()}>
          <Image alt="img" w={pxToDp(50)} h={pxToDp(50)} source={Icons.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
        {I18n.t("register.privacyPolice")}
        </Text>
        <Text w="33%"></Text>
      </HStack>
      <ScrollView mt={pxToDp(61)} pb={pxToDp(202)} h={pxToDp(1340)} 
         borderTopWidth={pxToDp(2)} borderColor="#bbc0c5">
            <TextModal type={0} isOpen={true} showType="view"></TextModal>
            {/* <TextModal type={1} isOpen={true} showType="view"></TextModal> */}
      </ScrollView>
    </View>
  );
};
const styles= StyleSheet.create(
  {
    listBox:{
      width:"90%",
      marginLeft:"5%"
      
    },
    listText1:{
      color:"#746969",
       fontWeight:"600",
       fontSize:pxToDp(41)
    },
    listText2:{
      color:"#746969",
       fontWeight:"600",
       fontSize:pxToDp(31),
       lineHeight:pxToDp(41),
    },
  }
);
export default React.memo(TermsAndConditions);
