import React, { useState } from "react";
import { Center, HStack, Text, Flex, VStack, Stack, Box, Image, ScrollView, PresenceTransition, Button, FlatList } from "native-base";
import Icons from "../asset/Icon.js";
import { Dimensions, Pressable } from "react-native";
import ape from "../../../assets/image/ape.webp";

const downShelvesClickHandler = props => {
  const { item } = props;
  console.log(item, "下架");
};
const { width } = Dimensions.get("window");



/**
 * @param {*} props
 * @returns
 */
const List = props => {
  const { type, itemClick, data, buy } = props;

  const renderListItem = ({ item, index }) => {
    return (
      <Box w='50%' padding='2' key={index}>
      <Pressable mb="4"  onPress={() => itemClick({ item, type })}>
        <Box {...styles.item} w="100%">
          <Flex alignItems="center" w="100%">
            <Text bold>
              {index}
              {item.title}
            </Text>
            <Image alt="img" borderRadius="40" size="20" mt="3" source={item.icon} />
            <Text mt="2">{item.number}</Text>
            <HStack mt="3" alignItem="center" justifyContent="center">
              <Text style={{ position: "relative", top: 3 }}>{item.price}</Text>
              <Image alt="img" style={{ position: "relative", top: 3,  left: 1,}} size="5" source={Icons.bnbIcon} />
              <Pressable onPress={() => buy(item)}>
                <Box
                  w="20"
                  alignSelf="center"
                  bg="#1296db"
                  borderRadius="20"
                  ml='2'
                  _text={{
                    fontSize: "sm",
                    color: "warmGray.50",
                    paddingTop: "1",
                    paddingBottom: "1",
                    textAlign: "center",
                  }}
                >
                  {type === 0 ? "下架" : "立即购买"}
                </Box>
              </Pressable>
            </HStack>
          </Flex>
        </Box>
      </Pressable>
      </Box>
    );
  };

  return (
    <Stack >
      <FlatList w='100%'  numColumns={2} data={data} renderItem={renderListItem} keyExtractor={item => item.id} />
    </Stack>
  );
};

export default React.memo(List);

const styles = {
  item: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: "10",
    padding: "4",
    marginBottom: "16px",
  },
};
