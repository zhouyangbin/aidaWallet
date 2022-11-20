import React, { useState } from "react";
import {HStack, VStack, Image, Text, Pressable, Box, Select,Input,Radio ,Switch, ScrollView,View } from "native-base";
import Button from "../Button";
import { pxToDp, screenHeight, screenWidth } from "../../../utils/stylesKits";
import Icons from "../../asset/Icon";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "../../../language/I18n";
import {StyleSheet } from 'react-native';

const Cantacts = props => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  
  const setLanguage = (value) => {
    I18n.defaultLocale = value;
    setService(value)
  }

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
          联系人
        </Text>
        <Text w="33%"></Text>
      </HStack>
      <HStack mt={pxToDp(43)} style={[styles.listBox]} alignItems="center" h={pxToDp(94)} borderRadius={pxToDp(47)}>
              <Input
                variant="outline"
                type="text"
                w="100%"
                h={pxToDp(108)}
                fontSize={pxToDp(38)}
                fontWeight="500"
                color="#9FA1A8"
                borderColor="#bbc0c5"
                borderWidth={pxToDp(2)}
                backgroundColor="#EDEFF1"
                borderRadius={pxToDp(21)}
                value={searchValue}
                placeholder="Search in Settings"
                _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
                onChangeText={handleSetInput}
                InputLeftElement={<Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)} marginLeft="3" />}
              />
      </HStack>
      <View mt={pxToDp(61)} h={pxToDp(1540)}  borderTopWidth={pxToDp(2)} borderColor="#bbc0c5">
        {step ==1 ?
          <Box h="100%"  w="100%">
            <VStack alignItems="center" mt={pxToDp(141)} style={[styles.listBox]} mb={pxToDp(41)}>
                  <Text color="#000" h={pxToDp(79)}>
                  建立您的联系人列表
                  </Text>
                  <Text h={pxToDp(49)} style={[styles.listText2]}>
                  建立您的联系人列表
                  </Text>
                  <Pressable onPress={()=>setStep(2)}>
                    <Text color="#05a5d1" fontSize={pxToDp(25)}>
                    + 添加联系人
                    </Text>
                  </Pressable>
              </VStack>
          </Box>:
          <Box h="100%">
            <VStack mt={pxToDp(41)} style={[styles.listBox]} mb={pxToDp(41)}>
                <Text style={[styles.listText2]}>
                名称
                </Text>
                <HStack w="100%" h={pxToDp(140)} alignItems="center">
                  <Input
                    variant="outline"
                    type="text"
                    w="100%"
                    h={pxToDp(108)}
                    fontSize={pxToDp(38)}
                    fontWeight="500"
                    color="#9FA1A8"
                    borderColor="#bbc0c5"
                    borderWidth={pxToDp(2)}
                    backgroundColor="#EDEFF1"
                    borderRadius={pxToDp(21)}
                    value={searchValue}
                    placeholder=""
                    _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
                    onChangeText={handleSetInput}
                  />
                </HStack>
            </VStack>
            <VStack style={[styles.listBox]}>
                <Text style={[styles.listText2]}>
                以太坊 Ethereum 公开地址
                </Text>
                <HStack w="100%" h={pxToDp(140)} alignItems="center">
                <Input
                  variant="outline"
                  type="text"
                  w="100%"
                  h={pxToDp(108)}
                  fontSize={pxToDp(38)}
                  fontWeight="500"
                  color="#9FA1A8"
                  borderColor="#bbc0c5"
                  borderWidth={pxToDp(2)}
                  backgroundColor="#EDEFF1"
                  borderRadius={pxToDp(21)}
                  value={searchValue}
                  placeholder=""
                  _focus={{ borderColor: "#bbc0c5", backgroundColor: "#efefef" }}
                  onChangeText={handleSetInput}
                  InputLeftElement={<Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(39)} h={pxToDp(32)} marginLeft="3" />}
                />
                </HStack>
            </VStack>
          </Box>
        }
      </View>
      {step ==2 ?
      <HStack w="100%" h={pxToDp(201)} borderTopWidth={pxToDp(2)} borderColor="#bbc0c5" 
              position="absolute" bottom={pxToDp(0)} justifyContent="center" alignItems="center">
              <Button
              w={pxToDp(377)}
              mr={pxToDp(53)}
              color="#5C50D2"
              bg="transparent"
              type="sm"
              borderRadius={pxToDp(121)}
              borderWidth={pxToDp(3)}
              borderColor="#5C50D2"
              onPress={()=>setStep(1)}
            >
              取消</Button>
              <Button
              w={pxToDp(377)}
              borderRadius={pxToDp(121)}
              type="sm"
            >保存</Button>
            </HStack>
            :null}
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
export default React.memo(Cantacts);
