import React, { useState } from "react";
import { HStack, Text, Box, Center, Image, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Icons from "../asset/Icon.js";

const Header = props => {
  const { children } = props;
  const navigation = useNavigation();
  return (
    <HStack width="100%" pt="2" justifyContent="space-between" alignItems="center">
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Box ml="2">
          <Image alt='img' size="2xs" source={Icons.backIcon}></Image>
        </Box>
      </Pressable>
      <Center w="70%">
        <Box>
          {/* <Text>{children}</Text> */}
          {children}
        </Box>
      </Center>
      <Box mr="2">
        {/* <Image alt='img' size="2xs" source={Icons.editIcon}></Image> */}
      </Box>
    </HStack>
  );
};

export default React.memo(Header);
