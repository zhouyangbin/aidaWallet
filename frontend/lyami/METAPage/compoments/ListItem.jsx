import React from "react";
import moment from "moment";
import { VStack, Text, HStack, Center, Image } from "native-base";
import { Pressable } from "react-native";
import {pxToDp} from '../../../utils/stylesKits'

const ListItem = props => {
  const { item, click } = props;
  return (
    <Pressable onPress={() => click(item)} >
      <Center>
      <VStack borderColor="#fff" borderWidth="1" pt={pxToDp(30)} pb={pxToDp(38)} pl={pxToDp(40)} pr={pxToDp(38)} mt={pxToDp(40)} w={pxToDp(998)} bg='#fff' borderRadius={pxToDp(30)}>
        <Text  color='#9F9F9F' fontWeight='bold' fontSize={pxToDp(36)}>{moment(item.createTime).format('YYYY.MM.DD')}</Text>
        <HStack  justifyContent='space-between' mt={pxToDp(30)}>
          <Text w={pxToDp(651)} color='#181818' fontWeight='bold' fontSize={pxToDp(40)}>{item.title}</Text>
          <VStack   >
            <Image w={pxToDp(165)} h={pxToDp(165)} borderRadius={pxToDp(16)} alt='image' source={{uri: item.image}}/>
          </VStack>
        </HStack>
      </VStack>
      </Center>
    </Pressable>
  );
};

export default React.memo(ListItem);
