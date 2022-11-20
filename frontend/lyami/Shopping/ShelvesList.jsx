import React, { useState } from "react";
import { Center, HStack, Text, Flex, VStack, Stack, Box, Image, ScrollView, PresenceTransition, Button, } from "native-base";
import Icons from "../asset/Icon.js";
import ActionButton from "react-native-action-button";
import { Pressable } from "react-native";
import List from './List'

/**
 * 我的上架
 * @param {*} props 
 * @returns 
 */
const ShelvesList = props => {
  console.log(props, 'props');
  const {data, buyClick} = props 
  const [show, setShow] = useState(true);
  return (
    <VStack mt="6">
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          translateX: 20,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 250,
          },
        }}
      >
        {props.productList}
        {/* <List type='shelves' buy={buyClick} data={props.data} itemClick={props.itemClick}/> */}
      </PresenceTransition>
    </VStack>
  );
};

export default React.memo(ShelvesList);

