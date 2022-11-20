import React from "react";
import { View, Text, Image, VStack } from "native-base";

export default function VerticalIconName(props) {
  return (
    <View>
      <VStack alignItems="center">
        <Image alt="img" source={props.source} size={props.size} />
        <Text>{props.text}</Text>
      </VStack>
    </View>
  );
}
