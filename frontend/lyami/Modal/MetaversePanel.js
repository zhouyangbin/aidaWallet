import React, {Component, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {  View,  Text,  Image,  HStack,  AspectRatio,  Stack,  Center,
  Box,  Input,  Switch,  Button,  Link,  TextArea,  Slider,  Checkbox,
  Flex,  CircleIcon,  ChevronDownIcon,  Divider,  Menu,  Pressable,  HamburgerIcon,  Spacer, VStack,
} from 'native-base';

export default function MetaversePanel({props}) {
    return (
        <View>
            <Stack alignItems="center">
            <HStack>
                <Center>
                    <Text fontSize="20" >{'0' + '   ' + '水晶币'}</Text>
                </Center>
            </HStack>
            <HStack mt="8">
                <Box w="15%"></Box>
                <Box w="70%">
                    <HStack>
                        <Text mt="2">元宇宙资产</Text>
                        <Spacer></Spacer>
                        
                    </HStack>
                </Box>
                <Box w="15%"></Box>
            </HStack>
            <HStack mt="4">
                <Box w="70%" borderColor="amber.400" borderWidth="1" h="44">
                    <HStack>
                        <Box w="4%"></Box>
                        <Text mt="3">水晶娃娃</Text>
                        <Spacer></Spacer>
                        <Text mt="3">0</Text>
                        <Box w="4%"></Box>
                    </HStack>
                </Box>
                </HStack>
                <HStack>
                <Box w="70%" borderColor="amber.400" borderWidth="1" h="44">
                    <HStack>
                        <Box w="4%"></Box>
                        <Text mt="3">印记</Text>
                        <Spacer></Spacer>
                        <Text mt="3">0</Text>
                        <Box w="4%"></Box>
                    </HStack>
                </Box>
                </HStack>
                <HStack>
                <Box w="70%" borderColor="amber.400" borderWidth="1" h="44">
                    <HStack>
                        <Box w="4%"></Box>
                        <Text mt="3">游戏NFT</Text>
                        <Spacer></Spacer>
                        <Text mt="3">0</Text>
                        <Box w="4%"></Box>
                    </HStack>
                </Box>
                <Box w="70%" borderColor="amber.400" borderWidth="1" h="44">
                    <HStack>
                        <Box w="4%"></Box>
                        <Text mt="3">游戏NFT</Text>
                        <Spacer></Spacer>
                        <Text mt="3">0</Text>
                        <Box w="4%"></Box>
                    </HStack>
                </Box>
            </HStack>
            </Stack>
            <Stack alignItems="center" mt="16">
                <HStack mt="4">
                    <Button backgroundColor="amber.500" w="40">转移</Button>
                </HStack>
                <HStack mt="4">
                    <Button backgroundColor="amber.500" w="40">降临</Button>
                </HStack>
            </Stack>
        </View>
    )
}