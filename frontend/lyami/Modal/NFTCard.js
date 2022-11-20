import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  HStack,
  Stack,
  Center,
  Box,
  Input,
  Switch,
  Button,
  Link,
} from 'native-base';

function NFTCard({data}) {
  return (
    <View>
      <Stack alignItems="center">
        <HStack mt="10">
          <Image source={{uri: "https://tenfei01.cfp.cn/creative/vcg/nowarter800/new/VCG211202144536.gif?x-oss-process=image/format,webp"}} alt="图片描述" size="xl"></Image>
        </HStack>
        <HStack>
          <Text>NFT的名字</Text>
        </HStack>
        <HStack>
          <Text>价格</Text>
        </HStack>
      </Stack>
    </View>
  )
}

export default NFTCard;
