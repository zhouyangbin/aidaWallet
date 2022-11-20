import React from "react";
import { HStack, Image, VStack, Text, Center, Pressable,PresenceTransition } from "native-base";
import Icon from "../asset/Icon";
import Button from "../component/Button";
import { pxToDp, screenWidth, screenHeight } from "../../utils/stylesKits";

const PaySuccess = props => {

  const {setPayStep, isShow=true, refreshAIDAList} = props
  const gotoMerchant = props => {
    setPayStep(0)
    // refreshAIDAList()
  };

  return (
    <VStack 
      position="absolute"
      w={screenWidth}
      h={screenHeight}
      flex="1"
      bg="#fff"
      zIndex="1000"
    >
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
      <HStack pl={pxToDp(41)} pr={pxToDp(41)} mt={pxToDp(150)} alignItems='center' justifyContent='space-between'>
        <Pressable onPress={() => setPayStep(0)}>
          <Image w={pxToDp(77)} h={pxToDp(49)} source={Icon.goBackArrowBIcon} />
        </Pressable>
        <Text color="#181818" fontWeight="800" fontSize={pxToDp(50)}>
          Withdraw
        </Text>
        <Text />
      </HStack>
      <Center>
        <Image mt={pxToDp(160)} w={pxToDp(499)} h={pxToDp(508)} source={Icon.paySuccessIcon} />
        <Text mt={pxToDp(90)} color="#181818" fontWeight="800" fontSize={pxToDp(70)}>
          Withdrawal succeeded
        </Text>
        <Button mt={pxToDp(155)} w={pxToDp(858)} h={pxToDp(145)} type="lg" onPress={() => gotoMerchant()}>
          Return to merchant
        </Button>
      </Center>
      </PresenceTransition>
    </VStack>
  );
};

export default React.memo(PaySuccess);
