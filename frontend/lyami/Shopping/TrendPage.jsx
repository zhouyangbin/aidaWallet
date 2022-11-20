import React, { useState } from "react";
import { Center, HStack, Text, Flex, Select, VStack, Stack, Box, Image, Checkbox, ScrollView, PresenceTransition, Button } from "native-base";
import Header from "../component/Header";
import Icons from "../asset/Icon.js";
import { Pressable } from "react-native";


const TrendPage = props => {
  return (
    <VStack>
      <Header>趋势</Header>
    </VStack>
  )


}

export default React.memo(TrendPage)
