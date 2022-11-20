import React, { Component } from "react";

import {View, Text, Image, HStack, 
    Stack, Center, Box, Input, Switch, 
    Button, Link} from "native-base";
    import translateImage from "@/../../assets/image/translate-app.png";
function WalletSetting(props) {
    return (
        <View>
            <Stack mt="16" space="8" alignItems="center">
                <HStack space="2" alignItems="center">
                    <Center>
                    <Image source={translateImage} alt="Logo" size="xl"></Image>
                    </Center>
                </HStack>
                <HStack >
                    <Box >
                        <Text fontSize="4xl">钱包设置</Text>
                    </Box>
                </HStack>
                <HStack >
                    <Box >
                        <Text fontSize="md">导入现有钱包或创建新的钱包</Text>
                    </Box>
                </HStack>
            </Stack>
            <Stack mt="80" space="16" alignItems="center">
                <HStack>
                    <Button shadow={2} size="lg" w="48" onPress={() => console.log("登录")}>使用助记词导入</Button>
                </HStack>
                <HStack>
                    <Button shadow={2} size="lg" w="48" onPress={() => console.log("登录")}>创建新的钱包</Button>
                </HStack>
                <HStack>
                    <Text>继续即表示同意这些条款和条件</Text>
                </HStack>
            </Stack>
        </View>
    );
}

export default WalletSetting;
