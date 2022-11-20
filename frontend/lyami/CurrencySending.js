import React from "react";
import {View, Text, HStack,Avatar,Pressable,Box, Center,ScrollView,VStack} from "native-base";
import { handleMoneyFormatter } from "./api/util/helper";
import VerticalIconName from "./Modal/VerticalIconNameControl";
import Icons from "./asset/Icon";
import { useNavigation } from "@react-navigation/native";
import Header from "./component/Header";

export default CurrencySending = (props) =>{
    const {name='Account1'}=props;
    const { payload }=props?.route?.params;
    const navigation = useNavigation();
    return (
        <View width='100%' h='100%' bg='white'>
            <Header>{name+'/MATIC'}</Header>
            <HStack justifyContent="center" mt="2">
                <Avatar
                    source={{
                    uri: "https://ipfs.gateway.lyami.net/ipfs/QmRpKV1Jq5XtnHJdU1rizD6jxqo6LyHvmWdJZVURMiRUG6",
                    }}
                    size="lg"
                ></Avatar>
            </HStack>
            <HStack mt="2" justifyContent='center'>
                <Center>
                    <Text fontSize="20">{handleMoneyFormatter(payload.balance, 10, payload?.decimal)} {payload.symbol}</Text>
                </Center>
            </HStack>
            <HStack mt="4" justifyContent='center'>
                <Box w="13%" borderColor="amber.400" borderWidth="0" h="50">
                    <Pressable
                        onPress={() => {
                            navigation.navigate("PostAsset", {sendParams:{type:'alone',payload}});
                        }}
                    >
                        <VerticalIconName source={Icons.postIcon} text="发送" size="2xs"></VerticalIconName>
                    </Pressable>
                </Box>
            </HStack>
            <ScrollView>
              {[{name:'合约部署',Aug:'Aug  25',address:'remix.ethereum.org',money:'0',symbol:'MATIC'},
                {name:'合约交互',Aug:'Aug  25',address:'remix.ethereum.org',money:'0',symbol:'MATIC'}
              ].map((item, index) => {
                return (
                  <Pressable
                    key={item.privateKey}
                    padding="4"
                    borderBottomColor="#ccc"
                    borderBottomWidth="1"
                  >
                    <HStack w="100%" justifyContent="space-between">
                        <VStack w='10%'>
                            <VerticalIconName source={Icons.smart_contract} text="" size="xs"></VerticalIconName>
                        </VStack>
                        <VStack w='60%'>
                          <Text color="#515151" fontSize="16">
                            {item.name}
                          </Text>
                          <HStack color="#8a8a8a" fontSize="14">
                            <Text color="#30D777" fontSize="14">{item.Aug}</Text>
                            <Text ml='2' color="#8a8a8a" fontSize="14">{item.address}</Text>
                          </HStack>
                        </VStack>
                        <VStack w='20%'>
                          <Text color="#515151" fontSize="16">
                            {item.money}{item.symbol}
                          </Text>
                          <Text color="#8a8a8a" fontSize="13" pl='2'>
                            {item.money}{item.symbol}
                          </Text>
                        </VStack>
                    </HStack>
                  </Pressable>
                );
              })}
            </ScrollView>
        </View>
    );
}

