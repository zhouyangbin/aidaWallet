import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  HStack,
  Stack,
  Center,
  Avatar,
  VStack,
  Box,
  Input,
  Switch,
  Button,
  Link,
  Spacer,
  ChevronRightIcon,
} from 'native-base';

function CoinDetail() {
  const navigation = useNavigation();
  return (
    <Center>
      <Stack space={3} alignItems="center">
        <HStack space={3} alignItems="center">
          <Button onPress={() => navigation.navigate('WalletMain', {})}>
            返回
          </Button>
        </HStack>
      </Stack>
    </Center>
  );
}

export default CoinDetail;
