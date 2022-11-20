import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import {
    View, Text, Image, HStack, AspectRatio, Stack, Center,
    Box, Input, Switch, Button, Link, TextArea, Slider, Checkbox,
    Flex, CircleIcon, ChevronDownIcon, Divider, Menu, Pressable, HamburgerIcon, Spacer, VStack,
} from 'native-base';

import NFTList from './Modal/NFTList';

export default function CrystalMarket() {

    const [pageSelect, setPageSelect] = useState(1);

    return (
        <View>
            <Stack alignItems="center">
                <HStack>
                    <Box w="20%">

                    </Box>
                    <Box w="60%" alignSelf="center" h="7" borderWidth="1" borderColor="emerald.500" rounded="lg" _text={{
                        fontSize: 'xs',
                        color: 'warmGray.50',
                        letterSpacing: 'lg',
                    }} >
                        <Center>
                            <Text mt="0">Lyami Wallet</Text>
                        </Center>
                    </Box>
                    <Box w="20%"></Box>
                </HStack>
            </Stack>
            <Stack mt="2" alignItems="center">
                <HStack>
                <Box w="8%"></Box>
                <Box w="16%" borderColor="green.400" borderWidth="1"></Box>
                <Box w="54%" borderColor="green.400" borderWidth="1" alignItems="center" minH={12}>
                    <Text mt="2.5">水晶币99999999</Text>
                </Box>
                <Box w="16%" borderColor="green.400" borderWidth="1"></Box>
                <Box w="8%"></Box>
                </HStack>
            </Stack>
            <Stack mt="4" alignItems="center">
                <Box w="15%"></Box>
                <Box w="70%">
                <Button.Group  mt="0.2" isAttached colorScheme="blue" mx={{
                        base: "auto",
                        md: 0
                    }} >
                    <Button variant={pageSelect==1 ? null : 'outline'}  w="25%" onPress={() => setPageSelect(1)}>水晶球</Button>
                    <Button variant={pageSelect==2 ? null : 'outline'}  w="25%" onPress={() => setPageSelect(2)}>印记</Button>
                    <Button variant={pageSelect==3 ? null : 'outline'}  w="25%" onPress={() => setPageSelect(3)}>地产</Button>
                    <Button variant={pageSelect==4 ? null : 'outline'}  w="25%" onPress={() => setPageSelect(4)}>游戏NFT</Button>
                </Button.Group>
                </Box>
                <Box w="15%"></Box>
            </Stack>
            <Stack mt="8" alignItems="center">
                {
                    pageSelect == 1 ? <NFTList></NFTList> : null
                }
                {
                    pageSelect == 2 ? null : null
                }
                {
                    pageSelect == 3 ? null : null
                }
                {
                    pageSelect == 4 ? null : null
                }
            </Stack>
            
        </View>
    )
}