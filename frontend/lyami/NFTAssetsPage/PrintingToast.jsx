import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack, PresenceTransition, VStack, HStack, Text, Image, Center, Pressable } from "native-base";
import { pxToDp, screenHeight, screenWidth } from "../../utils/stylesKits";
import Icons from "../asset/Icon";
import Button from "../component/Button";

const PrintingToast = props => {
  const navigation = useNavigation();
  const { isShow, close, type, GotoAIDA } = props;

  const GotoMy = props => {
    GotoAIDA()
  };
  return (
    <Stack position="absolute" w={screenWidth} h={screenHeight} backgroundColor="rgba(0,0,0,0.4)" zIndex="10010">
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
        <Center>
          <VStack padding={pxToDp(32)} pt={pxToDp(40)} mt={pxToDp(599)} justifyContent="space-between" w={pxToDp(922)} h={pxToDp(722)} bg="#fff" borderRadius={pxToDp(30)}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text></Text>
              <Text color="#181818" fontWeight="800" fontSize={pxToDp(54)}>
                Notice
              </Text>
              <Pressable onPress={() => close(false)}>
                <Image w={pxToDp(39)} h={pxToDp(39)} source={Icons.closeIcon} />
              </Pressable>
            </HStack>
            <Center>
              <Text textAlign="center" w={pxToDp(704)} color="#181818" fontWeight="500" fontSize={pxToDp(42)} lineHeight={pxToDp(80)}>
                {
                  type === 'success' ? 'Congratulations, the printing is successful !' 
                  : 'Sorry, the printing failed. It needs to be printed again.'
                }
              </Text>
            </Center>
            {
              type === 'success' ? <Button type="lg" onPress={() => GotoMy()}>
              Go to view
            </Button> : <Text/>
            }
          </VStack>
        </Center>
      </PresenceTransition>
    </Stack>
  );
};

export default React.memo(PrintingToast);
