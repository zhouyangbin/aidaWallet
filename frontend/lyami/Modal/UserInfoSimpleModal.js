import React, { useEffect, useState,useMemo } from "react";
import {
  Text,
  Avatar,
  Pressable,
  HStack,
  ScrollView,
  Button,
  Actionsheet,
  VStack,
  Checkbox,
  Box,
  Stack,
} from "native-base";
import global from "../api/util/global";
import { useNavigation } from "@react-navigation/native";
import { SaveGlobalData } from '../api/localStorge/LocalStroge';

// 用户信息弹框
export default UserInfoSimpleModal = (props) => {
    const [userList, setUserList] = useState(global.keys);
    const [selectedAddress, setSelectedAddress]=useState(global.defaultAddress.call());
    const { visible, onCancel, onItemChanged } = props;
    const navigation = useNavigation();
    const changeChecked = (item) => {
        onItemChanged(item);
        setSelectedAddress(item.address);
    //    global.defaultKey=item;
    //    SaveGlobalData(global.CreateNewPassword);
    //    changeDefaultKey()
    };

    useEffect(()=>{
      setUserList(global.keys)
    },[JSON.stringify(global.keys)])
    return (
      <>
        <Actionsheet isOpen={visible} size="full" onClose={onCancel}>
          <Actionsheet.Content>
            <Stack>
              <ScrollView>
                {userList.map((item, index) => {
                  return (
                    <Pressable
                      key={item.privateKey}
                      padding="2"
                      borderBottomColor="#ccc"
                      borderBottomWidth="1"
                      onPress={() => {
                        changeChecked(item);
                      }}
                    >
                      <HStack w="100%" justifyContent="space-between">
                        <HStack w="70%">
                          <Avatar
                            mr="6"
                            source={{ uri: 'https://ipfs.gateway.lyami.net/ipfs/QmRpKV1Jq5XtnHJdU1rizD6jxqo6LyHvmWdJZVURMiRUG6' }}
                            size="sm"
                          ></Avatar>
                          <VStack>
                            <Text color="#515151" fontSize="16">
                              {`${item.address.substring(0, 14)}...${item.address.substring(item.address.length - 14, item.address.length)}`}
                            </Text>
                          </VStack>
                        </HStack>
                        <Box alignItems="flex-end">   
                          <Checkbox
                            aria-label="ChangeAddress"
                            value={item.checked}
                            key={item.privateKey}
                            isChecked={selectedAddress===item.address}
                            onChange={()=>changeChecked(item)}
                            borderRadius="100"
                          />
                        </Box>
                      </HStack>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </Stack>
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  };
  