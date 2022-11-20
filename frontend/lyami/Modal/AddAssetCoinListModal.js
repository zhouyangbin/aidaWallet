import React from "react";
import { HStack, Input, Box, VStack, Image, Text } from "native-base";
import CoinList from "../../component/CoinList";
import Icons from "@/../../frontend/Components/lyami/asset/Icon";
const AddAssetCoinListModal = props => {
  const { payload } = props;
  const handleChangeInput = payload => {
    console.log(payload);
    // setInputValue(payload);
  };
  const handleSelect = payload => {
    console.log(payload);
  };
  return (
    <>
      <HStack mt="5" justifyContent="center">
        <Input
          variant="outline"
          w="80%"
          h="10"
          // value={inputValue}
          onChangeText={handleChangeInput}
          _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
          InputLeftElement={
            <Box ml="2">
              <Image alt='img' size="2xs" source={Icons.inputSearchIcon}></Image>
            </Box>
          }
          placeholder="输入代币名或token进行查询"
        />
      </HStack>
      <Box flex="1" display="flex" flexDirection="column" mt="5" alignItems="center">
        <VStack h="100%" w="100%" paddingLeft='10%'>
          <Box mb="4">
            <Text>选择代币</Text>
          </Box>
          <CoinList handleSelect={handleSelect} payload={payload}></CoinList>
        </VStack>
      </Box>
    </>
  );
};

export default React.memo(AddAssetCoinListModal);
