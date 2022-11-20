import React from 'react';
import {
  Modal,
  Button,
  ScrollView,
  Text,
  Center,
  VStack,
  NativeBaseProvider,
  Stack,
  HStack,
  Link,
  Spacer,
  Divider,
  CheckIcon,
  CircleIcon,
  Checkbox,
  AddIcon,
  Pressable,
  ArrowDownIcon,
  SunIcon,
  QuestionIcon,
} from 'native-base';

// import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

function AccountSettingModal(props) {
  return (
    <Modal
      isOpen={props.modalVisible}
      onClose={() => props.setModalVisible(false)}
      size={props.size}>
      <Modal.Content {...styles[props.placement]}>
        <Modal.Header>
          <HStack>
            <Text mt="2">我的账户</Text>
            <Spacer></Spacer>
            <Button colorScheme="secondary" size="sm">锁定</Button>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <Stack mt="-3">
          <HStack mt="3">
                <CheckIcon ml="2" size="5" color="success.500"></CheckIcon>
                <CircleIcon ml="2" size="5" color="green.500"></CircleIcon>
                <HStack space={8}>
                        <Spacer></Spacer>
                        <Text>Account1</Text>  
                        <Spacer></Spacer>
                        <Text>0 Eth</Text>
                    </HStack>
            </HStack>
            <HStack mt="3">
                <CheckIcon ml="2" size="5" color="success.500"></CheckIcon>
                <CircleIcon ml="2" size="5" color="green.500"></CircleIcon>
                <HStack space={8}>
                        <Spacer></Spacer>
                        <Text>Account2</Text>  
                        <Spacer></Spacer>
                        <Text>0.1254245 Eth</Text>
                    </HStack>
            </HStack>
            <HStack mt="3">
                <CheckIcon ml="2" size="5" color="success.500"></CheckIcon>
                <CircleIcon ml="2" size="5" color="green.500"></CircleIcon>
                <HStack space={8}>
                        <Spacer></Spacer>
                        <Text>Account3</Text>  
                        <Spacer></Spacer>
                        <Text>0.1111111 Eth</Text>
                    </HStack>
            </HStack>
          </Stack>
          <Divider mt="3"></Divider>
          <Stack mt="3" ml="2">
            <Pressable onPress={() => console.log('add a new account')}>
            <HStack space={1}>
                {/* <Ionicons name="md-add-circle-sharp" size={18} color="black" /> */}
                <Text ml="6">增加账户</Text>
            </HStack>
            </Pressable>
            <Pressable mt="3" onPress={() => console.log('import account from json')}>
            <HStack space={1}>
            {/* <MaterialCommunityIcons name="application-import" size={18} color="black" /> */}
                <Text ml="6">导入账户</Text>
            </HStack>
            </Pressable>
            <Pressable mt="3" onPress={() => console.log('connect to hard wallet')}>
            <HStack space={1}>
            {/* <MaterialCommunityIcons name="connection" size={18} color="black" /> */}
                <Text ml="6">连接硬件钱包</Text>
            </HStack>
            </Pressable>
          </Stack>
          <Divider mt="3"></Divider>
          <Stack ml="2">
          <Pressable mt="3" onPress={() => console.log('i will give you support')}>
            <HStack space={1}>
              {/* <MaterialIcons name="contact-support" size={18} color="black" /> */}
                <Text ml="6">支持</Text>
            </HStack>
            </Pressable>
            <Pressable mt="3" onPress={() => console.log('setting')}>
            <HStack space={1}>
                {/* <AntDesign name="setting" size={18} mt="2"/> */}
                <Text ml="6">设置</Text>
            </HStack>
            </Pressable>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const styles = {
    top: {
      marginBottom: "auto",
      marginTop: 20,
      marginRight: -8,
    },
    bottom: {
      marginBottom: 0,
      marginTop: "auto"
    },
    left: {
      marginLeft: 0,
      marginRight: "auto"
    },
    right: {
      marginLeft: "auto",
      marginRight: 0
    },
    center: {}
  };

export default AccountSettingModal;
