import React from "react";
import { PresenceTransition, Box, Text, VStack, Center } from "native-base";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
import { Pressable } from "react-native";
import Button from "../component/Button";

//unpriinting button
const Unprinting = props => {
  const { isShow, style, click, isLoading } = props;

  return (
    <Box>
      <PresenceTransition
        visible={isShow}
        initial={{
          opacity: 0,
          translateY: 20,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 250,
          },
        }}
      >
        <VStack {...style} w={screenWidth} h={pxToDp(280)} bg="#fff" borderTopRadius={pxToDp(60)}>
          <Center>
              <Button isLoading={isLoading} mt={pxToDp(70)} type="lg" onPress={() => click()}>Unprinting</Button>
          </Center>
        </VStack>
      </PresenceTransition>
    </Box>
  );
};

export default React.memo(Unprinting);
