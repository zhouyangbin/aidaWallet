import React from "react";
import { VStack, Image, Pressable, Text, HStack, FormControl, Input, WarningOutlineIcon, Box, Center, NativeBaseProvider, Button } from "native-base";
import Icons from "@/../../frontend/Components/lyami/asset/Icon";

const AddAssetCoinListCustomModal = props => {
  return (
    <VStack paddingX="4" alignItems="center">
      <HStack w="100%" mt="4" padding="2" borderWidth="1" borderRadius="5" borderColor="darkBlue.400" alignItems="center">
        <Image alt='img' mr="2" size="2xs" source={Icons.noticeIcon} />
        <Pressable
          flex="1"
          onPress={() => {
            //do sth
          }}
        >
          <Text>
            任何人都可以创建代币，包括创建现有代币的虚假版本。了解更多关于
            <Text color="darkBlue.400">诈骗和安全风险的信息。</Text>
          </Text>
        </Pressable>
      </HStack>
      <VStack mt="4" w="100%">
        <FormControl w="100%" isRequired>
          <VStack w="100%">
            <FormControl.Label>代币地址</FormControl.Label>
            <Input _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }} type="text" placeholder="请输入代币地址" />
            {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage> */}
          </VStack>
          <VStack w="100%">
            <FormControl.Label>代币符号</FormControl.Label>
            <Input _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }} type="text" placeholder="请选择代币符号" />
            {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage> */}
          </VStack>
          <VStack w="100%">
            <FormControl.Label>代币精度</FormControl.Label>
            <Input _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }} type="text" placeholder="请输入代币精度" />
            {/* <FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage> */}
          </VStack>
          <HStack mt="8" justifyContent="center">
            <Button colorScheme="darkBlue.400" bg="gray.400" mr="20" w='32'>
              取消
            </Button>
            <Button isLoading isLoadingText="添加中" colorScheme="white" bg="darkBlue.400" w="32">
              添加代币
            </Button>
          </HStack>
        </FormControl>
      </VStack>
    </VStack>
  );
};

export default React.memo(AddAssetCoinListCustomModal);
