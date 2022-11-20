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
  Pressable,
} from 'native-base';

function CoinItem(props) {
  const itemData = props.itemData;
  const navigation = useNavigation();
  console.log(itemData);
  return (
    <Pressable onPress={() => navigation.navigate('CoinDetail', {})} key={props.key}>
      <Box
        borderWidth="1"
        _dark={{
          borderColor: 'muted.50',
        }}
        borderColor="muted.300"
        pl={['0', '4']}
        pr={['0', '5']}
        py="2">
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            ml="4"
            size="48px"
            source={{
              uri: itemData.avatarUrl,
            }}
          />
          <VStack ml="4">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
              bold>
              {itemData.coinName}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {itemData.value}
            </Text>
          </VStack>
          <Spacer />
          <Center alignSelf="center" mr="10">
            <ChevronRightIcon
            />
          </Center>
        </HStack>
      </Box>
    </Pressable>
  );
}

function CoinCard({data}) {
  const datas = [
    {
      key: 1,
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      coinName: '水晶币',
      value: '10000',
      avatarUrl:
        'https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp',
    },
    {
      key: 2,
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      coinName: '韭菜币',
      value: '10000000000000',
      avatarUrl:
        'https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/db4de/eth-home-icon.webp',
    },
  ];
  return (
    <View>
      <Stack>
        <VStack safeAreaTop mb="6">
          {datas.map(dateItem => (
            <CoinItem itemData={dateItem}></CoinItem>
          ))}
        </VStack>
      </Stack>
    </View>
  );
}

export default CoinCard;
