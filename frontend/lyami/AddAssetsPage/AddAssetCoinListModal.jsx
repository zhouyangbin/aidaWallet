import React, { useMemo, useState } from "react";
import { HStack, Input, Box, VStack, Image, Text } from "native-base";
import CoinList from "../component/CoinList";
import Icons from "../asset/Icon";
import global from "../api/util/global";
import { pxToDp } from "../../utils/stylesKits";
import { I18n } from "../../language/I18n";

const handleFuzzyQuery = (payload, searchContent) => {
  if (searchContent) {
    return payload.filter((array) => array.name.toUpperCase().match(searchContent.toUpperCase()));
  } else {
    return payload;
  }
};
const AddAssetCoinListModal = (props) => {
  const { listData } = props;
  const [inputValue, setInputValue] = useState(null);
  const listDataArray = useMemo(() => {
    return handleFuzzyQuery(listData, inputValue);
  }, [inputValue, listData]);
  const handleChangeInput = (payload) => {
    setInputValue(payload);
    // setInputValue(payload);
  };
  const handleSelect = (payload) => {
    console.log(payload);

    // let a = global.defaultNetwork;
    // let b = global.nativeCoinNetwork;
    // if (isArray(b[netWorkIndex].assets)) {
    //   const currentIndex = b[netWorkIndex].assets.findIndex(item => item.token == assets.token);
    //   console.log(currentIndex);
    //   if (currentIndex == -1) {
    //     a.assets.push(assets);
    //     b[netWorkIndex] = a;
    //   } else {
    //     return toast.show({ description: "请勿重复添加", duration: 1500, placement: "top" });
    //   }
    // } else {
    //   a.assets = [assets];
    //   b[netWorkIndex] = a;
    // }
    // SaveGlobalData(global.CreateNewPassword);
    // toast.show({ description: "添加成功", duration: 1500, placement: "top" });
  };

  return (
    <>
      <Input
        variant="outline"
        w={pxToDp(998)}
        h={pxToDp(108)}
        mt={pxToDp(34)}
        bg="#E9ECEE"
        borderWidth={0}
        borderRadius={pxToDp(30)}
        // value={inputValue}
        onChangeText={handleChangeInput}
        value={inputValue}
        fontSize={pxToDp(38)}
        InputLeftElement={
          <Box ml={pxToDp(46)}>
            <Image alt="img" w={pxToDp(41)} h={pxToDp(41)} source={Icons.inputSearchIcon}></Image>
          </Box>
        }
        placeholder={I18n.t("wallet.searchPlaceholder")}
      />

      <VStack
        mt={pxToDp(58)}
        borderTopLeftRadius={pxToDp(70)}
        borderTopRightRadius={pxToDp(70)}
        flex="1"
        w="100%"
        px={pxToDp(41)}
        bg="#E9ECEE"
      >
        <Text
          ml={pxToDp(37)}
          mt={pxToDp(64)}
          mb={pxToDp(40)}
          lineHeight={pxToDp(64)}
          fontSize={pxToDp(50)}
          fontWeight="800"
        >
         {I18n.t("wallet.selectTokens")}
        </Text>
        <CoinList handleSelect={handleSelect} payload={listDataArray}></CoinList>
      </VStack>
    </>
  );
};

export default React.memo(AddAssetCoinListModal);
