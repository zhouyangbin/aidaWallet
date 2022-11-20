import React, { useState } from "react";
import { Actionsheet, VStack, Center, Text, Image, Input } from "native-base";
import { pxToDp } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import Button from "../component/Button";
import { I18n } from "../../language/I18n";

/**
 * 收藏 水晶球 和 NFT
 * @param {*} props
 * @returns
 */
const AddCrystalball = props => {
  const { isOpen, close, confirm, NFTType } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleSetInput = async text => {
    // 水晶球收藏的是ballid  NFT收藏的是tokenID
    setSearchValue(text.trim());
  };
  return (
    <Actionsheet isOpen={isOpen} size="full" onClose={() => close(false)}>
      <Actionsheet.Content h={pxToDp(743)}>
        <Center>
          <Text color="#181818" fontSize={pxToDp(54)} fontWeight="800">
            {/* Add */}
            {I18n.t("NFTAssets.add")}
          </Text>
        </Center>
        <VStack>
          <Text mt={pxToDp(50)} color="#181818" fontSize={pxToDp(46)} fontWeight="bold">
            {NFTType === 0 ? 'Ball ID:' : 'Token ID:'}
          </Text>
          <Input
            mt={pxToDp(14)}
            variant="outline"
            type="text"
            w={pxToDp(920)}
            h={pxToDp(136)}
            fontSize={pxToDp(34)}
            color="#ADAEB4"
            borderColor="#5C50D2"
            backgroundColor="#F3F3F4"
            borderRadius={pxToDp(30)}
            value={searchValue}
            placeholder={NFTType === 0 ? 'Enter ball ID:' : 'Enter token ID:'}
            _focus={{ borderColor: "darkBlue.400", backgroundColor: "transparent" }}
            onChangeText={handleSetInput}
            InputLeftElement={<Image alt="image" source={Icons.inputSearchIcon} w={pxToDp(50)} h={pxToDp(42)}  marginLeft="3" />}
          />
          <Center mt={pxToDp(117)}>
            <Button
              onPress={() => {
                close(false);
                setSearchValue('')
                confirm(searchValue);
              }}
              type="lg"
            >
              {I18n.t("NFTAssets.add")}
            </Button>
          </Center>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default React.memo(AddCrystalball);
