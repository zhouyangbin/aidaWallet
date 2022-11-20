import React, { useState } from "react";
import { Center, HStack, Text, Flex, VStack, Stack, Box, Image, ScrollView, PresenceTransition, Button } from "native-base";
import Icons from "../asset/Icon.js";
import { Pressable } from "react-native";
import List from './List'

const CrystalBallList = props => {
  const [show, setShow] = useState(true)
  const {buyClick} = props
  return (
    <Stack  mt="6">
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
        {/* <List buy={buyClick}  data={props.data} itemClick={props.itemClick}/> */}
      </PresenceTransition>
    </Stack>
  )
}
export default React.memo(CrystalBallList)