import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import {
    View, Text, Image, HStack, AspectRatio, Stack, Center,
    Box, Input, Switch, Button, Link, TextArea, Slider, Checkbox,
    Flex, CircleIcon, ChevronDownIcon, Divider, Menu, Pressable, HamburgerIcon, Spacer, VStack,
} from 'native-base';

// import NFTAssets from '../../NFT/NFTAssets';

export default function NFTList() {
    return (<View>
        <Stack>
            <HStack>
                <Box w="20%"></Box>
                <Box w="30%">
                    <Button backgroundColor="amber.400">价格排序</Button>
                </Box>
                <Box w="20%"></Box>
                <Box w="30%">
                    <Box mt="2">筛选</Box>
                </Box>
                <Box w="4%"></Box>
            </HStack>
            <HStack>
                {/* <NFTAssets></NFTAssets> */}
            </HStack>
        </Stack>
    </View>)
}