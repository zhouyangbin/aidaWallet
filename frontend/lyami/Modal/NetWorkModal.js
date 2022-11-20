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
  Checkbox
} from 'native-base';

function NetWorkModal(props) {
  return (
    <Modal
      isOpen={props.modalVisible}
      onClose={() => props.setModalVisible(false)}
      size={props.size}
      >
      <Modal.Content {...styles[props.placement]}>
        <Modal.CloseButton />
        <Modal.Header>
            <Center>网络</Center>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <HStack>
                <CheckIcon ml="2" size="5" color="success.500"></CheckIcon>
                <CircleIcon ml="2" size="5" color="green.500"></CircleIcon>
                <Text ml="6">以太坊ethereum主网络</Text>
            </HStack>
          </Stack>
          <Divider mt="8"></Divider>
          <Stack>
                <HStack >
                <Checkbox mt="4" value="showTestNetwork" alignSelf="flex-start">显示测试网络</Checkbox>
                <Spacer></Spacer>
                <Button mt="2"  size="md" onPress={() => props.setModalVisible(false)}>添加网络</Button>
                </HStack>
            </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const styles = {
    top: {
      marginBottom: "auto",
      marginTop: 20
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

export default NetWorkModal;
