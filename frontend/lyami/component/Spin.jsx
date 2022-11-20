import React from "react";
import { VStack, Spinner, Text } from "native-base";

const Spin = props => {
  const { children, textContent, color = "darkBlue.400", isSpin, h, bg } = props;
  return (
    <VStack h={h ? h : "full"}>
      {isSpin ? (
        <VStack zIndex="10" top="0" left="0" w="100%" h="100%" bg={bg ? bg : 'rgba(212,212,212,.5)'}  position="absolute" alignItems="center" justifyContent="center">
          <VStack>
            <Spinner size="lg" color={color}></Spinner>
            <Text fontSize={20} color={color}>
              {textContent}
            </Text>
          </VStack>
        </VStack>
      ) : null}
      {children}
    </VStack>
  );
};

export default React.memo(Spin);
