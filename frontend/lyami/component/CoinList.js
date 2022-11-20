import React from "react";
import { HStack, Text, FlatList, Avatar, Pressable, Box, VStack } from "native-base";
import shadowCon from "@/../../assets/image/UiImg/shadowCon.webp";
import { ImageBackground } from "react-native";
import { pxToDp } from "../../utils/stylesKits";

const CoinList = (props) => {
  const { payload, handleSelect } = props;
  return (
    <FlatList
      data={payload}
      renderItem={({ item, index }) => (
        <ImageBackground
          key={index}
          source={shadowCon}
          style={{ width: pxToDp(998.4), height: pxToDp(164.6), marginBottom: pxToDp(10) }}
          resizeMode="stretch"
        >
          <Pressable
            onPress={() => {
              handleSelect(item);
            }}
            h="100%"
            w="100%"
            alignItems="center"
            flexDirection="row"
            pb={pxToDp(10)}
          >
            <Avatar
              source={{
                uri: item.image,
              }}
              ml={pxToDp(41)}
              mr={pxToDp(35)}
              bg="transparent"
              size="7"
              resizeMode="cover"
              resizeMethod="resize"
            ></Avatar>
            <Text fontSize={16}>
              {item.name}
              <Text>({item.symbol})</Text>
            </Text>
          </Pressable>
        </ImageBackground>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default React.memo(CoinList);
